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

const EXCLUSIVE_ACCESS_PROMO =
  "Get exclusive access to 1000+ exercises, personalized programs, nutrition, and travel programs.";

export default function TrainingOfferings() {
  return (
    <OfferingsSnapSection
      hideSectionHeader
      cornerTitle="Training"
      sectionAriaLabel="Training — Four ways to move with us"
      bottomPromoText={EXCLUSIVE_ACCESS_PROMO}
      items={ITEMS}
      largeCardTitles
      defaultCtaText="View training"
      scrollTrackAriaLabel="Training formats — swipe or scroll sideways to see all four"
    />
  );
}
