// lib/supabase/client.js
//
// For use inside "use client" components only (e.g. reading the current
// session client-side). Server Components and API routes should use
// server.js / admin.js instead.
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
