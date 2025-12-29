"use client";

import { useEffect, useRef, useState } from "react";

import { SectionShell } from "@/components/layout/section-shell";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * ProjectsSection
 *
 * Displays a selection of DimiMont's best work with cards and galleries.
 */
export function ProjectsSection() {
  const { language } = useLanguage();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(
    () =>
      typeof window !== "undefined" &&
      !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const node = headerRef.current;
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
      ? "DimiMont Home-Care projects"
      : "Projekti DimiMont Home-Care";

  const headingText =
    language === "en"
      ? "Recent work and calm outcomes."
      : "Nedavni radovi i mirni ishodi.";

  const introText =
    language === "en"
      ? "Browse a selection of projects that show how Dimi Mont helps homeowners move from a stressful list of repairs to a clear, finished result."
      : "Pogledajte odabrane projekte koji pokazuju kako Dimi Mont pomaže vlasnicima kuća da se s liste stresnih popravaka prebace na jasan, dovršen rezultat.";

  return (
    <SectionShell
      id="projects"
      aria-label={ariaLabel}
      className="bg-background"
    >
      <div className="space-y-6">
        <div
          ref={headerRef}
          className={cn(
            "space-y-3",
            "motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
            "motion-reduce:opacity-100 motion-reduce:translate-y-0",
            !hasEntered && "opacity-0 translate-y-4",
            hasEntered && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {headingText}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground">
            {introText}
          </p>
        </div>

        <div className="mt-6 space-y-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="grid gap-6 md:grid-cols-2 md:items-start"
            >
              <ProjectCard project={project} />
              <ProjectGallery
                imagePaths={project.imagePaths}
                title={project.title[language]}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}