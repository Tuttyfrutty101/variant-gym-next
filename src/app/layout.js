import "./globals.css";

const siteName = "Variant Training Lab";
const tagline = "Do what you love. Enjoy it for a lifetime.";
const address = "314 Anacapa St, Santa Barbara, CA 93101";

export const metadata = {
  metadataBase: new URL("https://varianttraininglab.com"),
  title: {
    default: `${siteName} | ${tagline}`,
    template: `%s | ${siteName}`,
  },
  description:
    "Luxury training facility in Santa Barbara offering data-driven training, physical therapy, and recovery services. Elevate performance with science-backed coaching in an elevated environment.",
  keywords: [
    "Variant Training Lab",
    "Santa Barbara gym",
    "luxury fitness",
    "personal training Santa Barbara",
    "physical therapy Santa Barbara",
    "recovery services",
    "data-driven training",
    "sports performance",
    "Anacapa Street gym",
    address,
  ],
  authors: [{ name: siteName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: `${siteName} | Luxury Training & Recovery`,
    description: `${tagline} Data-driven training, physical therapy, and recovery at ${address}.`,
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Luxury Training & Recovery`,
    description: `${tagline} Data-driven training, physical therapy, and recovery in Santa Barbara.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--sans)" }}>{children}</body>
    </html>
  );
}
