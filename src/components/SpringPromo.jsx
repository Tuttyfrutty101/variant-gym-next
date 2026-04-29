"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./SpringPromo.module.css";

export default function SpringPromo({ promotion }) {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="spring-offer"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="spring-offer-heading"
    >
      <div className={styles.inner}>
        <p className={styles.badge}>{promotion.badge}</p>
        <h2 id="spring-offer-heading" className={styles.title}>
          {promotion.title}
        </h2>
        <p className={styles.body}>{promotion.body}</p>
        <p className={styles.finePrint}>{promotion.finePrint}</p>
        <Link href="#contact" className={styles.cta}>
          {promotion.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
