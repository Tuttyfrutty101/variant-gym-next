"use client";

import OfferingsSnapSection from "@/components/OfferingsSnapSection";
import { ATHLETES_PROGRAMS } from "@/data/athletesPrograms";

export default function AthletesOfferings() {
  return (
    <OfferingsSnapSection
      hideSectionHeader
      cornerTitle="Athletes"
      sectionAriaLabel="Athletes: pro sport, performance profiling, injury prevention, and game planning"
      items={ATHLETES_PROGRAMS}
      largeCardTitles
      defaultCtaText="Learn more"
      scrollTrackAriaLabel="Athlete programs. Swipe or scroll sideways to explore all four"
      plainDark
    />
  );
}
