"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import BusinessHoursList from "@/components/BusinessHoursList";
import styles from "./Contact.module.css";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  goals: "",
};

export default function Contact({ contactInfo, hours }) {
  const thankYouDialogRef = useRef(null);
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => {
      if (thankYouDialogRef.current?.open) thankYouDialogRef.current.close();
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null);
    };
  }

  function closeThankYou() {
    thankYouDialogRef.current?.close();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (thankYouDialogRef.current?.open) thankYouDialogRef.current.close();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          interest: form.interest,
          goals: form.goals.trim(),
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const msg =
          data && typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.";
        setError(msg);
        return;
      }

      setForm(INITIAL);
      thankYouDialogRef.current?.showModal();
      queueMicrotask(() => {
        document.getElementById("contact-book-tour")?.focus();
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={styles.inner}>
        <div>
          <p className={styles.infoTag}>Get Started</p>
          <h2 id="contact-heading" className={styles.infoHeading}>
            Begin Your Journey Here
          </h2>
          <p className={styles.infoBody}>
            Complete the form and our team will review your application and
            reach out to schedule a tour. Every membership begins with a
            comprehensive onboarding with a Lab Technician and Physical
            Therapist.
          </p>
          <ul className={styles.details}>
            <li>
              <span className={styles.icon} aria-hidden>
                ⌖
              </span>
              <span>{contactInfo.address}</span>
            </li>
            <li>
              <span className={styles.icon} aria-hidden>
                ☏
              </span>
              <a href={contactInfo.phoneTel} className={styles.detailLink}>
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <span className={styles.icon} aria-hidden>
                ✉
              </span>
              <a
                href={`mailto:${contactInfo.email}`}
                className={styles.detailLink}
              >
                {contactInfo.email}
              </a>
            </li>
            <li className={styles.hoursRow}>
              <span className={styles.icon} aria-hidden>
                ◷
              </span>
              <div className={styles.hoursWrap}>
                <BusinessHoursList
                  hours={hours}
                  tone="contact"
                  className={styles.hoursList}
                  id="contact-hours"
                />
              </div>
            </li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row2}>
            <div>
              <label className={styles.label} htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                className={styles.input}
                type="text"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={update("firstName")}
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                className={styles.input}
                type="text"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={update("lastName")}
              />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              className={styles.input}
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update("email")}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              className={styles.input}
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update("phone")}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="interest">
              Area of interest
            </label>
            <select
              id="interest"
              name="interest"
              className={styles.select}
              required
              value={form.interest}
              onChange={update("interest")}
            >
              <option value="">Select…</option>
              <option value="Performance">Performance</option>
              <option value="Physical Therapy">Physical Therapy</option>
              <option value="Exclusive Amenities">Exclusive Amenities</option>
              <option value="Health">Health</option>
              <option value="Athletes">Athletes</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={styles.label} htmlFor="goals">
              Goals & limitations
            </label>
            <textarea
              id="goals"
              name="goals"
              className={styles.textarea}
              rows={5}
              placeholder="Tell us about your goals, schedule, or anything we should know."
              value={form.goals}
              onChange={update("goals")}
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? "Sending…" : "Submit"}
          </button>

          {error ? (
            <p className={`${styles.feedback} ${styles.feedbackError}`}>
              {error}
            </p>
          ) : null}
        </form>
      </div>

      <dialog
        ref={thankYouDialogRef}
        className={styles.thankYouDialog}
        aria-labelledby="contact-thankyou-title"
        onClick={(e) => {
          if (e.target === thankYouDialogRef.current) {
            closeThankYou();
          }
        }}
      >
        <div
          className={styles.thankYouInner}
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeThankYou();
            }
          }}
        >
          <div
            className={styles.thankYouPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <p id="contact-thankyou-title" className={styles.thankYouText}>
              Thank you for reaching out to Variant Training Lab. We will be in
              touch shortly.
            </p>
            <Link
              id="contact-book-tour"
              href="/schedule"
              className={styles.thankYouTourBtn}
              onClick={closeThankYou}
            >
              Book a tour
            </Link>
          </div>
        </div>
      </dialog>
    </section>
  );
}
