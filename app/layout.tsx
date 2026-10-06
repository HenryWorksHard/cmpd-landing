import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

// Inter powers the body (clean, polished); Sora powers the headings to
// match the CMPD app's industrial heading font. Sora is exposed as a CSS
// variable and applied to h1/h2/.font-heading in globals.css.
const inter = Inter({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const SITE = "https://cmpdcollective.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "CMPD | Strength programs for the areas that give you trouble",
  description:
    "Strength programs for shoulders, backs, knees, hips and necks. Four gym sessions a week, run in the CMPD app. Carrying an injury? That one gets written for you.",
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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  // The page is true black; the browser chrome should follow it rather than
  // guess, and a phone should be able to zoom.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${sora.variable}`}>{children}</body>
    </html>
  );
}
