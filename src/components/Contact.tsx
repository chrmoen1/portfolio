import { useState, type FormEvent } from "react";
import { certifications, profile } from "../data/profile";
import { Icon } from "./icons";
import { Heading } from "./ui";

export default function Contact() {
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  // No backend: compose an email in the visitor's mail client.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Hello")}&body=${encodeURIComponent(body)}`;
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

        <form onSubmit={submit} className="reveal glass space-y-4 rounded-2xl p-7">
          <input className={field} placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={field} placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <textarea className={`${field} min-h-40`} placeholder="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button className="w-full rounded-lg bg-sky py-3 font-semibold text-white shadow-lg shadow-sky/30 transition hover:brightness-110">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
