import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/layout/theme-provider";
import { LanguageProvider } from "../components/layout/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DimiMont Home-Care | Calm, high-performance web presence",
  description:
    "Single-page portfolio and marketing site for DimiMont Home-Care, showcasing recent work, outcomes, and an easy way to book a free on-site estimate.",
  openGraph: {
    title: "DimiMont Home-Care | Calm, high-performance web presence",
    description:
      "DimiMont Home-Care helps homeowners enjoy their site without technical headaches, with a focus on architecture, performance, and accessibility.",
    type: "website",
    url: "https://DimiMont-home-care.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
