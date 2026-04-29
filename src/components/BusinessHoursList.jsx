"use client";

import styles from "./BusinessHoursList.module.css";

/**
 * @param {Object} props
 * @param {Array<{ weekday: string, label: string, dayIndex?: number }>} props.hours
 * @param {"default" | "compact"} [props.variant]
 * @param {"neutral" | "onAccent" | "onBand" | "contact"} [props.tone]
 * @param {string} [props.id]
 * @param {string} [props.className]
 */
export default function BusinessHoursList({
  hours,
  variant = "default",
  tone = "neutral",
  id,
  className,
}) {
  const list = Array.isArray(hours) ? hours : [];
  const toneClass =
    tone === "onAccent"
      ? styles.onAccent
      : tone === "onBand"
        ? styles.onBand
        : tone === "contact"
          ? styles.contactTone
          : "";
  const rootClass = [styles.root, variant === "compact" ? styles.compact : "", toneClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <dl className={rootClass} id={id}>
      {list.map((row) => (
        <div
          key={row.dayIndex ?? row.weekday}
          className={[styles.row, tone === "contact" ? styles.contactRow : ""].filter(Boolean).join(" ")}
        >
          <dt className={styles.day}>{row.weekday}</dt>
          <dd className={styles.hours}>{row.label}</dd>
        </div>
      ))}
    </dl>
  );
}
