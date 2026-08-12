import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Thank You",
  description: "Your Second Opinion Assessment request has been received.",
  robots: { index: false },
};

export default function SecondOpinionThankYouPage() {
  return (
    <main
      className="homeMarketingDark siteBelowNav"
      style={{ background: "var(--carbon)", minHeight: "100vh" }}
    >
      <section
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "6rem 1.5rem 7rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}
        >
          Second Opinion Assessment
        </p>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
            color: "var(--linen)",
            margin: "0 0 1.25rem",
          }}
        >
          Request Received
        </h1>
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
            lineHeight: 1.75,
            color: "rgba(212,198,183,0.85)",
            margin: "0 0 2.5rem",
          }}
        >
          No obligation. Our team will reach out within 24–48 hours with
          confirmation and pricing, and to find a time that works for you.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.88rem 1.85rem",
            fontFamily: "var(--sans)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--linen)",
            background: "transparent",
            border: "1px solid rgba(212,198,183,0.4)",
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </section>
      <Footer />
    </main>
  );
}
