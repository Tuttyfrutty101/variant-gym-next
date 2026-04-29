"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

/** @param {{ initial: Array<{ day_index: number, weekday: string, label: string }> }} props */
export default function HoursForm({ initial }) {
  const { showSnackbar } = useAdminSnackbar();
  const [rows, setRows] = useState(initial);
  const [loading, setLoading] = useState(false);

  function setLabel(dayIndex, label) {
    setRows((prev) =>
      prev.map((r) => (r.day_index === dayIndex ? { ...r, label } : r)),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const payload = rows.map((r) => ({
        day_index: r.day_index,
        label: r.label.trim() || "—",
      }));
      const { error } = await supabase.from("site_business_hours").upsert(
        payload,
        { onConflict: "day_index" },
      );
      if (error) {
        showSnackbar(error.message, { variant: "error" });
        return;
      }
      showSnackbar("Saved.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {rows.map((r) => (
        <div key={r.day_index} className={styles.field}>
          <label htmlFor={`day-${r.day_index}`}>{r.weekday}</label>
          <input
            id={`day-${r.day_index}`}
            className={styles.input}
            value={r.label}
            onChange={(e) => setLabel(r.day_index, e.target.value)}
            maxLength={120}
          />
        </div>
      ))}
      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Saving…" : "Save hours"}
      </button>
    </form>
  );
}
