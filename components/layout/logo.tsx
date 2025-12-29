import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Dimimont Home-Care">
      <Image
        src="/images/logo.png"
        alt="Dimimont Home-Care logo"
        width={160}
        height={40}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </div>
  );
}