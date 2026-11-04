import { createClient } from "@supabase/supabase-js";

/** Server-only client. The service role key bypasses RLS and must never be sent to the browser. */
export function createSupabaseServiceClient(logPrefix) {
  const url =
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : null;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;

  if (!url) {
    console.error(`${logPrefix} Missing NEXT_PUBLIC_SUPABASE_URL`);
    return null;
  }
  if (!serviceRoleKey) {
    console.error(`${logPrefix} Missing SUPABASE_SERVICE_ROLE_KEY`);
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
