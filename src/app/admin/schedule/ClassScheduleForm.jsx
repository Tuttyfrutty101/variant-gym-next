"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

/**
 * @param {{
 *   initial: Array<{
 *     day_index: number;
 *     weekday: string;
 *     classes: Array<{ name: string; time: string }>;
 *   }>;
 * }} props
 */
export default function ClassScheduleForm({ initial }) {
  const { showSnackbar } = useAdminSnackbar();
  const [days, setDays] = useState(initial);
  const [activeDay, setActiveDay] = useState(0);
  const [loading, setLoading] = useState(false);

  const active =
    days.find((d) => d.day_index === activeDay) ??
    days[0] ?? {
      day_index: 0,
      weekday: "Monday",
      classes: [],
    };

  function setClassesForDay(dayIndex, nextClasses) {
    setDays((prev) =>
      prev.map((d) =>
        d.day_index === dayIndex ? { ...d, classes: nextClasses } : d,
      ),
    );
  }

  function addRow(dayIndex) {
    const d = days.find((x) => x.day_index === dayIndex);
    if (!d) return;
    setClassesForDay(dayIndex, [...d.classes, { name: "", time: "" }]);
  }

  function removeRow(dayIndex, rowIndex) {
    const d = days.find((x) => x.day_index === dayIndex);
    if (!d) return;
    setClassesForDay(
      dayIndex,
      d.classes.filter((_, i) => i !== rowIndex),
    );
  }

  function patchRow(dayIndex, rowIndex, patch) {
    const d = days.find((x) => x.day_index === dayIndex);
    if (!d) return;
    setClassesForDay(
      dayIndex,
      d.classes.map((c, i) => (i === rowIndex ? { ...c, ...patch } : c)),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: delErr } = await supabase
        .from("site_class_schedule")
        .delete()
        .gte("day_index", 0);

      if (delErr) {
        showSnackbar(delErr.message, { variant: "error" });
        return;
      }

      /** @type {{ day_index: number; sort_order: number; class_name: string; class_time: string }[]} */
      const inserts = [];
      for (const day of days) {
        day.classes.forEach((c, i) => {
          const name = c.name.trim();
          const time = c.time.trim();
          if (!name && !time) return;
          inserts.push({
            day_index: day.day_index,
            sort_order: i,
            class_name: name || "—",
            class_time: time || "—",
          });
        });
      }

      if (inserts.length > 0) {
        const { error: insErr } = await supabase
          .from("site_class_schedule")
          .insert(inserts);
        if (insErr) {
          showSnackbar(insErr.message, { variant: "error" });
          return;
        }
      }

      showSnackbar("Saved.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.scheduleTabs} role="tablist" aria-label="Edit weekday">
        {days.map(({ day_index, weekday }) => {
          const selected = activeDay === day_index;
          return (
            <button
              key={day_index}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={`${styles.scheduleTab} ${selected ? styles.scheduleTabActive : ""}`}
              onClick={() => setActiveDay(day_index)}
            >
              {weekday.slice(0, 3)}
            </button>
          );
        })}
      </div>

      <div className={styles.scheduleDayBlock}>
        <p className={styles.scheduleDayTitle}>{active.weekday}</p>
        {active.classes.length === 0 ? (
          <p className={styles.mutedSmall}>No rows yet — add a class below.</p>
        ) : (
          active.classes.map((c, rowIndex) => (
            <div key={`${active.day_index}-${rowIndex}`} className={styles.classRowCard}>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor={`cn-${active.day_index}-${rowIndex}`}>Class name</label>
                  <input
                    id={`cn-${active.day_index}-${rowIndex}`}
                    className={styles.input}
                    value={c.name}
                    onChange={(e) =>
                      patchRow(active.day_index, rowIndex, { name: e.target.value })
                    }
                    maxLength={200}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={`ct-${active.day_index}-${rowIndex}`}>Time</label>
                  <input
                    id={`ct-${active.day_index}-${rowIndex}`}
                    className={styles.input}
                    value={c.time}
                    onChange={(e) =>
                      patchRow(active.day_index, rowIndex, { time: e.target.value })
                    }
                    maxLength={120}
                    autoComplete="off"
                  />
                </div>
              </div>
              <button
                type="button"
                className={styles.danger}
                onClick={() => removeRow(active.day_index, rowIndex)}
              >
                Remove
              </button>
            </div>
          ))
        )}
        <button
          type="button"
          className={styles.secondaryOutline}
          onClick={() => addRow(active.day_index)}
        >
          Add class on {active.weekday}
        </button>
      </div>

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Saving…" : "Save schedule"}
      </button>
    </form>
  );
}
