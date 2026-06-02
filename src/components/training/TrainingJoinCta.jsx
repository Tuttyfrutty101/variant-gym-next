"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./TrainingJoinCta.module.css";

export default function TrainingJoinCta() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.band} ${visible ? styles.visible : ""}`}
      aria-labelledby="training-join-heading"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Membership</p>
        <h2 id="training-join-heading" className={styles.title}>
          Join Now
        </h2>
        <p className={styles.lede}>
          Start with testing, coaching, and recovery built in. Your first week is
          designed to set the foundation for everything that follows.
        </p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>
            Get started
          </Link>
          <Link href="/membership" className={styles.secondary}>
            View membership
          </Link>
        </div>
      </div>
    </section>
  );
}
