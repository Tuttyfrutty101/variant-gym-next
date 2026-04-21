"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./Recovery.module.css";

const ITEMS = [
  {
    symbol: "○",
    title: "Hyperbaric Oxygen",
    text: "Boost oxygen delivery to accelerate healing, reduce inflammation, and sharpen recovery between sessions.",
  },
  {
    symbol: "◐",
    title: "Red Light Therapy",
    text: "Support tissue repair and cellular energy so you bounce back faster from intense training blocks.",
  },
  {
    symbol: "◑",
    title: "Contrast Therapy",
    text: "Alternate hot and cold exposure to improve circulation, mobility, and systemic resilience.",
  },
  {
    symbol: "△",
    title: "Infrared Sauna",
    text: "Deep heat therapy to relax muscles, promote detoxification, and unwind after demanding workouts.",
  },
  {
    symbol: "◇",
    title: "Cold Plunge",
    text: "Controlled cold exposure to reduce soreness, elevate mood, and reinforce consistent recovery habits.",
  },
  {
    symbol: "▽",
    title: "Compression",
    text: "Dynamic compression to flush metabolic waste and support lower-body recovery after heavy volume.",
  },
];

export default function Recovery() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="recovery"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="recovery-heading"
    >
      <header className={styles.header}>
        <h2 id="recovery-heading" className={styles.headerTitle}>
          Recharge. Restore. Repeat.
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
