import { profile } from "../data/profile";
import { useTyped } from "../hooks/useTyped";
import { Button, DotGrid, Portrait, Sparkle } from "./ui";

export default function Hero() {
  const typed = useTyped(profile.roles);

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      {/* decorative orbit line */}
      <svg className="pointer-events-none absolute -top-20 left-1/4 w-[50rem] text-white/10" viewBox="0 0 800 600" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M0 300C150 50 450 0 600 150s100 400-200 420" />
      </svg>
      <span className="absolute top-28 left-[42%] size-4 rounded-full border-[3px] border-sun" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <Portrait className="aspect-[4/5] w-full" />
          <Sparkle className="absolute -top-2 -right-6 size-12 animate-float text-white" />
          <DotGrid className="absolute top-1/3 -right-3 size-10 text-white/70" />
          <DotGrid className="absolute -bottom-4 -left-4 size-12 text-sun" />
        </div>

        <div>
          <span className="inline-block rounded-full bg-violet px-4 py-1 text-sm font-semibold text-white">{profile.title}</span>
          <h1 className="mt-5 text-5xl leading-tight sm:text-6xl">
            Hello! <span className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_infinite]">👋</span> I Am
            <br />
            <span className="text-mint">
              {typed}
              <span className="ml-1 animate-blink font-light text-white/70">|</span>
            </span>
          </h1>
          <div className="mt-6">
            <Button href="#contact">Hire Me</Button>
          </div>
          <div className="glass mt-8 rounded-xl p-6">
            <h3 className="text-xl">{profile.name} · Co-Founder & CTO at pipeMOTION</h3>
            <p className="mt-3 leading-relaxed text-slate-400">{profile.tagline}</p>
          </div>
        </div>
      </div>
      <style>{`@keyframes wave{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(14deg)}20%{transform:rotate(-8deg)}40%{transform:rotate(-4deg)}50%{transform:rotate(10deg)}}`}</style>
    </section>
  );
}
