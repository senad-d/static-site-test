"use client";

import { useEffect, useRef, useState } from "react";

import { SectionShell } from "@/components/layout/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * AboutSection
 *
 * Explains Dimimont's mission and value proposition with supporting benefits.
 */
export function AboutSection() {
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

  return (
    <SectionShell
      id="about"
      aria-label="About Dimimont Home-Care"
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
            Why homeowners choose Dimimont
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Dimimont is a small, focused home-care crew that helps homeowners in
            Primorsko-goranska, Istria, Primorje and Zagreb keep their homes
            safe, comfortable and beautiful without the constant stress of a
            never-ending repair list.
          </p>
        </div>

        {/* Section 2: Three benefit cards (stacked on mobile, 3 columns on desktop) */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                Lasting quality, not quick fixes.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              We use reliable materials and proven details so repairs and
              pergolas feel solid for years, not just one season.
            </CardContent>
          </Card>

          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                Calm, predictable service.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              You get clear start dates, realistic timelines and updates in
              simple language — no jargon, no surprises.
            </CardContent>
          </Card>

          <Card className="bg-card/90 border-border/60 motion-safe:transition-transform motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">
                Local, insured team.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground">
              We live and work in the same regions we serve and treat every home
              as if it were our own.
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}