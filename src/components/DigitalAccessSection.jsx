import Link from "next/link";
import styles from "./DigitalAccessSection.module.css";

const VIDEO_SRC = "/videos/download.mp4";

export default function DigitalAccessSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="digital-access-heading"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Digital access</p>
          <h2 id="digital-access-heading" className={styles.heading}>
            1,000+ exercises &amp; programs wherever you train
          </h2>
          <p className={styles.lede}>
            Members get our full movement library, personalized programming,
            nutrition guidance, and travel workouts—included with your
            membership.
          </p>
          <Link href="/programs" className={styles.cta}>
            Explore programs
          </Link>
        </div>

        <div className={styles.media}>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Demo of the Variant digital training app"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
