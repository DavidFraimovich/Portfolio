# Portfolio (Next.js + GitHub Pages + Decap CMS)

Static portfolio site using Next.js App Router and `output: "export"` for GitHub Pages, with bilingual routing (`/en`, `/he`).

## Local development

```bash
npm install
npm run dev
```

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

Admin UI: `public/admin/index.html`
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

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys `out/` on push to `main`.

`next.config.ts` auto-applies `basePath` and `assetPrefix` from `GITHUB_REPOSITORY` for project pages (`username.github.io/repo`).
