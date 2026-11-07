import { profile } from "../data/profile";
import { Mark } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-8">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-lime px-6 py-14 text-ink sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/30 blur-3xl" />
        <svg
          className="absolute top-10 right-10 hidden w-40 md:block"
          viewBox="0 0 220 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 60C40 25 70 15 85 30c12 12-2 40-12 30-12-12 20-50 60-45 30 4 55 25 70 50" />
          <path d="M188 52l17 25 8-30" strokeLinejoin="round" />
        </svg>
        <div className="relative max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <Mark /> Let's work together
          </p>
          <h2 className="text-4xl font-semibold text-ink sm:text-5xl">Let's build tomorrow's software, together.</h2>
          <p className="mt-5 max-w-lg text-ink/75">
            Open to conversations about architecture, data and AI systems, advisory work, or new opportunities.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-4 rounded-full bg-ink py-1.5 pr-1.5 pl-6 font-semibold text-white"
            >
              Email Me
              <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
            <span className="hidden h-12 w-px bg-ink/20 sm:block" />
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-ink text-lime">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm text-ink/70">Connect on</p>
                <a href={profile.socials[0].href} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
