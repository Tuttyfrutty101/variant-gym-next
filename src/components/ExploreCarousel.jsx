"use client";

import OfferingsSnapSection from "@/components/OfferingsSnapSection";

const ITEMS = [
  {
    title: "Exclusive Amenities",
    text: "Locker lounge, premium showers, and member details that elevate every visit.",
    href: "/exclusive-amenities",
  },
  {
    title: "Physical Therapy",
    text: "In house clinical care, injury rehab, and mobility maintenance.",
    href: "/physical-therapy",
  },
  {
    title: "Health",
    text: "Advance recovery modalities to restore the body between training sessions and busy life.",
    href: "/health",
  },
  {
    title: "Athletes",
    text: "Dedicated support for competitors who need structure, data, and a team behind them.",
    href: "/athletes",
  },
];

const CARD_BACKGROUNDS = [
  "/images/sauna.jpg",
  encodeURI("/images/Screenshot 2026-05-23 at 6.45.37 PM.png"),
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80",
];

export default function ExploreCarousel() {
  return (
    <OfferingsSnapSection
      hideSectionHeader
      cornerTitle="Membership experience"
      sectionAriaLabel="Membership experience: therapy, health, amenities, and athlete programs"
      items={ITEMS}
      largeCardTitles
      scrollTrackAriaLabel="Therapy, health, amenities, and athlete programs. Swipe or scroll sideways to explore"
      cardBackgrounds={CARD_BACKGROUNDS}
      autoAdvanceCardMs={3000}
      ambientDark
    />
  );
}
