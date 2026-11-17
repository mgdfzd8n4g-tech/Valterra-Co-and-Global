# Valterra Group & Co. — Website

Jekyll static site. Building Beyond Boundaries.

## Run locally
    bundle install
    bundle exec jekyll serve   # http://127.0.0.1:4000

## Deploy (GitHub + Cloudflare Pages)
Push to GitHub. In Cloudflare Pages: connect the repo, build command `jekyll build`, output directory `_site`, env var `JEKYLL_ENV=production`.

## Contact form — backend required
A static site cannot store or email enquiries by itself. Set `form_endpoint` in `_config.yml` to a form service URL (Formspree, Basin, Getform, etc.); submissions then post there via fetch and are emailed to you.
If `form_endpoint` is empty, the form falls back to opening the visitor's email app addressed to `email` in `_config.yml`. That is **not** stored anywhere and depends on the visitor's mail client.

## Edit content
Services, values and pricing live in `_config.yml`. Replace `hello@example.com`. Have the Terms and Privacy pages reviewed by a legal professional (POPIA) before launch.
