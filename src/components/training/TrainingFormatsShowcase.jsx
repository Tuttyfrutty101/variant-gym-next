"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { TRAINING_FORMATS } from "@/data/trainingFormats";
import styles from "./TrainingFormatsShowcase.module.css";

export default function TrainingFormatsShowcase() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="training-formats-heading"
    >
      <div className={styles.intro}>
        <p className={styles.introTag}>How you train here</p>
        <h2 id="training-formats-heading" className={styles.introTitle}>
          The Variant Difference
        </h2>
        <p className={styles.introBody}>
          Pick the format that fits your week, or blend them as your goals
          change. Each path is built to keep you progressing with clarity and
          support.
        </p>
      </div>

      <div className={styles.rows}>
        {TRAINING_FORMATS.map((format, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={format.id}
              id={format.id}
              className={`${styles.row} ${reverse ? styles.rowReverse : ""}`}
            >
              <div className={styles.visual}>
                <Image
                  src={format.image}
                  alt={format.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={styles.image}
                  priority={i === 0}
                />
              </div>
              <div className={styles.copy}>
                <p className={styles.num} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.title}>{format.title}</h3>
                <p className={styles.text}>{format.text}</p>
                {format.scheduleHref ? (
                  <p className={styles.scheduleWrap}>
                    <Link href={format.scheduleHref} className={styles.scheduleLink}>
                      See schedule
                    </Link>
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
