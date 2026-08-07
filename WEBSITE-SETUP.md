# Website hosting setup

The generated static site lives in `website/` and is deployed by `.github/workflows/deploy-pages.yml` whenever website files are pushed to `main`.

## GitHub Pages

1. Open `https://github.com/merill/daily-intune/settings/pages`.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Add `daily.intune.admin.news` as the custom domain and enable HTTPS after the certificate is ready.
4. In DNS, create a CNAME record for `daily.intune.admin.news` pointing to `merill.github.io`.
5. Run **Deploy Intune daily site** manually once, or push the populated `website/` directory to `main`.

The site also contains `website/CNAME`, with `daily.intune.admin.news`, so the domain remains attached across deployments.

## Local preview

```bash
npm ci
npm run build:site
npm run preview:site
```

Open `http://127.0.0.1:4173/`.

## Generated routes

- `/` — latest daily page
- `/day/YYYY-MM-DD/` — daily archive, including quiet days
- `/week/YYYY-MM-DD/` — ISO-week archive, keyed by Monday
- `/month/YYYY-MM/` — monthly archive
- `/products/` and `/topics/` — classified Intune collections
- `/message-center/` — Intune Message Center items
- `/compare/` — client-side Microsoft Learn diff viewer
- `/search/` — Pagefind archive search
- `/rss.xml`, `/sitemap.xml`, and `/llms.txt` — feeds and discovery metadata

All generated reports are public and contain only public Git and Microsoft Learn/Message Center data.
