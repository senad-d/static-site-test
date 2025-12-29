import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * SectionShell
 *
 * Semantic <section> wrapper used across the DimiMont Home-Care page.
 * - Provides consistent vertical spacing.
 * - Accepts id and aria-* attributes via props for linking and accessibility.
 * - Wraps its content in the standard Container layout.
 */
export function SectionShell({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("py-10 sm:py-16 lg:py-20", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}