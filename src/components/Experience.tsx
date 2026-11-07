import { experience } from "../data/profile";
import { SectionHeading } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/3 -right-40 size-[36rem] rounded-full bg-forest/35 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="Career Path" title="Experience that shaped" accent="how I build" center />

        <ol className="grid gap-5 md:grid-cols-2">
          {experience.map((job, i) => (
            <li
              key={job.role + job.period}
              className="reveal relative rounded-3xl bg-ink-2 p-7 ring-1 ring-white/10 sm:p-8"
            >
              <span className="absolute -top-3 left-7 -rotate-6 rounded-full bg-ink px-4 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                Step {String(experience.length - i).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 font-medium text-lime">
                    {job.company}
                    {job.location && <span className="text-white/50"> · {job.location}</span>}
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs whitespace-nowrap text-white/70 ring-1 ring-white/10">
                  {job.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] text-white/70">
                    <svg className="mt-1.5 size-4 shrink-0 text-lime" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.3 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4z" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
