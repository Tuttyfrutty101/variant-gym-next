"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";
import styles from "./SecondOpinionModal.module.css";

const CONTACT_METHODS = ["Call", "Text"];

// `value` is what the handler receives; "Other" tells it to save the free-text box.
const GOALS = [
  { label: "Get stronger", value: "Get stronger" },
  { label: "Build muscle or lose weight", value: "Build muscle or lose weight" },
  { label: "Move better or feel less pain", value: "Move better or feel less pain" },
  { label: "Improve performance for my sport", value: "Improve performance for my sport" },
  { label: "Something else", value: "Other" },
];

const FOR_WHOM = ["Myself", "My child (youth athlete)"];
const START_TIMING = ["This week", "Within 2 weeks", "Before the new year", "Just exploring"];
const MEET_TIMES = ["Morning", "Afternoon", "Evening"];

function simpleEmailOk(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function simplePhoneOk(v) {
  return v.replace(/\D/g, "").length >= 10;
}

function ChoiceGroup({ name, options, value, onChange, columns }) {
  return (
    <div className={`${styles.choices} ${styles[columns]}`}>
      {options.map((option) => (
        <label
          key={option}
          className={`${styles.choice} ${value === option ? styles.choiceSelected : ""}`}
        >
          <input
            type="radio"
            name={name}
            className={styles.radio}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span className={styles.choiceText}>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default function SecondOpinionModal() {
  const dialogRef = useRef(null);
  const router = useRouter();

  const [name,             setName]             = useState("");
  const [email,            setEmail]            = useState("");
  const [phone,            setPhone]            = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [selectedGoals,    setSelectedGoals]    = useState(() => new Set());
  const [otherText,        setOtherText]        = useState("");
  const [forWhom,          setForWhom]          = useState("");
  const [startTiming,      setStartTiming]      = useState("");
  const [meetTime,         setMeetTime]         = useState("");
  const [additionalInfo,   setAdditionalInfo]   = useState("");

  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [serverError, setServerError] = useState(null);
  const [dialogOpen,  setDialogOpen]  = useState(false);

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
      const open = dialog.open;
      document.body.style.overflow = open ? "hidden" : "";
      setDialogOpen(open);
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

  function toggleGoal(value) {
    setSelectedGoals((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !simpleEmailOk(email.trim())) errs.email = "A valid email is required.";
    if (!phone.trim() || !simplePhoneOk(phone.trim())) errs.phone = "A valid phone number is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const turnstileToken =
      e.currentTarget.querySelector('[name="cf-turnstile-response"]')?.value ?? "";
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError(null);

    // Keep typed "something else" text even if its checkbox wasn't ticked.
    const reasons = Array.from(selectedGoals);
    if (otherText.trim() && !reasons.includes("Other")) reasons.push("Other");
    const availability = meetTime ? [{ day: meetTime, times: [] }] : [];

    try {
      const res = await fetch("/api/second-opinion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), phone: phone.trim(),
          preferredContact,
          availability,
          reasons,
          otherText: otherText.trim(),
          forWhom,
          startTiming,
          additionalInfo: additionalInfo.trim(),
          turnstileToken,
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

        <p className={styles.wordmark}>Variant Training Lab</p>

        <header className={styles.modalHeader}>
          <p className={styles.eyebrow}>Santa Barbara · Meet with an expert trainer</p>
          <h2 id="so-modal-heading" className={styles.heading}>
            Match with a trainer
          </h2>
          <p className={styles.intro}>
            Complete the form with your goals, and someone from our team will get
            in touch to book your first session and to match you with a trainer.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          <section className={styles.section} aria-labelledby="som-about">
            <h3 id="som-about" className={styles.sectionLabel}>About you</h3>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="som-name">
                Full name <span className={styles.required} aria-hidden>*</span>
              </label>
              <input id="som-name" type="text" autoComplete="name" aria-required="true"
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                value={name}
                onChange={(e) => { setName(e.target.value); clearErr("name"); }} />
              {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="som-email">
                Email <span className={styles.required} aria-hidden>*</span>
              </label>
              <input id="som-email" type="email" autoComplete="email" aria-required="true"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearErr("email"); }} />
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="som-phone">
                Phone <span className={styles.required} aria-hidden>*</span>
              </label>
              <input id="som-phone" type="tel" autoComplete="tel" aria-required="true"
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                value={phone}
                onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }} />
              {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Best way to reach you</legend>
              <ChoiceGroup name="som-contact" options={CONTACT_METHODS} columns="cols2"
                value={preferredContact} onChange={setPreferredContact} />
            </fieldset>
          </section>

          <fieldset className={`${styles.section} ${styles.fieldset}`}>
            <legend className={styles.sectionLabel}>
              What are you hoping to work on?
              <span className={styles.hint}>Select all that apply.</span>
            </legend>
            <div className={styles.choices}>
              {GOALS.map((goal) => (
                <label
                  key={goal.value}
                  className={`${styles.choice} ${selectedGoals.has(goal.value) ? styles.choiceSelected : ""}`}
                >
                  <input type="checkbox" className={styles.checkbox}
                    checked={selectedGoals.has(goal.value)}
                    onChange={() => toggleGoal(goal.value)} />
                  <span className={styles.choiceText}>{goal.label}</span>
                </label>
              ))}
            </div>
            <input type="text" aria-label="If something else, tell us in a few words (optional)"
              className={styles.input}
              placeholder="If something else, tell us in a few words (optional)"
              maxLength={500}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)} />
          </fieldset>

          <fieldset className={`${styles.section} ${styles.fieldset}`}>
            <legend className={styles.sectionLabel}>Who is this for?</legend>
            <ChoiceGroup name="som-for-whom" options={FOR_WHOM} columns="cols2"
              value={forWhom} onChange={setForWhom} />
          </fieldset>

          <fieldset className={`${styles.section} ${styles.fieldset}`}>
            <legend className={styles.sectionLabel}>When would you like to start?</legend>
            <ChoiceGroup name="som-start" options={START_TIMING} columns="cols2"
              value={startTiming} onChange={setStartTiming} />
          </fieldset>

          <fieldset className={`${styles.section} ${styles.fieldset}`}>
            <legend className={styles.sectionLabel}>Best time to meet</legend>
            <ChoiceGroup name="som-meet-time" options={MEET_TIMES} columns="cols3"
              value={meetTime} onChange={setMeetTime} />
          </fieldset>

          <section className={styles.section}>
            <label className={styles.sectionLabel} htmlFor="som-additional">
              Anything else we should know?{" "}
              <span className={styles.optional}>(optional)</span>
            </label>
            <textarea id="som-additional" rows={4}
              className={`${styles.input} ${styles.textarea}`}
              placeholder="For example: an injury, a sport, or what you've tried before."
              maxLength={2000}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)} />
          </section>

          {dialogOpen ? <TurnstileWidget /> : null}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Sending…" : "Match me with a trainer"}
          </button>

          {serverError && <p className={styles.serverError}>{serverError}</p>}
        </form>
      </div>
    </dialog>
  );
}
