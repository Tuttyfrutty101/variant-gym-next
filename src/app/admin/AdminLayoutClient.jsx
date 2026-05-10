"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { AdminSnackbarProvider } from "./AdminSnackbarContext";
import styles from "./admin.module.css";

const LINKS = [
  { href: "/admin/hours", label: "Hours" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/schedule", label: "Class schedule" },
  { href: "/admin/promotion", label: "Promo block" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();

  return (
    <AdminSnackbarProvider>
      {pathname === "/admin/login" ? (
        <div className={styles.shellLogin}>{children}</div>
      ) : (
        <div className={styles.shell}>
          <header className={styles.header}>
            <Link href="/admin" className={styles.brand}>
              Variant · Admin
            </Link>
            <nav className={styles.nav} aria-label="Admin sections">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={pathname === l.href ? styles.navLinkActive : styles.navLink}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <SignOutButton />
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      )}
    </AdminSnackbarProvider>
  );
}

function SignOutButton() {
  return (
    <button
      type="button"
      className={styles.signOut}
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        window.location.assign("/admin/login");
      }}
    >
      Sign out
    </button>
  );
}
