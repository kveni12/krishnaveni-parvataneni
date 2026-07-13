# Krishnaveni Parvataneni - Personal Website

A modern, responsive personal website designed for GitHub Pages.

Resume files used by the site:

- `assets/resume-krishna.pdf`
- `assets/resume-nyu.pdf`

## Local preview

Open `index.html` directly in your browser, or run:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Deploy to GitHub Pages

1. Push this repository to `main`.
2. On GitHub, open repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Save and wait for deployment to finish.

Your site will be published at:
`https://kveni12.github.io/krishnaveni-parvataneni/`

## SEO and indexing

This project includes:

- Open Graph and Twitter social metadata
- Canonical URLs on each page
- `robots.txt`
- `sitemap.xml`
- `Person` structured data (JSON-LD) on homepage

After deploying, you can optionally submit your sitemap to Google Search Console.

## Optional custom domain

If you want a custom domain later:

1. Buy/configure your domain with your DNS provider.
2. In GitHub repo **Settings > Pages**, set **Custom domain**.
3. Add DNS records from GitHub's instructions.
4. Create a `CNAME` file in this repo with your exact domain.
