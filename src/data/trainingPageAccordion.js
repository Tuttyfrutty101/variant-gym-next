/**
 * Training page — Équinox-style accordion + media pane (order/content).
 * Drop your April small-group reel at: `public/videos/small-group-april.mp4` (exported from shoot).
 */

export const TRAINING_PAGE_ACCORDION = [
  {
    id: "personal-training",
    title: "Personal Training",
    paragraphs: [
      "For those looking for the most flexible and efficient training sessions led by expert coaches.",
    ],
    media: {
      kind: "image",
      src: "/images/DSC02524.jpg",
      alt: "Personal training at Variant Training Lab",
    },
  },
  {
    id: "small-group-privates",
    title: "Small Group Privates",
    paragraphs: [
      "The designated trainer works with a small group of people on their individualized program.",
    ],
    media: {
      kind: "video",
      src: "/videos/small-group-april.mp4",
      /** Shown before playback and while video loads */
      poster: "/images/DSC02099.jpg",
    },
  },
  {
    id: "signature-classes",
    title: "Signature Classes",
    paragraphs: ["Unlimited signature classes, 30 to 60 minutes."],
    exploreScheduleHref: "/schedule",
    exploreScheduleLabel: "Explore Schedule",
    media: {
      kind: "image",
      src: "/images/DSC02033.jpg",
      alt: "Signature class at Variant Training Lab",
    },
  },
  {
    id: "open-training",
    title: "Open Training",
    paragraphs: ["Train on your terms. Open Monday through Saturday."],
    media: {
      kind: "image",
      src: "/images/DSC02465.jpg",
      alt: "Open training at Variant Training Lab",
    },
  },
  {
    id: "engineered-results",
    title: "Engineered Results",
    paragraphs: [
      "Expert led physiological and performance assessments establish your foundation, with ongoing data tracking designed to measure progress, refine strategy, and support continuous improvement toward evolving goals.",
    ],
    testingOverviewDialog: true,
    media: {
      kind: "image",
      src: encodeURI("/images/Screenshot 2026-05-29 at 4.33.29\u202fPM.png"),
      alt: "Performance and physiological testing at Variant Training Lab",
    },
  },
];
