"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="philosophy-heading"
    >
      <div className={styles.inner}>
        <h2 id="philosophy-heading" className={styles.heading}>
          One Life. One Membership.
        </h2>
        <p className={styles.body}>
          Unlimited Open Training, flexible 1:1 &amp; small group privates, and
          amenities to relax and rejuvenate. A fresh new standard of health and
          wellness.
        </p>
        <Link href="/membership" className={styles.cta}>
          Explore Membership
        </Link>
      </div>
    </section>
  );
}
