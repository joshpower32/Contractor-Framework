/* =====================================================================
   Northwood Renovations — Contractor framework
   ---------------------------------------------------------------------
   Personalise for a client:
   • Brand/colours: :root tokens in styles.css + brand text in index.html.
   • Services & projects: edit the SERVICES and PROJECTS arrays below.
   • Real photos: give an item an `image:` path (e.g. "assets/kitchen.jpg")
     to override the Pexels placeholder — shoot these with the camera.
   • Quote form: see quoteForm handler — wire to email (Formspree) or Firebase.
   ===================================================================== */

const CONFIG = {
  heroQuery: "modern kitchen renovation",
  // === LEAD DELIVERY (set this before selling the site) ===============
  // Get a FREE key at https://web3forms.com — enter the client's email, then
  // paste the key here. Quote requests then email the client automatically.
  // Until it's set, the form opens the visitor's email app as a fallback.
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  contactEmail: "hello@northwoodreno.example", // fallback recipient + shown on errors
  businessName: "Northwood Renovations",
};

const SERVICES = [
  { id: "kitchens",  name: "Kitchens",         desc: "Custom cabinetry, countertops, and full kitchen remodels.",        query: "modern kitchen interior",
    lead: "From a fresh facelift to a full gut-and-rebuild, we design and build kitchens that work as good as they look.",
    points: ["Custom cabinetry and built-in storage", "Quartz, granite, and butcher-block countertops", "Tile backsplashes and under-cabinet lighting", "Plumbing, electrical, and appliance install", "Islands, pantries, and open-concept layouts"] },
  { id: "bathrooms", name: "Bathrooms",        desc: "Spa-like ensuites, tiled showers, and accessible bathrooms.",      query: "renovated bathroom",
    lead: "Turn a dated bathroom into a spa-like retreat — or a safe, accessible space that works for every age.",
    points: ["Custom tiled and glass walk-in showers", "Freestanding tubs and double vanities", "Heated floors and modern fixtures", "Accessible and barrier-free designs", "Full waterproofing done right"] },
  { id: "basements", name: "Basements",        desc: "Finished basements, in-law suites, and legal apartments.",         query: "finished basement",
    lead: "Unlock a whole extra floor — for the family, for guests, or as a legal income suite.",
    points: ["Finished family and rec rooms", "Legal second-unit / in-law suites", "Bathrooms, kitchenettes, and wet bars", "Egress windows, insulation, and waterproofing", "Permits and code compliance handled"] },
  { id: "additions", name: "Additions",        desc: "Home additions, second storeys, and structural builds.",          query: "home construction framing",
    lead: "Need more space without moving? We build additions that look like they were always there.",
    points: ["Room and bump-out additions", "Full second-storey builds", "Garage builds and conversions", "Structural engineering and permits", "Seamless rooflines and matching exteriors"] },
  { id: "decks",     name: "Decks & Outdoor",  desc: "Decks, fences, pergolas, and outdoor living spaces.",              query: "wooden deck backyard",
    lead: "Make the most of your yard with outdoor living spaces built to last Canadian seasons.",
    points: ["Composite and pressure-treated decks", "Pergolas, gazebos, and privacy screens", "Fences and gates", "Interlock patios and walkways", "Built-in seating and planters"] },
  { id: "roofing",   name: "Roofing & Siding", desc: "Roof replacement, siding, soffit, and fascia.",                    query: "house roofing",
    lead: "Protect and refresh the outside of your home with durable, warrantied roofing and siding.",
    points: ["Full roof replacement and repairs", "Vinyl, fibre-cement, and board-and-batten siding", "Soffit, fascia, and eavestrough", "Attic ventilation and ice-dam prevention", "Manufacturer-backed warranties"] },
];

// Project gallery — cat drives the filter chips
const PROJECTS = [
  { id: "p1", title: "Modern white kitchen",     cat: "Kitchens",  query: "white kitchen renovation" },
  { id: "p2", title: "Walk-in tiled shower",     cat: "Bathrooms", query: "tiled bathroom shower" },
  { id: "p3", title: "Open-concept basement",    cat: "Basements", query: "basement living room" },
  { id: "p4", title: "Cedar backyard deck",      cat: "Outdoor",   query: "backyard cedar deck" },
  { id: "p5", title: "Quartz island & cabinets", cat: "Kitchens",  query: "kitchen island quartz" },
  { id: "p6", title: "Double vanity ensuite",    cat: "Bathrooms", query: "modern bathroom vanity" },
  { id: "p7", title: "Two-storey addition",      cat: "Additions", query: "house addition construction" },
  { id: "p8", title: "Covered patio & pergola",  cat: "Outdoor",   query: "pergola patio" },
  { id: "p9", title: "Rec room & wet bar",       cat: "Basements", query: "basement bar" },
];

