import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

// Sora matches the CMPD app's industrial heading font (used on login,
// reset, and admin screens). Exposed as a CSS variable so globals.css can
// apply it to the .font-heading class on hero + section titles.
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CMPD | Fitness Management Platform for Personal Trainers",
  description: "The all-in-one platform for fitness professionals. Build programs, manage clients, and grow your business with one simple monthly subscription.",
  keywords: ["fitness software", "personal trainer software", "gym management", "workout builder", "client management"],
  openGraph: {
    title: "CMPD | Fitness Management Platform",
    description: "Build programs, manage clients, and grow your fitness business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.variable}>{children}</body>
    </html>
  );
}
