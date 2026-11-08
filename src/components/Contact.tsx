import { useEffect, useRef, useState, type FormEvent } from "react";
import { certifications, profile } from "../data/profile";
import { Icon } from "./icons";
import { Heading } from "./ui";

// Optional Cloudflare Turnstile spam protection: set VITE_TURNSTILE_SITE_KEY to enable.
const TURNSTILE_SITE_KEY: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY;

type TurnstileApi = { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function useTurnstile(container: React.RefObject<HTMLDivElement | null>) {
  const [token, setToken] = useState("");
  const widgetId = useRef<string>("");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !container.current) return;
    const mount = () => {
      if (!window.turnstile || !container.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    };
    if (window.turnstile) return mount();
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = mount;
    document.head.appendChild(script);
  }, [container]);

  const reset = () => {
    setToken("");
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  };
  return { token, reset, enabled: !!TURNSTILE_SITE_KEY };
}

type Status = { state: "idle" | "sending" | "sent" | "error"; error?: string };

export default function Contact() {
  const empty = { name: "", email: "", subject: "", message: "", website: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(turnstileRef);

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Hello")}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name}`,
  )}`;

  // Sends through the Cloudflare Pages Function at /api/contact (functions/api/contact.js)
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (turnstile.enabled && !turnstile.token) {
      setStatus({ state: "error", error: "Please complete the spam check." });
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: turnstile.token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn't send your message right now.");
      setStatus({ state: "sent" });
      setForm(empty);
    } catch (err) {
      setStatus({ state: "error", error: err instanceof Error ? err.message : "Couldn't send your message right now." });
    } finally {
      turnstile.reset();
    }
  };

  const field = "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky focus:outline-none";

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-4 sm:px-8 2xl:px-12 lg:grid-cols-2">
        <div>
          <Heading sub="Have a project, a role, or a hard problem? I'd love to hear about it.">Get In Touch</Heading>
          <ul className="reveal mt-10 space-y-4">
            {[
              { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: "link", label: "LinkedIn", value: "chris-moen", href: profile.socials[0].href },
              { icon: "pin", label: "Location", value: profile.location },
            ].map((c) => (
              <li key={c.label} className="glass flex items-center gap-4 rounded-xl p-4">
                <span className="grid size-12 place-items-center rounded-lg bg-sky/15 text-sky">
                  <Icon name={c.icon} />
                </span>
                <div>
                  <p className="text-sm text-slate-400">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-cyan">
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-white">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="reveal mt-8">
            <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Certifications</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="rounded-full border border-white/10 px-3 py-1 text-sm">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={submit} className="reveal glass space-y-4 rounded-2xl p-7" noValidate={false}>
          {status.state === "sent" && (
            <div className="grid min-h-80 place-items-center text-center">
              <div>
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint/15 text-2xl text-mint">✓</span>
                <p className="mt-4 text-xl font-semibold text-white">Thanks, your message is on its way.</p>
                <p className="mt-2 text-slate-400">I'll get back to you at the email you provided.</p>
                <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 text-sm font-semibold text-sky hover:text-cyan">
                  Send another message
                </button>
              </div>
            </div>
          )}
          {/* Kept mounted after sending so the Turnstile widget survives "Send another message" */}
          <div className={`space-y-4 ${status.state === "sent" ? "hidden" : ""}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} placeholder="Your name" required maxLength={100} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className={field} type="email" placeholder="Your email" required maxLength={200} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <input className={field} placeholder="Subject" maxLength={150} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea className={`${field} min-h-40`} placeholder="Message" required maxLength={5000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {/* Honeypot: hidden from people, tempting to bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
              {turnstile.enabled && <div ref={turnstileRef} />}
              {status.state === "error" && (
                <p role="alert" className="rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-slate-200">
                  {status.error}{" "}
                  <a href={mailtoFallback} className="font-semibold text-white underline">
                    Email me directly instead
                  </a>
                  .
                </p>
              )}
              <button
                disabled={status.state === "sending"}
                className="w-full rounded-lg bg-sky py-3 font-semibold text-white shadow-lg shadow-sky/30 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : "Send Message"}
              </button>
          </div>
        </form>
      </div>
    </section>
  );
}