// --- Demo photos: pinned Pexels shots, keyed by each item's `query` -----
// Direct image URLs load with the page — no API call, no key, no pop-in.
// To change a photo: browse pexels.com, copy the image address, paste here.
const PEXELS_PHOTOS = {
  "modern kitchen interior": { u: "https://images.pexels.com/photos/7045356/pexels-photo-7045356.jpeg", p: "Max Vakhtbovych" },
  "renovated bathroom": { u: "https://images.pexels.com/photos/35493890/pexels-photo-35493890.jpeg", p: "Peter  Vang" },
  "finished basement": { u: "https://images.pexels.com/photos/35493895/pexels-photo-35493895.jpeg", p: "Peter  Vang" },
  "home construction framing": { u: "https://images.pexels.com/photos/37627682/pexels-photo-37627682.jpeg", p: "D Goug" },
  "wooden deck backyard": { u: "https://images.pexels.com/photos/9056671/pexels-photo-9056671.jpeg", p: "Matheus Bertelli" },
  "house roofing": { u: "https://images.pexels.com/photos/29114658/pexels-photo-29114658.jpeg", p: "Jan van der Wolf" },
  "white kitchen renovation": { u: "https://images.pexels.com/photos/36511379/pexels-photo-36511379.jpeg", p: "Lee Salem" },
  "tiled bathroom shower": { u: "https://images.pexels.com/photos/4258278/pexels-photo-4258278.jpeg", p: "Curtis Adams" },
  "basement living room": { u: "https://images.pexels.com/photos/35493891/pexels-photo-35493891.jpeg", p: "Peter  Vang" },
  "backyard cedar deck": { u: "https://images.pexels.com/photos/36220309/pexels-photo-36220309.jpeg", p: "Alec Adriano" },
  "kitchen island quartz": { u: "https://images.pexels.com/photos/8089193/pexels-photo-8089193.jpeg", p: "Max Vakhtbovych" },
  "modern bathroom vanity": { u: "https://images.pexels.com/photos/6238612/pexels-photo-6238612.jpeg", p: "Max Vakhtbovych" },
  "house addition construction": { u: "https://images.pexels.com/photos/28885519/pexels-photo-28885519.jpeg", p: "Brett Jordan" },
  "pergola patio": { u: "https://images.pexels.com/photos/13871294/pexels-photo-13871294.jpeg", p: "Matheus Bertelli" },
  "basement bar": { u: "https://images.pexels.com/photos/36777947/pexels-photo-36777947.jpeg", p: "Curtis Adams" },
  "modern kitchen renovation": { u: "https://images.pexels.com/photos/36035073/pexels-photo-36035073.jpeg", p: "Valentin Ivantsov" },
};
// Size an image via Pexels CDN params (w = target width in px)
const px = (u, w) => `${u}?auto=compress&cs=tinysrgb&w=${w}`;

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// --- SVG fallback placeholder (shown if a photo fails to load) ---------
function placeholderSVG(seed = 0) {
  const h = (seed * 47) % 360;
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Project photo placeholder">
    <defs><linearGradient id="pg${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h},14%,30%)"/><stop offset="1" stop-color="hsl(${h},12%,18%)"/></linearGradient></defs>
    <rect width="300" height="200" fill="url(#pg${seed})"/>
    <path d="M40 150 L110 80 L160 130 L210 95 L260 150 Z" fill="hsl(${h},10%,40%)" opacity=".5"/>
    <circle cx="230" cy="55" r="18" fill="hsl(40,60%,60%)" opacity=".7"/>
  </svg>`;
}

// --- Item imagery: real photo > pinned Pexels photo > SVG fallback ------
const itemImage = (item, w = 640) =>
  item.image || (PEXELS_PHOTOS[item.query] ? px(PEXELS_PHOTOS[item.query].u, w) : null);

function mediaHTML(item, seed) {
  const url = itemImage(item);
  const credit = !item.image && PEXELS_PHOTOS[item.query]?.p;
  if (url) return `<img src="${esc(url)}" alt="${esc(item.name || item.title)}"${credit ? ` title="Photo: ${esc(credit)} / Pexels"` : ""} loading="lazy" onerror="this.outerHTML = placeholderSVG(${seed})">`;
  return placeholderSVG(seed);
}

// --- Hero background ----------------------------------------------------
function loadHero() {
  const ph = PEXELS_PHOTOS[CONFIG.heroQuery];
  if (ph) document.getElementById("hero").style.backgroundImage = `url("${px(ph.u, 1600)}")`;
}

// --- Render: services ---------------------------------------------------
const servicesGrid = document.getElementById("servicesGrid");
function renderServices() {
  servicesGrid.innerHTML = SERVICES.map((s, i) => `
    <article class="service-card" data-service="${s.id}" role="button" tabindex="0" aria-label="${esc(s.name)} — view details">
      <div class="service-media" data-id="${s.id}">${mediaHTML(s, i + 1)}</div>
      <div class="service-body"><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><span class="service-more">View details →</span></div>
    </article>`).join("");
  servicesGrid.querySelectorAll(".service-card[data-service]").forEach((c) => {
    const open = () => openService(c.dataset.service);
    c.addEventListener("click", open);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

// --- Service detail modal ----------------------------------------------
function openService(id) {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return;
  const modal = document.getElementById("serviceModal");
  document.getElementById("serviceModalBody").innerHTML = `
    <div class="sm-media">${mediaHTML(s, 1)}</div>
    <div class="sm-body">
      <h3>${esc(s.name)}</h3>
      <p class="sm-lead">${esc(s.lead || s.desc)}</p>
      <h4>What’s included</h4>
      <ul class="sm-list">${(s.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="sm-actions">
        <button class="btn btn-primary" id="smQuote">Get a free quote</button>
        <button class="btn btn-ghost" id="smProjects">See our projects</button>
      </div>
    </div>`;
  document.getElementById("smQuote").addEventListener("click", () => { closeService(); document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); });
  document.getElementById("smProjects").addEventListener("click", () => { closeService(); document.getElementById("projects").scrollIntoView({ behavior: "smooth" }); });
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}
function closeService() {
  const modal = document.getElementById("serviceModal");
  modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
}
document.getElementById("serviceClose").addEventListener("click", closeService);
document.getElementById("serviceModal").addEventListener("click", (e) => { if (e.target.id === "serviceModal") closeService(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeService(); });

// --- Render: projects gallery + filters ---------------------------------
const galleryEl = document.getElementById("projectGallery");
const filtersEl = document.getElementById("projectFilters");
let activeCat = "All";

function renderFilters() {
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.cat))];
  filtersEl.innerHTML = cats.map((c) =>
    `<button class="filter-chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  filtersEl.querySelectorAll(".filter-chip").forEach((b) =>
    b.addEventListener("click", () => { activeCat = b.dataset.cat; renderFilters(); renderGallery(); }));
}
function renderGallery() {
  const list = PROJECTS.filter((p) => activeCat === "All" || p.cat === activeCat);
  galleryEl.innerHTML = list.map((p, i) => `
    <figure class="gallery-item" data-id="${p.id}" data-full="${esc(itemImage(p, 1600) || "")}" tabindex="0" role="button" aria-label="View ${esc(p.title)}">
      ${mediaHTML(p, i + 1)}
      <figcaption class="gallery-cap">${esc(p.title)}</figcaption>
    </figure>`).join("");
}

// --- Lightbox -----------------------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
function openLightbox(src, alt) {
  if (!src) return;
  lightboxImg.src = src; lightboxImg.alt = alt || "";
  lightbox.classList.add("show"); document.body.style.overflow = "hidden";
}
function closeLightbox() { lightbox.classList.remove("show"); lightboxImg.src = ""; document.body.style.overflow = ""; }
galleryEl.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (item) openLightbox(item.dataset.full, item.querySelector("figcaption")?.textContent);
});
galleryEl.addEventListener("keydown", (e) => {
  const item = e.target.closest(".gallery-item");
  if (item && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLightbox(item.dataset.full, item.querySelector("figcaption")?.textContent); }
});
lightbox.addEventListener("click", (e) => { if (e.target !== lightboxImg) closeLightbox(); });

