import { useState } from "react";
import { experience, skillLevels } from "../data/profile";
import { Heading } from "./ui";

export default function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-4 sm:px-8 2xl:px-12 lg:grid-cols-[1.3fr_0.7fr]">
        <ol className="space-y-4 lg:order-1">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <li key={job.role + job.period} className="reveal glass overflow-hidden rounded-xl">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center gap-x-5 gap-y-1 px-6 py-5 text-left"
                >
                  <span className="text-2xl font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 text-lg font-semibold text-white">
                    {job.role} <span className="font-medium text-sky">– {job.company}</span>
                  </span>
                  <span className="order-last w-full pl-11 text-sm font-medium text-slate-400 sm:order-none sm:w-auto sm:pl-0 sm:text-slate-300">({job.period})</span>
                  <svg className={`size-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <ul className="list-disc space-y-1.5 overflow-hidden pr-6 pl-16 text-slate-400 marker:text-cyan">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                    <li className="list-none pb-5" />
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="lg:order-2 lg:pt-6">
          <Heading sub="Eight-plus years across startups and one of Canada's largest telecoms, shipping systems that millions of people rely on.">
            My Experience
          </Heading>
          <div className="reveal mt-10 space-y-5">
            {skillLevels.slice(0, 4).map((s) => (
              <div key={s.name}>
                <div className="mb-2 flex justify-between text-sm font-semibold text-white">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky to-cyan" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
