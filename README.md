# Contractor / Renovations Framework — "Northwood Renovations"

A sellable **service-business website** template for contractors, renovators, and trades:
hero, services, a filterable **project gallery with lightbox**, process steps, reviews, and
a **quote-request form**. Pure HTML/CSS/JS — no build step, hosts free on GitHub Pages.

Built on the shared design-system starter kit (re-skinned charcoal + amber), and reuses
the lightbox + Pexels-image pattern from the flower-shop framework.

## Personalising for a client

1. **Brand & colours** — edit the `:root` tokens in `styles.css` (`--brand`, `--dark`,
   fonts) and the `Northwood Renovations` text in `index.html`.
2. **Services / projects** — edit the `SERVICES` and `PROJECTS` arrays in `app.js`
   (name, description, category, Pexels `query`).
3. **Real photos** — give a service/project an `image:` field
   (e.g. `image: "assets/kitchen-after.jpg"`) to override the Pexels placeholder. Shoot the
   client's real jobs with the camera — for trades, real before/after work sells best.
4. **Copy** — hero, trust strip, process, reviews, service area, hours, licence #, and
   contact info all live in `index.html`.

## Make the quote form actually deliver

The form currently shows a demo confirmation. To receive real leads, either:
- **Formspree** (easiest): create a form at https://formspree.io, set the `<form>`’s
  `action` to your endpoint + `method="post"`, and remove the JS submit handler; or
- **Firebase**: POST submissions to a Firestore `leads` collection (mirror the YMCA
  dashboard project), optionally emailing yourself via a Cloud Function.

## Local preview

```bash
python3 -m http.server 5520   # then open http://localhost:5520
```

## Notes

- Pexels photos are demo placeholders (free key, same as the other frameworks); cached in
  `localStorage`. Replace with the client's real project photos when sold.
- Hosting upgrade path for paying clients: Netlify / Cloudflare Pages + custom domain.
