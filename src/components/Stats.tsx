import { stats } from "../data/profile";

export default function Stats() {
  return (
    <section className="px-4 sm:px-8">
      <div className="reveal mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink-2 px-6 py-10 text-center">
            <p className="font-display text-4xl font-semibold text-lime sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-sm text-white/65">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
