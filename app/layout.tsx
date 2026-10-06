import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./nx.css";

// One typeface, two weights. 500 for everything and 600 for headings — the
// design has no bold anywhere, and that single restraint is most of why it
// reads the way it does.
const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const SITE = "https://cmpdcollective.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "CMPD | Strength programs for the areas that give you trouble",
  description:
    "Ongoing strength programs for shoulders, backs, knees, hips and necks — four gym sessions a week, run week by week in the CMPD app. Carrying an injury? That one gets written for you.",
  keywords: [
    "shoulder strengthening program",
    "lower back strengthening program",
    "knee strengthening program",
    "hip and glute strength",
    "gym strength program",
    "custom injury program",
  ],
  openGraph: {
    title: "CMPD | Strength where you need it",
    description:
      "One program per area. Four gym sessions a week, 30 to 45 minutes, run in the CMPD app.",
    url: SITE,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  // The hero is near-black and the page is paper; the browser chrome should
  // follow the page rather than guess.
  themeColor: "#f5f5f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
