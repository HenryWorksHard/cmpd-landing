import type { Metadata } from "next";
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
      <body className={`${inter.className} ${sora.variable}`}>{children}</body>
    </html>
  );
}
