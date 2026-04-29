"use client";

import OfferingsSnapSection from "@/components/OfferingsSnapSection";
import { TRAINING_FORMATS } from "@/data/trainingFormats";

const ITEMS = TRAINING_FORMATS.map((f) => ({
  title: f.title,
  text: f.text,
  href: "/training",
  scheduleHref: f.scheduleHref,
  linkAriaLabel: `${f.title}: open training page`,
}));

const BOTTOM_PROMO = {
  eyebrow: "Digital access",
  heading: "1,000+ exercises & programs wherever you train",
  body: "Exclusive access to our full movement library, personalized programming, nutrition guidance, and travel workouts — built into your membership.",
  cta: { text: "Explore membership", href: "/membership" },
};

export default function TrainingOfferings() {
  return (
    <OfferingsSnapSection
      hideSectionHeader
      cornerTitle="Training"
      sectionAriaLabel="Training — Four ways to move with us"
      bottomPromo={BOTTOM_PROMO}
      items={ITEMS}
      largeCardTitles
      defaultCtaText="View training"
      scrollTrackAriaLabel="Training formats — swipe or scroll sideways to see all four"
    />
  );
}
