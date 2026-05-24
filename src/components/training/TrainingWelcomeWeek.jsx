"use client";

import Image from "next/image";
import Link from "next/link";
import {
  WELCOME_WEEK_INTRO,
  WELCOME_WEEK_PHASES,
} from "@/data/trainingWelcomeWeek";
import { useInView } from "@/hooks/useInView";
import styles from "./TrainingWelcomeWeek.module.css";

function PhaseCard({ phase, index }) {
  const [ref, visible] = useInView({ threshold: 0.12 });
  const reverse = index % 2 === 1;

  return (
    <li
      ref={ref}
      id={phase.id}
      className={`${styles.phase} ${reverse ? styles.phaseReverse : ""} ${visible ? styles.phaseVisible : ""}`}
    >
      <div className={styles.phaseMarkerCol} aria-hidden>
        <span className={styles.phaseStep}>{phase.step}</span>
        <span className={styles.phaseLine} />
      </div>

      <article className={styles.phaseCard}>
        <header className={styles.phaseHeader}>
          <h3 className={styles.phaseTitle}>{phase.title}</h3>
        </header>

        {phase.paragraphs.map((text) => (
          <p key={text.slice(0, 48)} className={styles.phaseBody}>
            {text}
          </p>
        ))}

        {phase.goals ? (
          <div className={styles.goalsBlock}>
            <p className={styles.goalsHeading}>{phase.goalsHeading}</p>
            <ul className={styles.goalsList}>
              {phase.goals.map((goal) => (
                <li key={goal} className={styles.goalsItem}>
                  <span className={styles.goalsCheck} aria-hidden>
                    ✓
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {phase.cta ? (
          <div className={styles.phaseCtaWrap}>
            <Link href={phase.cta.href} className={styles.phaseCta}>
              {phase.cta.label}
            </Link>
          </div>
        ) : null}
      </article>

      {phase.image ? (
        <div className={styles.phaseVisual}>
          <div className={styles.phaseImageFrame}>
            <Image
              src={phase.image}
              alt={phase.imageAlt ?? ""}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className={styles.phaseImage}
            />
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default function TrainingWelcomeWeek() {
  const [headerRef, headerVisible] = useInView();

  return (
    <section
      id="welcome-week"
      className={styles.section}
      aria-labelledby="welcome-week-heading"
    >
      <header
        ref={headerRef}
        className={`${styles.header} ${headerVisible ? styles.headerVisible : ""}`}
      >
        <p className={styles.eyebrow}>Onboarding</p>
        <h2 id="welcome-week-heading" className={styles.title}>
          Welcome Week
        </h2>
        <p className={styles.lede}>{WELCOME_WEEK_INTRO}</p>
      </header>

      <ol className={styles.timeline} aria-label="Welcome week phases">
        {WELCOME_WEEK_PHASES.map((phase, index) => (
          <PhaseCard key={phase.id} phase={phase} index={index} />
        ))}
      </ol>
    </section>
  );
}
