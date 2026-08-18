"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      "An in-house session with Dr. Jon Sakoda, one of Santa Barbara's leading physical therapists, covering your injury history, movement limitations, pain patterns, and physical baseline. We identify root causes, not just symptoms.",
    primary: true,
    image: {
      src: "/images/DSC02333.jpg",
      alt: "Dr. Jon Sakoda assessing a client's shoulder mobility during a physical therapy consultation",
    },
  },
  {
    id: "strength",
    duration: "30",
    unit: "min",
    label: "Part Two",
    title: "Strength, Movement & Data Review",
    description:
      "A targeted screen of your functional movement and strength capacity followed by immediate feedback on your results. We walk through what the data means and outline a clear path forward so you leave with answers, not more questions.",
    image: {
      src: "/images/DSC02587.jpg",
      alt: "A client performing a strength test on VALD ForceFrame equipment with results displayed on a tablet",
    },
  },
];

const EXPECT_ITEMS = [
  {
    id: "consult",
    title: "1-on-1 Consultation",
    tagline: "Every assessment starts with a conversation.",
    body: "We'll discuss your training history, injuries, current routine, and goals. We'll also identify what's been holding you back so we can build a plan that's tailored specifically to you.",
  },
  {
    id: "composition",
    title: "Body Composition Assessment",
    tagline: "Looking beyond the number on the scale.",
    body: "Measure muscle mass, body fat, hydration, and muscle balance to establish an accurate baseline. This gives us objective data to guide your training and accurately track your progress.",
  },
  {
    id: "strength-movement",
    title: "Strength & Movement Assessment",
    tagline: "Find out what's really holding you back.",
    body: [
      "Using VALD ForceFrame technology, we objectively assess strength, symmetry, balance, and movement quality to identify areas that could be limiting your progress or increasing your injury risk.",
      "Whether your goal is to stay active, build strength, recover from injury, or improve performance, we'll show you exactly where to focus.",
    ],
  },
  {
    id: "discover",
    title: "What We Often Discover",
    tagline: "Every person is different, but common findings include:",
    bullets: [
      "Balance and stability",
      "Mobility and flexibility",
      "Muscle imbalances and left-to-right symmetry",
      "Posture and movement quality",
      "Core strength and control",
      "Whether your training suits your body type and goals",
      "Signs of doing too much, too soon",
      "Recovery and rehabilitation priorities",
      "Areas where small changes can make a big difference",
    ],
  },
  {
    id: "plan",
    title: "Your Personal Plan",
    tagline: "You won't leave with more questions—you'll leave with a clear plan.",
    body: "You'll leave with a clear understanding of:",
    bullets: [
      "What's holding you back",
      "Where to focus your training",
      "How to train safely and effectively",
      "The next steps to achieve your goals",
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
        {item.tagline && <p className={styles.accordionTagline}>{item.tagline}</p>}
        {item.body &&
          (Array.isArray(item.body) ? (
            item.body.map((paragraph) => (
              <p key={paragraph} className={styles.accordionText}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className={styles.accordionText}>{item.body}</p>
          ))}
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
          A Complete Movement & Strength Assessment in One Hour
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
            className={`${styles.segRow} ${i % 2 === 1 ? styles.segRowReverse : ""}`}
            style={{ "--delay": `${i * 0.12}s` }}
          >
            <div className={styles.segImageWrap}>
              <Image
                src={seg.image.src}
                alt={seg.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 340px"
                className={styles.segImage}
              />
            </div>
            <div className={`${styles.segCard} ${seg.primary ? styles.segCardPrimary : ""}`}>
              <p className={styles.segLabel}>{seg.label}</p>
              <div className={styles.segDuration}>
                <span className={styles.segDurationNum}>{seg.duration}</span>
                <span className={styles.segDurationUnit}>{seg.unit}</span>
              </div>
              <h3 className={styles.segTitle}>{seg.title}</h3>
              <p className={styles.segDesc}>{seg.description}</p>
              {seg.id === "pt" && (
                <p className={styles.segCredibility}>
                  Led by{" "}
                  <Link href="/physical-therapy" className={styles.segCredibilityLink}>
                    Dr. Jon Sakoda, DPT, OCS
                  </Link>
                  , board-certified in orthopedic physical therapy.
                </p>
              )}
            </div>
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
