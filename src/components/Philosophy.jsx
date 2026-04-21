"use client";

import { Fragment } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Philosophy.module.css";

const ITEMS = [
  { title: "Test", subtitle: "Diagnostics & Data" },
  { title: "Treat", subtitle: "Therapy & Prevention" },
  { title: "Train", subtitle: "Performance & Results" },
];

export default function Philosophy() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-label="Our philosophy"
    >
      <div className={styles.row}>
        {ITEMS.map((item, i) => (
          <Fragment key={item.title}>
            {i > 0 ? <div className={styles.divider} aria-hidden /> : null}
            <div className={styles.item}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.subtitle}>{item.subtitle}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
