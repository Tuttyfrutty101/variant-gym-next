"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { DRONE_HERO_VIDEO } from "@/data/siteVideos";
import styles from "./TrainingPageHero.module.css";

export default function TrainingPageHero() {
  const [ref, visible] = useInView();

  return (
    <header
      ref={ref}
      className={`${styles.hero} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.heroBg} aria-hidden>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={DRONE_HERO_VIDEO} type="video/mp4" />
        </video>
      </div>
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
