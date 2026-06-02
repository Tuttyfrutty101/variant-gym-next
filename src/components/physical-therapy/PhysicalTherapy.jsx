"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import PhysicalTherapyOfferings from "@/components/physical-therapy/PhysicalTherapyOfferings";
import PhysicalTherapyGallery from "@/components/physical-therapy/PhysicalTherapyGallery";
import { TREAT_EXPLAINED_VIDEO } from "@/data/siteVideos";
import styles from "./PhysicalTherapy.module.css";

const HERO_IMG = encodeURI(
  "/images/Screenshot 2026-05-23 at 6.45.37 PM.png",
);

const DETAIL_IMG = "/images/DSC02846.jpg";

export default function PhysicalTherapy() {
  const [heroRef, heroVisible] = useInView();
  const [detailRef, detailVisible] = useInView();
  const [videoRef, videoVisible] = useInView();

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
                alt="Dr. Jon Sakoda at Variant Training Lab"
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className={styles.detailsImage}
              />
            </div>
          </div>
          <div className={styles.detailsCopy}>
            <h2 id="pt-details-heading" className={styles.detailsHeading}>
              Meet Dr. Jon Sakoda
            </h2>
            <p className={styles.detailsLead}>
              Jon was born and raised on the beautiful southern shore of Oahu, and moved to Santa Barbara to attend
              Westmont College in 2005. He then completed his Doctor of Physical
              Therapy degree at Chapman University in 2013, underwent a year
              long residency through the USC/Kaiser didactic coursework and
              curriculum, and became an Orthopedic Clinical Specialist (OCS)
              shortly thereafter through the American Board of Physical Therapy
              Specialties (ABPTS). After finishing his studies, Jon moved back to
              Santa Barbara where he has been practicing physical therapy both
              at Variant Training Lab and at Hayashida/Sutter Physical Therapy
              for over a decade.
            </p>
            <p className={styles.detailsBody}>
              Jon has a passion for combining evidence based PT practices with
              movement analysis and training, helping people move well, feel
              well, and thrive in whatever their life demands. In today&apos;s
              world, physical therapy is most often utilized after a body tissue
              becomes painful. This approach is excellent for uncovering root
              causes of pain and finding permanent solutions. However, most
              people don&apos;t think to seek out PT when they are healthy and
              not in pain. A large part of Jon&apos;s focus at Variant Training
              Lab is injury prevention, which includes identifying movement
              dysfunction before problems occur. Physical Therapists are
              movement experts, and correctly and accurately identifying
              movement dysfunction plays a vital role in injury prevention.
            </p>
          </div>
        </div>
      </section>

      <PhysicalTherapyGallery />

      <PhysicalTherapyOfferings />

      <section
        ref={videoRef}
        className={`${styles.treatVideo} ${videoVisible ? styles.visible : ""}`}
        aria-label="Variant Treat explained"
      >
        <div className={styles.treatVideoInner}>
          <div className={styles.treatVideoFrame}>
            <video
              className={styles.treatVideoPlayer}
              controls
              playsInline
              preload="metadata"
              aria-label="Variant Treat explained"
            >
              <source src={TREAT_EXPLAINED_VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
