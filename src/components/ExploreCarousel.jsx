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
    text: "Clinical care, injury rehab, and prevention so you stay strong for the long run.",
    href: "/physical-therapy",
  },
  {
    title: "Recovery",
    text: "Modalities and space to restore your body between hard training and busy life.",
    href: "/recovery",
  },
  {
    title: "Athletes",
    text: "Dedicated support for competitors who need structure, data, and a team behind them.",
    href: "/athletes",
  },
];

const CARD_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80",
];

export default function ExploreCarousel() {
  return (
    <OfferingsSnapSection
      headingId="explore-offerings-heading"
      tag="Member experience"
      heading="Therapy, recovery, amenities, and athlete programs"
      items={ITEMS}
      cardEyebrow="Member experience"
      scrollTrackAriaLabel="Therapy, recovery, amenities, and athlete programs — swipe or scroll sideways to explore"
      cardBackgrounds={CARD_BACKGROUNDS}
      autoAdvanceCardMs={3000}
    />
  );
}
