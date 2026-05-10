import styles from "./ScheduleBooking.module.css";

/** GymMaster portal — non-member consultation / class booking */
export const GYMMASTER_BOOK_URL =
  "https://varianttraininglab.gymmasteronline.com/portal/account/book/class/824727?session_id=e134d990-4798-4354-af48-d55095c01f2c";

export default function ScheduleBooking() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker}>Consultation</p>
        <h1 className={styles.title}>Book a consultation</h1>
        <p className={styles.lead}>
          Non-members can reserve a consultation through our booking portal. Use
          the calendar below—or open it in a new tab if it doesn&apos;t load here.
        </p>
        <p className={styles.fallback}>
          <a
            href={GYMMASTER_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fallbackLink}
          >
            Open booking page in a new tab
          </a>
        </p>
      </header>

      <div className={styles.embedOuter}>
        <div className={styles.embedWrap}>
          <iframe
            src={GYMMASTER_BOOK_URL}
            title="Book a consultation — Variant Training Lab (GymMaster)"
            className={styles.embed}
            allow="payment; fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
