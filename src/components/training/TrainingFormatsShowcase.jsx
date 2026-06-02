"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { TRAINING_PAGE_ACCORDION } from "@/data/trainingPageAccordion";
import { useInView } from "@/hooks/useInView";
import styles from "./TrainingFormatsShowcase.module.css";

const ITEMS = TRAINING_PAGE_ACCORDION;

function ActiveMediaPane({ active }) {
  const media = active?.media;

  if (!media) {
    return <div className={styles.mediaEmpty} aria-hidden />;
  }

  if (media.kind === "video") {
    return (
      <video
        key={active.id}
        className={styles.mediaVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={`${active.title}: promotional video`}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      key={active.id}
      src={media.src}
      alt={media.alt ?? ""}
      fill
      sizes="(max-width: 960px) 100vw, 48vw"
      className={styles.mediaImage}
      priority={active.id === "personal-training"}
    />
  );
}

export default function TrainingFormatsShowcase() {
  const [ref, visible] = useInView();
  const uid = useId();
  const stableUid = uid.replace(/[^a-zA-Z0-9_-]/g, "") || "acc";

  const [activeId, setActiveId] = useState(ITEMS[0]?.id ?? "");
  const testsDialogRef = useRef(null);

  const active = ITEMS.find((i) => i.id === activeId) ?? ITEMS[0];

  useEffect(() => {
    const el = testsDialogRef.current;
    if (!el) return undefined;

    const onCancel = (e) => {
      e.preventDefault();
      el.close();
    };

    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, []);

  if (ITEMS.length === 0) {
    return null;
  }

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

      <div className={styles.split}>
        <nav className={styles.accNav} aria-label="Training formats">
          <ul className={styles.accList}>
            {ITEMS.map((item) => {
              const isActive = activeId === item.id;
              const headingId = `acc-h-${stableUid}-${item.id}`;
              const panelId = `acc-p-${stableUid}-${item.id}`;

              return (
                <li key={item.id} className={styles.accLi}>
                  <button
                    type="button"
                    id={headingId}
                    className={`${styles.accTrigger} ${isActive ? styles.accTriggerActive : ""}`}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveId(item.id)}
                  >
                    {item.title}
                  </button>
                  <div
                    className={`${styles.accPanelReveal} ${isActive ? styles.accPanelRevealOpen : ""}`}
                  >
                    <div className={styles.accPanelRevealInner}>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        className={styles.accPanel}
                        {...(!isActive ? { inert: true } : {})}
                      >
                        {item.paragraphs.map((paragraph, pi) => (
                          <p key={pi} className={styles.accBody}>
                            {paragraph}
                          </p>
                        ))}

                        {item.exploreScheduleHref ? (
                          <div className={styles.testsBtnWrap}>
                            <Link
                              href={item.exploreScheduleHref}
                              className={styles.testsBtn}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.exploreScheduleLabel ?? "Explore Schedule"}
                            </Link>
                          </div>
                        ) : null}

                        {item.testingOverviewDialog ? (
                          <div className={styles.testsBtnWrap}>
                            <button
                              type="button"
                              className={styles.testsBtn}
                              onClick={() =>
                                testsDialogRef.current?.showModal()
                              }
                            >
                              See testing overview
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.mediaShell}>
          <div className={styles.mediaFrame}>
            <ActiveMediaPane active={active} />
          </div>
        </div>
      </div>

      <dialog
        ref={testsDialogRef}
        className={styles.testsDialog}
        aria-labelledby={`tests-heading-${stableUid}`}
      >
        <div className={styles.testsDialogInner}>
          <div className={styles.testsDialogTop}>
            <h3 id={`tests-heading-${stableUid}`} className={styles.testsTitle}>
              Testing overview
            </h3>
            <button
              type="button"
              className={styles.testsDismiss}
              onClick={() => testsDialogRef.current?.close()}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className={styles.testsLead}>
            We pair lab grade assessments with coached training so your program
            is built on real physiology, not guesswork, and adjusted as your
            metrics evolve.
          </p>
          <p className={styles.testsActions}>
            <Link
              href="#methodology"
              className={styles.testsLink}
              onClick={() => testsDialogRef.current?.close()}
            >
              How it works
            </Link>
          </p>
        </div>
      </dialog>
    </section>
  );
}
