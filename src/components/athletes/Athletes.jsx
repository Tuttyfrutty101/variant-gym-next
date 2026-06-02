"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import AthletesOfferings from "@/components/athletes/AthletesOfferings";
import AthletesProSportVideo from "@/components/athletes/AthletesProSportVideo";
import styles from "./Athletes.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800&q=80";

export default function Athletes() {
  const [heroRef, heroVisible] = useInView();

  return (
    <>
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.heroVisible : ""}`}
      >
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroMainTitle}>Athletes</h1>
          <p className={styles.heroSupport}>
            Offering sport and position specific programs designed to reach
            one&apos;s highest potential. Supports injury prevention while
            enhancing performance tailored to individual goals.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <AthletesOfferings />

      <AthletesProSportVideo />
    </>
  );
}
