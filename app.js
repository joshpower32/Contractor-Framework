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
  // Free demo photos via Pexels. Replace with your own key from https://www.pexels.com/api/
  pexelsKey: "4SuTxTJkprUsJAP1CZoSkd412wKx4EuXt7xfK5HzZf9DreiCe8Wv0twm",
  heroQuery: "modern kitchen renovation",
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

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// --- SVG fallback placeholder (shown while a photo loads / if offline) -
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

// --- Pexels image cache (shared pattern with flower-shop) --------------
const IMG_CACHE_KEY = "northwood_imgcache";
let imgCache = JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || "{}");
const itemImage = (item) => item.image || imgCache[item.id]?.url || null;

async function fetchPexels(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: CONFIG.pexelsKey } }
  );
  if (!res.ok) return null;
  return (await res.json()).photos?.[0] || null;
}

async function hydrateImages(items, onResolve) {
  // Parallel fetch so all photos arrive together rather than one-by-one.
  await Promise.all(items.map(async (item) => {
    if (itemImage(item)) { onResolve(item); return; }
    try {
      const photo = await fetchPexels(item.query);
      if (!photo) return;
      imgCache[item.id] = { url: photo.src.medium, photographer: photo.photographer };
      localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(imgCache));
      onResolve(item);
    } catch (_) { /* keep the SVG fallback */ }
  }));
}

function mediaHTML(item, seed) {
  const url = itemImage(item);
  const credit = imgCache[item.id]?.photographer;
  if (url) return `<img src="${esc(url)}" alt="${esc(item.name || item.title)}"${credit ? ` title="Photo: ${esc(credit)} / Pexels"` : ""} loading="lazy">`;
  return placeholderSVG(seed);
}

// --- Hero background ----------------------------------------------------
async function loadHero() {
  const hero = document.getElementById("hero");
  const cached = imgCache["__hero"]?.url;
  if (cached) { hero.style.backgroundImage = `url("${cached}")`; return; }
  try {
    const photo = await fetchPexels(CONFIG.heroQuery);
    if (photo) {
      imgCache["__hero"] = { url: photo.src.landscape, photographer: photo.photographer };
      localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(imgCache));
      hero.style.backgroundImage = `url("${photo.src.landscape}")`;
    }
  } catch (_) { /* dark fallback colour stays */ }
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
function updateServiceMedia(s) {
  const el = document.querySelector(`.service-media[data-id="${s.id}"]`);
  if (el) el.innerHTML = mediaHTML(s, 1);
}

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
    <figure class="gallery-item" data-id="${p.id}" data-full="${esc(itemImage(p) || "")}" tabindex="0" role="button" aria-label="View ${esc(p.title)}">
      ${mediaHTML(p, i + 1)}
      <figcaption class="gallery-cap">${esc(p.title)}</figcaption>
    </figure>`).join("");
}
function updateProjectMedia(p) {
  // Update any visible card for this project (it may be filtered out)
  const el = galleryEl.querySelector(`.gallery-item[data-id="${p.id}"]`);
  if (el) {
    el.querySelector("svg, img")?.remove();
    el.insertAdjacentHTML("afterbegin", mediaHTML(p, 1));
    el.dataset.full = itemImage(p) || "";
  }
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

// --- Quote form ---------------------------------------------------------
document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // === WIRE UP REAL DELIVERY HERE ====================================
  // Easiest: point the form at Formspree (https://formspree.io) — set the
  // form's action/method and remove this handler. Or POST to a Firebase
  // Cloud Function / Firestore "leads" collection.
  // ===================================================================
  const name = new FormData(e.target).get("name") || "";
  e.target.reset();
  toast(`Thanks ${String(name).split(" ")[0]} — we’ll be in touch within 1 business day!`);
  document.getElementById("quoteNote").textContent = "Demo: your request was captured locally. Wire to email/Firebase for real delivery (see README).";
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
hydrateImages(SERVICES, updateServiceMedia);
hydrateImages(PROJECTS, (p) => { updateProjectMedia(p); });
