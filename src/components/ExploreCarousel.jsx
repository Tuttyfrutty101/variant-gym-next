"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./ExploreCarousel.module.css";

const CARDS = [
  {
    symbol: "◆",
    title: "Training",
    text: "Coaching, classes, and programming built around your schedule and performance goals.",
    href: "/training",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
  },
  {
    symbol: "✦",
    title: "Health",
    text: "Prevention, therapy, and integrated care to keep you resilient for the long run.",
    href: "/health",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80",
  },
  {
    symbol: "▲",
    title: "Recovery",
    text: "Modalities and space to restore your body between hard training and busy life.",
    href: "/recovery",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80",
  },
  {
    symbol: "◎",
    title: "Athletes",
    text: "Dedicated support for competitors who need structure, data, and a team behind them.",
    href: "/athletes",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80",
  },
];

const STEP_REM = 2.25;
const CARD_REM = 22.5;

function ChevronLeft() {
  return (
    <svg
      className={styles.arrowIcon}
      width="18"
      height="18"
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
      width="18"
      height="18"
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

const SWIPE_PX = 48;

export default function ExploreCarousel() {
  const [ref, visible] = useInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef(null);
  const suppressClickRef = useRef(false);
  const n = CARDS.length;

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < n - 1;

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(n - 1, i + 1));
  }, [n]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, [n]);

  const applySwipe = useCallback((dx) => {
    if (Math.abs(dx) < SWIPE_PX) return;
    suppressClickRef.current = true;
    if (dx < 0) {
      setActiveIndex((i) => Math.min(n - 1, i + 1));
    } else {
      setActiveIndex((i) => Math.max(0, i - 1));
    }
  }, [n]);

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    pointerStartX.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerUp = useCallback(
    (e) => {
      if (pointerStartX.current == null) return;
      const dx = e.clientX - pointerStartX.current;
      pointerStartX.current = null;
      applySwipe(dx);
    },
    [applySwipe],
  );

  const onPointerCancel = useCallback(() => {
    pointerStartX.current = null;
  }, []);

  const onCardClick = useCallback((e) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      suppressClickRef.current = false;
    }
  }, []);

  const coreW = CARD_REM + (n - 1) * STEP_REM;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-label="Service areas — swipe or use arrows to explore"
    >
      <div className={styles.bgClip} aria-hidden>
        <div className={styles.bgWrap}>
          {CARDS.map((card, i) => (
            <div
              key={card.href}
              className={styles.bgSlide}
              style={{ backgroundImage: `url(${card.image})` }}
              data-active={i === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <div className={styles.deckCol}>
          <div
            className={styles.stack}
            style={{ width: `${coreW}rem` }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onLostPointerCapture={onPointerCancel}
            role="list"
            aria-label="Service cards in order left to right. Drag or swipe to change."
          >
            <div
              className={styles.stackTrack}
              style={{ width: `${coreW}rem` }}
            >
              {CARDS.map((card, i) => {
                const isActive = i === activeIndex;
                const z = 100 - Math.abs(i - activeIndex);

                return (
                  <div
                    key={card.href}
                    className={styles.stackSlot}
                    style={{
                      transform: `translate3d(${i * STEP_REM}rem, 0, 0) scale(${isActive ? 1 : 0.97})`,
                      zIndex: z,
                    }}
                    role="listitem"
                  >
                    <Link
                      href={card.href}
                      className={`${styles.card} ${isActive ? styles.cardFront : styles.cardBack}`}
                      data-active={isActive ? "true" : "false"}
                      onClick={onCardClick}
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={isActive ? undefined : true}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span className={styles.symbol} aria-hidden>
                        {card.symbol}
                      </span>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardText}>{card.text}</p>
                      <span className={styles.cardCta}>View {card.title}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.arrowRow}>
            <button
              type="button"
              className={styles.arrowBtn}
              onMouseDown={(e) => {
                if (e.button === 0) e.preventDefault();
              }}
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous card (earlier in order)"
              aria-disabled={!canPrev}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onMouseDown={(e) => {
                if (e.button === 0) e.preventDefault();
              }}
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next card (later in order)"
              aria-disabled={!canNext}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
