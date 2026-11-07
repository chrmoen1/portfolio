import { education, profile, stats } from "../data/profile";
import { Button, Heading, Portrait } from "./ui";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal relative mx-auto w-full max-w-sm">
            <div className="absolute -top-5 -left-5 h-full w-full rounded-[2.5rem] border border-white/15" />
            <Portrait className="relative aspect-[4/5] w-full" />
            <div className="absolute top-10 left-2 flex items-center gap-2 rounded-lg bg-violet px-4 py-2 text-white shadow-xl sm:-left-10">
              <span className="text-3xl font-extrabold">{stats[0].value}</span>
              <span className="text-xs leading-tight font-semibold uppercase">Years of
                <br />experience</span>
            </div>
            <div className="absolute right-2 bottom-12 rounded-lg bg-orange-500 px-4 py-2 text-white shadow-xl sm:-right-8">
              <p className="text-xl font-extrabold">{stats[1].value}</p>
              <p className="text-xs font-semibold">{stats[1].label}</p>
            </div>
          </div>

          <div className="reveal">
            <Heading>About Me</Heading>
            <div className="glass mt-8 rounded-xl p-7">
              <h3 className="text-xl">Who I'm</h3>
              <div className="mt-3 space-y-3 leading-relaxed text-slate-400">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={profile.resumeUrl} tone="coral" external>
                Download Resume
              </Button>
              <Button href="#contact">Hire Me</Button>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Heading sub="Foundations in systems, control, and engineering problem-solving.">Education</Heading>
          <div className="reveal glass rounded-xl p-7">
            <p className="text-lg font-semibold text-white">{education.degree}</p>
            <p className="mt-1 text-5xl font-extrabold text-white/10">{education.period}</p>
            <p className="font-medium text-sky">{education.school}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
