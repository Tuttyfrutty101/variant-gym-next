import ReferContent from "./ReferContent";

export const metadata = {
  title: "Refer a Friend",
  description: "Send a friend a quick text to refer them to Variant Training Lab.",
  robots: { index: false, follow: true },
};

export default function ReferPage() {
  return <ReferContent />;
}
