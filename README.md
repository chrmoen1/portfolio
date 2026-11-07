# Portfolio

Personal portfolio site — React 19 + TypeScript + Vite + Tailwind CSS v4.

## Templates

Each design lives on its own branch. They all read the same content file, so you can switch freely.

| Branch | Style |
|---|---|
| `template/midnight` | Dark navy, glass cards, typed hero text, skill bars, filterable projects |
| `template/spotlight` | Single-screen monochrome; edge labels slide in About / Portfolio / Contact / Strength panels; light & dark versions |
| `template/vivid` | Bright white with yellow/pink/cyan accents, icon sidebar with scroll-spy, timelines, progress rings |
| `template/creovio` | Dark with lime accents, marquee bands, pill buttons |

```bash
git checkout template/midnight   # pick one
npm install
npm run dev                      # http://localhost:5173
npm run build                    # type-check + production build to dist/
```

## Editing content

All text lives in [`src/data/profile.ts`](src/data/profile.ts): bio, roles, experience, projects,
skills, skill levels, certifications, socials.

- **Photo:** drop a headshot in `public/` (e.g. `public/me.jpg`) and set `photo: "/me.jpg"`. Until then templates show an initials placeholder.
- **Résumé:** served from `public/resume.pdf`.
- **Project images:** placeholders are marked `TODO` in each template's `Projects` component.
- **Contact forms** have no backend; they open the visitor's email client pre-filled.
- Colours and fonts are tokens under `@theme` in `src/index.css`.

## Deploying

`npm run build` outputs a static site in `dist/`. Deploy to Vercel, Netlify, Cloudflare Pages or
GitHub Pages (set `base` in `vite.config.ts` if serving from a sub-path).
