"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./TrainerSessionLanding.module.css";

const HERO_IMG = "/images/DSC02393.jpg";

const OFFER_LINE = "60 minutes · $100 · Limited until end of 2026";

const STEPS = [
  { label: "Step 1", title: "Fill out the form" },
  {
    label: "Step 2",
    title: "Get matched.",
    body: "We connect you with an expert trainer, then schedule your session.",
  },
  { label: "Step 3", title: "Leave with a plan" },
];

const INCLUDED = [
  "A clear answer to why you haven't reached your goal yet",
  "An honest read on whether your goal is realistic, what it takes, and the first steps",
  "Your training and health history reviewed, so nothing important gets missed",
  "A complimentary strength or movement test that shows where your body is today",
  "Strength and performance experts, not generic personal trainers",
];

const WHO_FOR = [
  {
    label: "Stuck on results",
    text: "Training hard, but not seeing what you expected.",
  },
  {
    label: "Curious about expert eyes",
    text: "Want to see what a trainer notices that others miss.",
  },
  {
    label: "Measuring progress",
    text: "Already train, and want clear goals and strength testing.",
  },
  {
    label: "Coming back",
    text: "Returning from an injury or a long break.",
  },
  {
    label: "Ready now",
    text: "Want to make a change now, not after the new year.",
  },
];

const FAQS = [
  {
    q: "Do I need to be a member?",
    a: "No. The 1:1 meeting is open to anyone.",
  },
  {
    q: "What happens after I book?",
    a: "Our team reaches out to match you with a trainer and schedule your session.",
  },
];

// Opens the existing SecondOpinionModal form rendered on this page.
function BookButton({ className }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-so-modal"))}
    >
      Book a 1:1 with a trainer
    </button>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 8l3.5 3.5L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Reveal({ as: Tag = "section", className, children, ...rest }) {
  const [ref, visible] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${className} ${visible ? styles.visible : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function TrainerSessionLanding() {
  return (
    <>
      <Reveal as="header" className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_IMG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Santa Barbara · Be prepared</p>
          <h1 className={styles.headline}>
            Meet an Expert Trainer Before the January Rush.
          </h1>
          <p className={styles.lede}>
            Be prepared. Meet with an expert trainer for 60 minutes, find out if
            we&apos;re the right fit, and move to your plan either way.
          </p>
          <BookButton className={styles.cta} />
          <p className={styles.offerLine}>{OFFER_LINE}</p>
        </div>
      </Reveal>

      <Reveal className={styles.section} aria-labelledby="tsl-steps-heading">
        <div className={styles.innerWide}>
          <h2 id="tsl-steps-heading" className={styles.sectionTitle}>
            How it works
          </h2>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.label} className={styles.step}>
                <p className={styles.stepLabel}>{step.label}</p>
                <p className={styles.stepTitle}>{step.title}</p>
                {step.body && <p className={styles.stepBody}>{step.body}</p>}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className={styles.section} aria-labelledby="tsl-included-heading">
        <div className={styles.inner}>
          <h2 id="tsl-included-heading" className={styles.sectionTitle}>
            In 60 minutes you get
          </h2>
          <ul className={styles.checkItems}>
            {INCLUDED.map((item) => (
              <li key={item} className={styles.checkItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className={styles.section} aria-labelledby="tsl-who-heading">
        <div className={styles.inner}>
          <h2 id="tsl-who-heading" className={styles.sectionTitle}>
            Who this is for
          </h2>
          <ul className={styles.whoItems}>
            {WHO_FOR.map((item) => (
              <li key={item.label} className={styles.whoItem}>
                <span className={styles.whoLabel}>{item.label}:</span>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className={styles.section} aria-labelledby="tsl-faq-heading">
        <div className={styles.inner}>
          <h2 id="tsl-faq-heading" className={styles.sectionTitle}>
            Quick answers
          </h2>
          <dl className={styles.faqs}>
            {FAQS.map((faq) => (
              <div key={faq.q} className={styles.faq}>
                <dt className={styles.faqQ}>{faq.q}</dt>
                <dd className={styles.faqA}>{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal className={styles.band} aria-labelledby="tsl-band-heading">
        <div className={styles.bandInner}>
          <h2 id="tsl-band-heading" className={styles.bandTitle}>
            Get answers. Book your one-on-one now.
          </h2>
          <p className={styles.bandOffer}>{OFFER_LINE}</p>
          <BookButton className={styles.bandCta} />
        </div>
      </Reveal>
    </>
  );
}
