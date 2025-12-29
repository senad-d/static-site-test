"use client";

import Image from "next/image";

import { SectionShell } from "@/components/layout/section-shell";
import { ScrollToContactCta } from "@/components/layout/scroll-to-contact-cta";
import { useLanguage } from "@/components/layout/language-provider";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * HeroSection
 *
 * Aspect-ratio-based hero with background image, animated headline,
 * supporting copy, and primary CTA that scrolls to the contact section.
 */
export function HeroSection() {
  const { language } = useLanguage();

  const ariaLabel =
    language === "en"
      ? "DimiMont Home-Care hero"
      : "DimiMont Home-Care početni prikaz";

  const backgroundAlt =
    language === "en"
      ? "DimiMont Home-Care project background"
      : "Pozadinska slika projekta DimiMont Home-Care";

  const heading =
    language === "en"
      ? "Enjoy your home without the technical headaches."
      : "Uživajte u svom domu bez tehničkih briga.";

  const bodyText =
    language === "en"
      ? "From full home renovations to carefully executed outdoor projects like pergolas, we deliver clean finishes, solid construction, and reliable timelines."
      : "Od potpunih renovacija kuće do pažljivo izvedenih vanjskih projekata poput pergola, isporučujemo čiste završne radove, čvrstu konstrukciju i pouzdane rokove.";

  const ctaLabel =
    language === "en" ? "Schedule Service" : "Dogovori uslugu";

  return (
    <SectionShell
      id="hero"
      aria-label={ariaLabel}
      className="relative py-0 sm:py-0 lg:py-0"
    >
      {/* Ensure the hero nearly fills the viewport height minus the sticky header,
          starting directly under the navbar on first load while leaving a bit of space at the bottom. */}
      <div
        className="relative overflow-hidden rounded-xl min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)]"
      >
        {/* Background image */}
        <Image
          src={`${prefix}/images/hero-bg.jpg`}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)] items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-3xl">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <h1
                  className={[
                    "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight",
                    "text-white",
                    // Subtle entrance animation; motion-safe only
                    "motion-safe:animate-fadeInUp motion-safe:duration-300",
                  ].join(" ")}
                >
                  {heading}
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-slate-200/90 motion-safe:animate-fadeInUp motion-safe:duration-300 motion-safe:delay-100">
                  {bodyText}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 motion-safe:animate-fadeInUp motion-safe:duration-300 motion-safe:delay-200">
                <ScrollToContactCta
                  variant="default"
                  size="lg"
                  className="shadow-lg motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-xl"
                >
                  {ctaLabel}
                </ScrollToContactCta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}