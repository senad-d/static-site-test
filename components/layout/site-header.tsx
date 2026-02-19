"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/client-only";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

type SiteHeaderProps = {
  language: "en" | "hr";
  onLanguageChange: (value: "en" | "hr") => void;
  ctaLabel: string;
  languageLabel: string;
  settingsLabel: string;
  themeLabel: string;
  themeOptions: {
    light: string;
    dark: string;
  };
};

const languageOptions = [
  { value: "en", label: "EN" },
  { value: "hr", label: "HR" },
] as const;

type SettingsMenuProps = {
  language: "en" | "hr";
  onLanguageChange: (value: "en" | "hr") => void;
  languageLabel: string;
  settingsLabel: string;
  themeLabel: string;
  themeOptions: {
    light: string;
    dark: string;
  };
  themeValue: string;
  onThemeChange: (value: string) => void;
  className?: string;
};

function SettingsFallback({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn(
        "h-10 w-10 border border-white/10 bg-card/80 text-foreground",
        className
      )}
      disabled
    >
      <SlidersHorizontal className="size-4" />
    </Button>
  );
}

function SettingsMenu({
  language,
  onLanguageChange,
  languageLabel,
  settingsLabel,
  themeLabel,
  themeOptions,
  themeValue,
  onThemeChange,
  className,
}: SettingsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={settingsLabel}
          className={cn(
            "h-10 w-10 border border-white/10 bg-card/80 text-foreground hover:bg-card/90",
            className
          )}
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 border-white/10 bg-card/95">
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {languageLabel}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => onLanguageChange(value as "en" | "hr")}
        >
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {themeLabel}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={themeValue} onValueChange={onThemeChange}>
          <DropdownMenuRadioItem value="light">
            {themeOptions.light}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {themeOptions.dark}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader({
  language,
  onLanguageChange,
  ctaLabel,
  languageLabel,
  settingsLabel,
  themeLabel,
  themeOptions,
}: SiteHeaderProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const themeValue =
    theme === "system" ? resolvedTheme ?? "dark" : theme ?? "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur transition-colors",
        "motion-safe:animate-fadeInDown motion-safe:duration-300"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary sm:size-10">
              <span className="text-sm font-semibold">D</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs sm:tracking-[0.4em]">
                Dimimont
              </p>
              <p className="hidden text-sm font-semibold text-foreground sm:block">
                Home-Care Crew
              </p>
            </div>
          </div>

          <ClientOnly
            fallback={
              <SettingsFallback className="sm:hidden" label={settingsLabel} />
            }
          >
            <SettingsMenu
              className="sm:hidden"
              language={language}
              onLanguageChange={onLanguageChange}
              languageLabel={languageLabel}
              settingsLabel={settingsLabel}
              themeLabel={themeLabel}
              themeOptions={themeOptions}
              themeValue={themeValue}
              onThemeChange={setTheme}
            />
          </ClientOnly>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            className="h-9 w-full justify-center whitespace-nowrap bg-primary px-3 text-[11px] leading-tight text-primary-foreground hover:bg-primary/90 sm:h-10 sm:w-auto sm:px-4 sm:text-sm"
          >
            <a href="#contact">{ctaLabel}</a>
          </Button>
          <ClientOnly
            fallback={
              <SettingsFallback
                className="hidden sm:inline-flex"
                label={settingsLabel}
              />
            }
          >
            <SettingsMenu
              className="hidden sm:inline-flex"
              language={language}
              onLanguageChange={onLanguageChange}
              languageLabel={languageLabel}
              settingsLabel={settingsLabel}
              themeLabel={themeLabel}
              themeOptions={themeOptions}
              themeValue={themeValue}
              onThemeChange={setTheme}
            />
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
