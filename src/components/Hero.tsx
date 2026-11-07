import { profile, stats } from "../data/profile";
import { Asterisk, Eyebrow, PillButton } from "./ui";

export default function Hero() {
  const users = stats.find((s) => s.label === "Users served");

  return (
    <section id="top" className="relative overflow-hidden bg-ink-2 pt-32 pb-24 sm:pt-40 lg:pb-32">
      {/* green glow + grain */}
      <div className="pointer-events-none absolute -bottom-48 -left-40 size-[42rem] rounded-full bg-forest/60 blur-[140px]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Eyebrow>{profile.title}</Eyebrow>

          <h1 className="relative font-display text-[2.6rem] leading-[1.02] font-bold tracking-tight uppercase sm:text-6xl xl:text-[5.2rem]">
            Architecting
            <br />
            ideas into{" "}
            <span className="relative inline-block -rotate-3 rounded-full bg-lime px-5 py-1 text-[0.72em] text-ink sm:px-7">
              scalable
            </span>
            <br />
            software
            {/* hand-drawn loop arrow */}
            <svg
              className="absolute -top-16 right-4 hidden w-48 text-lime xl:block"
              viewBox="0 0 220 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 60C40 25 70 15 85 30c12 12-2 40-12 30-12-12 20-50 60-45 30 4 55 25 70 50" />
              <path d="M188 52l17 25 8-30" strokeLinejoin="round" />
            </svg>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-white/75">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <PillButton href="#projects">See My Work</PillButton>
            {users && (
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["bg-lime", "bg-white", "bg-forest"].map((c, i) => (
                    <span key={c} className={`size-10 rounded-full ring-2 ring-ink-2 ${c} grid place-items-center`}>
                      {i === 2 && <span className="text-xs font-bold text-white">+</span>}
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="font-display text-xl font-semibold text-white">{users.value}</p>
                  <p className="text-sm text-white/70">{users.label}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Arched capsule composition (no stock photos — swap in your own images later) */}
        <div className="relative mx-auto h-[420px] w-full max-w-md lg:h-[480px]">
          <Asterisk className="absolute -top-6 right-6 size-14 animate-spin-slow text-lime" />
          <div className="absolute top-24 left-0 h-64 w-[34%] overflow-hidden rounded-full bg-gradient-to-b from-ink-3 to-forest ring-1 ring-white/10">
            <code className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 text-center text-[11px] leading-5 text-lime/80">
              {"{ ai:"}
              <br />
              {"true }"}
            </code>
          </div>
          <div className="absolute top-8 left-[33%] h-[360px] w-[34%] overflow-hidden rounded-full bg-gradient-to-b from-lime to-lime-soft lg:h-[400px]">
            <div className="flex h-full flex-col items-center justify-center text-ink">
              <span className="font-display text-5xl font-bold">7+</span>
              <span className="mt-1 px-2 text-center text-xs font-semibold tracking-wide uppercase">
                years building
              </span>
            </div>
          </div>
          <div className="absolute top-16 right-0 h-72 w-[34%] overflow-hidden rounded-full bg-gradient-to-b from-forest via-ink-3 to-ink-3 ring-1 ring-white/10">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="font-display text-3xl font-semibold text-white">99%</span>
              <span className="text-[11px] tracking-wide text-white/60 uppercase">uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
