import * as React from "react";

import { Project } from "@/lib/projects";
import { useLanguage } from "@/components/layout/language-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProjectCardProps = {
  project: Project;
};

/**
 * ProjectCard
 *
 * Renders a single project using a shadcn Card.
 * Title and short description are always visible.
 * Objectives, approach and results are shown inside an Accordion.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  const detailsLabel =
    language === "en" ? "Project details" : "Detalji projekta";
  const objectivesLabel =
    language === "en" ? "Objectives" : "Ciljevi";
  const approachLabel =
    language === "en" ? "Approach" : "Pristup";
  const resultsLabel =
    language === "en" ? "Results" : "Rezultati";

  return (
    <Card className="flex h-full flex-col bg-card/90 border-border/70">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          {project.title[language]}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {project.description[language]}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-0">
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="details">
            <AccordionTrigger className="text-sm font-medium">
              {detailsLabel}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {objectivesLabel}
                </h3>
                <p>{project.objectives[language]}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {approachLabel}
                </h3>
                <p>{project.approach[language]}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {resultsLabel}
                </h3>
                <p>{project.results[language]}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}