// lib/auth.js
//
// Reads the real Supabase session (server-side) and, if the visitor is a
// business owner, their business's live subscription_status — this is
// what actually gates Pro tutorials now, replacing the earlier stub that
// just read a raw cookie.

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, isSubscriber: false };
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("subscription_status")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  return {
    user,
    isSubscriber: business?.subscription_status === "active",
  };
}
