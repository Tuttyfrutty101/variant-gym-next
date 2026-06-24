import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Variant Training Lab.",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main
        className="homeMarketingDark siteBelowNav"
        style={{ background: "var(--carbon)", minHeight: "100vh" }}
      >
        <article
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "4rem 1.5rem 5rem",
            color: "rgba(212,198,183,0.92)",
            fontFamily: "var(--sans)",
            lineHeight: 1.75,
          }}
        >
          <h1
            style={{
              color: "var(--linen)",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Privacy Policy
          </h1>

          <p style={{ color: "var(--pewter)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
            Variant Training Lab &mdash; 314 Anacapa St., Santa Barbara, CA 93101
            <br />
            Last Updated: June 17, 2026
          </p>

          <Section title="Overview">
            <p>
              Variant Training Lab (&ldquo;Variant,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) provides training, physical therapy, recovery, and related wellness
              services in Santa Barbara, California, and operates the website
              varianttraininglab.com. This policy explains what personal information we collect, how
              we use it, and the privacy rights of California residents under the California Consumer
              Privacy Act, as amended by the California Privacy Rights Act (the &ldquo;CCPA&rdquo;).
            </p>
            <p>
              It applies to information we collect through our website, our app, our facility, and
              our services. It does not apply to information covered by the separate terms described
              in the next section.
            </p>
          </Section>

          <Section title="Information Covered by Separate Terms">
            <p>
              Some clinical and equipment-based services are governed by terms in addition to this
              policy.
            </p>
            <p>
              <strong style={{ color: "var(--linen)" }}>Physical therapy and clinical care.</strong>{" "}
              Medical records created by licensed healthcare providers are protected under HIPAA and
              the California Confidentiality of Medical Information Act and are handled under our
              separate Notice of Privacy Practices, not under this policy.
            </p>
            <p>
              <strong style={{ color: "var(--linen)" }}>Testing and assessment equipment.</strong>{" "}
              Certain performance and diagnostic equipment requires you to accept separate terms and
              conditions before use. Information gathered through that equipment is governed by those
              terms in addition to this policy.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              We collect the following categories of personal information, mostly directly from you
              and from your use of our services.
            </p>
            <CategoryList
              items={[
                {
                  label: "Contact and identity",
                  detail: "Name, email, phone, mailing address, IP address",
                },
                {
                  label: "Account and billing",
                  detail: "Membership details, payment information, emergency contact",
                },
                {
                  label: "Service activity",
                  detail:
                    "Sessions and classes booked, visit history, website and app usage",
                },
                {
                  label: "Health and training (sensitive)",
                  detail:
                    "Goals and limitations, injury and rehabilitation notes, assessment and performance results, body measurements, nutrition information",
                },
                {
                  label: "Insights",
                  detail:
                    "Personalized programming and progress recommendations based on the above",
                },
              ]}
            />
            <p>
              Your health and training information is &ldquo;sensitive personal information&rdquo;
              under the CCPA. We use it only to deliver and improve the services you ask for, such
              as building your programming, guiding your recovery, and tracking your progress. We
              never use it to profile you for unrelated purposes, and we never sell or share it.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use personal information to:</p>
            <BulletList
              items={[
                "Provide and personalize your training, physical therapy, recovery, and membership.",
                "Onboard you, run assessments, and design your programming.",
                "Schedule sessions and manage your account and payments.",
                "Communicate with you about appointments, services, and your questions.",
                "Operate, secure, and improve our website and app.",
                "Meet legal obligations and protect the safety of our members and staff.",
                "Feature your testimonial, photo, or video in marketing, only with your separate consent.",
              ]}
            />
          </Section>

          <Section title="How We Share Your Information">
            <p>
              We do not sell your personal information, and we do not share it for cross-context
              behavioral advertising. We have not done either in the past 12 months.
            </p>
            <p>
              We disclose information only to service providers who help us run the business, such
              as our hosting, scheduling, membership, payment, and communications providers. They
              are contractually limited to using your information only to perform services for us.
              We may also disclose information when the law requires it, to protect rights and
              safety, or in connection with a business sale or transfer.
            </p>
          </Section>

          <Section title="How Long We Keep It">
            <p>
              We keep each type of information only as long as needed to provide your services,
              maintain your membership history, and meet our legal, tax, and recordkeeping
              obligations. When it is no longer needed, we delete or de-identify it. Clinical
              records are kept for the period required by California licensure rules.
            </p>
          </Section>

          <Section title="Your Privacy Rights">
            <p>If you are a California resident, you have the right to:</p>
            <BulletList
              items={[
                "Know and access the personal information we have collected about you.",
                "Delete personal information we collected from you, subject to legal exceptions.",
                "Correct inaccurate personal information we hold about you.",
                "Limit the use of your sensitive information. We already limit ours to providing your services.",
                "Opt out of the sale or sharing of your information. We do not sell or share, so there is nothing to opt out of.",
                "Be free from discrimination for exercising any of these rights.",
              ]}
            />
          </Section>

          <Section title="How to Exercise Your Rights">
            <p>
              Contact us by email at{" "}
              <a
                href="mailto:info@varianttraininglab.com"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                info@varianttraininglab.com
              </a>
              , by phone at{" "}
              <a href="tel:+18058378475" style={{ color: "var(--accent)", textDecoration: "none" }}>
                (805) 837-8475
              </a>
              , or by mail at the address above. We will verify your identity before responding,
              usually by confirming details we already have. An authorized agent may submit a
              request with proof of authorization. We respond within 45 days and will let you know
              if we need a short extension.
            </p>
          </Section>

          <Section title="Opt-Out Preference Signals">
            <p>
              Some browsers send a Global Privacy Control signal. Because we do not sell or share
              personal information, there is nothing for the signal to stop. If our practices ever
              change, we will honor a valid signal for that browser or device.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Our website uses cookies and similar technologies to keep the site working, remember
              your preferences, and understand how the site is used so we can improve it. You can
              control cookies through your browser settings.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Our services are for adults, and for minors only with a parent or guardian involved.
              We do not knowingly collect information online from children under 13 without parental
              consent, and we never sell or share a minor&rsquo;s information.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use reasonable physical, technical, and administrative safeguards to protect your
              information. No system is perfectly secure, so we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this policy from time to time. We will revise the date above when we
              do, and your continued use of our services means you accept the updated policy.
            </p>
          </Section>

          <Section title="Contact Us" last>
            <address style={{ fontStyle: "normal" }}>
              Variant Training Lab
              <br />
              314 Anacapa St., Santa Barbara, CA 93101
              <br />
              <a
                href="mailto:info@varianttraininglab.com"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                info@varianttraininglab.com
              </a>
              <br />
              <a href="tel:+18058378475" style={{ color: "var(--accent)", textDecoration: "none" }}>
                (805) 837-8475
              </a>
            </address>
          </Section>
        </article>
        <Footer />
      </main>
    </>
  );
}

function Section({ title, children, last }) {
  return (
    <section
      style={{
        marginBottom: last ? 0 : "2.5rem",
        paddingBottom: last ? 0 : "2.5rem",
        borderBottom: last ? "none" : "1px solid rgba(244,242,238,0.08)",
      }}
    >
      <h2
        style={{
          color: "var(--linen)",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0.75rem 0 0",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {items.map((item) => (
        <li key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.1em" }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CategoryList({ items }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0.75rem 0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {items.map((item) => (
        <li key={item.label}>
          <span style={{ color: "var(--linen)", fontWeight: 600 }}>{item.label}</span>
          <br />
          <span style={{ fontSize: "0.9rem" }}>{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}
