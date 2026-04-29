"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";
import TestimonialImageUpload from "./TestimonialImageUpload";

const MAX = { quote: 8000, image_url: 2000, name: 200, title: 300 };

function emptyDraft() {
  return {
    quote: "",
    image_url: "",
    name: "",
    title: "",
    is_active: true,
  };
}

function sortByOrder(list) {
  return [...list].sort(
    (a, b) =>
      a.sort_order - b.sort_order || String(a.id).localeCompare(String(b.id)),
  );
}

/** @param {{ initial: Array<Record<string, unknown>> }} props */
export default function TestimonialsEditor({ initial }) {
  const router = useRouter();
  const { showSnackbar } = useAdminSnackbar();
  const [items, setItems] = useState(() => sortByOrder(normalizeRows(initial)));
  const [draft, setDraft] = useState(emptyDraft);
  const [draftImageFolderKey, setDraftImageFolderKey] = useState(
    () => crypto.randomUUID(),
  );
  const [reordering, setReordering] = useState(false);

  function normalizeRows(rows) {
    return (Array.isArray(rows) ? rows : []).map((r) => ({
      id: r.id,
      quote: String(r.quote ?? ""),
      image_url: r.image_url == null ? "" : String(r.image_url),
      name: String(r.name ?? ""),
      title: String(r.title ?? ""),
      is_active: Boolean(r.is_active),
      sort_order: Number(r.sort_order ?? 0),
    }));
  }

  function updateItem(id, patch) {
    setItems((prev) =>
      sortByOrder(
        prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
      ),
    );
  }

  async function moveRow(id, delta) {
    const sorted = sortByOrder(items);
    const i = sorted.findIndex((r) => r.id === id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= sorted.length) return;

    const swapped = [...sorted];
    [swapped[i], swapped[j]] = [swapped[j], swapped[i]];
    const reindexed = swapped.map((row, idx) => ({ ...row, sort_order: idx }));

    const prevItems = items;
    setItems(reindexed);
    setReordering(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const results = await Promise.all(
        reindexed.map((row) =>
          supabase
            .from("homepage_testimonial")
            .update({ sort_order: row.sort_order })
            .eq("id", row.id),
        ),
      );
      const failed = results.find((r) => r.error);
      if (failed?.error) {
        setItems(prevItems);
        showSnackbar(failed.error.message, { variant: "error" });
        return;
      }
      router.refresh();
    } finally {
      setReordering(false);
    }
  }

  async function saveRow(row) {
    const supabase = createSupabaseBrowserClient();
    const payload = {
      quote: row.quote.trim().slice(0, MAX.quote),
      image_url:
        row.image_url.trim() === ""
          ? null
          : row.image_url.trim().slice(0, MAX.image_url),
      name: row.name.trim().slice(0, MAX.name),
      title: row.title.trim().slice(0, MAX.title),
      is_active: row.is_active,
      sort_order: Math.max(0, Math.min(9999, Number(row.sort_order) || 0)),
    };
    if (!payload.quote || !payload.name || !payload.title) {
      showSnackbar("Quote, name, and title are required.", { variant: "error" });
      return;
    }
    const { error } = await supabase
      .from("homepage_testimonial")
      .update(payload)
      .eq("id", row.id);
    if (error) {
      showSnackbar(error.message, { variant: "error" });
      return;
    }
    showSnackbar("Saved.");
    router.refresh();
  }

  async function deleteRow(id) {
    if (!window.confirm("Delete this testimonial?")) return;
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("homepage_testimonial").delete().eq("id", id);
    if (error) {
      showSnackbar(error.message, { variant: "error" });
      return;
    }

    const remaining = items.filter((r) => r.id !== id);
    const reindexed = sortByOrder(remaining).map((row, idx) => ({
      ...row,
      sort_order: idx,
    }));

    setItems(reindexed);
    setReordering(true);
    try {
      const results = await Promise.all(
        reindexed.map((row) =>
          supabase
            .from("homepage_testimonial")
            .update({ sort_order: row.sort_order })
            .eq("id", row.id),
        ),
      );
      const failed = results.find((r) => r.error);
      if (failed?.error) {
        showSnackbar(failed.error.message, { variant: "error" });
      } else {
        showSnackbar("Deleted.");
        router.refresh();
      }
    } finally {
      setReordering(false);
    }
  }

  async function addRow() {
    const supabase = createSupabaseBrowserClient();
    const payload = {
      quote: draft.quote.trim().slice(0, MAX.quote),
      image_url:
        draft.image_url.trim() === ""
          ? null
          : draft.image_url.trim().slice(0, MAX.image_url),
      name: draft.name.trim().slice(0, MAX.name),
      title: draft.title.trim().slice(0, MAX.title),
      is_active: draft.is_active,
      sort_order: items.length,
    };
    if (!payload.quote || !payload.name || !payload.title) {
      showSnackbar("Quote, name, and title are required for new testimonials.", {
        variant: "error",
      });
      return;
    }
    const { data, error } = await supabase
      .from("homepage_testimonial")
      .insert(payload)
      .select("*")
      .single();
    if (error) {
      showSnackbar(error.message, { variant: "error" });
      return;
    }
    setItems((prev) => sortByOrder([...prev, ...normalizeRows([data])]));
    setDraft(emptyDraft());
    setDraftImageFolderKey(crypto.randomUUID());
    showSnackbar("Added.");
    router.refresh();
  }

  return (
    <div>
      <div className={styles.addNew}>
        <h2 className={styles.h1} style={{ fontSize: "1.15rem" }}>
          Add new
        </h2>
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="new-quote">Quote</label>
            <textarea
              id="new-quote"
              className={styles.textarea}
              value={draft.quote}
              onChange={(e) => setDraft((d) => ({ ...d, quote: e.target.value }))}
              maxLength={MAX.quote}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="new-headshot">Photo (optional)</label>
            <TestimonialImageUpload
              fieldId="new-headshot"
              value={draft.image_url}
              folderKey={draftImageFolderKey}
              onChange={(url) =>
                setDraft((d) => ({
                  ...d,
                  image_url: url ?? "",
                }))
              }
              onError={(m) => {
                if (m) showSnackbar(m, { variant: "error" });
              }}
            />
          </div>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="new-name">Name</label>
              <input
                id="new-name"
                className={styles.input}
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                maxLength={MAX.name}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="new-title">Title</label>
              <input
                id="new-title"
                className={styles.input}
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
                maxLength={MAX.title}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.checkboxRow} style={{ marginTop: "0.25rem" }}>
              <input
                id="new-active"
                type="checkbox"
                checked={draft.is_active}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, is_active: e.target.checked }))
                }
              />
              <label htmlFor="new-active">Active on site</label>
            </div>
          </div>
          <button type="button" className={styles.submit} onClick={addRow}>
            Add testimonial
          </button>
        </div>
      </div>

      {items.map((row, index) => (
        <div key={row.id} className={styles.testimonialCard}>
          <div className={styles.testimonialCardHead}>
            <h3>ID {String(row.id).slice(0, 8)}…</h3>
            <div className={styles.reorderButtons}>
              <button
                type="button"
                className={styles.reorderBtn}
                disabled={index === 0 || reordering}
                aria-label="Move testimonial up"
                onClick={() => moveRow(row.id, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                className={styles.reorderBtn}
                disabled={index === items.length - 1 || reordering}
                aria-label="Move testimonial down"
                onClick={() => moveRow(row.id, 1)}
              >
                ↓
              </button>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor={`q-${row.id}`}>Quote</label>
              <textarea
                id={`q-${row.id}`}
                className={styles.textarea}
                value={row.quote}
                onChange={(e) => updateItem(row.id, { quote: e.target.value })}
                maxLength={MAX.quote}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`img-${row.id}`}>Photo</label>
              <TestimonialImageUpload
                fieldId={`img-${row.id}`}
                value={row.image_url}
                folderKey={String(row.id)}
                onChange={(url) => updateItem(row.id, { image_url: url ?? "" })}
                onError={(m) => {
                  if (m) showSnackbar(m, { variant: "error" });
                }}
              />
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor={`n-${row.id}`}>Name</label>
                <input
                  id={`n-${row.id}`}
                  className={styles.input}
                  value={row.name}
                  onChange={(e) => updateItem(row.id, { name: e.target.value })}
                  maxLength={MAX.name}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={`t-${row.id}`}>Title</label>
                <input
                  id={`t-${row.id}`}
                  className={styles.input}
                  value={row.title}
                  onChange={(e) =>
                    updateItem(row.id, { title: e.target.value })
                  }
                  maxLength={MAX.title}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.checkboxRow} style={{ marginTop: "0.25rem" }}>
                <input
                  id={`a-${row.id}`}
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) =>
                    updateItem(row.id, { is_active: e.target.checked })
                  }
                />
                <label htmlFor={`a-${row.id}`}>Active on site</label>
              </div>
            </div>
            <button
              type="button"
              className={styles.submit}
              onClick={() => saveRow(row)}
            >
              Save
            </button>
            <button
              type="button"
              className={styles.danger}
              onClick={() => deleteRow(row.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
