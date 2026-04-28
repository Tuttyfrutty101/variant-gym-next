"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./OfferingsSnapSection.module.css";

const SNAP_QUERY = "(max-width: 767px)";
const GRID_QUERY = "(min-width: 768px)";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80";

function snapCarouselToNearest(el) {
  if (!el || el.scrollWidth <= el.clientWidth + 1) return;

  const items = [...el.querySelectorAll("ul > li")];
  if (items.length === 0) return;

  const style = getComputedStyle(el);
  const pad = Number.parseFloat(style.scrollPaddingInlineStart || style.scrollPaddingLeft) || 0;
  const root = el.getBoundingClientRect();
  const anchorX = root.left + pad;

  let bestScroll = el.scrollLeft;
  let bestDist = Infinity;

  for (const li of items) {
    const r = li.getBoundingClientRect();
    const dist = Math.abs(r.left - anchorX);
    if (dist < bestDist) {
      bestDist = dist;
      bestScroll = el.scrollLeft + (r.left - anchorX);
    }
  }

  const max = el.scrollWidth - el.clientWidth;
  const next = Math.min(max, Math.max(0, bestScroll));
  if (Math.abs(next - el.scrollLeft) < 0.5) return;

  el.scrollTo({ left: next, behavior: "instant" });
}

function burstSnap(el) {
  snapCarouselToNearest(el);
  requestAnimationFrame(() => {
    snapCarouselToNearest(el);
    requestAnimationFrame(() => snapCarouselToNearest(el));
  });
}

/**
 * @param {object} props
 * @param {string} props.headingId
 * @param {string} props.tag
 * @param {string} props.heading
 * @param {Array<{ title: string; text: string; href: string; linkAriaLabel?: string; ctaText?: string }>} props.items
 * @param {string} props.cardEyebrow
 * @param {string} [props.defaultCtaText]
 * @param {string} props.scrollTrackAriaLabel
 * @param {string} [props.backgroundImageUrl] - Static section bg when `cardBackgrounds` is not set
 * @param {string[]} [props.cardBackgrounds] - One image URL per item; crossfades with the active card (scroll on mobile, hover on desktop)
 * @param {number} [props.autoAdvanceCardMs] - When set (e.g. 2000), cycles the selected card on this interval only while the 2×2 grid is visible (≥768px). Paused when tab is hidden; disabled when `prefers-reduced-motion: reduce`.
 */
export default function OfferingsSnapSection({
  headingId,
  tag,
  heading,
  items,
  cardEyebrow,
  defaultCtaText,
  scrollTrackAriaLabel,
  backgroundImageUrl = DEFAULT_BG,
  cardBackgrounds,
  autoAdvanceCardMs,
}) {
  const [ref, visible] = useInView();
  const scrollRef = useRef(null);
  const ratiosRef = useRef(Object.create(null));

  const dynamicBg =
    Array.isArray(cardBackgrounds) &&
    cardBackgrounds.length === items.length &&
    cardBackgrounds.length > 0;

  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [gridWide, setGridWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(GRID_QUERY);
    const sync = () => setGridWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const hoverSelectsCard =
    dynamicBg && !(autoAdvanceCardMs && gridWide);

  const onPointerRelease = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (!window.matchMedia(SNAP_QUERY).matches) return;
    const el = scrollRef.current;
    if (!el) return;
    burstSnap(el);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("pointerup", onPointerRelease);
    el.addEventListener("pointercancel", onPointerRelease);

    return () => {
      el.removeEventListener("pointerup", onPointerRelease);
      el.removeEventListener("pointercancel", onPointerRelease);
    };
  }, [onPointerRelease]);

  useEffect(() => {
    if (!dynamicBg) return;

    let obs = null;

    const setup = () => {
      obs?.disconnect();
      ratiosRef.current = Object.create(null);

      const track = scrollRef.current;
      const ul = track?.querySelector("ul");
      const lis = ul ? [...ul.children] : [];
      if (!lis.length) return;

      const mobile = window.matchMedia(SNAP_QUERY).matches;
      /* Desktop 2×2 + auto-advance: use hover + timer only (viewport IO fights the timer). */
      if (!mobile && autoAdvanceCardMs) return;

      const trackIsScroller =
        track && getComputedStyle(track).display !== "contents";
      const root = mobile && trackIsScroller ? track : null;

      obs = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            const i = lis.indexOf(en.target);
            if (i >= 0) ratiosRef.current[i] = en.intersectionRatio;
          }
          let best = 0;
          let maxR = -1;
          for (let i = 0; i < lis.length; i++) {
            const r = ratiosRef.current[i] ?? 0;
            if (r > maxR) {
              maxR = r;
              best = i;
            }
          }
          if (maxR > 0.08) setActiveBgIndex(best);
        },
        { root, threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
      );

      lis.forEach((li) => obs.observe(li));
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      obs?.disconnect();
    };
  }, [dynamicBg, items.length, autoAdvanceCardMs]);

  useEffect(() => {
    if (!dynamicBg || !autoAdvanceCardMs || autoAdvanceCardMs <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const n = items.length;
    const gridMq = window.matchMedia(GRID_QUERY);
    let id = null;

    const stop = () => {
      if (id != null) {
        clearInterval(id);
        id = null;
      }
    };

    const startIfGridVisible = () => {
      stop();
      if (!gridMq.matches) return;

      id = window.setInterval(() => {
        if (document.visibilityState === "hidden") return;
        if (!gridMq.matches) return;
        setActiveBgIndex((prev) => (prev + 1) % n);
      }, autoAdvanceCardMs);
    };

    startIfGridVisible();
    gridMq.addEventListener("change", startIfGridVisible);
    return () => {
      gridMq.removeEventListener("change", startIfGridVisible);
      stop();
    };
  }, [dynamicBg, autoAdvanceCardMs, items.length]);

  const bg = `url("${backgroundImageUrl.replace(/"/g, '\\"')}")`;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""} ${dynamicBg ? styles.dynamicBg : ""}`}
      style={dynamicBg ? undefined : { "--offerings-bg-image": bg }}
      aria-labelledby={headingId}
    >
      {dynamicBg ? (
        <div className={styles.bgStack} aria-hidden>
          {cardBackgrounds.map((url, i) => (
            <div
              key={url}
              className={styles.bgSlide}
              data-active={i === activeBgIndex ? "true" : "false"}
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
          <div className={styles.bgScrim} />
        </div>
      ) : null}

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.tag}>{tag}</p>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
        </header>

        <div ref={scrollRef} className={styles.scrollTrack} aria-label={scrollTrackAriaLabel}>
          <ul className={styles.grid}>
            {items.map((item, i) => {
              const cta =
                item.ctaText ?? defaultCtaText ?? `View ${item.title}`;
              const aria = item.linkAriaLabel ?? `${item.title}: open page`;

              return (
                <li
                  key={item.href + item.title}
                  className={styles.item}
                  onMouseEnter={
                    hoverSelectsCard ? () => setActiveBgIndex(i) : undefined
                  }
                >
                  <Link
                    href={item.href}
                    className={`${styles.card} ${dynamicBg && i === activeBgIndex ? styles.cardBgSelected : ""}`}
                    aria-label={aria}
                    aria-current={dynamicBg && i === activeBgIndex ? "true" : undefined}
                  >
                    <span className={styles.cardTag} aria-hidden>
                      {cardEyebrow}
                    </span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.text}</p>
                    <span className={styles.cardCta}>
                      {cta}
                      <span className={styles.cardCtaArrow} aria-hidden>
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
