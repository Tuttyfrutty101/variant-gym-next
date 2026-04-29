"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./Programs.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80";

const PROGRAM_ITEMS = [
  "Longevity (Vo2, strength, bone density)",
  "Muscle Building",
  "Weightloss",
  "Strength",
  "Women's Program",
  "Pilates X Strength",
  "Injury Rehab Program",
  "\"Pain\" Area-specific Program",
  "Surgery Preparation",
  "Travel Program",
  "Sport-specific",
  "65+ Men & Women Program",
  "Speed and Agility",
];

export default function Programs() {
  const [heroRef, heroVisible] = useInView();
  const [listRef, listVisible] = useInView();

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
        <Link href="/membership" className={styles.heroBack}>
          ← Back to membership
        </Link>
        <div className={styles.heroInner}>
          <h1 className={styles.heroMainTitle}>Programs</h1>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={listRef}
        className={`${styles.listSection} ${listVisible ? styles.listVisible : ""}`}
        aria-label="Programs"
      >
        <div className={styles.listInner}>
          <p className={styles.stat}>500+</p>
          <ul className={styles.programList}>
            {PROGRAM_ITEMS.map((item) => (
              <li key={item} className={styles.programItem}>
                {item}
              </li>
            ))}
            <li className={`${styles.programItem} ${styles.programMore}`}>
              + more
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
