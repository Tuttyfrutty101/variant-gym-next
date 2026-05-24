"use client";

import { TYLER_BOYD_VIDEO } from "@/data/athletesPrograms";
import { useInView } from "@/hooks/useInView";
import styles from "./AthletesProSportVideo.module.css";

export default function AthletesProSportVideo() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="pro-sport-teams"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="pro-sport-teams-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Pro Sport &amp; Teams</p>
          <h2 id="pro-sport-teams-heading" className={styles.heading}>
            Tyler Boyd
          </h2>
          <p className={styles.lede}>
            Professional athlete training at Variant Training Lab — performance,
            preparation, and recovery built for the demands of elite sport.
          </p>
        </header>
        <div className={styles.videoFrame}>
          <video
            className={styles.video}
            controls
            playsInline
            preload="metadata"
            aria-label="Tyler Boyd professional athlete feature at Variant Training Lab"
          >
            <source src={TYLER_BOYD_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
