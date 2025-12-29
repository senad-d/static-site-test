"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();

  const logoFile =
    resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo-black.png";

  const src = `${prefix}${logoFile}`;

  return (
    <div className={className} aria-label="DimiMont Home-Care">
      <Image
        src={src}
        alt="DimiMont Home-Care logo"
        width={160}
        height={40}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </div>
  );
}