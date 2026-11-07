import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links = [
  ["#top", "Home"],
  ["#about", "About"],
  ["#experience", "Experience"],
  ["#services", "What I Do"],
  ["#projects", "Projects"],
  ["#contact", "Contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "bg-night/80 backdrop-blur-md" : ""}`}>
        <nav className="mx-auto flex h-18 max-w-[96rem] items-center justify-between px-4 sm:px-8 2xl:px-12">
          <a href="#top" className="flex items-center gap-2 text-xl font-bold text-white">
            <img src={profile.avatar} alt="" className="size-9 rounded-lg border-2 border-white bg-cyan object-cover" />
            Portfolio
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-lg text-white hover:bg-white/10"
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-night/95 backdrop-blur-xl transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-18 w-full max-w-[96rem] items-center justify-end px-4 sm:px-8 2xl:px-12">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-lg text-white hover:bg-white/10">
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <ul className="m-auto space-y-2 text-center">
          {links.map(([href, label], i) => (
            <li
              key={href}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="text-4xl font-bold text-white transition-colors hover:text-cyan sm:text-5xl"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="pb-10 text-center text-slate-400">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="mx-3 hover:text-cyan">
              {s.label}
            </a>
          ))}
        </p>
      </div>
    </>
  );
}
