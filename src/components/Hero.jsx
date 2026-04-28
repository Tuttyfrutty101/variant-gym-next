"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.bgLayer} aria-hidden>
        <div className={styles.bgImage} />
      </div>
      <div className={styles.overlay} aria-hidden />

      <div className={styles.inner}>
        <p className={styles.tag}>Santa Barbara&apos;s Premier Training Facility</p>

        <h1 className={styles.title}>Variant Training Lab</h1>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Schedule a Tour
          </a>
          <Link href="/training" className={styles.btnSecondary}>
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
