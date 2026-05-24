"use client";

import { useEffect, useId, useRef, useState } from "react";
import ClassSchedulePhoto from "./ClassSchedulePhoto";
import { prefetchClassScheduleImages } from "@/lib/classScheduleImage";
import styles from "./ClassSchedule.module.css";

/** @typedef {{ id: string; name: string; time: string; imageUrl: string | null }} ClassEntry */

/**
 * @param {{ days: Array<{ dayIndex: number; weekday: string; classes: ClassEntry[] }> }} props
 */
export default function ClassSchedule({ days }) {
  const baseId = useId();
  const [activeDay, setActiveDay] = useState(0);
  const prefetchedDays = useRef(new Set());

  function prefetchDayImages(dayIndex) {
    if (prefetchedDays.current.has(dayIndex)) return;
    prefetchedDays.current.add(dayIndex);
    const day = days.find((d) => d.dayIndex === dayIndex);
    if (!day) return;
    prefetchClassScheduleImages(day.classes ?? []);
  }

  const active =
    days.find((d) => d.dayIndex === activeDay) ??
    days[0] ?? {
      dayIndex: 0,
      weekday: "Monday",
      classes: [],
    };

  const panelId = `${baseId}-panel`;
  const classes = active.classes ?? [];

  useEffect(() => {
    prefetchDayImages(activeDay);
  }, [activeDay, days]);

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker}>Schedule</p>
        <h1 className={styles.title}>Classes by day</h1>
        <p className={styles.lead}>Browse what&apos;s on offer each day.</p>
        <p className={styles.hoursNote}>
          * Summer and holiday hours may vary.
        </p>
      </header>

      <div className={styles.tabsWrap}>
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="Weekday"
        >
          {days.map(({ dayIndex, weekday }) => {
            const selected = activeDay === dayIndex;
            const tabId = `${baseId}-tab-${dayIndex}`;
            return (
              <button
                key={dayIndex}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => setActiveDay(dayIndex)}
                onMouseEnter={() => prefetchDayImages(dayIndex)}
                onFocus={() => prefetchDayImages(dayIndex)}
              >
                <span className={styles.tabShort}>{weekday.slice(0, 3)}</span>
                <span className={styles.tabFull}>{weekday}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.dayIndex}`}
        className={styles.panel}
      >
        <h2 className={styles.panelHeading}>{active.weekday}</h2>
        {classes.length === 0 ? (
          <p className={styles.empty}>No classes listed for this day yet.</p>
        ) : (
          <ul className={styles.list}>
            {classes.map((c, i) => (
              <li
                key={c.id ? c.id : `${active.dayIndex}-${i}-${c.name}`}
                className={styles.row}
              >
                <div className={styles.classMain}>
                  {c.imageUrl ? (
                    <ClassSchedulePhoto
                      url={c.imageUrl}
                      priority={i < 6}
                    />
                  ) : (
                    <div className={styles.classPhotoPlaceholder} aria-hidden />
                  )}
                  <span className={styles.className}>{c.name}</span>
                </div>
                <span className={styles.classTime}>{c.time}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
