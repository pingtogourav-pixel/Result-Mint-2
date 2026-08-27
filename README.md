# Result Mint — Expanded Agency Website

This is the expanded Result Mint website: a premium, content-rich agency site inspired by the information architecture of established performance agencies, while retaining Result Mint's own visual identity.

## Pages
- Home
- Services + individual service pages
- Case Studies + five full case-study pages
- Industries + individual industry pages
- Clients
- About
- Contact
- 404 fallback

## Content source
Business content is centralized in `src/data.js` so future edits can be made without hunting through layout code.

## Run locally
`npm install`
`npm run build`
`npm run dev`

## Deploy
Push the repository to GitHub and let the existing Vercel project deploy from the `main` branch.

## Important deployment notes
- `public/result-mint-logo.svg` is the website logo asset.
- Keep `index.html` at repository root.
- Keep `public/` and `src/` at repository root.
- `vercel.json` rewrites only known React routes; static assets are not rewritten.
- The Contact form is front-end ready and can be connected to Formspree or another backend later.

## Future edits
Edit `src/data.js` for company details, services, industries, brands, testimonials and case studies.
