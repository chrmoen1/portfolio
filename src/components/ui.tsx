import type { ReactNode } from "react";
import { profile } from "../data/profile";

export function Heading({ children, sub, className = "" }: { children: ReactNode; sub?: string; className?: string }) {
  return (
    <div className={`reveal ${className}`}>
      <h2 className="flex items-center gap-4 text-3xl sm:text-4xl">
        <span className="h-0.5 w-14 bg-sky" />
        {children}
      </h2>
      {sub && <p className="mt-4 max-w-md text-slate-400">{sub}</p>}
    </div>
  );
}

export function Button({
  href,
  children,
  tone = "sky",
  external,
}: {
  href: string;
  children: ReactNode;
  tone?: "sky" | "coral";
  external?: boolean;
}) {
  const color = tone === "sky" ? "bg-sky shadow-sky/30" : "bg-coral shadow-coral/30";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-block rounded-md px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 ${color}`}
    >
      {children}
    </a>
  );
}

/** Rounded cyan block with the portrait (or an initials placeholder until a photo is set). */
export function Portrait({ className = "" }: { className?: string }) {
  const initials = profile.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className={`relative rounded-[2.5rem] bg-cyan ${profile.photo ? "" : "overflow-hidden"} ${className}`}>
      {profile.photo ? (
        <img src={profile.photo} alt={profile.name} className="absolute inset-x-0 bottom-0 h-[108%] w-full object-contain object-bottom drop-shadow-2xl" />
      ) : (
        <svg viewBox="0 0 200 220" className="absolute inset-x-0 bottom-0 w-full text-night/85" aria-hidden="true">
          <circle cx="100" cy="78" r="42" fill="currentColor" />
          <path d="M20 220c0-52 36-84 80-84s80 32 80 84z" fill="currentColor" />
          <text x="100" y="88" textAnchor="middle" fontSize="30" fontWeight="800" fill="#22d3ee" fontFamily="Barlow, sans-serif">
            {initials}
          </text>
        </svg>
      )}
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={5 + (i % 4) * 10} cy={5 + Math.floor(i / 4) * 10} r="1.8" />
      ))}
    </svg>
  );
}
