import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request });

  // Region-based currency on the pricing page. Next.js 15 removed
  // `request.geo`, so this reads Cloudflare's own geolocation header
  // instead — set automatically on every request that passes through
  // Cloudflare, so no extra config needed there. (If you ever deploy this
  // particular page to Vercel instead, swap this for `geolocation(request)`
  // from `@vercel/functions`.)
  if (pathname === "/pricing") {
    const country = request.headers.get("cf-ipcountry");
    if (country && country !== "GB" && country !== "XX") {
      const url = request.nextUrl.clone();
      url.searchParams.set("currency", "USD");
      response = NextResponse.rewrite(url);
    }
  }

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
      const { data: business } = await supabase
        .from("businesses")
        .select("subscription_status")
        .eq("owner_user_id", user.id)
        .maybeSingle();
      isSubscriber = business?.subscription_status === "active";
    }

    if (!isSubscriber) {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/pricing", "/tutorials/advanced-:path*"],
};
