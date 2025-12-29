"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/layout/language-provider";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

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

  // While not mounted, render a stable placeholder so SSR and first client
  // render match and we avoid showing the wrong logo color on refresh.
  if (!mounted) {
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
        <div
          style={{ width: 200, height: 50 }}
          aria-hidden="true"
        />
      </div>
    );
  }

  const effectiveTheme = resolvedTheme ?? theme ?? "dark";

  const logoFile =
    effectiveTheme === "dark"
      ? "/images/DimiMont-logo-light.png"
      : "/images/DimiMont-logo-dark.png";

  const src = `${prefix}${logoFile}`;

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