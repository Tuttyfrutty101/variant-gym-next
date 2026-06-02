"use client";

import { useId, useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Methodology.module.css";

const PHASES = [
  {
    id: "test",
    label: "Test",
    body: "Sport science diagnostics map your body's strengths, imbalances, and injury risks with precision data.",
    startAngle: -135,
    endAngle: -45,
    labelAngle: -90,
  },
  {
    id: "treat",
    label: "Treat",
    body: "Hands on medical expertise addresses movement quality, pain points, and sets the foundation for performance.",
    startAngle: -45,
    endAngle: 45,
    labelAngle: 0,
  },
  {
    id: "train",
    label: "Train",
    body: "Your personalized program is built from your data, coached, tracked, and evolved as you progress.",
    startAngle: 45,
    endAngle: 135,
    labelAngle: 90,
  },
  {
    id: "live",
    label: "Live",
    body: "We help you integrate strength, recovery, and habits into everyday life so gains last beyond scheduled sessions.",
    startAngle: 135,
    endAngle: 225,
    labelAngle: 180,
  },
];

const CX = 100;
const CY = 100;
const R_OUTER = 92;
const R_INNER = 54;

function annularSectorPath(cx, cy, ro, ri, a0Deg, a1Deg) {
  const torad = (d) => (d * Math.PI) / 180;
  const cos = Math.cos;
  const sin = Math.sin;
  const rad0 = torad(a0Deg);
  const rad1 = torad(a1Deg);
  const pole = (r, ang) => [cx + r * cos(ang), cy + r * sin(ang)];
  const [x0o, y0o] = pole(ro, rad0);
  const [x1o, y1o] = pole(ro, rad1);
  const [x1i, y1i] = pole(ri, rad1);
  const [x0i, y0i] = pole(ri, rad0);
  const sweepDeg = a1Deg - a0Deg;
  const largeArc = sweepDeg > 180 ? 1 : 0;

  return (
    `M ${x0o} ${y0o}` +
    `A ${ro} ${ro} 0 ${largeArc} 1 ${x1o} ${y1o}` +
    `L ${x1i} ${y1i}` +
    `A ${ri} ${ri} 0 ${largeArc} 0 ${x0i} ${y0i}` +
    `Z`
  );
}

function labelPosition(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const r = (R_OUTER + R_INNER) / 2;
  const x = CX + r * Math.cos(rad);
  const y = CY + r * Math.sin(rad);
  return {
    left: `${(x / 200) * 100}%`,
    top: `${(y / 200) * 100}%`,
  };
}

export default function Methodology() {
  const [ref, visible] = useInView();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "") || "m";

  const [selectedId, setSelectedId] = useState(() => PHASES[0]?.id ?? "test");

  const shown = PHASES.find((p) => p.id === selectedId) ?? PHASES[0];
  const selectedIndex = PHASES.findIndex((p) => p.id === selectedId);

  const detailHeadingId = `methodology-phase-${uid}`;

  function onSegmentKeyDown(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedId(id);
    }
  }

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

      <div className={styles.wheelWrap}>
        <div className={styles.wheelCol}>
          <div className={styles.wheelPlate}>
            <svg viewBox="0 0 200 200" className={styles.wheelSvg} aria-hidden>
              <circle
                cx={CX}
                cy={CY}
                r={R_OUTER}
                className={styles.ringGuide}
              />
              {PHASES.map((phase) => (
                <path
                  key={phase.id}
                  d={annularSectorPath(
                    CX,
                    CY,
                    R_OUTER,
                    R_INNER,
                    phase.startAngle,
                    phase.endAngle,
                  )}
                  className={`${styles.segment} ${phase.id === selectedId ? styles.segmentActive : ""}`}
                  strokeLinejoin="round"
                  tabIndex={0}
                  role="button"
                  aria-label={`${phase.label}: ${phase.body}`}
                  aria-pressed={phase.id === selectedId}
                  onClick={(e) => {
                    setSelectedId(phase.id);
                    e.currentTarget.blur();
                  }}
                  onMouseEnter={() => setSelectedId(phase.id)}
                  onKeyDown={(e) => onSegmentKeyDown(e, phase.id)}
                />
              ))}
              <circle cx={CX} cy={CY} r={R_INNER - 1} className={styles.hubCircle} />
            </svg>

            {PHASES.map((phase) => {
              const pos = labelPosition(phase.labelAngle);
              const isActive = phase.id === selectedId;
              return (
                <span
                  key={`label-${phase.id}`}
                  className={`${styles.phaseLabel} ${isActive ? styles.phaseLabelActive : ""}`}
                  style={{ left: pos.left, top: pos.top }}
                  aria-hidden
                >
                  {phase.label}
                </span>
              );
            })}
          </div>

          <ol className={styles.phaseSteps} aria-label="Cycle steps">
            {PHASES.map((phase, i) => (
              <li key={phase.id}>
                <button
                  type="button"
                  className={`${styles.stepPill} ${phase.id === selectedId ? styles.stepPillActive : ""}`}
                  aria-pressed={phase.id === selectedId}
                  onClick={() => setSelectedId(phase.id)}
                >
                  {String(i + 1).padStart(2, "0")} {phase.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div
          className={styles.detailPanel}
          role="region"
          aria-labelledby={detailHeadingId}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className={styles.detailStep} aria-hidden>
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(PHASES.length).padStart(2, "0")}
          </p>
          <h3 id={detailHeadingId} className={styles.detailTitle}>
            {shown.label}
          </h3>
          <p className={styles.detailBody}>{shown.body}</p>
        </div>
      </div>
    </section>
  );
}
