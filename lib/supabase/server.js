// lib/supabase/server.js
//
// Reads/writes the Supabase auth session using cookies, for use in Server
// Components and Route Handlers. The cookie domain is set to the bare
// root domain (".yourdomain.com") rather than left to default to the
// current host — that's what lets a session created here (on
// www.yourdomain.com) be read by app.yourdomain.com, and vice versa,
// without a separate SSO step. Requires both sites to be under the same
// root domain and to use the same Supabase project.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const COOKIE_DOMAIN = process.env.AUTH_COOKIE_DOMAIN || undefined; // e.g. ".yourdomain.com"

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              domain: COOKIE_DOMAIN,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          } catch {
            // Server Components can't set cookies — safe to ignore here,
            // since the actual set happens in a Route Handler / action.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({
              name,
              value: "",
              ...options,
              domain: COOKIE_DOMAIN,
              maxAge: 0,
            });
          } catch {
            // See note above.
          }
        },
      },
    }
  );
}
