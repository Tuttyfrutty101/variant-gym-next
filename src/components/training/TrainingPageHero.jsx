"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./TrainingPageHero.module.css";

const HERO_IMG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80";

export default function TrainingPageHero() {
  const [ref, visible] = useInView();

  return (
    <header
      ref={ref}
      className={`${styles.hero} ${visible ? styles.visible : ""}`}
    >
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        aria-hidden
      />
      <div className={styles.heroOverlay} aria-hidden />
      <div className={styles.heroInner}>
        <h1 className={styles.heroMainTitle}>Training</h1>
        <p className={styles.heroSupport}>
          Raise the standard for how you move.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact" className={styles.ctaPrimary}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
