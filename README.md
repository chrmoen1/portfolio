# Portfolio

Personal portfolio site — React 19 + TypeScript + Vite + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the built site
```

## Editing content

All text lives in [`src/data/profile.ts`](src/data/profile.ts): experience, projects, skills,
certifications and socials. Components read from it, so you rarely need to touch JSX.

- The résumé download is served from `public/resume.pdf`.
- Colours and fonts are tokens in `src/index.css` under `@theme` (`--color-lime`, `--color-ink`, …).
- Headings use Clash Display (Fontshare), body text uses Manrope (Google Fonts).
- Add `className="reveal"` to any element to fade it in on scroll.
- Placeholder visuals (hero capsules, About portrait, project panels) are marked `TODO` — swap in your own images.

## Structure

```
src/
  data/profile.ts      # site content
  components/          # Navbar, Hero, Marquee, About, Services, Experience, Stats, Projects, Skills, Contact, Footer
  components/ui.tsx    # shared pieces: PillButton, Eyebrow, SectionHeading, Asterisk…
  App.tsx              # section order
  index.css            # Tailwind + theme tokens
```

## Deploying

`npm run build` outputs a static site in `dist/`. Deploy it to Vercel, Netlify, Cloudflare Pages
or GitHub Pages (set `base` in `vite.config.ts` if serving from a sub-path).
