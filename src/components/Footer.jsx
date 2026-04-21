import styles from "./Footer.module.css";

const NAV = [
  { label: "Memberships", href: "#memberships" },
  { label: "Schedule", href: "#schedule" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOCIAL = [
  {
    label: "Instagram",
    abbr: "IG",
    href: "https://www.instagram.com/varianttraininglab/",
  },
  {
    label: "Facebook",
    abbr: "FB",
    href: "https://www.facebook.com/varianttraininglab",
  },
  {
    label: "LinkedIn",
    abbr: "LI",
    href: "https://www.linkedin.com/company/variant-training-lab/",
  },
  {
    label: "YouTube",
    abbr: "YT",
    href: "https://www.youtube.com/channel/UCwT96AWtQ9o9GQXcxpWeCCg",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <a href="#" className={styles.logo}>
            VARIANT
            <span className={styles.logoAccent}> TRAINING LAB</span>
          </a>

          <nav className={styles.nav} aria-label="Footer">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.abbr}
              </a>
            ))}
          </div>
        </div>

        <p className={styles.copy}>
          © 2026 Variant Training Lab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
