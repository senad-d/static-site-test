"use client";

import { Container } from "./container";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ScrollToContactCta } from "./scroll-to-contact-cta";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * SiteHeader
 *
 * Sticky global header with DimiMont logo, primary CTA and theme toggle.
 * The CTA scrolls smoothly to the contact section (id="contact").
 */
export function SiteHeader() {
  const { language } = useLanguage();

  const desktopCtaLabel =
    language === "en"
      ? "Book My Free Estimate"
      : "Rezerviraj besplatnu procjenu";

  const mobileCtaLabel =
    language === "en" ? "Free Estimate" : "Besplatna procjena";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur transition-colors motion-safe:animate-fadeInDown motion-safe:duration-300">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <div className="flex items-center gap-3">
          <Logo className="flex items-center" />
        </div>

        <div className="flex items-center gap-3">
          <ScrollToContactCta
            variant="default"
            size="lg"
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            {desktopCtaLabel}
          </ScrollToContactCta>

          {/* Compact CTA for very small screens */}
          <ScrollToContactCta
            variant="default"
            size="sm"
            className="inline-flex whitespace-nowrap sm:hidden"
          >
            {mobileCtaLabel}
          </ScrollToContactCta>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}