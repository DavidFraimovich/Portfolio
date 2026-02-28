# Portfolio (Next.js + GitHub Pages + Decap CMS)

Static portfolio site using Next.js App Router and `output: "export"` for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Content structure

- `content/case-studies/*.mdx`
- `content/posts/*.mdx` (optional)
- `content/site.json`

## Decap CMS

Admin UI is at `public/admin/index.html` and config at `public/admin/config.yml`.

For production GitHub login, set an OAuth proxy with these values in `config.yml`:

- `backend.base_url`: your OAuth provider/proxy URL
- `backend.auth_endpoint`: usually `/auth`

Common setup: deploy a Decap OAuth provider, then update those two values to match that deployment.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the site and deploys `out/` to GitHub Pages on pushes to `main`.

`next.config.ts` auto-applies `basePath` and `assetPrefix` from `GITHUB_REPOSITORY` for project pages (`username.github.io/repo`).
