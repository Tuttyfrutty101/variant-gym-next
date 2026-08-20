"use client";

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
            You&apos;ve tried everything. Now find out why it isn&apos;t working.
          </h1>
          <p className={styles.support}>
            90 minutes. Objective data. A clear answer. No membership required.
          </p>
          <div className={styles.actions}>
            {/* CTA copy options — pick one, current text left unchanged pending your call:
                1. "Get My Data-Driven Assessment"
                2. "See What My Data Shows"
                3. "Start My Second Opinion" */}
            <button
              type="button"
              className={styles.cta}
              onClick={() => window.dispatchEvent(new Event("open-so-modal"))}
            >
              Request Second Opinion Assessment
            </button>
          </div>
          <p className={styles.priceLine}>$499 · Santa Barbara</p>
        </div>
      </header>

      <section
        ref={bodyRef}
        className={`${styles.body} ${bodyVisible ? styles.bodyVisible : ""}`}
        aria-label="About the second opinion program"
      >
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>
            Most people don&apos;t need another workout. They need answers.
          </p>
          <p className={styles.bodyText}>
            Maybe it&apos;s a shoulder, knee, or back issue that flares up and
            never quite resolves. Maybe you&apos;ve been to every boutique
            class and bootcamp Santa Barbara has to offer and you&apos;re
            still not seeing the changes you want. Either way, you don&apos;t
            need to guess anymore.
          </p>
          <p className={styles.bodyText}>
            At Variant, our Test Treat Train system combines advanced performance
            testing, physical therapy insight, recovery modalities, and
            personalized coaching to uncover what&apos;s holding you back and
            build a plan that delivers measurable results. Every Second Opinion
            Assessment includes a full functional movement assessment, giving
            you an objective look at how your body actually moves.
          </p>
        </div>
      </section>
    </>
  );
}
