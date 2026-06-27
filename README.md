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

## Selling this site to a client (lead delivery)

The quote form is wired to **Web3Forms** so leads email the client automatically.

1. Go to [web3forms.com](https://web3forms.com) and enter the **client's email** → copy the access key they receive.
2. Paste it into `CONFIG.web3formsKey` in `app.js` (replace `YOUR_WEB3FORMS_ACCESS_KEY`).
3. Set `CONFIG.contactEmail` to the client's email too (used as the fallback + on errors).
4. Submit a test from the live site and confirm the client gets the `🔔 NEW LEAD` email (tell them to mark it "not junk" once).

Tip: keep all client keys under your own Web3Forms account so you can manage them, or create the key in the client's own account if they want to own it. Free tier = 250 submissions/month per key.