// --- Quote form (real delivery via Web3Forms) ---------------------------
const KEY_PLACEHOLDER = "YOUR_WEB3FORMS_ACCESS_KEY";
document.getElementById("quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);
  const firstName = String(fd.get("name") || "there").split(" ")[0];
  const note = document.getElementById("quoteNote");
  const btn = form.querySelector('button[type="submit"]');

  // No key yet → open the visitor's email app so no lead is ever lost.
  if (!CONFIG.web3formsKey || CONFIG.web3formsKey === KEY_PLACEHOLDER) {
    const subject = encodeURIComponent(`New quote request — ${fd.get("name") || ""}`);
    const body = encodeURIComponent([...fd.entries()].filter(([k]) => k !== "botcheck").map(([k, v]) => `${k}: ${v}`).join("\n"));
    window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    toast("Opening your email app to send your request…");
    return;
  }

  fd.append("access_key", CONFIG.web3formsKey);
  fd.append("subject", `🔔 NEW LEAD — Quote request from ${fd.get("name") || "website"}`);
  fd.append("from_name", CONFIG.businessName);
  btn.disabled = true; const orig = btn.textContent; btn.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: fd });
    const data = await res.json();
    if (res.ok && data.success) {
      form.reset();
      toast(`Thanks ${firstName} — we’ll be in touch within 1 business day!`);
      if (note) note.textContent = "Request sent ✓ — we’ll reply by email shortly.";
    } else { throw new Error(data.message || "Send failed"); }
  } catch (_) {
    toast(`Couldn’t send — please email ${CONFIG.contactEmail}.`);
    if (note) note.textContent = `Something went wrong sending the form. Please email ${CONFIG.contactEmail} directly.`;
  } finally { btn.disabled = false; btn.textContent = orig; }
});

// --- Mobile nav + misc --------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 250); }, 3200);
}
document.getElementById("year").textContent = new Date().getFullYear();

// --- Init ---------------------------------------------------------------
renderServices();
renderFilters();
renderGallery();
loadHero();
