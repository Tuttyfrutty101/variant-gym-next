"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

const HERO_VIDEO_MP4 = "/videos/homepage-banner.mp4";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.bgLayer} aria-hidden>
        <video
          className={styles.bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
      </div>

      <div className={styles.inner}>
        <p className={styles.tag}>Santa Barbara&apos;s Premier Training Facility</p>

        <h1 className={styles.title}>Variant Training Lab</h1>

        <p className={styles.strapline}>One Life. One Membership.</p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Schedule a Tour
          </a>
          <Link href="/membership" className={styles.btnSecondary}>
            Explore Membership
          </Link>
        </div>
      </div>
    </section>
  );
}
