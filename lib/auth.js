// lib/auth.js
//
// Reads the real Supabase session (server-side) and, if the visitor is an
// admin (electrician), their live plan/plan_active from `profiles` — the
// same fields app.js itself reads to gate the in-app product. This is
// what actually gates Pro tutorials, replacing the earlier stub that read
// a `businesses.subscription_status` table app.js never used.

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  // Any failure here (misconfigured Supabase env vars, a downstream outage)
  // should not take down every page that gates content on this — fail
  // closed to "not a subscriber" instead of throwing, same as an
  // anonymous visitor would see.
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, isSubscriber: false };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, plan_active")
      .eq("id", user.id)
      .maybeSingle();

    return {
      user,
      // A genuine paying plan, not the free trial — see the matching note
      // in proxy.js.
      isSubscriber: profile?.plan_active === true && profile?.plan !== "trial",
    };
  } catch (err) {
    console.error("getCurrentUser failed:", err);
    return { user: null, isSubscriber: false };
  }
}
