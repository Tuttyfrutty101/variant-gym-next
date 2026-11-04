"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isDomainShape, normalizeEmailDomain } from "@/lib/blockedEmailDomains";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

/** @param {{ initial: Array<{ id: string, domain: string }> }} props */
export default function BlockedDomainsForm({ initial }) {
  const { showSnackbar } = useAdminSnackbar();
  const [domains, setDomains] = useState(initial);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    const domain = normalizeEmailDomain(draft);
    if (!isDomainShape(domain)) {
      showSnackbar("Enter a domain such as example.com.", { variant: "error" });
      return;
    }
    if (domains.some((row) => row.domain === domain)) {
      showSnackbar("That domain is already blocked.");
      setDraft("");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blocked_email_domains")
        .insert({ domain })
        .select("id, domain")
        .single();
      if (error) {
        showSnackbar(error.message, { variant: "error" });
        return;
      }
      setDomains((prev) =>
        [...prev, { id: data.id, domain: data.domain }].sort((a, b) =>
          a.domain.localeCompare(b.domain),
        ),
      );
      setDraft("");
      showSnackbar("Domain blocked.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id) {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase
        .from("blocked_email_domains")
        .delete()
        .eq("id", id);
      if (error) {
        showSnackbar(error.message, { variant: "error" });
        return;
      }
      setDomains((prev) => prev.filter((row) => row.id !== id));
      showSnackbar("Domain removed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.form}>
      <form className={styles.domainAdd} onSubmit={handleAdd}>
        <div className={styles.field}>
          <label htmlFor="blocked-domain">Domain</label>
          <input
            id="blocked-domain"
            className={styles.input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="example.com"
            autoComplete="off"
            maxLength={253}
          />
        </div>
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Saving…" : "Block domain"}
        </button>
      </form>

      {domains.length === 0 ? (
        <p className={styles.lead}>No domains are blocked.</p>
      ) : (
        <ul className={styles.domainList}>
          {domains.map((row) => (
            <li key={row.id} className={styles.domainRow}>
              <span>{row.domain}</span>
              <button
                type="button"
                className={styles.signOut}
                disabled={loading}
                onClick={() => handleRemove(row.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
