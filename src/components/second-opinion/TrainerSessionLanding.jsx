"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import styles from "./TrainerSessionLanding.module.css";

const HERO_IMG = "/images/trainer-consult-desk.jpg";

const OFFER_LINE = "60 minutes · $100 · Limited until end of 2026";

const STEPS = [
  {
    label: "Step 1",
    title: "Fill out the form",
    body: "Share your goals and when you'd like to start, so we can match you with the right trainer.",
  },
  {
    label: "Step 2",
    title: "Get matched.",
    body: "We connect you with an expert trainer, then schedule your session.",
  },
  {
    label: "Step 3",
    title: "Leave with a plan",
    body: "Walk away with clear goals and next steps, whether you train with us or on your own.",
  },
];

const INCLUDED = [
  "A clear answer to why you haven't reached your goal yet",
  "An honest read on whether your goal is realistic, what it takes, and the first steps",
  "Your training and health history reviewed, so nothing important gets missed",
  "A complimentary strength or movement test that shows where your body is today",
  "Strength and performance experts, not generic personal trainers",
];

// Quoted from Google reviews (spelling fixed in Matt's); all three are 5-star reviews.
const REVIEW_STARS = 5;

const REVIEWS = [
  {
    quote:
      "I had never lifted weights and wanted guidance. I have gotten SO much more than that in the 4+ years I have been with Variant. I have been able to stick to a consistent and personalized workout plan - both using their App and with their personal trainers who are ready to help.",
    name: "Amanda S.",
  },
  {
    quote:
      "I have been suffering from lower back pain for the past few years and decided to try and improve my mobility. Through the guidance and support of the extremely knowledgeable trainers, I've made huge improvements in my health and well-being.",
    name: "Matt M.",
  },
  {
    quote:
      "I have been going to Variant for over two years and it's the first gym that has kept me coming in the door. The trainers are so knowledgeable and helpful and make sure I am doing things right so I don't hurt myself and get the most out of each exercise.",
    name: "Laura W.",
  },
];

const WHO_FOR = [
  {
    label: "You're stuck on results",
    text: "You're training hard, but for some reason you're not seeing what you expected.",
  },
  {
    label: "You're curious what an expert sees",
    text: "You want to know what a trainer notices that others miss.",
  },
  {
    label: "You want to measure your progress",
    text: "You already train, and you want clear goals and strength testing to track it.",
  },
  {
    label: "You're coming back",
    text: "You're returning from an injury or a long break and want to do it right.",
  },
  {
    label: "You're ready now",
    text: "You want to make a change now, not after the new year.",
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

function ReviewBadgeIcon() {
  return (
    <svg className={styles.badgeIcon} viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.6"
        fill="none"
        stroke="var(--linen)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ count }) {
  return (
    <p className={styles.stars} role="img" aria-label={`Rated ${count} out of 5`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className={styles.star} viewBox="0 0 16 16" aria-hidden>
          <path
            d="M8 1.2l2.03 4.32 4.72.58-3.48 3.24.9 4.68L8 11.7l-4.17 2.32.9-4.68L1.25 6.1l4.72-.58z"
            fill="currentColor"
          />
        </svg>
      ))}
    </p>
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
          <p className={styles.eyebrow}>Santa Barbara</p>
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>Meet with an expert trainer</span>{" "}
            <span className={styles.headlineLine}>before New Year&apos;s Eve.</span>
          </h1>
          <p className={styles.lede}>
            Meet with a trainer for 60 minutes to set actionable goals, overcome
            plateaus, address body composition, and discuss longevity planning.
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
        <div className={styles.innerWide}>
          <h2 id="tsl-included-heading" className={styles.sectionTitle}>
            Consultation includes:
          </h2>
          <div className={styles.includesLayout}>
            <div className={styles.includesImageWrap}>
              <Image
                src="/images/trainer-body-composition-test.jpg"
                alt="A Variant trainer talking with a client during a body composition scan"
                fill
                sizes="(max-width: 767px) 100vw, 320px"
                className={styles.includesImage}
              />
            </div>
            <ul className={styles.checkItems}>
              {INCLUDED.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.section} aria-labelledby="tsl-reviews-heading">
        <div className={styles.innerWide}>
          <h2 id="tsl-reviews-heading" className={styles.sectionTitle}>
            Real people, real results
          </h2>
          <ul className={styles.reviews}>
            {REVIEWS.map((review) => (
              <li key={review.name} className={styles.review}>
                <p className={styles.badge}>
                  <ReviewBadgeIcon />
                  Google review
                </p>
                <Stars count={REVIEW_STARS} />
                <blockquote className={styles.reviewQuote}>
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <p className={styles.reviewName}>{review.name}</p>
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
