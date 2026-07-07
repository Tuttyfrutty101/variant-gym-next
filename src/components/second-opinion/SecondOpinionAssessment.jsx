"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./SecondOpinionAssessment.module.css";

const SEGMENTS = [
  {
    id: "pt",
    duration: "30",
    unit: "min",
    label: "Part One",
    title: "Physical Therapy Consultation & Assessment",
    description:
      "An in-house session with Dr. Jon Sakoda covering your injury history, movement limitations, pain patterns, and physical baseline. We identify root causes, not just symptoms.",
    primary: true,
  },
  {
    id: "strength",
    duration: "30",
    unit: "min",
    label: "Part Two",
    title: "Strength, Movement & Data Review",
    description:
      "A targeted screen of your functional movement and strength capacity followed by immediate feedback on your results. We walk through what the data means and outline a clear path forward so you leave with answers, not more questions.",
  },
];

const EXPECT_ITEMS = [
  {
    id: "consult",
    title: "1-on-1 Consultation with Your Trainer",
    body: "A dedicated conversation about your training history, current habits, goals, and what hasn't been working. We map where you are before prescribing where to go.",
  },
  {
    id: "inbody",
    title: "Composition Scan",
    body: "Precise body composition data covering muscle mass, fat distribution, hydration, and segmental balance, giving us a metabolic and structural baseline to work from.",
  },
  {
    id: "vald",
    title: "Strength Testing and Movement Screen on VALD ForceFrame Equipment",
    body: "Clinical-grade force measurement to objectively assess muscle output, bilateral symmetry, and strength ratios. The movement screen goes a step further, identifying where your body breaks down under load so we can pinpoint exactly what to train. Whether your goal is to perform better in a sport or stay strong and capable as you age, this tells us where to focus.",
  },
  {
    id: "tests",
    title: "Sample Tests and What You Might Discover",
    bullets: [
      "Shoulder health and rotator cuff function",
      "Leg asymmetry and single-leg strength deficits",
      "Posture analysis with clear corrective guidelines",
      "Hip mobility and stability under load",
      "Core stability and spinal control",
    ],
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.accordionItem} ${open ? styles.accordionItemOpen : ""}`}>
      <button
        type="button"
        className={styles.accordionTrigger}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.accordionTitle}>{item.title}</span>
        <ChevronIcon open={open} />
      </button>
      <div className={styles.accordionBody} aria-hidden={!open}>
        {item.body && <p className={styles.accordionText}>{item.body}</p>}
        {item.bullets && (
          <ul className={styles.bulletList}>
            {item.bullets.map((b) => (
              <li key={b} className={styles.bulletItem}>
                <span className={styles.bulletDot} aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SecondOpinionAssessment() {
  const [headerRef, headerVisible] = useInView();
  const [segRef, segVisible] = useInView();
  const [expectRef, expectVisible] = useInView();

  return (
    <section
      className={styles.section}
      aria-labelledby="assessment-heading"
    >
      <div
        ref={headerRef}
        className={`${styles.header} ${headerVisible ? styles.visible : ""}`}
      >
        <p className={styles.tag}>Second Opinion Assessment</p>
        <h2 id="assessment-heading" className={styles.title}>
          A Complete Picture in One Hour
        </h2>
        <p className={styles.subtitle}>
          Every assessment is tailored to your goals and current training.
          You leave with clarity, not a generic plan.
        </p>
      </div>

      <div
        ref={segRef}
        className={`${styles.segments} ${segVisible ? styles.visible : ""}`}
      >
        {SEGMENTS.map((seg, i) => (
          <div
            key={seg.id}
            className={`${styles.segCard} ${seg.primary ? styles.segCardPrimary : ""}`}
            style={{ "--delay": `${i * 0.12}s` }}
          >
            <p className={styles.segLabel}>{seg.label}</p>
            <div className={styles.segDuration}>
              <span className={styles.segDurationNum}>{seg.duration}</span>
              <span className={styles.segDurationUnit}>{seg.unit}</span>
            </div>
            <h3 className={styles.segTitle}>{seg.title}</h3>
            <p className={styles.segDesc}>{seg.description}</p>
          </div>
        ))}
      </div>

      <p className={styles.varianceNote}>
        Tests and screens vary based on individual goals and current training history.
      </p>

      <div
        ref={expectRef}
        className={`${styles.expectWrap} ${expectVisible ? styles.visible : ""}`}
        aria-label="What to expect"
      >
        <p className={styles.expectLabel}>What to Expect</p>
        <div className={styles.accordion}>
          {EXPECT_ITEMS.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
