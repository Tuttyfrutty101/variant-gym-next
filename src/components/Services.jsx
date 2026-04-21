"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./Services.module.css";

const CARDS = [
  {
    symbol: "◆",
    title: "Performance Training",
    text: "Small group privates, open training, HIIT classes, and concierge coaching designed around your schedule and goals.",
  },
  {
    symbol: "✦",
    title: "Health & Prevention",
    text: "In-house physical therapy, injury prevention, medical consultations, nutrition guidance, and longevity testing.",
  },
  {
    symbol: "◎",
    title: "Athlete Programs",
    text: "Pro sport partnerships, athlete performance profiles, sport-specific injury protocols, and competition game plans.",
  },
  {
    symbol: "▲",
    title: "Recovery Suite",
    text: "Hyperbaric oxygen therapy, red light therapy, contrast therapy, infrared sauna, cold plunge, and compression.",
  },
];

export default function Services() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="services"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="services-heading"
    >
      <header className={styles.header}>
        <p className={styles.tag}>Services</p>
        <h2 id="services-heading" className={styles.title}>
          Train Smarter. Recover Faster.
        </h2>
        <p className={styles.subtitle}>
          From performance coaching to clinical recovery — one team, one plan,
          aligned with your goals.
        </p>
      </header>

      <div className={styles.grid}>
        {CARDS.map((card) => (
          <article key={card.title} className={styles.card}>
            <span className={styles.symbol} aria-hidden>
              {card.symbol}
            </span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
