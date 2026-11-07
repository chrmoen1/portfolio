import { useCallback, useEffect, useRef, useState } from "react";

export type Screen = { title: string; src: string; thumb?: string; alt: string; caption?: string };

function Arrow({ dir, onClick, className = "" }: { dir: "prev" | "next"; onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous screen" : "Next screen"}
      className={`grid size-9 place-items-center rounded-full bg-night/80 sm:size-11 text-white shadow-lg ring-1 ring-white/15 backdrop-blur transition hover:bg-sky ${className}`}
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d={dir === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
      </svg>
    </button>
  );
}

/**
 * Product screen viewer: tabs + thumbnails to switch screens, arrows to step through,
 * and click-to-enlarge into a full-screen lightbox (← → to navigate, Esc to close).
 */
export default function ScreenViewer({ screens, host }: { screens: Screen[]; host?: string }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = screens.length;
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);
  const screen = screens[index];

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
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
  }, [zoomed, go]);

  // Warm the cache for the neighbouring screens so switching feels instant
  useEffect(() => {
    [screens[(index + 1) % count], screens[(index - 1 + count) % count]].forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [index, screens, count]);

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Product screens" className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
        {screens.map((s, i) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              i === index ? "bg-sky text-white shadow-lg shadow-sky/25" : "glass text-slate-300 hover:text-white"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main frame */}
      <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-sky/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-coral/80" />
          <span className="size-3 rounded-full bg-sun/80" />
          <span className="size-3 rounded-full bg-mint/80" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-slate-400">{host}</span>
          <span className="text-xs text-slate-500">
            {index + 1} / {count}
          </span>
        </div>
        <div className="group relative aspect-[16/10] bg-[#f6f5f0]">
          <button onClick={() => setZoomed(true)} className="absolute inset-0 cursor-zoom-in" aria-label={`Enlarge: ${screen.title}`}>
            <img key={screen.src} src={screen.src} alt={screen.alt} className="h-full w-full animate-[fadein_.3s_ease] object-contain" />
          </button>
          <Arrow dir="prev" onClick={() => go(-1)} className="absolute top-1/2 left-3 -translate-y-1/2 sm:left-4" />
          <Arrow dir="next" onClick={() => go(1)} className="absolute top-1/2 right-3 -translate-y-1/2 sm:right-4" />
          <span className="pointer-events-none absolute right-4 bottom-4 hidden items-center gap-1.5 rounded-full bg-night/80 px-3 py-1.5 text-xs text-white opacity-0 transition group-hover:opacity-100 sm:flex">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Click to enlarge
          </span>
        </div>
      </div>

      {screen.caption && <p className="mt-4 text-center text-slate-300">{screen.caption}</p>}

      {/* Thumbnails */}
      <div className="mt-5 hidden justify-center gap-3 sm:flex">
        {screens.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.title}`}
            className={`overflow-hidden rounded-lg bg-[#f6f5f0] ring-2 transition ${
              i === index ? "ring-sky" : "opacity-60 ring-transparent hover:opacity-100"
            }`}
          >
            <img src={s.thumb ?? s.src} alt="" loading="lazy" className="h-16 w-26 object-contain" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={screen.title}
          className="fixed inset-0 z-[70] flex flex-col bg-night/95 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setZoomed(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">{screen.title}</span>
              <span className="ml-3 text-slate-500">
                {index + 1} / {count}
              </span>
            </p>
            <button
              ref={closeRef}
              onClick={() => setZoomed(false)}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/20 hover:bg-white/10"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && setZoomed(false)}>
            <img key={screen.src} src={screen.src} alt={screen.alt} className="max-h-full max-w-full animate-[fadein_.3s_ease] rounded-lg object-contain shadow-2xl" />
            <Arrow dir="prev" onClick={() => go(-1)} className="absolute top-1/2 left-2 -translate-y-1/2 sm:left-5" />
            <Arrow dir="next" onClick={() => go(1)} className="absolute top-1/2 right-2 -translate-y-1/2 sm:right-5" />
          </div>
          {screen.caption && <p className="px-4 pb-5 text-center text-sm text-slate-300">{screen.caption}</p>}
        </div>
      )}
    </div>
  );
}
