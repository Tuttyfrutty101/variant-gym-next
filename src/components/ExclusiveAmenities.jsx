"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./ExclusiveAmenities.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=80";

const HIGHLIGHTS = [
  {
    title: "Premium locker rooms",
    text: "Spacious suites, secure storage, and calm arrivals — every visit feels considered.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf45?w=900&q=80",
    imageAlt: "Premium locker room benches and wood lockers",
  },
  {
    title: "Cold plunge",
    text: "Contrast-ready pools to reset tissues, sharpen recovery, and complement hard training.",
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
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    imageAlt: "Clinical wellness treatment setting",
  },
  {
    title: "Hyperbaric oxygen",
    text: "60-90 minute Pressurized oxygen sessions designed to aid recovery, sleep, and energy.",
    image: "/images/hyperbarix.jpg",
    imageAlt: "Hyperbaric oxygen therapy chamber",
  },
  {
    title: "And more",
    text: "Towel service, hydration bar, premium showers, lounge space, and concierge support — details that stay out of your way.",
    image:
      "https://images.unsplash.com/photo-1497366216548-375260702974?w=900&q=80",
    imageAlt: "Bright modern lounge with seating",
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
            Our recovery services deliver spa-like care that feels luxurious, calming,
            and intentionally designed to help your body reset, restore, and feel its best.
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
            What membership unlocks
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
