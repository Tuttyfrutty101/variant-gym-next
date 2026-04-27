import Link from "next/link";
import styles from "./SimpleMarketingSection.module.css";

export default function SimpleMarketingSection({
  kicker,
  title,
  children,
  primaryCta,
  secondaryCta,
}) {
  return (
    <section className={styles.section} aria-labelledby="page-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 id="page-heading">{title}</h1>
        {children}
        {(primaryCta || secondaryCta) && (
          <div className={styles.ctaRow}>
            {primaryCta ? (
              <Link href={primaryCta.href} className={styles.cta}>
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={`${styles.cta} ${styles.ctaSecondary}`}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
