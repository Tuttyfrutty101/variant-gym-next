"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./Contact.module.css";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  goals: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setSuccess(null);
      setError(null);
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const interest = form.interest;
    const goals = form.goals.trim();

    const { error: submitError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone, interest, goals });

    setLoading(false);

    if (submitError) {
      setError(submitError.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSuccess(
      "Thank you — your message was received. Our team will be in touch soon.",
    );
    setForm(INITIAL);
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
              <span>314 Anacapa St., Santa Barbara, CA 93101</span>
            </li>
            <li>
              <span className={styles.icon} aria-hidden>
                ☏
              </span>
              <a href="tel:+18058378475" className={styles.detailLink}>
                (805) 837-8475
              </a>
            </li>
            <li>
              <span className={styles.icon} aria-hidden>
                ◷
              </span>
              <span>
                Mon–Thu: 6:30am–6:30pm, Fri: 6:30am–2:00pm, Sat: 8:00am–1:00pm,
                Sun: Closed
              </span>
            </li>
            <li>
              <span className={styles.icon} aria-hidden>
                ✉
              </span>
              <a
                href="mailto:info@varianttraininglab.com"
                className={styles.detailLink}
              >
                info@varianttraininglab.com
              </a>
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
              <option value="Recovery">Recovery</option>
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

          {success ? (
            <p className={`${styles.feedback} ${styles.feedbackSuccess}`}>
              {success}
            </p>
          ) : null}
          {error ? (
            <p className={`${styles.feedback} ${styles.feedbackError}`}>
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
