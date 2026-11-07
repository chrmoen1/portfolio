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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => {
            const i = projects.indexOf(p);
            return (
              <article key={p.title} className="glass group overflow-hidden rounded-xl transition hover:-translate-y-1">
                {/* TODO: replace with a screenshot: <img src="/projects/x.jpg" className="aspect-video w-full object-cover" /> */}
                <div className={`relative aspect-video bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                  <span className="absolute top-1/2 left-1/2 size-24 -translate-1/2 rounded-full bg-white/25 blur-md transition group-hover:scale-125" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-sky">{p.category}</span>
                    <span className="text-slate-400">{p.tags.slice(0, 3).join(" · ")}</span>
                  </div>
                  <h3 className="mt-2 text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-4 flex gap-4 text-sm font-semibold">
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
