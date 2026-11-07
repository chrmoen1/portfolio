import { services } from "../data/profile";
import { Icon } from "./icons";
import { SectionHeading } from "./ui";

export default function Services() {
  return (
    <section id="services" className="px-2 sm:px-4">
      <div className="mx-auto max-w-[96rem] rounded-[2.5rem] bg-ink-2 py-24 ring-1 ring-white/5 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHeading
            eyebrow="What I Do"
            title="Turning complex problems into"
            accent="dependable systems"
            aside={<p className="text-white/70">From architecture to production, I own the full lifecycle of the products I build.</p>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="reveal group rounded-3xl bg-gradient-to-b from-ink-3 to-ink p-7 ring-1 ring-white/10 transition-colors hover:ring-lime/60"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-white transition-colors group-hover:text-lime">
                  <Icon name={s.icon} className="size-11" />
                </span>
                <h3 className="mt-14 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-[15px] text-white/65">{s.description}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-12 flex justify-center">
            <p className="flex items-center gap-3 rounded-full py-1.5 pr-6 pl-1.5 text-sm ring-1 ring-lime/70 sm:text-base">
              <span className="grid size-9 place-items-center rounded-full bg-lime text-ink">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
              </span>
              Have a hard problem?
              <a href="#contact" className="font-semibold text-white underline underline-offset-4 hover:text-lime">
                Let's talk
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
