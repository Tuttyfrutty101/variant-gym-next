"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showSnackbar } = useAdminSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const errParam = searchParams.get("error");
  const nextPath = searchParams.get("next") || "/admin";
  const forbiddenSnackShown = useRef(false);

  useEffect(() => {
    if (errParam !== "forbidden" || forbiddenSnackShown.current) return;
    forbiddenSnackShown.current = true;
    showSnackbar(
      "You are not in the admin allowlist. Ask a project owner to add your user ID to admin_users in Supabase.",
      { variant: "error" },
    );
  }, [errParam, showSnackbar]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signErr) {
        showSnackbar(signErr.message, { variant: "error" });
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        showSnackbar("Could not load session.", { variant: "error" });
        return;
      }
      const { data: row } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!row) {
        await supabase.auth.signOut();
        showSnackbar("This account is not authorized for admin access.", {
          variant: "error",
        });
        return;
      }
      router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.loginTitle}>Admin sign in</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className={styles.input}
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className={styles.input}
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
