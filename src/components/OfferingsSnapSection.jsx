"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
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

/** Which carousel slide index is aligned to the snap anchor (mobile horizontal strip). */
function getCarouselCenteredItemIndex(el) {
  if (!el || getComputedStyle(el).display === "contents") return null;

  const items = [...el.querySelectorAll("ul > li")];
  if (items.length === 0) return null;

  const style = getComputedStyle(el);
  const pad = Number.parseFloat(style.scrollPaddingInlineStart || style.scrollPaddingLeft) || 0;
  const root = el.getBoundingClientRect();
  const anchorX = root.left + pad;

  let bestIdx = 0;
  let bestDist = Infinity;

  for (let i = 0; i < items.length; i++) {
    const r = items[i].getBoundingClientRect();
    const dist = Math.abs(r.left - anchorX);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/** Scroll the horizontal strip so slide `index` snaps to the anchor — same geometry as manual scrolling. */
function scrollCarouselToItemIndex(trackEl, index) {
  const items = [...trackEl.querySelectorAll("ul > li")];
  const li = items[index];
  if (!li) return;

  const style = getComputedStyle(trackEl);
  const pad =
    Number.parseFloat(style.scrollPaddingInlineStart || style.scrollPaddingLeft) || 0;
  const root = trackEl.getBoundingClientRect();
  const anchorX = root.left + pad;
  const r = li.getBoundingClientRect();
  const next = Math.min(
    trackEl.scrollWidth - trackEl.clientWidth,
    Math.max(0, trackEl.scrollLeft + (r.left - anchorX)),
  );

  /* Instant scroll — reliable inside overflow (scrollTo/smooth + scrollend are flaky cross-browser). */
  trackEl.scrollLeft = next;
  burstSnap(trackEl);
  requestAnimationFrame(() => {
    burstSnap(trackEl);
    requestAnimationFrame(() => burstSnap(trackEl));
  });
}

/**
 * @param {object} props
 * @param {string} props.headingId
 * @param {string} props.tag
 * @param {string} props.heading
 * @param {Array<{ title: string; text: string; href: string; linkAriaLabel?: string; ctaText?: string; scheduleHref?: string }>} props.items
 * @param {string} [props.cardEyebrow] - Small uppercase label above card title (omit to hide)
 * @param {boolean} [props.largeCardTitles] - Larger card title typography (home training strip)
 * @param {string} [props.defaultCtaText]
 * @param {string} props.scrollTrackAriaLabel
 * @param {string} [props.backgroundImageUrl] - Static section bg when `cardBackgrounds` is not set
 * @param {string[]} [props.cardBackgrounds] - One image URL per item; crossfades with the active card (scroll on mobile; hover only when 2×2 grid shows without auto-advance timer)
 * @param {number} [props.autoAdvanceCardMs] - When set (e.g. 2000), cycles the selected card on this interval only while the 2×2 grid is visible (≥768px). Paused when tab is hidden; disabled when `prefers-reduced-motion: reduce`.
 * @param {boolean} [props.hideSectionHeader] - Omit tag + main heading (still pass headingId only when header is shown)
 * @param {string} [props.sectionAriaLabel] - Landmark label when header is hidden (defaults to scrollTrackAriaLabel)
 * @param {string} [props.cornerTitle] - Optional label pinned top-left of the section (accent color), e.g. “Training”
 * @param {string} [props.bottomPromoText] - Legacy: single block of copy (prefer `bottomPromo`)
 * @param {{ eyebrow?: string; heading: string; body: string; cta?: { text: string; href: string } }} [props.bottomPromo] - Card-style promo at the bottom (static bg)
 * @param {boolean} [props.ambientDark] - Dark scrim over photography (home marketing theme)
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
  hideSectionHeader = false,
  sectionAriaLabel,
  cornerTitle,
  bottomPromoText,
  bottomPromo,
  largeCardTitles = false,
  ambientDark = false,
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
  const bottomPromoHeadingId = useId();

  useEffect(() => {
    const mq = window.matchMedia(GRID_QUERY);
    const sync = () => setGridWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Hover only drives the bg when the 2×2 grid is visible; carousel/mobile uses scroll + IO only. */
  const hoverSelectsCard =
    dynamicBg && gridWide && !autoAdvanceCardMs;

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    const mqSnap = window.matchMedia(SNAP_QUERY);

    const onPointerRelease = (e) => {
      if (!mqSnap.matches) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      burstSnap(track);
    };

    /* Native capture fires before React/Next delegated handlers — stopImmediatePropagation blocks router navigation. */
    const onClickCapture = (e) => {
      if (!mqSnap.matches) return;
      if (getComputedStyle(track).display === "contents") return;

      const li = typeof e.target?.closest === "function" ? e.target.closest("li") : null;
      if (!li) return;
      const ul = track.querySelector("ul");
      if (!ul || !ul.contains(li)) return;

      const lis = [...ul.children];
      const i = lis.indexOf(li);
      if (i < 0) return;

      const centered = getCarouselCenteredItemIndex(track);
      if (centered === null) return;
      if (i === centered) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      scrollCarouselToItemIndex(track, i);
    };

    track.addEventListener("pointerup", onPointerRelease);
    track.addEventListener("pointercancel", onPointerRelease);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("pointerup", onPointerRelease);
      track.removeEventListener("pointercancel", onPointerRelease);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, [items.length]);

  useEffect(() => {
    let obs = null;

    const setup = () => {
      obs?.disconnect();
      ratiosRef.current = Object.create(null);

      const track = scrollRef.current;
      const ul = track?.querySelector("ul");
      const lis = ul ? [...ul.children] : [];
      if (!lis.length) return;

      const mobile = window.matchMedia(SNAP_QUERY).matches;
      const trackIsScroller =
        track && getComputedStyle(track).display !== "contents";
      const rootCarousel = mobile && trackIsScroller ? track : null;

      /* Mobile horizontal strip: track centered slide — training + member experience */
      if (rootCarousel) {
        obs = new IntersectionObserver(
          (entries) => {
            for (const en of entries) {
              const idx = lis.indexOf(en.target);
              if (idx >= 0) ratiosRef.current[idx] = en.intersectionRatio;
            }
            let best = 0;
            let maxR = -1;
            for (let j = 0; j < lis.length; j++) {
              const r = ratiosRef.current[j] ?? 0;
              if (r > maxR) {
                maxR = r;
                best = j;
              }
            }
            if (maxR > 0.08) setActiveBgIndex(best);
          },
          { root: rootCarousel, threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
        );

        lis.forEach((li) => obs.observe(li));
        return;
      }

      /* Desktop member experience + auto-advance: timer only (viewport IO fights the timer). */
      if (!dynamicBg) return;
      if (autoAdvanceCardMs) return;

      obs = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            const idx = lis.indexOf(en.target);
            if (idx >= 0) ratiosRef.current[idx] = en.intersectionRatio;
          }
          let best = 0;
          let maxR = -1;
          for (let j = 0; j < lis.length; j++) {
            const r = ratiosRef.current[j] ?? 0;
            if (r > maxR) {
              maxR = r;
              best = j;
            }
          }
          if (maxR > 0.08) setActiveBgIndex(best);
        },
        { root: null, threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
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

  const bottomPromoResolved =
    bottomPromo ??
    (bottomPromoText
      ? {
          heading: "",
          body: bottomPromoText,
        }
      : null);

  const sectionLandmarkLabel =
    hideSectionHeader ? sectionAriaLabel ?? scrollTrackAriaLabel : undefined;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""} ${dynamicBg ? styles.dynamicBg : ""} ${hideSectionHeader ? styles.noSectionHeader : ""} ${bottomPromoResolved ? styles.hasBottomPromo : ""} ${largeCardTitles ? styles.largeCardTitles : ""}`}
      style={dynamicBg ? undefined : { "--offerings-bg-image": bg }}
      aria-labelledby={hideSectionHeader ? undefined : headingId}
      aria-label={hideSectionHeader ? sectionLandmarkLabel : undefined}
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
        </div>
      ) : null}

      {ambientDark ? (
        <div className={styles.ambientScrim} aria-hidden />
      ) : null}

      {cornerTitle ? (
        <p className={styles.cornerTitle} aria-hidden="true">
          {cornerTitle}
        </p>
      ) : null}

      <div className={styles.inner}>
        {!hideSectionHeader ? (
          <header className={styles.header}>
            <p className={styles.tag}>{tag}</p>
            <h2 id={headingId} className={styles.heading}>
              {heading}
            </h2>
          </header>
        ) : null}

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
                  <article
                    className={`${styles.card} ${dynamicBg && i === activeBgIndex ? styles.cardBgSelected : ""}`}
                    aria-label={aria}
                    aria-current={dynamicBg && i === activeBgIndex ? "true" : undefined}
                  >
                    {cardEyebrow ? (
                      <span className={styles.cardTag} aria-hidden>
                        {cardEyebrow}
                      </span>
                    ) : null}
                    <h3 className={styles.cardTitle}>
                      <Link href={item.href} className={styles.cardTitleLink}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className={styles.cardText}>{item.text}</p>
                    {item.scheduleHref ? (
                      <p className={styles.cardScheduleWrap}>
                        <Link
                          href={item.scheduleHref}
                          className={styles.cardScheduleLink}
                        >
                          See schedule
                        </Link>
                      </p>
                    ) : null}
                    <Link href={item.href} className={styles.cardCta}>
                      {cta}
                      <span className={styles.cardCtaArrow} aria-hidden>
                        →
                      </span>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {bottomPromoResolved ? (
        <aside
          className={styles.bottomPromo}
          aria-labelledby={
            bottomPromoResolved.heading ? bottomPromoHeadingId : undefined
          }
          aria-label={
            bottomPromoResolved.heading
              ? undefined
              : "Membership and digital program benefits"
          }
        >
          <div className={styles.bottomPromoGradient} aria-hidden />
          <div className={styles.bottomPromoInner}>
            <article className={styles.bottomPromoCard}>
              {bottomPromoResolved.eyebrow ? (
                <p className={styles.bottomPromoEyebrow}>
                  {bottomPromoResolved.eyebrow}
                </p>
              ) : null}
              {bottomPromoResolved.heading ? (
                <h3
                  id={bottomPromoHeadingId}
                  className={styles.bottomPromoHeading}
                >
                  {bottomPromoResolved.heading}
                </h3>
              ) : null}
              <p className={styles.bottomPromoBody}>{bottomPromoResolved.body}</p>
              {bottomPromoResolved.cta ? (
                <Link
                  href={bottomPromoResolved.cta.href}
                  className={`${styles.cardCta} ${styles.bottomPromoCta}`}
                >
                  {bottomPromoResolved.cta.text}
                  <span className={styles.cardCtaArrow} aria-hidden>
                    →
                  </span>
                </Link>
              ) : null}
            </article>
          </div>
        </aside>
      ) : null}
    </section>
  );
}
