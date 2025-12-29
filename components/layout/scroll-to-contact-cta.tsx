"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

type ScrollToContactCtaProps = React.ComponentProps<typeof Button> & {
  /**
   * Optional target id to scroll to.
   * Defaults to "contact" per PRD (Contact section id).
   */
  targetId?: string;
};

/**
 * ScrollToContactCta
 *
 * Wraps a shadcn Button and, on click, smoothly scrolls to the
 * Contact section (default id="contact") if it exists.
 */
export function ScrollToContactCta({
  targetId = "contact",
  children,
  onClick,
  ...buttonProps
}: ScrollToContactCtaProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(event);
    }
    if (event.defaultPrevented) return;

    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Button onClick={handleClick} {...buttonProps}>
      {children}
    </Button>
  );
}