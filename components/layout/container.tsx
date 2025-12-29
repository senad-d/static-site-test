import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Container
 *
 * Constrains content to a readable width and applies horizontal padding
 * consistent across all sections of the Dimimont Home-Care site.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}