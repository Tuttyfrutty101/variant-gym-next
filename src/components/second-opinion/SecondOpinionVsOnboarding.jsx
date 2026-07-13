"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./SecondOpinionVsOnboarding.module.css";

const COLUMNS = [
  {
    id: "second-opinion",
    eyebrow: "Second Opinion Assessment",
    heading: "A taste of what we do.",
    body: "Designed for people who want real answers before making a commitment. One focused one-hour session with no membership required. You get objective data, a physical therapy read, and clear recommendations you can act on right away.",
    points: [
      "No membership required",
      "One-time, one-hour session",
      "Immediate data and feedback",
      "A clear path forward",
    ],
    cta: { label: "Request Pricing", modal: true },
    accent: true,
  },
  {
    id: "onboarding",
    eyebrow: "Member Onboarding",
    heading: "The full picture.",
    body: "When you join Variant, your onboarding goes deeper. A comprehensive battery of physiological and performance testing, full composition analysis, movement profiling, and a personalized program built to evolve with you over time.",
    points: [
      "Comprehensive testing battery",
      "Full physiological baseline",
      "Personalized long-term programming",
      "Ongoing data tracking and adjustments",
    ],
    cta: { label: "View Membership", href: "/membership" },
    accent: false,
  },
];

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 8l3.5 3.5L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SecondOpinionVsOnboarding() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="vs-onboarding-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.tag}>How It Compares</p>
          <h2 id="vs-onboarding-heading" className={styles.title}>
            Not a Membership. A Starting Point.
          </h2>
          <p className={styles.subtitle}>
            The Second Opinion Assessment is intentionally lighter than our
            member onboarding, built for people who want clarity before
            committing to anything.
          </p>
        </header>

        <div className={styles.cols}>
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className={`${styles.col} ${col.accent ? styles.colAccent : ""}`}
            >
              <p className={styles.colEyebrow}>{col.eyebrow}</p>
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <p className={styles.colBody}>{col.body}</p>
              <ul className={styles.pointList}>
                {col.points.map((p) => (
                  <li key={p} className={styles.pointItem}>
                    <CheckIcon />
                    {p}
                  </li>
                ))}
              </ul>
              {col.cta.modal ? (
                <button
                  type="button"
                  className={`${styles.cta} ${col.accent ? styles.ctaAccent : styles.ctaOutline}`}
                  onClick={() => window.dispatchEvent(new Event("open-so-modal"))}
                >
                  {col.cta.label}
                </button>
              ) : (
                <Link
                  href={col.cta.href}
                  className={`${styles.cta} ${col.accent ? styles.ctaAccent : styles.ctaOutline}`}
                >
                  {col.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
