"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

const MAX = {
  badge: 200,
  title: 200,
  body: 2000,
  fine_print: 1000,
  cta_label: 120,
};

const CTA_HREF = "#contact";

/** @param {{ initial: Record<string, string | boolean> & { id: string; visible?: boolean } | null }} props */
export default function PromotionForm({ initial }) {
  const { showSnackbar } = useAdminSnackbar();
  const [id, setId] = useState(initial?.id ?? null);
  const [visible, setVisible] = useState(initial?.visible !== false);
  const [badge, setBadge] = useState(initial?.badge ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [fine_print, setFinePrint] = useState(initial?.fine_print ?? "");
  const [cta_label, setCtaLabel] = useState(initial?.cta_label ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const row = {
        badge: badge.trim().slice(0, MAX.badge),
        title: title.trim().slice(0, MAX.title),
        body: body.trim().slice(0, MAX.body),
        fine_print: fine_print.trim().slice(0, MAX.fine_print),
        cta_label: cta_label.trim().slice(0, MAX.cta_label),
        cta_href: CTA_HREF,
        visible,
      };

      if (id) {
        const { error } = await supabase
          .from("site_promotion")
          .update(row)
          .eq("id", id);
        if (error) {
          showSnackbar(error.message, { variant: "error" });
          return;
        }
      } else {
        const { data, error } = await supabase
          .from("site_promotion")
          .insert(row)
          .select("id")
          .single();
        if (error) {
          showSnackbar(error.message, { variant: "error" });
          return;
        }
        if (data?.id) setId(data.id);
      }
      showSnackbar("Saved.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <div className={styles.checkboxRow} style={{ marginTop: "0.15rem" }}>
          <input
            id="promo-visible"
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
          />
          <label htmlFor="promo-visible">Show promo block on homepage</label>
        </div>
        <p
          className={styles.lead}
          style={{ marginTop: "0.45rem", marginBottom: 0, fontSize: "0.78rem" }}
        >
          When off, the promo band is hidden on the public site (content is
          saved for next time).
        </p>
      </div>
      <div className={styles.field}>
        <label htmlFor="promo-badge">Badge</label>
        <input
          id="promo-badge"
          className={styles.input}
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          maxLength={MAX.badge}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="promo-title">Title</label>
        <input
          id="promo-title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX.title}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="promo-body">Body</label>
        <textarea
          id="promo-body"
          className={styles.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX.body}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="promo-fine">Fine print</label>
        <textarea
          id="promo-fine"
          className={styles.textarea}
          value={fine_print}
          onChange={(e) => setFinePrint(e.target.value)}
          maxLength={MAX.fine_print}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="promo-cta-label">CTA label</label>
        <input
          id="promo-cta-label"
          className={styles.input}
          value={cta_label}
          onChange={(e) => setCtaLabel(e.target.value)}
          maxLength={MAX.cta_label}
        />
        <p
          className={styles.lead}
          style={{ marginTop: "0.35rem", marginBottom: 0, fontSize: "0.78rem" }}
        >
          Button always scrolls to the contact form on the homepage (
          <code>#contact</code>).
        </p>
      </div>
      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Saving…" : "Save promotion"}
      </button>
    </form>
  );
}
