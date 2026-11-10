import Link from "next/link";
import Script from "next/script";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Thank You",
  description: "Your request to meet with an expert trainer has been received.",
  robots: { index: false },
};

const bodyText = {
  fontFamily: "var(--sans)",
  fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
  lineHeight: 1.75,
  color: "rgba(212,198,183,0.85)",
  margin: "0 0 1.25rem",
};

const contactLink = {
  color: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
};

export default function SecondOpinionThankYouPage() {
  return (
    <main
      className="homeMarketingDark siteBelowNav"
      style={{ background: "var(--carbon)", minHeight: "100vh" }}
    >
      {/* Google tag (gtag.js) event - delayed navigation helper */}
      <Script id="gtag-send-event" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
  // Helper function to delay opening a URL until a gtag event is sent.
  // Call it in response to an action that should navigate to a URL.
  function gtagSendEvent(url) {
    var callback = function () {
      if (typeof url === 'string') {
        window.location = url;
      }
    };
    gtag('event', 'form_submission', {
      'event_callback': callback,
      'event_timeout': 2000,
      // <event_parameters>
    });
    return false;
  }
` }} />
      <section
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "6rem 1.5rem 7rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
            color: "var(--linen)",
            margin: "0 0 1.25rem",
            textTransform: "none",
            letterSpacing: "0.01em",
          }}
        >
          Meet with an Expert Trainer: Request Received
        </h1>
        <p style={bodyText}>
          A member of our team will contact you to match you with a trainer and
          schedule your session.
        </p>
        <p style={bodyText}>
          Want a faster response? Call, text, or email us.
        </p>
        <p style={{ ...bodyText, color: "var(--linen)" }}>
          <a href="tel:+18058378475" style={contactLink}>
            805-837-8475
          </a>
          {" · "}
          <a href="mailto:info@varianttraininglab.com" style={contactLink}>
            info@varianttraininglab.com
          </a>
        </p>
        <p style={{ ...bodyText, margin: "0 0 2.5rem" }}>
          Before your session, think about your goals and anything that&apos;s
          been bothering you.
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
          Back to Variant Training Lab
        </Link>
      </section>
      <Footer />
    </main>
  );
}
