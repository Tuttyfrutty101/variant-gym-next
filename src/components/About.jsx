"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import styles from "./About.module.css";

const IMG =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80";

export default function About() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="about"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="about-heading"
    >
      <div className={styles.grid}>
        <div className={styles.visual}>
          <span className={styles.frame} aria-hidden />
          <div className={styles.imageWrap}>
            <Image
              src={IMG}
              alt="Training facility interior"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className={styles.image}
              priority={false}
            />
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.tag}>Welcome to Variant</p>
          <h2 id="about-heading" className={styles.heading}>
            Where Science Meets Strength
          </h2>
          <p className={styles.text}>
            Variant Training Lab is a multidisciplinary performance facility on
            State Street in Santa Barbara, trusted by professional athletes and
            anyone dedicated to living an active, healthy life.
          </p>
          <div className={styles.divider} aria-hidden />
          <p className={styles.text}>
            Our integrative team of medical clinicians, movement scientists, and
            performance coaches use real-time data to develop a unique,
            individualized approach to your training — not a cookie-cutter
            program designed for people like you, but one built specifically for
            you.
          </p>
        </div>
      </div>
    </section>
  );
}
