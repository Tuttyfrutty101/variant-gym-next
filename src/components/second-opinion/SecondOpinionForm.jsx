"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./SecondOpinionForm.module.css";

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

export default function SecondOpinionForm() {
  const [ref, visible] = useInView();

  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const [selectedDays, setSelectedDays]   = useState(() => new Set());
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selectedReasons, setSelectedReasons] = useState(() => new Set());
  const [otherText, setOtherText] = useState("");

  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted]     = useState(false);

  function clearError(key) {
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
      const daySet = new Set(prev[dayId] || []);
      daySet.has(time) ? daySet.delete(time) : daySet.add(time);
      return { ...prev, [dayId]: daySet };
    });
  }

  function toggleReason(reason) {
    setSelectedReasons((prev) => {
      const next = new Set(prev);
      next.has(reason) ? next.delete(reason) : next.add(reason);
      return next;
    });
    clearError("otherText");
  }

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !simpleEmailOk(email.trim())) errs.email = "A valid email is required.";
    if (!phone.trim() || !simplePhoneOk(phone.trim())) errs.phone = "A valid phone number is required.";
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
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          availability,
          reasons: Array.from(selectedReasons),
          otherText: otherText.trim(),
        }),
      });

      let data = null;
      try { data = await res.json(); } catch {}

      if (!res.ok) {
        setServerError(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className={styles.section} aria-label="Assessment request confirmation">
        <div className={styles.inner}>
          <div className={styles.confirmation}>
            <p className={styles.confirmTitle}>Request received.</p>
            <p className={styles.confirmBody}>
              Thanks — no cost or commitment yet. Our team will reach out within
              24–48 hours to confirm your Second Opinion Assessment and find a
              time that works for you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="so-form-heading"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.tag}>Request the Assessment</p>
          <h2 id="so-form-heading" className={styles.heading}>
            Let&apos;s Find a Time
          </h2>
          <p className={styles.subheading}>
            No cost, no commitment. Fill out the form and our team will reach
            out within 24–48 hours to confirm.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="so-name">Full Name</label>
            <input
              id="so-name"
              type="text"
              autoComplete="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={name}
              onChange={(e) => { setName(e.target.value); clearError("name"); }}
            />
            {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="so-email">Email</label>
            <input
              id="so-email"
              type="email"
              autoComplete="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
            />
            {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="so-phone">Phone</label>
            <input
              id="so-phone"
              type="tel"
              autoComplete="tel"
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
            />
            {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
          </div>

          {/* Availability */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Preferred Availability</legend>
            <p className={styles.fieldHint}>
              Select the days and times that work best for you this week.
            </p>
            <div className={styles.daysGrid}>
              {DAYS.map((day) => (
                <div key={day.id} className={styles.dayBlock}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedDays.has(day.id)}
                      onChange={() => toggleDay(day.id)}
                    />
                    <span className={styles.checkText}>{day.label}</span>
                  </label>
                  {selectedDays.has(day.id) && (
                    <div className={styles.timesWrap}>
                      {day.times.map((time) => (
                        <label key={time} className={`${styles.checkLabel} ${styles.timeLabel}`}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={(selectedTimes[day.id] || new Set()).has(time)}
                            onChange={() => toggleTime(day.id, time)}
                          />
                          <span className={styles.checkText}>{time}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          {/* Reasons */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              What are you hoping to get a second opinion on?
            </legend>
            <p className={styles.fieldHint}>Select all that apply.</p>
            <div className={styles.reasonsGrid}>
              {REASONS.map((reason) => (
                <label key={reason} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedReasons.has(reason)}
                    onChange={() => toggleReason(reason)}
                  />
                  <span className={styles.checkText}>{reason}</span>
                </label>
              ))}
            </div>
            {selectedReasons.has("Other") && (
              <div className={styles.otherWrap}>
                <label className={styles.label} htmlFor="so-other">
                  Please describe
                </label>
                <input
                  id="so-other"
                  type="text"
                  className={`${styles.input} ${errors.otherText ? styles.inputError : ""}`}
                  placeholder="Tell us what you'd like a second opinion on"
                  value={otherText}
                  onChange={(e) => { setOtherText(e.target.value); clearError("otherText"); }}
                />
                {errors.otherText && (
                  <p className={styles.fieldError}>{errors.otherText}</p>
                )}
              </div>
            )}
          </fieldset>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Sending…" : "Request Second Opinion Assessment"}
          </button>

          {serverError && (
            <p className={styles.serverError}>{serverError}</p>
          )}
        </form>
      </div>
    </section>
  );
}
