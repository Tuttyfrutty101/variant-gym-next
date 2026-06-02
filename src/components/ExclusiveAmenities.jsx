"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./ExclusiveAmenities.module.css";

const HERO_BG = "/images/sauna.jpg";

const HIGHLIGHTS = [
  {
    title: "Premium locker room",
    text: "Spacious suites, secure storage, and calm arrivals. Every visit feels considered.",
    image: "/images/IMG_2686.jpeg",
    imageAlt: "Premium locker room at Variant Training Lab",
  },
  {
    title: "Cold plunge",
    text: "Contrast ready pools to reset tissues, sharpen recovery, and complement hard training.",
    image: "/images/cold%20plunge.png",
    imageAlt: "Cold plunge pool",
  },
  {
    title: "Infrared sauna",
    text: "Private sessions for circulation and relaxation between trainings.",
    image: "/images/sauna.jpg",
    imageAlt: "Infrared sauna interior",
  },
  {
    title: "Red light therapy",
    text: "Boost collagen, reduce pain and inflammation in joints and muscles.",
    image: "/images/jasdkjfhksaljdhf.jpeg",
    imageAlt: "Clinical wellness treatment setting",
  },
  {
    title: "And more",
    text: "Towel service, hydration bar, premium showers, lounge space, and concierge support. Details that stay out of your way.",
    image: encodeURI("/images/Screenshot 2026-05-23 at 7.09.40 PM.png"),
    imageAlt: "Variant Training Lab lounge and amenities",
  },
];

export default function ExclusiveAmenities() {
  const [heroRef, heroVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <>
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.heroVisible : ""}`}
      >
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroMainTitle}>Exclusive amenities</h1>
          <p className={styles.heroSupport}>
            Discover private recovery services designed to help your body reset,
            restore, and feel its best.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={gridRef}
        id="exclusive-amenities"
        className={`${styles.section} ${gridVisible ? styles.sectionVisible : ""}`}
        aria-labelledby="amenities-heading"
      >
        <div className={styles.sectionInner}>
          <h2 id="amenities-heading" className={styles.sectionHeading}>
            Included Monthly
          </h2>
          <div className={styles.grid}>
            {HIGHLIGHTS.map((item) => (
              <article key={item.title} className={styles.tile}>
                <div className={styles.tileMedia}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 539px) 100vw, (max-width: 899px) 50vw, 33vw"
                    className={styles.tileImage}
                  />
                </div>
                <div className={styles.tileContent}>
                  <h3 className={styles.tileTitle}>{item.title}</h3>
                  <p className={styles.tileBody}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
