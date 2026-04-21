"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./Testimonial.module.css";

export default function Testimonial() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-label="Client testimonial"
    >
      <div className={styles.inner}>
        <p className={styles.quoteMark} aria-hidden>
          “
        </p>
        <blockquote className={styles.quote}>
          Balancing home and work life with training can be challenging, but
          the team at Variant makes sure my workouts are efficient and
          effective. They&apos;ve helped me perform at my best in every part of
          my life.
        </blockquote>
        <p className={styles.cite}>
          <strong>Dr. Sean Shafi</strong>, UCLA Health
        </p>
      </div>
    </section>
  );
}
