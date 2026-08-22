# Result Mint — Final React/Vite Website

## Run
- `npm install`
- `npm run build`
- `npm run dev`

## Structure
- `src/main.jsx` — page structure, routes and editable page content
- `src/styles.css` — design, responsive layout and animation
- `public/result-mint-logo.png` — website logo
- `index.html` — SEO/meta and favicon
- `vercel.json` — SPA routing for Vercel

## Pages
Home, Services, Case Studies, 5 individual case studies, About, Contact, and 404.

## Future edits
Phone number is intentionally not displayed. When you want to add it, ask for the exact phone number and it can be added above the email in the Contact page without redesigning the site.

The Contact form is intentionally ready for a form service. Formspree can be connected later without redesigning the page.

Before launch, confirm you have permission to publicly use client names, logos and testimonials.

## Latest fixes
- Desktop RM logo enlarged for stronger brand presence.
- Mobile hamburger navigation added for Home, Services, Case Studies, About and Let's Talk.
- Mobile menu closes automatically after navigation.
- Navbar now references the supplied SVG mark consistently.

## Latest header fix
- Uses the full Result Mint logo as a single image (no duplicate text mark).
- Desktop logo width set to 260px with proportional height.
- Mobile logo width set to 190px with proportional height.
- Desktop navigation spacing tightened so all navigation items remain visible.

## Cross-checked final notes
- `src/main.jsx` imports business content from `src/data.js`, so future content edits in `data.js` are actually used by the site.
- `public/result-mint-logo.svg` is referenced consistently by both the page and favicon.
- Vercel rewrites are limited to React routes and do not catch static assets such as the logo.
- The logo SVG preserves its actual 1380×275 aspect ratio so the built-in tagline remains readable.
