"use client";

import { useEffect, useRef, useState } from "react";

import { SectionShell } from "@/components/layout/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * AboutSection
 *
 * Explains DimiMont's mission and value proposition with supporting benefits.
 */
export function AboutSection() {
  const { language } = useLanguage();
  const introRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(
    () =>
      typeof window !== "undefined" &&
      !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const node = introRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const ariaLabel =
    language === "en"
      ? "About DimiMont Home-Care"
      : "O DimiMont Home-Care";

  const headingText =
    language === "en"
      ? "Why homeowners choose Dimi Mont d.o.o."
      : "Zašto vlasnici kuća biraju Dimi Mont d.o.o.";

  const introText =
    language === "en"
      ? "Dimi Mont is a small, focused home-care crew that helps homeowners in Primorsko-goranska, Istria, and Zagreb area to keep their homes comfortable and beautiful without the constant stress of a never-ending repair list."
      : "Dimi Mont je mali, fokusirani tim za održavanje doma koji pomaže vlasnicima kuća u Primorsko-goranskoj, Istri i zagrebačkom području da svoje domove održe ugodnima i lijepima, bez stalnog stresa zbog beskonačne liste popravaka.";

  const card1Title =
    language === "en"
      ? "Lasting quality, not quick fixes."
      : "Trajna kvaliteta, ne brza rješenja.";

  const card1Body =
    language === "en"
      ? "We use reliable materials and proven details so repairs and pergolas feel solid for years, not just one season."
      : "Koristimo pouzdane materijale i provjerena rješenja kako bi popravci i pergole bili čvrsti godinama, a ne samo jednu sezonu.";

  const card2Title =
    language === "en"
      ? "Calm, predictable service."
      : "Smirena, predvidljiva usluga.";

  const card2Body =
    language === "en"
      ? "You get clear start dates, realistic timelines and updates in simple language; no jargon, no surprises."
      : "Dobivate jasne datume početka, realne rokove i informacije na jednostavnom jeziku; bez žargona i neugodnih iznenađenja.";

  const card3Title =
    language === "en"
      ? "Local, insured team."
      : "Lokalni, osigurani tim.";

  const card3Body =
    language === "en"
      ? "We live and work in the same regions we serve and treat every home as if it were our own."
      : "Živimo i radimo u istim područjima u kojima pružamo usluge i svaki dom tretiramo kao da je naš vlastiti.";

  return (
    <SectionShell
      id="about"
      aria-label={ariaLabel}
      className="bg-background"
    >
      {/* Section 1: Full-width intro */}
      <div className="space-y-8 md:space-y-10">
        <div
          ref={introRef}
          className={cn(
            "max-w-3xl space-y-4",
            "motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
            "motion-reduce:opacity-100 motion-reduce:translate-y-0",
            !hasEntered && "opacity-0 translate-y-4",
            hasEntered && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {headingText}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {introText}
          </p>
        </div>

        {/* Section 2: Three benefit cards (stacked on mobile, 3 columns on desktop) */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {card1Title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              {card1Body}
            </CardContent>
          </Card>

          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {card2Title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              {card2Body}
            </CardContent>
          </Card>

          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                {card3Title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              {card3Body}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}