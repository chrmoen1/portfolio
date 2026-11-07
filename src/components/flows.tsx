import { Fragment } from "react";

/** Animated arrow between flow nodes: horizontal on large screens, vertical when stacked. */
export function FlowArrow({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  return (
    <div className={`flex items-center justify-center text-sky ${className}`} aria-hidden="true">
      <span className={`flow-line ${vertical ? "flow-line-v h-8 w-0.5" : "flow-line-h h-0.5 w-10"}`} />
      <svg className={`size-3.5 shrink-0 ${vertical ? "-mt-1 rotate-90" : "-ml-1"}`} viewBox="0 0 12 12" fill="currentColor">
        <path d="M2 1l8 5-8 5z" />
      </svg>
    </div>
  );
}

/** Arrow that is vertical on small screens and horizontal from `lg` up. */
function ResponsiveArrow() {
  return (
    <>
      <FlowArrow vertical className="flex-col lg:hidden" />
      <FlowArrow className="hidden lg:flex" />
    </>
  );
}

type Node = { title: string; detail?: string; highlight?: boolean };
type Column = { name: string; nodes: Node[] };

/** Column-to-column system diagram (e.g. sources → engine → audiences). */
export function SystemFlow({ columns }: { columns: Column[] }) {
  return (
    <div className="reveal glass rounded-2xl p-5 sm:p-8">
      <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
        {columns.map((col, i) => (
          <Fragment key={col.name}>
            {i > 0 && <ResponsiveArrow />}
            <div className="flex-1">
              <p className="mb-3 text-center text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">{col.name}</p>
              <div className={`space-y-2.5 rounded-xl p-3 ${col.nodes.some((n) => n.highlight) ? "border border-violet/40 bg-violet/10" : ""}`}>
                {col.nodes.map((n) => (
                  <div
                    key={n.title}
                    className={`rounded-lg border px-4 py-2.5 ${
                      n.highlight ? "border-sun/50 bg-sun/10" : "border-white/10 bg-night/50"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">
                      {n.title}
                      {n.highlight && <span className="ml-2 rounded bg-sun/20 px-1.5 py-0.5 text-[10px] font-bold text-sun uppercase">Proactive</span>}
                    </p>
                    {n.detail && <p className="text-xs text-slate-400">{n.detail}</p>}
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

type Lane = { label: string; tone: "coral" | "mint"; steps: string[]; summary: string };

/** Two swim-lanes comparing a process before and after. */
export function BeforeAfter({ before, after }: { before: Lane; after: Lane }) {
  const toneCls = {
    coral: { badge: "bg-coral/15 text-coral", dot: "bg-coral", border: "border-coral/30" },
    mint: { badge: "bg-mint/15 text-mint", dot: "bg-mint", border: "border-mint/30" },
  };
  return (
    <div className="space-y-5">
      {[before, after].map((lane) => {
        const t = toneCls[lane.tone];
        return (
          <div key={lane.label} className={`reveal glass rounded-2xl border ${t.border} p-5 sm:p-7`}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${t.badge}`}>{lane.label}</span>
              <span className="text-sm text-slate-400">
                {lane.steps.length} steps · {lane.summary}
              </span>
            </div>
            <ol className="flex flex-col items-stretch lg:flex-row lg:items-center">
              {lane.steps.map((s, i) => (
                <Fragment key={s}>
                  {i > 0 && <ResponsiveArrow />}
                  <li className="flex flex-1 items-center gap-3 rounded-lg border border-white/10 bg-night/50 px-3 py-2.5 lg:flex-col lg:text-center">
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-night ${t.dot}`}>{i + 1}</span>
                    <span className="text-sm leading-snug text-slate-200">{s}</span>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
