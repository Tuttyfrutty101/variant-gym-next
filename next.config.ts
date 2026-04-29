import type { NextConfig } from "next";

function supabaseImageHostname(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (typeof raw === "string" && raw.startsWith("http")) {
    try {
      return new URL(raw).hostname;
    } catch {
      // fall through
    }
  }
  return "placeholder.supabase.co";
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recovery",
        destination: "/health",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: supabaseImageHostname(),
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
