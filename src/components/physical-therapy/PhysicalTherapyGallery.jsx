"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PT_GALLERY_PHOTOS } from "@/data/physicalTherapyGallery";
import { useInView } from "@/hooks/useInView";
import styles from "./PhysicalTherapyGallery.module.css";

const AUTO_MS = 5500;

function PrevIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M14 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M10 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PhysicalTherapyGallery() {
  const photos = PT_GALLERY_PHOTOS;
  const n = photos.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [restartSignal, setRestartSignal] = useState(0);
  const [ref, visible] = useInView();

  const safeIndex = Math.min(activeIndex, n - 1);

  const bumpAutoAdvance = useCallback(() => {
    setRestartSignal((s) => s + 1);
  }, []);

  useEffect(() => {
    if (n <= 1) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setActiveIndex((i) => (Math.min(i, n - 1) + 1) % n);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [n, restartSignal]);

  const goPrev = () => {
    setActiveIndex((i) => (Math.min(i, n - 1) - 1 + n) % n);
    bumpAutoAdvance();
  };

  const goNext = () => {
    setActiveIndex((i) => (Math.min(i, n - 1) + 1) % n);
    bumpAutoAdvance();
  };

  const goTo = (i) => {
    setActiveIndex(i);
    bumpAutoAdvance();
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="pt-gallery-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.tag}>In session</p>
          <h2 id="pt-gallery-heading" className={styles.heading}>
            Working with members
          </h2>
        </header>

        <div
          className={styles.carousel}
          aria-roledescription="carousel"
          aria-label="Photos of members working with Dr. Jon Sakoda"
        >
          {n > 1 ? (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={goPrev}
              aria-label="Previous photo"
            >
              <PrevIcon />
            </button>
          ) : null}

          <div className={styles.visual}>
            <span className={styles.frame} aria-hidden />
            <div className={styles.slideStack}>
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={styles.slide}
                  data-active={i === safeIndex ? "true" : "false"}
                  aria-hidden={i === safeIndex ? undefined : true}
                >
                  <Image
                    src={photo.src}
                    alt={i === safeIndex ? photo.alt : ""}
                    fill
                    sizes="(max-width: 767px) 100vw, min(1080px, 92vw)"
                    className={styles.slideImage}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {n > 1 ? (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={goNext}
              aria-label="Next photo"
            >
              <NextIcon />
            </button>
          ) : null}
        </div>

        {n > 1 ? (
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Choose photo"
          >
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Photo ${i + 1} of ${n}`}
                className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
