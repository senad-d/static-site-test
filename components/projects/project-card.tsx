import * as React from "react";

import { Project } from "@/lib/projects";
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
  return (
    <Card className="flex h-full flex-col bg-card/90 border-border/70">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {project.description}
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
              Project details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  Objectives
                </h3>
                <p>{project.objectives}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  Approach
                </h3>
                <p>{project.approach}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  Results
                </h3>
                <p>{project.results}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}