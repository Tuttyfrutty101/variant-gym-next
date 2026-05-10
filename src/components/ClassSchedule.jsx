"use client";

import { useId, useState } from "react";
import styles from "./ClassSchedule.module.css";

/** @typedef {{ id: string; name: string; time: string }} ClassEntry */

/**
 * @param {{ days: Array<{ dayIndex: number; weekday: string; classes: ClassEntry[] }> }} props
 */
export default function ClassSchedule({ days }) {
  const baseId = useId();
  const [activeDay, setActiveDay] = useState(0);

  const active =
    days.find((d) => d.dayIndex === activeDay) ??
    days[0] ?? {
      dayIndex: 0,
      weekday: "Monday",
      classes: [],
    };

  const panelId = `${baseId}-panel`;
  const classes = active.classes ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker}>Schedule</p>
        <h1 className={styles.title}>Classes by day</h1>
        <p className={styles.lead}>Browse what&apos;s on offer each day.</p>
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
                <span className={styles.className}>{c.name}</span>
                <span className={styles.classTime}>{c.time}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
