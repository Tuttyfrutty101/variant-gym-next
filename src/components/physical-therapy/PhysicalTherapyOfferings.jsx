"use client";

import OfferingsSnapSection from "@/components/OfferingsSnapSection";
import { PHYSICAL_THERAPY_SERVICES } from "@/data/physicalTherapyServices";

const CLINICAL_SERVICES_BG = "/images/DSC02301.jpg";

export default function PhysicalTherapyOfferings() {
  return (
    <OfferingsSnapSection
      hideSectionHeader
      cornerTitle="Clinical services"
      sectionAriaLabel="Clinical services — Physical therapy, rehab, peri-operative care, and education"
      items={PHYSICAL_THERAPY_SERVICES}
      largeCardTitles
      defaultCtaText="Contact us"
      scrollTrackAriaLabel="Physical therapy services — swipe or scroll sideways to explore all four"
      backgroundImageUrl={CLINICAL_SERVICES_BG}
      ambientDark
    />
  );
}
