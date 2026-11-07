import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
      Copyright © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
    </footer>
  );
}
