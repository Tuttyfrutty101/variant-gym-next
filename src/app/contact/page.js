import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/siteContent";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Variant Training Lab — schedule a tour, ask about memberships, or tell us your goals.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const site = await getSiteContent();

  return (
    <>
      <main className="siteBelowNav">
        <Contact contactInfo={site.contact} hours={site.hours} />
      </main>
      <Footer />
    </>
  );
}
