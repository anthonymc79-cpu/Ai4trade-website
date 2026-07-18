// lib/supabase/admin.js
//
// Service-role client — bypasses RLS entirely. Only ever import this
// inside Route Handlers (app/api/**) or other server-only code, NEVER in
// a Client Component or anything shipped to the browser. The service role
// key must stay a server-only environment variable (no NEXT_PUBLIC_ prefix).

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
