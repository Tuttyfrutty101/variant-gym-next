import "./globals.css";
import Script from "next/script";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const siteName = "Variant Training Lab";
const tagline = "Do what you love. Enjoy it for a lifetime.";
const address = "314 Anacapa St, Santa Barbara, CA 93101";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1e1e1e",
};

export const metadata = {
  verification: { google: "6AbTX7X93uYi9Gz9Nu4XbC4mCAJMN1f5w799zbvBeM8" },
  verification: { google: "6AbTX7X93uYi9Gz9Nu4XbC4mCAJMN1f5w799zbvBeM8" },
  metadataBase: new URL("https://varianttraininglab.com"),
  title: {
    default: `${siteName} | ${tagline}`,
    template: `%s | ${siteName}`,
  },
  description:
    "Luxury training facility in Santa Barbara offering data driven training, physical therapy, and recovery services. Elevate performance with science backed coaching in an elevated environment.",
  keywords: [
    "Variant Training Lab",
    "Santa Barbara gym",
    "luxury fitness",
    "personal training Santa Barbara",
    "physical therapy Santa Barbara",
    "recovery services",
    "data driven training",
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
    description: `${tagline} Data driven training, physical therapy, and recovery at ${address}.`,
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Luxury Training & Recovery`,
    description: `${tagline} Data driven training, physical therapy, and recovery in Santa Barbara.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--sans)" }}>
        <ConditionalNavbar />
        {children}
      </body>
<Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NF65BCV8');` }} />
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16953424142" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16953424142');
` }} />
    </html>
  );
}
