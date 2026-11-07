import { profile } from "../data/profile";
import { Mark } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/55 sm:flex-row sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg text-white">
          <Mark className="size-5 text-lime" /> {profile.name}
        </a>
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <ul className="flex gap-5">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-lime">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
