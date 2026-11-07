import { useCallback, useEffect, useRef, useState } from "react";

export type Screen = {
  title: string;
  src: string; // full-resolution image (lightbox)
  card?: string; // smaller image for the card preview
  alt: string;
  description: string;
  points?: string[];
};

function Arrow({ dir, onClick, className = "" }: { dir: "prev" | "next"; onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous screen" : "Next screen"}
      className={`grid size-9 place-items-center rounded-full bg-night/80 text-white shadow-lg ring-1 ring-white/15 backdrop-blur transition hover:bg-sky sm:size-11 ${className}`}
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d={dir === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
      </svg>
    </button>
  );
}

/** Grid of explained screen cards; click a card to expand its screenshot (← → to browse, Esc to close). */
export default function ScreenGallery({ screens }: { screens: Screen[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = screens.length;
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const s = open === null ? null : screens[open];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {screens.map((sc, i) => (
          <article key={sc.src} className="reveal glass flex flex-col overflow-hidden rounded-2xl">
            <button
              onClick={() => setOpen(i)}
              aria-label={`Expand screenshot: ${sc.title}`}
              className="group relative block aspect-[16/9] cursor-zoom-in overflow-hidden border-b border-white/10 bg-[#f6f5f0]"
            >
              <img
                src={sc.card ?? sc.src}
                alt={sc.alt}
                loading="lazy"
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 grid place-items-center bg-night/0 transition group-hover:bg-night/40">
                <span className="flex items-center gap-2 rounded-full bg-night/85 px-4 py-2 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  View full screen
                </span>
              </span>
            </button>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold tracking-[0.2em] text-cyan uppercase">Screen {i + 1}</p>
              <h3 className="mt-1 text-xl">{sc.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{sc.description}</p>
              {sc.points && (
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {sc.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-0.5 text-mint">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={() => setOpen(i)} className="mt-5 w-fit text-sm font-semibold text-sky hover:text-cyan">
                Expand screenshot →
              </button>
            </div>
          </article>
        ))}
      </div>

      {s && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={s.title}
          className="fixed inset-0 z-[70] flex flex-col bg-night/95 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="min-w-0 truncate text-sm text-slate-300">
              <span className="font-semibold text-white">{s.title}</span>
              <span className="ml-3 text-slate-500">
                {open + 1} / {count}
              </span>
            </p>
            <button
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="grid size-10 shrink-0 place-items-center rounded-full text-white ring-1 ring-white/20 hover:bg-white/10"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <img key={s.src} src={s.src} alt={s.alt} className="max-h-full max-w-full animate-[fadein_.3s_ease] rounded-lg object-contain shadow-2xl" />
            <Arrow dir="prev" onClick={() => go(-1)} className="absolute top-1/2 left-2 -translate-y-1/2 sm:left-5" />
            <Arrow dir="next" onClick={() => go(1)} className="absolute top-1/2 right-2 -translate-y-1/2 sm:right-5" />
          </div>
          <p className="mx-auto max-w-3xl px-4 py-4 text-center text-sm leading-relaxed text-slate-300">{s.description}</p>
        </div>
      )}
    </>
  );
}
