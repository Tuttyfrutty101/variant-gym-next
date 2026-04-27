"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./ExploreCarousel.module.css";

const CARDS = [
  {
    symbol: "◆",
    title: "Training",
    text: "Coaching, classes, and programming built around your schedule and performance goals.",
    href: "/training",
  },
  {
    symbol: "✦",
    title: "Health",
    text: "Prevention, therapy, and integrated care to keep you resilient for the long run.",
    href: "/health",
  },
  {
    symbol: "▲",
    title: "Recovery",
    text: "Modalities and space to restore your body between hard training and busy life.",
    href: "/recovery",
  },
  {
    symbol: "◎",
    title: "Athletes",
    text: "Dedicated support for competitors who need structure, data, and a team behind them.",
    href: "/athletes",
  },
];

function ChevronLeft() {
  return (
    <svg
      className={styles.arrowIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className={styles.arrowIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExploreCarousel() {
  const [ref, visible] = useInView();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    const eps = 4;
    setCanPrev(scrollLeft > eps);
    setCanNext(scrollLeft < max - eps);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, visible]);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    const item = track?.querySelector("li");
    if (!item || !track) return 0;
    const stylesTrack = getComputedStyle(track);
    const gap = parseFloat(stylesTrack.columnGap || stylesTrack.gap) || 16;
    return item.getBoundingClientRect().width + gap;
  }, []);

  const scrollPrev = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  }, [getScrollStep]);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  }, [getScrollStep]);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="explore-carousel-heading"
    >
      <header className={styles.header}>
        <p className={styles.tag}>Explore</p>
        <h2 id="explore-carousel-heading" className={styles.title}>
          Performance, end to end
        </h2>
        <p className={styles.hint} aria-hidden="true">
          Swipe for more
        </p>
      </header>

      <div className={styles.scrollWrap}>
        <ul ref={trackRef} className={styles.track}>
          {CARDS.map((card) => (
            <li key={card.href} className={styles.item}>
              <Link href={card.href} className={styles.card}>
                <span className={styles.symbol} aria-hidden>
                  {card.symbol}
                </span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
                <span className={styles.cardCta}>View {card.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.navControls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous card"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className={styles.navBtn}
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next card"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
