"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Training", href: "/training" },
  { label: "Physical Therapy", href: "/physical-therapy" },
  { label: "Exclusive Amenities", href: "/exclusive-amenities" },
  { label: "Health", href: "/health" },
  { label: "Athletes", href: "/athletes" },
  { label: "Membership", href: "/membership" },
  { label: "Schedule", href: "/schedule" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setMenuOpen(false);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          VARIANT
          <span className={styles.logoAccent}> TRAINING LAB</span>
        </Link>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta} onClick={closeMenu}>
            Get Started
          </Link>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.srOnly}>
              {menuOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <span
              className={`${styles.menuIcon} ${menuOpen ? styles.menuIconOpen : ""}`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div
          className={styles.menuBackdrop}
          aria-hidden
          onClick={closeMenu}
        />
        <nav className={styles.menuNav} aria-label="Primary">
          <ul className={styles.menuList}>
            {NAV_LINKS.map(({ label, href }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.menuLink} ${active ? styles.menuLinkActive : ""}`}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
