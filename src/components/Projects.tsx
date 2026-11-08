import { useState } from "react";
import { projects } from "../data/profile";

const gradients = [
  "from-sky/80 via-violet/50 to-cyan/60",
  "from-cyan/70 via-sky/40 to-mint/50",
  "from-violet/70 via-sky/40 to-night",
];

export default function Projects() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-8 2xl:px-12">
        <h2 className="reveal text-center text-3xl sm:text-4xl">
          <span className="mr-4 inline-block h-0.5 w-14 bg-sky align-middle" />
          Latest Projects
        </h2>

        <div className="reveal mx-auto mt-8 flex w-fit flex-wrap justify-center gap-1 rounded-full glass p-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === c ? "bg-sky text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={`mt-12 grid gap-6 md:grid-cols-2 ${projects.length > 2 ? "xl:grid-cols-3" : ""}`}>
          {shown.map((p) => {
            const i = projects.indexOf(p);
            const link = p.caseStudy ? `#/work/${p.caseStudy}` : p.href;
            return (
              <article key={p.title} className="glass group flex flex-col overflow-hidden rounded-xl transition hover:-translate-y-1">
                <a href={link} className="relative block aspect-video overflow-hidden" aria-label={`Open ${p.title}`} tabIndex={-1}>
                  {p.cover ? (
                    <img
                      src={p.cover.src}
                      alt={p.cover.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                  )}
                  {p.cover && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night from-15% via-night/60 via-40% to-transparent to-70% p-5 sm:p-6">
                      {p.caseStudy && (
                        <span className="absolute top-4 left-4 rounded-full bg-violet px-3 py-1 text-xs font-semibold text-white">Case study</span>
                      )}
                      <p className="max-w-md text-lg font-bold text-white sm:text-xl">{p.cover.summary}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.cover.highlights.map((h) => (
                          <li key={h} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-sky">{p.category}</span>
                    <span className="text-slate-400">{p.tags.slice(0, 3).join(" · ")}</span>
                  </div>
                  <h3 className="mt-2 text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-auto flex gap-4 pt-4 text-sm font-semibold">
                    {p.caseStudy && (
                      <a href={`#/work/${p.caseStudy}`} className="rounded-md bg-sky px-3 py-1 text-white transition hover:brightness-110">
                        Case study →
                      </a>
                    )}
                    {p.href && (
                      <a href={p.href} target="_blank" rel="noreferrer" className="text-cyan hover:underline">
                        Live ↗
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="text-cyan hover:underline">
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
