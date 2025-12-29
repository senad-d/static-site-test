"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * ThemeProvider
 *
 * Wraps the application with next-themes so that the `class` attribute
 * on <html> / <body> controls the light/dark theme via the
 * Tailwind/shadcn CSS variables defined in globals.css.
 *
 * We default to the DimiMont dark theme and disable system theme to keep
 * the marketing page visually consistent with the PRD.
 */
export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}