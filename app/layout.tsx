import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
