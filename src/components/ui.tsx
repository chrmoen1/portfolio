import type { ReactNode } from "react";

/** Small lime brand mark used in front of eyebrow labels and the logo. */
export function Mark({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3" width="5" height="18" rx="2.5" fill="currentColor" />
      <path d="M10 3h4a9 9 0 0 1 0 18h-4z" fill="currentColor" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-lime uppercase">
      <Mark /> {children}
    </p>
  );
}

/** Four-dot glyph that sits in the black circle of pill buttons. */
function Dots() {
  return (
    <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="9.5" cy="3" r="2" />
      <circle cx="3.5" cy="8" r="2" />
      <circle cx="9.5" cy="13" r="2" />
      <circle cx="13.5" cy="8" r="1.4" />
    </svg>
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: "lime" | "dark";
  external?: boolean;
};

export function PillButton({ href, children, variant = "lime", external }: PillProps) {
  const base =
    "group inline-flex items-center gap-4 rounded-full py-1.5 pr-1.5 pl-6 font-semibold transition-colors";
  const styles =
    variant === "lime"
      ? "bg-lime text-ink hover:bg-white"
      : "bg-ink text-white ring-1 ring-white/15 hover:bg-white hover:text-ink";
  const dot =
    variant === "lime" ? "bg-ink text-white" : "bg-white text-ink group-hover:bg-ink group-hover:text-white";
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <span
        className={`grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[360deg] ${dot}`}
      >
        <Dots />
      </span>
    </a>
  );
}

export function ArrowCircle({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid size-11 place-items-center rounded-full bg-lime text-ink transition-transform hover:rotate-45"
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      {[0, 60, 120].map((r) => (
        <rect key={r} x="27" y="2" width="10" height="60" rx="5" transform={`rotate(${r} 32 32)`} />
      ))}
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  center,
  aside,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  center?: boolean;
  aside?: ReactNode;
}) {
  return (
    <div
      className={`reveal mb-14 flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-[2.6rem]">
          {title} {accent && <span className="text-white/45">{accent}</span>}
        </h2>
      </div>
      {aside && <div className="max-w-sm">{aside}</div>}
    </div>
  );
}
