import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request });

  // Gate advanced (Pro) tutorials before the page even renders. This is a
  // second line of defence — app/tutorials/[slug]/page.js checks again
  // server-side, since middleware runs on the edge and shouldn't be the
  // only thing standing between a visitor and paid content.
  if (pathname.startsWith("/tutorials/advanced-")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name, options) {
            response.cookies.set({ name, value: "", ...options, maxAge: 0 });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let isSubscriber = false;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, plan_active")
        .eq("id", user.id)
        .maybeSingle();
      // "Subscriber" here means a genuine paying plan, not the free trial —
      // trial accounts get everything else (see PLAN_FEATURES.inviteLinks
      // in app.js, which trial can access) but not Pro tutorials.
      isSubscriber = profile?.plan_active === true && profile?.plan !== "trial";
    }

    if (!isSubscriber) {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/tutorials/advanced-:path*"],
};
