import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Mariyam Medical Center — Compassionate Care, Trusted Expertise",
  description:
    "Al Mariyam Medical Center delivers advanced diagnostics, specialist consultations, and family healthcare with precision and warmth. Book your appointment today.",
  keywords: [
    "Al Mariyam",
    "medical center",
    "clinic",
    "doctors",
    "healthcare",
    "appointment booking",
  ],
  openGraph: {
    title: "Al Mariyam Medical Center",
    description:
      "Advanced diagnostics, specialist consultations, and family healthcare — delivered with precision and warmth.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div className="texture-grain" />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
