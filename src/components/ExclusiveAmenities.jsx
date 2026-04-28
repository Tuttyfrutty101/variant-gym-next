"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./ExclusiveAmenities.module.css";

const ITEMS = [
  {
    symbol: "◇",
    title: "Private Locker Lounge",
    text: "Spacious, secure storage and a calm arrival experience every time you train.",
  },
  {
    symbol: "◆",
    title: "Premium Shower Suites",
    text: "Spa-quality finishes and amenities so you can refresh before heading back to your day.",
  },
  {
    symbol: "✦",
    title: "Towel & Essentials Service",
    text: "Complimentary towels and curated essentials so you can travel light and stay focused.",
  },
  {
    symbol: "◎",
    title: "Member Lounge",
    text: "A quiet place to connect, take calls, or unwind between sessions and recovery work.",
  },
  {
    symbol: "○",
    title: "Hydration & Nourishment Bar",
    text: "Thoughtfully stocked refreshments to support training, recovery, and busy schedules.",
  },
  {
    symbol: "△",
    title: "Concierge Support",
    text: "Our team helps coordinate scheduling, services, and questions — membership without friction.",
  },
];

export default function ExclusiveAmenities() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="exclusive-amenities"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="amenities-heading"
    >
      <header className={styles.header}>
        <h2 id="amenities-heading" className={styles.headerTitle}>
          Details That Define the Experience
        </h2>
      </header>

      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <article key={item.title} className={styles.tile}>
            <span className={styles.symbol} aria-hidden>
              {item.symbol}
            </span>
            <h3 className={styles.tileTitle}>{item.title}</h3>
            <p className={styles.tileBody}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
