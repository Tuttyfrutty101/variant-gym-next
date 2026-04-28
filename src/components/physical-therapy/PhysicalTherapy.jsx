"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./PhysicalTherapy.module.css";

const HERO_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&q=80";

const DETAIL_IMG =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80";

export default function PhysicalTherapy() {
  const [heroRef, heroVisible] = useInView();
  const [detailRef, detailVisible] = useInView();

  return (
    <>
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.visible : ""}`}
      >
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_IMG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroMainTitle}>Physical Therapy</h1>
          <div
            className={styles.heroIdeas}
            role="group"
            aria-label="Membership benefits"
          >
            <p className={styles.heroIdeaLine}>No wait times.</p>
            <p className={styles.heroIdeaLine}>Included in membership.</p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={detailRef}
        className={`${styles.details} ${detailVisible ? styles.visible : ""}`}
        aria-labelledby="pt-details-heading"
      >
        <div className={styles.detailsGrid}>
          <div className={styles.detailsVisual}>
            <span className={styles.detailsFrame} aria-hidden />
            <div className={styles.detailsImageWrap}>
              <Image
                src={DETAIL_IMG}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className={styles.detailsImage}
              />
            </div>
          </div>
          <div className={styles.detailsCopy}>
            <h2 id="pt-details-heading" className={styles.detailsHeading}>
              Care that stays in motion with you
            </h2>
            <p className={styles.detailsLead}>
              Injury rehab, prevention, and performance support — coordinated
              with your coaches and tracked like everything else at Variant.
            </p>
            <ul className={styles.bullets}>
              <li>
                <strong>No external queues</strong> — book directly through your
                membership team.
              </li>
              <li>
                <strong>Integrated sessions</strong> — therapy notes feed your
                training plan, not a separate folder.
              </li>
              <li>
                <strong>Transparent continuity</strong> — same facility, same
                standards, from assessment back to the floor.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
