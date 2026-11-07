import { education, profile, stats } from "../data/profile";
import { Icon } from "./icons";
import { Eyebrow, PillButton } from "./ui";

const initials = profile.name
  .split(" ")
  .map((n) => n[0])
  .join("");

export default function About() {
  const years = stats[0];

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Collage */}
        <div className="reveal grid grid-cols-2 gap-5">
          <div className="row-span-2 flex min-h-80 items-end overflow-hidden rounded-3xl bg-gradient-to-br from-ink-3 via-forest/50 to-ink-3 p-6 ring-1 ring-white/10">
            {/* TODO: replace with <img src="/me.jpg" className="h-full w-full object-cover" /> */}
            <span className="font-display text-8xl font-bold text-white/10">{initials}</span>
          </div>
          <div className="rounded-3xl bg-ink-3 p-6 ring-1 ring-white/10">
            <p className="text-sm text-muted">{education.period}</p>
            <p className="mt-2 font-display text-lg font-semibold text-white">{education.school}</p>
            <p className="mt-1 text-sm text-white/70">{education.degree}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl bg-lime p-6 text-center text-ink">
            <span className="grid size-16 place-items-center rounded-full bg-ink font-display text-xl font-semibold text-lime">
              {initials}
            </span>
            <p className="mt-3 font-display text-xl font-semibold">{profile.name}</p>
            <p className="text-sm font-medium">Co-Founder & CTO, pipeMOTION</p>
          </div>
        </div>

        <div className="reveal">
          <Eyebrow>About Me</Eyebrow>
          <h2 className="text-3xl font-semibold sm:text-[2.6rem]">
            Building reliable platforms where software, data, and AI meet
          </h2>
          <div className="mt-6 space-y-4 text-white/70">
            {profile.about.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]">
            <ul className="divide-y divide-white/10">
              {[
                { icon: "architecture", title: "Architecture first", text: "Systems designed to scale, recover, and stay secure." },
                { icon: "data", title: "Data-driven", text: "Decisions backed by pipelines, metrics, and models." },
              ].map((f) => (
                <li key={f.title} className="flex gap-4 py-4 first:pt-0">
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-ink-3 text-lime ring-1 ring-white/10">
                    <Icon name={f.icon} className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-lg text-white">{f.title}</p>
                    <p className="text-sm text-white/65">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-end rounded-3xl bg-gradient-to-br from-forest to-ink-3 p-6 ring-1 ring-white/10 sm:w-44">
              <span className="font-display text-5xl font-semibold text-white">{years.value}</span>
              <span className="mt-1 text-sm text-white/75">{years.label}</span>
            </div>
          </div>

          <div className="mt-10">
            <PillButton href={profile.resumeUrl} external>
              Download Résumé
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
