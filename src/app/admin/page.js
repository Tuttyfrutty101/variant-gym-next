import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminHomePage() {
  return (
    <>
      <h1 className={styles.h1}>Dashboard</h1>
      <p className={styles.lead}>
        Edit site content stored in Supabase. Changes appear on the public site
        within about a minute (ISR).
      </p>
      <div className={styles.cardGrid}>
        <Link className={styles.cardLink} href="/admin/hours">
          Business hours (Mon–Sun)
        </Link>
        <Link className={styles.cardLink} href="/admin/contact">
          Contact (address, phone, email)
        </Link>
        <Link className={styles.cardLink} href="/admin/promotion">
          Spring / promo block
        </Link>
        <Link className={styles.cardLink} href="/admin/testimonials">
          Testimonials
        </Link>
      </div>
    </>
  );
}
