"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./SecondOpinionHero.module.css";

const HERO_IMG = "/images/DSC02393.jpg";

export default function SecondOpinionHero() {
  const [heroRef, heroVisible] = useInView();
  const [bodyRef, bodyVisible] = useInView();

  return (
    <>
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.visible : ""}`}
      >
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_IMG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.tag}>Second Opinion</p>
          <h1 className={styles.headline}>
            You&apos;ve Tried Everything. Now Find Out Why It Isn&apos;t Working.
          </h1>
          <p className={styles.support}>
            Most people don&apos;t need another workout. They need answers.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.cta}>
              Request Second Opinion Assessment
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={bodyRef}
        className={`${styles.body} ${bodyVisible ? styles.bodyVisible : ""}`}
        aria-label="About the second opinion program"
      >
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>
            At Variant, our Test Treat Train system combines advanced performance
            testing, physical therapy insight, recovery modalities, and
            personalized coaching to uncover what&apos;s holding you back and
            build a plan that delivers measurable results.
          </p>
        </div>
      </section>
    </>
  );
}
