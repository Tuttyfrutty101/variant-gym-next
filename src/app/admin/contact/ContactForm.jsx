"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useAdminSnackbar } from "../AdminSnackbarContext";
import styles from "../admin.module.css";

const MAX = {
  address: 300,
  phone_display: 80,
  phone_tel: 80,
  email: 200,
};

/** @param {{ initial: { id: string, address: string, phone_display: string, phone_tel: string, email: string } | null }} props */
export default function ContactForm({ initial }) {
  const { showSnackbar } = useAdminSnackbar();
  const [id, setId] = useState(initial?.id ?? null);
  const [address, setAddress] = useState(initial?.address ?? "");
  const [phone_display, setPhoneDisplay] = useState(
    initial?.phone_display ?? "",
  );
  const [phone_tel, setPhoneTel] = useState(initial?.phone_tel ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      showSnackbar("Enter a valid email.", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const row = {
        address: address.trim().slice(0, MAX.address),
        phone_display: phone_display.trim().slice(0, MAX.phone_display),
        phone_tel: phone_tel.trim().slice(0, MAX.phone_tel),
        email: email.trim().slice(0, MAX.email),
      };

      if (id) {
        const { error } = await supabase
          .from("site_contact_info")
          .update(row)
          .eq("id", id);
        if (error) {
          showSnackbar(error.message, { variant: "error" });
          return;
        }
      } else {
        const { data, error } = await supabase
          .from("site_contact_info")
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
        <label htmlFor="site-address">Address</label>
        <input
          id="site-address"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          maxLength={MAX.address}
        />
      </div>
      <div className={styles.row2}>
        <div className={styles.field}>
          <label htmlFor="site-phone-display">Phone (display)</label>
          <input
            id="site-phone-display"
            className={styles.input}
            value={phone_display}
            onChange={(e) => setPhoneDisplay(e.target.value)}
            maxLength={MAX.phone_display}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="site-phone-tel">Phone (tel: link)</label>
          <input
            id="site-phone-tel"
            className={styles.input}
            value={phone_tel}
            onChange={(e) => setPhoneTel(e.target.value)}
            placeholder="tel:+18055551212"
            maxLength={MAX.phone_tel}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="site-email">Email</label>
        <input
          id="site-email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={MAX.email}
        />
      </div>
      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Saving…" : "Save contact"}
      </button>
    </form>
  );
}
