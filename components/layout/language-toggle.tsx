"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const label = language === "en" ? "HR" : "EN";
  const ariaLabel =
    language === "en"
      ? "Switch site language to Croatian"
      : "Promijeni jezik stranice na engleski";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={ariaLabel}
      onClick={toggleLanguage}
    >
      {label}
    </Button>
  );
}