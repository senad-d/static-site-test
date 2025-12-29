"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/layout/language-provider";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const { language } = useLanguage();

  const logoFile =
    resolvedTheme === "dark"
      ? "/images/DimiMont-logo-light.png"
      : "/images/DimiMont-logo-dark.png";

  const src = `${prefix}${logoFile}`;

  function scrollToTop() {
    if (typeof window === "undefined") return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const ariaLabel = "DimiMont Home-Care";
  const altText =
    language === "en"
      ? "DimiMont Home-Care logo"
      : "Logotip DimiMont Home-Care";

  return (
    <div
      className={["cursor-pointer", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
      onClick={scrollToTop}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          scrollToTop();
        }
      }}
    >
      <Image
        src={src}
        alt={altText}
        width={200}
        height={50}
        priority
        suppressHydrationWarning
      />
    </div>
  );
}