import Footer from "@/components/Footer";
import Membership from "@/components/membership/Membership";

export const metadata = {
  title: "Membership",
  description:
    "Membership with benefits at Variant Training Lab—flexible commitments, onboarding included, unlimited training access, therapy, recovery modalities, and more in Santa Barbara.",
};

export default function MembershipPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Membership />
      </main>
      <Footer />
    </>
  );
}
