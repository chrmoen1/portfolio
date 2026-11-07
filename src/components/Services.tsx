import { useEffect, useRef, useState } from "react";
import { services, skills, stats } from "../data/profile";
import { Icon } from "./icons";
import { Heading, Portrait } from "./ui";

const statIcons = ["clock", "users", "chart", "award"];

function Counter({ value }: { value: string }) {
  const m = value.match(/^(\D*)([\d.]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const target = m ? parseFloat(m[2]) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  if (!m) return <span>{value}</span>;
  const decimals = m[2].includes(".") ? 1 : 0;
  return (
    <span ref={ref}>
      {m[1]}
      {n.toFixed(decimals)}
      {m[3]}
    </span>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-8 2xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Heading sub="End-to-end ownership, from system design to the dashboards that prove it works.">What I Do</Heading>
            <div className="reveal relative mt-10 hidden max-w-xs lg:block">
              <div className="absolute -top-6 left-16 size-40 rounded-full border-[18px] border-white/5" />
              <Portrait className="relative aspect-square w-full" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="reveal glass rounded-xl p-7 text-center transition hover:-translate-y-1 hover:border-cyan/40"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-sky text-night">
                  <Icon name={s.icon} className="size-8" />
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Counters */}
        <div className="mt-24 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal glass rounded-xl px-4 py-8 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-sun/15 text-sun">
                <Icon name={statIcons[i]} />
              </span>
              <p className="mt-4 text-4xl font-extrabold text-sky">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 font-semibold text-white">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:order-1">
            {skills.map((g) => (
              <div key={g.group} className="reveal glass rounded-xl p-5">
                <h3 className="text-lg">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-md bg-sky/10 px-2.5 py-1 text-sm font-medium text-sky">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:order-2">
            <Heading sub="The languages, frameworks, and platforms I reach for most.">My Skills</Heading>
          </div>
        </div>
      </div>
    </section>
  );
}
