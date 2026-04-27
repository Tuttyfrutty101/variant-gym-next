import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Variant Training Lab — schedule a tour, ask about memberships, or tell us your goals.",
};

export default function ContactPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
