"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./SpringPromo.module.css";

export default function SpringPromo() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="spring-offer"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="spring-offer-heading"
    >
      <div className={styles.inner}>
        <p className={styles.badge}>Limited time · Spring</p>
        <h2 id="spring-offer-heading" className={styles.title}>
          Spring membership offer
        </h2>
        <p className={styles.body}>
          Join before Memorial Day and we&apos;ll waive your enrollment fee,
          plus include two guest passes so you can train with a partner on us.
        </p>
        <p className={styles.finePrint}>
          Offer valid for new memberships through May 26, 2026. Not combinable
          with other promotions.
        </p>
        <Link href="#contact" className={styles.cta}>
          Claim this offer
        </Link>
      </div>
    </section>
  );
}
