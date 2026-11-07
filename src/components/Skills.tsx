import { certifications, skills } from "../data/profile";
import { SectionHeading } from "./ui";

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="Toolbox" title="Technologies I" accent="work with daily" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr]">
          {skills.map((s) => (
            <div key={s.group} className="reveal rounded-3xl bg-ink-2 p-7 ring-1 ring-white/10">
              <h3 className="text-lg font-semibold">{s.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-white/85 ring-1 ring-white/10">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="reveal rounded-3xl bg-lime p-7 text-ink lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <h3 className="text-lg font-semibold text-ink">Certifications</h3>
            <ul className="mt-5 space-y-4">
              {certifications.map((c) => (
                <li key={c} className="flex gap-3 border-b border-ink/15 pb-4 font-medium last:border-0">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-ink" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
