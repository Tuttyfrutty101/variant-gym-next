/** Training page Welcome Week journey (onboarding narrative). */

export const WELCOME_WEEK_INTRO =
  "Your first days at Variant are structured to build clarity, confidence, and momentum, from baseline testing through recovery and ongoing progress.";

export const WELCOME_WEEK_PHASES = [
  {
    id: "testing-phase",
    step: "01",
    title: "Testing Phase",
    paragraphs: [
      "Every member journey begins with expert led performance and physiological testing designed to understand how the body moves, performs, recovers, and adapts. From biomechanics and strength assessments to recovery and clinical insights from our physical therapy team, the Variant staff establishes a clear baseline to guide programming, progress tracking, and long term performance optimization.",
    ],
    image: "/images/DSC02562.jpg",
    imageAlt: "Performance and physiological testing at Variant Training Lab",
  },
  {
    id: "getting-started",
    step: "02",
    title: "Getting Started with Training",
    paragraphs: [
      "The first week is designed to build familiarity with training structure, equipment, programming, and daily workflow inside the facility. Members are encouraged to take advantage of the included small group private coaching sessions, where trainers walk through individualized programs step by step to ensure confidence, understanding, and proper execution from day one.",
    ],
    goalsHeading: "Main Goals During Week One",
    goals: [
      "Learn the customized training program",
      "Become comfortable navigating the training and recovery apps",
      "Understand movement standards and training flow",
      "Establish consistency and routine within the facility",
    ],
    image: "/images/DSC02601.jpg",
    imageAlt: "Coach led training at Variant Training Lab",
  },
  {
    id: "recovery",
    step: "03",
    title: "Optimize Recovery Services",
    paragraphs: [
      "Recovery is integrated into the Variant system from the start. During the first week, members are encouraged to explore the recovery modalities and regeneration services best suited to daily training demands, recovery status, and overall wellness goals.",
    ],
    cta: { label: "Explore Amenities", href: "/exclusive-amenities" },
    image: "/images/sauna.jpg",
    imageAlt: "Recovery sauna at Variant Training Lab",
  },
  {
    id: "progress-check-in",
    step: "04",
    title: "Progress Check In",
    paragraphs: [
      "Variant programming is designed to evolve alongside member progress. At any point throughout membership, consultations can be scheduled with a trainer to review programming, discuss goals, and make adjustments based on performance, recovery, or lifestyle changes.",
      "To establish meaningful performance data and measurable adaptation, reassessment and strength retesting is typically recommended after approximately six weeks of consistent training.",
    ],
    image: "/images/DSC02291-Edit.jpg",
    imageAlt: "Member progress check in at Variant Training Lab",
  },
];
