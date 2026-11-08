import { Fragment, useEffect, type ReactNode } from "react";
import type { CaseStudy as Study } from "../data/caseStudies";
import CodeTabs from "./CodeTabs";
import ScreenGallery from "./ScreenGallery";
import WifiDiagram from "./WifiDiagram";
import { BeforeAfter, FlowArrow, LinearFlow, SystemFlow } from "./flows";
import { Heading } from "./ui";

const DEV = import.meta.env.DEV;

/** Dashed box shown only during `npm run dev` for content that hasn't been added yet. */
function Placeholder({ label, hint, className = "" }: { label: string; hint: string; className?: string }) {
  return (
    <div className={`grid place-items-center rounded-2xl border-2 border-dashed border-white/15 p-6 text-center ${className}`}>
      <div>
        <p className="font-semibold text-white/70">{label}</p>
        <p className="mt-1 text-sm text-slate-500">{hint}</p>
        <p className="mt-3 text-xs tracking-wider text-violet uppercase">Placeholder · hidden in production</p>
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <Heading sub={sub}>{title}</Heading>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function BrowserFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-sky/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-coral/80" />
        <span className="size-3 rounded-full bg-sun/80" />
        <span className="size-3 rounded-full bg-mint/80" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-slate-400">{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function CaseStudy({ study }: { study: Study }) {
  const site = study.links[0];
  const host = site ? new URL(site.href).host.replace(/^www\./, "") : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${study.title} case study — Chris Moen`;
    return () => {
      document.title = "Chris Moen — Software Architect";
    };
  }, [study]);

  return (
    <article className="mx-auto max-w-[96rem] px-4 pt-28 pb-16 sm:px-8 2xl:px-12">
      <a href="#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan">
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
        All projects
      </a>

      {/* Header */}
      <header className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <span className="inline-block rounded-full bg-violet px-4 py-1 text-sm font-semibold text-white">{study.kicker ?? "Case Study"}</span>
          <h1 className="mt-5 text-5xl sm:text-7xl">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{study.tagline}</p>
          {study.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {study.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`rounded-md px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${
                  i === 0 ? "bg-sky text-white shadow-lg shadow-sky/30" : "border border-white/15 text-white hover:border-cyan"
                }`}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
          )}
        </div>
        <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-xl">
          {study.meta.map((m) => (
            <div key={m.label} className="bg-night/40 p-5">
              <dt className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{m.label}</dt>
              <dd className="mt-1 font-semibold text-white">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Demo video */}
      {!study.gallery && (study.video || study.hero || (DEV && study.placeholders?.video)) && (
      <div className="mt-14">
        {study.hero && !study.video ? (
          <figure>
            <BrowserFrame label={host}>
              <img src={study.hero.src} alt={study.hero.alt} className="w-full" />
            </BrowserFrame>
            {study.hero.caption && <figcaption className="mt-3 text-center text-sm text-slate-400">{study.hero.caption}</figcaption>}
          </figure>
        ) : study.video ? (
          <BrowserFrame label={host}>
            <video src={study.video.src} poster={study.video.poster} controls playsInline preload="metadata" className="aspect-video w-full bg-black" />
          </BrowserFrame>
        ) : (
          (
            <BrowserFrame label={host}>
              <div className="relative grid aspect-video place-items-center bg-gradient-to-br from-sky/20 via-night to-violet/20">
                <span className="grid size-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <svg className="ml-1 size-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <p className="absolute bottom-6 text-sm text-slate-400">
                  {study.placeholders?.video} · hidden in production
                </p>
              </div>
            </BrowserFrame>
          )
        )}
      </div>
      )}

      {/* Stack */}
      <ul className="mt-10 flex flex-wrap gap-2">
        {study.stack.map((s) => (
          <li key={s} className="rounded-md bg-sky/10 px-3 py-1.5 text-sm font-medium text-sky">
            {s}
          </li>
        ))}
      </ul>

      {/* Overview */}
      <Section title="Overview">
        <div className="grid gap-5 md:grid-cols-3">
          {study.overview.map((o, i) => (
            <div key={o.title} className="reveal glass rounded-xl p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-sm font-bold text-cyan">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{o.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Explained screen cards */}
      {study.gallery && study.gallery.length > 0 && (
        <Section title="Inside the product" sub="What each screen does for the broker. Click any card to see the full screenshot. Captured from a development environment; contact details masked.">
          <ScreenGallery screens={study.gallery} />
        </Section>
      )}

      {/* Personal assistant band */}
      {study.assistant && (
        <Section title={study.assistant.title} sub={study.assistant.intro}>
          <div className="grid gap-5 md:grid-cols-3">
            {study.assistant.items.map((it, i) => (
              <div key={it.title} className="reveal glass rounded-xl p-6" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-cyan to-sky text-night">
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path
                      d={
                        {
                          inbox: "M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6z",
                          repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
                          bell: "M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0",
                        }[it.icon] ?? "M12 2v20M2 12h20"
                      }
                    />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{it.body}</p>
              </div>
            ))}
          </div>
          {study.assistant.note && (
            <p className="reveal mt-6 flex items-center gap-3 text-slate-300">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">✓</span>
              {study.assistant.note}
            </p>
          )}
        </Section>
      )}

      {/* System flow diagram */}
      {study.systemFlow && (
        <Section title={study.systemFlow.title} sub={study.systemFlow.intro}>
          <SystemFlow columns={study.systemFlow.columns} />
        </Section>
      )}

      {/* Client intelligence */}
      {study.intelligence && (
      <Section title="Context-aware clients" sub={study.intelligence.intro}>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {study.intelligence.features.map((f, i) => (
              <div key={f.title} className="reveal glass rounded-xl p-6" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <h3 className="text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Illustrative client card */}
          <figure className="reveal lg:sticky lg:top-28">
            <div className="glass rounded-2xl p-6 shadow-2xl shadow-violet/10">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet font-bold text-night">
                  {study.intelligence.example.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="font-semibold text-white">{study.intelligence.example.name}</p>
                  <p className="text-xs text-slate-400">Client profile · updated from latest email</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-mint/10 px-3 py-2">
                  <p className="text-[11px] font-semibold tracking-wider text-mint uppercase">Intent</p>
                  <p className="font-semibold text-white">{study.intelligence.example.intent}</p>
                </div>
                <div className="rounded-lg bg-sky/10 px-3 py-2">
                  <p className="text-[11px] font-semibold tracking-wider text-sky uppercase">Timeline</p>
                  <p className="font-semibold text-white">{study.intelligence.example.timeline}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {study.intelligence.example.facts.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-cyan">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-lg border border-violet/40 bg-violet/10 p-3">
                <p className="text-[11px] font-semibold tracking-wider text-violet uppercase">Suggested next step</p>
                <p className="mt-1 text-sm font-medium text-white">{study.intelligence.example.next}</p>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-xs text-slate-500">Illustrative example with a fictional client</figcaption>
          </figure>
        </div>
      </Section>
      )}

      {/* Detections: signal → root cause → action */}
      {study.detections && (
        <Section title={study.detections.title} sub={study.detections.intro}>
          <div className={`grid gap-5 md:grid-cols-2 ${study.detections.items.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
            {study.detections.items.map((d, i) => (
              <div
                key={d.name}
                className={`reveal glass relative flex flex-col rounded-xl p-6 ${d.featured ? "border-sun/50 shadow-lg shadow-sun/10" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {d.featured && (
                  <span className="absolute -top-3 right-5 rounded-full bg-sun px-3 py-0.5 text-xs font-bold text-night">Proactive</span>
                )}
                <h3 className="text-xl">{d.name}</h3>
                <ol className="mt-5 flex flex-1 flex-col text-sm">
                  {[
                    ["Signal", d.signal, "text-sun border-sun/30"],
                    ["Likely root cause", d.rootCause, "text-coral border-coral/30"],
                    ["Action delivered", d.action, "text-mint border-mint/30"],
                  ].map(([label, value, tone], k) => (
                    <li key={label} className="flex flex-col">
                      {k > 0 && <FlowArrow vertical className="flex-col py-1" />}
                      <div className={`rounded-lg border bg-night/40 p-3 ${tone.split(" ")[1]}`}>
                        <p className={`text-xs font-bold tracking-wider uppercase ${tone.split(" ")[0]}`}>{label}</p>
                        <p className="mt-1 leading-relaxed text-slate-300">{value}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="reveal mt-8 grid gap-4 md:grid-cols-3">
            {study.detections.audiences.map((a) => (
              <div key={a.name} className="flex gap-4 rounded-xl border border-violet/30 bg-violet/10 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet/25 text-violet">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-white">{a.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{a.gets}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Illustrated explainer */}
      {study.explainer && (
        <Section title={study.explainer.title} sub={study.explainer.intro}>
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-center">
            <figure className="reveal glass rounded-2xl p-4 sm:p-6">
              {study.explainer.diagram === "wifi" && <WifiDiagram />}
              {study.explainer.caption && <figcaption className="mt-2 text-xs text-slate-500">{study.explainer.caption}</figcaption>}
            </figure>
            {study.explainer.alert && (
              <div className="reveal rounded-2xl border border-sky/40 bg-sky/10 p-5">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-sky uppercase">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0" />
                  </svg>
                  {study.explainer.alert.label}
                </p>
                {study.explainer.alert.checks && (
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {study.explainer.alert.checks.map((c) => (
                      <li
                        key={c.layer}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${c.ok ? "bg-mint/10 text-slate-200" : "bg-coral/15 font-semibold text-white"}`}
                      >
                        <span className={c.ok ? "text-mint" : "text-coral"}>{c.ok ? "✓" : "!"}</span>
                        {c.layer}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 font-semibold text-white">{study.explainer.alert.issue}</p>
                <p className="mt-1 text-sm text-slate-300">
                  <span className="font-semibold text-mint">Next step: </span>
                  {study.explainer.alert.nextStep}
                </p>
              </div>
            )}
          </div>
          <h3 className="reveal mt-10 mb-4 text-lg text-slate-300">Possible causes the detection checks for</h3>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {study.explainer.points.map((pt, i) => {
              const tone = {
                mint: "bg-mint", sun: "bg-sun", coral: "bg-coral", violet: "bg-violet", sky: "bg-sky",
                cyan: "bg-cyan", pink: "bg-pink-500", orange: "bg-orange-400", lime: "bg-lime-400",
              }[pt.tone];
              return (
                <li key={pt.title} className="reveal glass flex gap-3 rounded-xl p-4">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-extrabold text-night ${tone}`}>{i + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{pt.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{pt.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Section>
      )}

      {/* Spotlight: before / after */}
      {study.spotlight && (
        <Section title={study.spotlight.title} sub={study.spotlight.intro}>
          <BeforeAfter
            before={{ ...study.spotlight.before, tone: "coral" }}
            after={{ ...study.spotlight.after, tone: "mint" }}
          />
          <div className="reveal mt-6 flex items-start gap-3 rounded-xl border border-mint/30 bg-mint/10 p-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mint/20 text-mint">✓</span>
            <p className="text-slate-200">{study.spotlight.outcome}</p>
          </div>
          {study.spotlight.caption && <p className="mt-3 text-xs text-slate-500">{study.spotlight.caption}</p>}
        </Section>
      )}

      {/* Architecture */}
      {study.architecture && (
      <Section title="Architecture" sub={study.architecture.intro}>
        <div className="reveal glass rounded-2xl p-5 sm:p-8">
          {study.architecture.layers.map((layer, li) => (
            <Fragment key={layer.name}>
              {li > 0 && (
                <div className="flex justify-center py-3 text-sky/60" aria-hidden="true">
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v16m-5-5 5 5 5-5" />
                  </svg>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:items-center">
                <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">{layer.name}</p>
                <div className="flex flex-wrap gap-3">
                  {layer.nodes.map((n) => (
                    <div
                      key={n.title}
                      className={`min-w-44 flex-1 rounded-xl border px-4 py-3 ${
                        layer.highlight ? "border-violet/40 bg-violet/10" : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <p className="font-semibold text-white">{n.title}</p>
                      <p className="text-sm text-slate-400">{n.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
          {study.architecture.footnote && (
            <p className="mt-6 border-t border-white/10 pt-4 text-sm text-slate-500">{study.architecture.footnote}</p>
          )}
        </div>

        {/* Integrations grid */}
        {study.architecture.integrations && (
          <div className="mt-10">
            <h3 className="reveal text-2xl">Integrations</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {study.architecture.integrations.map((group) => (
                <div key={group.category} className="reveal glass rounded-xl p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-cyan uppercase">{group.category}</p>
                  <ul className="mt-4 space-y-4">
                    {group.services.map((svc) => (
                      <li key={svc.name} className="flex gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sky/10 text-sm font-bold text-sky">
                          {svc.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{svc.name}</p>
                          <p className="text-sm leading-relaxed text-slate-400">{svc.purpose}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {study.architecture.guardrails && (
                <div className="reveal rounded-xl border border-mint/30 bg-mint/10 p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-mint uppercase">Guardrails</p>
                  <ul className="mt-4 space-y-3">
                    {study.architecture.guardrails.map((g) => (
                      <li key={g} className="flex gap-2.5 text-sm text-slate-200">
                        <span className="text-mint">✓</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </Section>
      )}

      {/* AI pipeline */}
      <Section title={study.pipeline.title} sub={study.pipeline.intro}>
        <ol className={`grid gap-4 sm:grid-cols-2 ${study.pipeline.stages.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6"}`}>
          {study.pipeline.stages.map((s, i) => (
            <li key={s.name} className="reveal relative" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="glass h-full rounded-xl p-5">
                <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-sky text-sm font-bold text-night">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.detail}</p>
              </div>
              {i < study.pipeline.stages.length - 1 && (
                <span className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 text-sky lg:block" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="reveal mt-6 flex items-center gap-3 text-slate-300">
          <span className="grid size-8 place-items-center rounded-full bg-mint/15 text-mint">✓</span>
          {study.pipeline.note}
        </p>
      </Section>

      {/* Technical deep dive */}
      {study.engineering && (
        <Section title={study.engineering.title} sub={study.engineering.intro}>
          <h3 className="reveal mb-4 text-lg text-slate-300">Deployment pipeline</h3>
          <LinearFlow steps={study.engineering.deploy} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {study.engineering.components.map((c) => (
                <div key={c.title} className="reveal glass rounded-xl p-5">
                  <h4 className="font-semibold text-white">{c.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
                </div>
              ))}
            </div>
            {study.engineering.code && <CodeTabs files={study.engineering.code.files} caption={study.engineering.code.caption} />}
          </div>
        </Section>
      )}

      {/* Challenges */}
      <Section title="Engineering challenges">
        <div className="grid gap-5 lg:grid-cols-3">
          {study.challenges.map((c) => (
            <div key={c.title} className="reveal glass flex flex-col rounded-xl p-7">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-4 text-xs font-bold tracking-wider text-coral uppercase">Challenge</p>
              <p className="mt-1 leading-relaxed text-slate-400">{c.problem}</p>
              <p className="mt-4 text-xs font-bold tracking-wider text-mint uppercase">Approach</p>
              <p className="mt-1 leading-relaxed text-slate-300">{c.approach}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Results */}
      {(study.results?.length || (DEV && study.placeholders?.results)) && (
        <Section title="Results">
          {study.results?.length ? (
            <div className={`grid grid-cols-2 gap-5 ${study.results.length < 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {study.results.map((r) => (
                <div key={r.label} className="glass rounded-xl px-4 py-8 text-center">
                  <p className="text-4xl font-extrabold text-sky">{r.value}</p>
                  <p className="mt-1 font-semibold text-white">{r.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {study.placeholders?.results?.map((l) => (
                <Placeholder key={l} label={l} hint="Add a real metric in caseStudies.ts" className="min-h-36" />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Screenshots */}
      {(study.screenshots?.length || (DEV && study.placeholders?.screenshots)) && (
        <Section title="Inside the product" sub={study.placeholders?.screenshotsSub}>
          <div className={`grid items-start gap-6 md:grid-cols-2 ${study.screenshots?.length === 3 ? "xl:grid-cols-3" : ""}`}>
            {study.screenshots?.length
              ? study.screenshots.map((s) => (
                  <figure key={s.src} className="reveal">
                    <BrowserFrame label={host}>
                      <img src={s.src} alt={s.caption} loading="lazy" className="w-full" />
                    </BrowserFrame>
                    <figcaption className="mt-3 text-sm text-slate-400">{s.caption}</figcaption>
                  </figure>
                ))
              : study.placeholders?.screenshots?.map((l) => (
                  <Placeholder key={l} label={l} hint="Screenshot with fake data from the dev environment" className="aspect-video" />
                ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="reveal mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-sky to-cyan p-8 text-night sm:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl text-night sm:text-4xl">{study.cta.title}</h2>
            <p className="mt-2 max-w-xl text-night/75">{study.cta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="rounded-md bg-night px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
              Get in touch
            </a>
            {site && (
              <a href={site.href} target="_blank" rel="noreferrer" className="rounded-md border border-night/30 px-6 py-3 font-semibold transition hover:bg-night/10">
                {host} ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
