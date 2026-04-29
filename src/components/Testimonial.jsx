"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Testimonial.module.css";

const AUTO_MS = 3000;

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

export default function Testimonial({ testimonials }) {
  const list =
    Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : [];
  const n = list.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [restartSignal, setRestartSignal] = useState(0);
  const [ref, visible] = useInView();

  const bumpAutoAdvance = useCallback(() => {
    setRestartSignal((s) => s + 1);
  }, []);

  useEffect(() => {
    if (n <= 1) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((i) => {
        const cur = Math.min(i, n - 1);
        return (cur + 1) % n;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [n, restartSignal]);

  if (n === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, n - 1);
  const current = list[safeIndex];
  const slideId = "testimonial-slide";
  const showNav = n > 1;

  const goPrev = () => {
    setActiveIndex((i) => {
      const cur = Math.min(i, n - 1);
      return (cur - 1 + n) % n;
    });
    bumpAutoAdvance();
  };

  const goNext = () => {
    setActiveIndex((i) => {
      const cur = Math.min(i, n - 1);
      return (cur + 1) % n;
    });
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
      aria-label="Client testimonials"
    >
      <div className={styles.inner}>
        <div className={styles.carousel}>
          {showNav ? (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <PrevIcon />
            </button>
          ) : null}

          <div
            id={slideId}
            className={styles.slide}
            aria-live="polite"
            aria-atomic="true"
          >
            {current.imageUrl ? (
              <div className={styles.portrait}>
                <Image
                  src={current.imageUrl}
                  alt={`${current.name}, ${current.title}`}
                  fill
                  sizes="112px"
                  className={styles.portraitImg}
                />
              </div>
            ) : (
              <div className={styles.portraitSpacer} aria-hidden />
            )}
            <div className={styles.quoteSlot}>
              <blockquote
                className={styles.quote}
                title={current.quote}
              >
                <span className={styles.quoteOpen} aria-hidden>
                  {"\u201C"}
                </span>
                {current.quote}
                <span className={styles.quoteClose} aria-hidden>
                  {"\u201D"}
                </span>
              </blockquote>
            </div>
            <p className={styles.cite}>
              <strong>{current.name}</strong>, {current.title}
            </p>
          </div>

          {showNav ? (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <NextIcon />
            </button>
          ) : null}
        </div>

        {showNav ? (
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Choose testimonial"
          >
            {list.map((item, i) => (
              <button
                key={item.id ?? `${item.name}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-controls={slideId}
                tabIndex={0}
                className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
              >
                <span className={styles.srOnly}>
                  Testimonial {i + 1} of {n}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
