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

## Contact form

The form posts to a Cloudflare Pages Function, [`functions/api/contact.js`](functions/api/contact.js),
which emails you through [Resend](https://resend.com). Visitors' addresses are set as reply-to.
Spam protection: a hidden honeypot field, plus optional Cloudflare Turnstile.

- Test locally with the real function: copy `.dev.vars.example` to `.dev.vars`, then `npm run pages:dev`.
- Plain `npm run dev` has no backend, so the form shows an error with an "email me directly" fallback.

## Deploying (Cloudflare Pages)

1. Push the repo to GitHub, then in Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Build command `npm run build`, output directory `dist`. The `functions/` folder deploys automatically.
3. **Settings → Environment variables** (Production):
   - `RESEND_API_KEY`: your Resend API key
   - `CONTACT_TO`: the inbox that receives messages
   - `CONTACT_FROM` *(optional)*: e.g. `Portfolio <hello@yourdomain.com>` once your domain is verified in Resend
   - `TURNSTILE_SECRET` + `VITE_TURNSTILE_SITE_KEY` *(optional)*: from **Cloudflare → Turnstile → Add site**
4. Add a custom domain under **Custom domains** if you have one.
