"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SecondOpinionModal.module.css";

const DAYS = [
  { id: "monday",    label: "Monday",    times: ["1–2pm", "2–3pm", "3–4pm"] },
  { id: "tuesday",   label: "Tuesday",   times: ["8–9am", "9–10am", "10–11am", "11–12pm"] },
  { id: "wednesday", label: "Wednesday", times: ["1–2pm", "2–3pm", "3–4pm"] },
  { id: "thursday",  label: "Thursday",  times: ["8–9am", "9–10am", "10–11am", "11–12pm"] },
];

const REASONS = [
  "Current injury or limitation",
  "Training",
  "Performance",
  "Sport-specific goal",
  "Strength assessment",
  "Other",
];

function simpleEmailOk(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function simplePhoneOk(v) {
  return v.replace(/\D/g, "").length >= 10;
}

const EMPTY = {
  name: "", email: "", phone: "",
  selectedDays: new Set(), selectedTimes: {},
  selectedReasons: new Set(), otherText: "",
};

export default function SecondOpinionModal() {
  const dialogRef = useRef(null);
  const router = useRouter();

  const [name,             setName]             = useState("");
  const [email,            setEmail]            = useState("");
  const [phone,            setPhone]            = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [selectedDays,    setSelectedDays]    = useState(() => new Set());
  const [selectedTimes,   setSelectedTimes]   = useState({});
  const [selectedReasons, setSelectedReasons] = useState(() => new Set());
  const [otherText, setOtherText] = useState("");

  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [serverError, setServerError] = useState(null);

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Listen for the custom trigger event fired by buttons elsewhere on the page
  useEffect(() => {
    window.addEventListener("open-so-modal", openModal);
    return () => window.removeEventListener("open-so-modal", openModal);
  }, [openModal]);

  // Lock scroll while open
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => {
      document.body.style.overflow = dialog.open ? "hidden" : "";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key handled natively by <dialog>; also reset after close
  function handleDialogClose() {
    document.body.style.overflow = "";
  }

  function clearErr(key) {
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function toggleDay(dayId) {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayId)) {
        next.delete(dayId);
        setSelectedTimes((t) => { const n = { ...t }; delete n[dayId]; return n; });
      } else {
        next.add(dayId);
      }
      return next;
    });
  }

  function toggleTime(dayId, time) {
    setSelectedTimes((prev) => {
      const s = new Set(prev[dayId] || []);
      s.has(time) ? s.delete(time) : s.add(time);
      return { ...prev, [dayId]: s };
    });
  }

  function toggleReason(reason) {
    setSelectedReasons((prev) => {
      const next = new Set(prev);
      next.has(reason) ? next.delete(reason) : next.add(reason);
      return next;
    });
    clearErr("otherText");
  }

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !simpleEmailOk(email.trim())) errs.email = "A valid email is required.";
    if (!phone.trim() || !simplePhoneOk(phone.trim())) errs.phone = "A valid phone number is required.";
    if (!preferredContact) errs.preferredContact = "Please select a preferred contact method.";
    if (selectedReasons.has("Other") && !otherText.trim()) {
      errs.otherText = "Please describe what else you'd like a second opinion on.";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError(null);

    const availability = DAYS
      .filter((d) => selectedDays.has(d.id))
      .map((d) => ({ day: d.label, times: Array.from(selectedTimes[d.id] || []) }));

    try {
      const res = await fetch("/api/second-opinion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), phone: phone.trim(),
          preferredContact,
          availability,
          reasons: Array.from(selectedReasons),
          otherText: otherText.trim(),
        }),
      });
      let data = null;
      try { data = await res.json(); } catch {}
      if (!res.ok) { setServerError(data?.error || "Something went wrong. Please try again."); return; }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "assessment_form_submit" });
      dialogRef.current?.close();
      router.push("/second-opinion/thank-you");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Click on the backdrop (dialog element itself) to close
  function handleDialogClick(e) {
    if (e.target === dialogRef.current) closeModal();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="so-modal-heading"
      aria-modal="true"
      onClick={handleDialogClick}
      onClose={handleDialogClose}
    >
      <div className={styles.panel}>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close"
          onClick={closeModal}
        >
          <svg viewBox="0 0 24 24" aria-hidden className={styles.closeIcon}>
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <header className={styles.modalHeader}>
          <p className={styles.tag}>Second Opinion Assessment</p>
          <h2 id="so-modal-heading" className={styles.heading}>
            Request Your Assessment
          </h2>
          <p className={styles.subheading}>
            No obligation. Expect a follow-up within 24–48 hours with confirmation and pricing.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="som-name">Full Name</label>
            <input id="som-name" type="text" autoComplete="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={name}
              onChange={(e) => { setName(e.target.value); clearErr("name"); }} />
            {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="som-email">Email</label>
            <input id="som-email" type="email" autoComplete="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearErr("email"); }} />
            {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="som-phone">Phone</label>
            <input id="som-phone" type="tel" autoComplete="tel"
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }} />
            {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Preferred Method of Contact</span>
            <div className={styles.pillGroup} role="group" aria-label="Preferred method of contact">
              {["Call", "Text", "Email"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.pill} ${preferredContact === option ? styles.pillActive : ""}`}
                  aria-pressed={preferredContact === option}
                  onClick={() => { setPreferredContact(option); clearErr("preferredContact"); }}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.preferredContact && <p className={styles.fieldError}>{errors.preferredContact}</p>}
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Preferred Availability</legend>
            <p className={styles.fieldHint}>Select the days and times that work best for you this week.</p>
            <div className={styles.daysGrid}>
              {DAYS.map((day) => (
                <div key={day.id} className={styles.dayBlock}>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" className={styles.checkbox}
                      checked={selectedDays.has(day.id)}
                      onChange={() => toggleDay(day.id)} />
                    <span className={styles.checkText}>{day.label}</span>
                  </label>
                  {selectedDays.has(day.id) && (
                    <div className={styles.timesWrap}>
                      {day.times.map((time) => (
                        <label key={time} className={`${styles.checkLabel} ${styles.timeLabel}`}>
                          <input type="checkbox" className={styles.checkbox}
                            checked={(selectedTimes[day.id] || new Set()).has(time)}
                            onChange={() => toggleTime(day.id, time)} />
                          <span className={styles.checkText}>{time}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>What are you hoping to get a second opinion on?</legend>
            <p className={styles.fieldHint}>Select all that apply.</p>
            <div className={styles.reasonsGrid}>
              {REASONS.map((reason) => (
                <label key={reason} className={styles.checkLabel}>
                  <input type="checkbox" className={styles.checkbox}
                    checked={selectedReasons.has(reason)}
                    onChange={() => toggleReason(reason)} />
                  <span className={styles.checkText}>{reason}</span>
                </label>
              ))}
            </div>
            {selectedReasons.has("Other") && (
              <div className={styles.otherWrap}>
                <label className={styles.label} htmlFor="som-other">Please describe</label>
                <input id="som-other" type="text"
                  className={`${styles.input} ${errors.otherText ? styles.inputError : ""}`}
                  placeholder="Tell us what you'd like a second opinion on"
                  value={otherText}
                  onChange={(e) => { setOtherText(e.target.value); clearErr("otherText"); }} />
                {errors.otherText && <p className={styles.fieldError}>{errors.otherText}</p>}
              </div>
            )}
          </fieldset>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Sending…" : "Request Second Opinion Assessment"}
          </button>

          {serverError && <p className={styles.serverError}>{serverError}</p>}
        </form>
      </div>
    </dialog>
  );
}
