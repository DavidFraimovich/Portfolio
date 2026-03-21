# Portfolio (Next.js + GitHub Pages + Decap CMS)

Static portfolio site using Next.js App Router and `output: "export"` for GitHub Pages, with bilingual routing (`/en`, `/he`).

## Local development

```bash
npm install
npm run dev
```

`npm run dev` now starts both the Next.js app and the local Telegram contact relay.

## Analytics and contact relay

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables GA4 on the static site.
- Preferred no-relay option for GitHub Pages: set `TELEGRAM_DEPLOY_GROUP_TOKEN` and `TELEGRAM_DEPLOY_GROUP_ID` in the `github-pages` environment. The workflow maps them into public client-side runtime variables during build.
- Optional relay mode: `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` points the footer form to a public relay endpoint.
- Direct Telegram mode exposes the bot token and chat ID in the public client bundle. Use it only if you explicitly accept that risk.
- Local Telegram relay:

```bash
npm run relay:contact
```

- Default local endpoint: `http://127.0.0.1:8787/contact`
- Relay env vars:
  - `TELEGRAM_DEPLOY_GROUP_TOKEN`
  - `TELEGRAM_DEPLOY_GROUP_ID`
  - `CONTACT_RELAY_ALLOWED_ORIGINS`

For GitHub Pages deploys, expose `NEXT_PUBLIC_GA_MEASUREMENT_ID` and either:

- `TELEGRAM_DEPLOY_GROUP_TOKEN` + `TELEGRAM_DEPLOY_GROUP_ID` for direct client-side Telegram sending
- or `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` for relay mode

## Language architecture

- English: `/en`
- Hebrew: `/he`
- Hebrew pages render in RTL (`dir="rtl"`) automatically.
- Global language picker is in the top navigation.

## Content structure

- English case studies: `content/en/case-studies/*.mdx`
- Hebrew case studies: `content/he/case-studies/*.mdx`
- English posts: `content/en/posts/*.mdx`
- Hebrew posts: `content/he/posts/*.mdx`
- UI/labels:
  - `content/site/en.json`
  - `content/site/he.json`

## Footer architecture

- The global footer is mounted from `app/[locale]/layout.tsx`, so one component update applies site-wide.
- `components/Footer.tsx` owns the server-rendered layout and locale-aware links.
- `components/FooterContactPanel.tsx` owns the tooltip + modal behavior for the message area.
- Footer styling lives in `components/Footer.module.css` and is built on the existing global theme variables rather than a separate palette.
- Shared external links and CV paths live in `lib/contactLinks.ts`.

## Decap CMS (2 languages)

Admin UI: `app/admin/page.tsx`
Config: `public/admin/config.yml`

Collections:
- `Case Studies (EN)`
- `Case Studies (HE)`
- `Posts (EN)`
- `Posts (HE)`
- `Site UI (EN)`
- `Site UI (HE)`

For production GitHub login, set OAuth values in `config.yml`:

- `backend.base_url`: URL of your OAuth proxy/provider
- `backend.auth_endpoint`: auth endpoint (commonly `/auth`)

### Local CMS login

Use Decap local backend to avoid OAuth while developing locally:

```bash
npm run cms
```

In a second terminal:

```bash
npm run dev
```

Then open:

- `http://localhost:3000/admin/` (or your active dev port)

For the deployed GitHub Pages site, use:

- `https://davidfraimovich.github.io/Portfolio/admin/`

Production GitHub login needs a real OAuth provider. The current config supports local development with `npx decap-server`, but GitHub Pages alone cannot complete GitHub auth without that extra provider.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys `out/` on push to `main`.

`next.config.ts` auto-applies `basePath` and `assetPrefix` from `GITHUB_REPOSITORY` for project pages (`username.github.io/repo`).
