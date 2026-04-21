"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Methodology", href: "#methodology" },
  { label: "Recovery", href: "#recovery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          VARIANT
          <span className={styles.logoAccent}> TRAINING LAB</span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.cta}>
          Get Started
        </a>
      </div>
    </header>
  );
}
