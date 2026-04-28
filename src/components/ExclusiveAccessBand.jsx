"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./ExclusiveAccessBand.module.css";

export default function ExclusiveAccessBand() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-label="Digital membership benefits"
    >
      <p className={styles.text}>
        Get exclusive access to 1000+ exercises, personalized programs,
        nutrition, and travel programs.
      </p>
    </section>
  );
}
