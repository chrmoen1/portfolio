import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { Mark, PillButton } from "./ui";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-white/10 bg-ink/85 backdrop-blur-md" : "border-white/5 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-2xl font-semibold text-white">
          <Mark className="size-8 text-lime" />
          {profile.name.split(" ")[0]}
          <span className="text-lime">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[15px] font-medium text-white/85 transition-colors hover:text-lime">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <p className="hidden text-[15px] text-white/85 xl:block">
            {profile.socials.map((s, i) => (
              <span key={s.label}>
                {i > 0 && <span className="mx-1.5 text-white/30">/</span>}
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-lime">
                  {s.label === "LinkedIn" ? "LN" : s.label === "GitHub" ? "GH" : s.label}
                </a>
              </span>
            ))}
          </p>
          <div className="hidden sm:block">
            <PillButton href="#contact">Contact Me</PillButton>
          </div>
          <button
            className="grid size-12 place-items-center rounded-full ring-1 ring-white/25 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/10 px-4 pt-2 pb-5 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-xl text-white hover:text-lime"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
