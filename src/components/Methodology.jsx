"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./Methodology.module.css";

const STEPS = [
  {
    num: "01",
    title: "Test",
    body: "Sport science diagnostics map your body's strengths, imbalances, and injury risks with precision data.",
  },
  {
    num: "02",
    title: "Treat",
    body: "Hands-on medical expertise addresses movement quality, pain points, and sets the foundation for performance.",
  },
  {
    num: "03",
    title: "Train",
    body: "Your personalized program is built from your data — coached, tracked, and evolved as you progress.",
  },
];

export default function Methodology() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="methodology"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="methodology-heading"
    >
      <header className={styles.header}>
        <p className={styles.tag}>Our Approach</p>
        <h2 id="methodology-heading" className={styles.title}>
          How It Works
        </h2>
      </header>

      <div className={styles.track}>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.circle}>{step.num}</div>
              <div className={styles.stepCopy}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
