"use client";

import OfferingsSnapSection from "@/components/OfferingsSnapSection";

const ITEMS = [
  {
    title: "Personal Training",
    text: "One-on-one coaching built around your body, schedule, and performance goals.",
    href: "/training",
  },
  {
    title: "Signature Classes",
    text: "Expert-led sessions in a motivating group setting — structure without guesswork.",
    href: "/training",
  },
  {
    title: "Small Group Privates",
    text: "Semi-private coaching for individualized attention with the energy of a small team.",
    href: "/training",
  },
  {
    title: "Open Training",
    text: "Floor access and premium equipment when you want to train on your own terms.",
    href: "/training",
  },
];

export default function TrainingOfferings() {
  return (
    <OfferingsSnapSection
      headingId="training-offerings-heading"
      tag="Training"
      heading="Four ways to move with us"
      items={ITEMS}
      cardEyebrow="Training"
      defaultCtaText="View training"
      scrollTrackAriaLabel="Training formats — swipe or scroll sideways to see all four"
    />
  );
}
