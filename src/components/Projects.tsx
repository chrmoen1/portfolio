import { projects } from "../data/profile";
import { Icon } from "./icons";
import { ArrowCircle, PillButton, SectionHeading } from "./ui";

const visuals = [
  "from-lime/90 via-lime-soft/60 to-forest",
  "from-forest via-ink-3 to-lime/40",
  "from-ink-3 via-forest/70 to-lime/70",
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="Recent Work" title="Projects that turned ideas into real results" center />

        <div className="space-y-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="reveal grid overflow-hidden rounded-3xl bg-gradient-to-br from-ink-3 to-ink p-3 ring-1 ring-white/10 md:grid-cols-2"
            >
              <div className="flex flex-col p-6 sm:p-10">
                <span className="grid size-14 place-items-center rounded-xl bg-ink text-lime ring-1 ring-lime/40">
                  <Icon name={["rocket", "data", "layers"][i % 3]} className="size-6" />
                </span>
                <h3 className="mt-10 text-2xl font-semibold sm:text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-md text-white/70">{p.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/15">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-4 pt-10">
                  {p.href && <ArrowCircle href={p.href} label={`Open ${p.title}`} />}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white/80 hover:text-lime">
                      View code ↗
                    </a>
                  )}
                </div>
              </div>
              {/* TODO: replace gradient panel with a project screenshot */}
              <div
                className={`relative min-h-64 overflow-hidden rounded-2xl bg-gradient-to-br ${visuals[i % visuals.length]}`}
              >
                <span className="absolute right-6 bottom-2 font-display text-[9rem] leading-none font-bold text-ink/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-12 flex justify-center">
          <PillButton href="https://github.com/" external>
            View All Work
          </PillButton>
        </div>
      </div>
    </section>
  );
}
