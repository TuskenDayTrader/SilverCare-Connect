# SilverCare Connect

SilverCare Connect helps families stay close — even from a distance. We make it easy to schedule a short, supported video session with your loved one at their assisted living facility. We handle the tech. You just show up.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — Hero, How It Works, Why SilverCare, Pilot Details, and Session Request form |
| `facility.html` | Facility Partner Overview — generic overview **or** facility-specific micro page when `?id=` param is present |
| `styles.css` | Shared responsive stylesheet with accessibility features |

## Facility Data

### `data/facilities.pinellas.json`

Contains the Pinellas County assisted living facility list.

```jsonc
{
  "region": "Pinellas County, FL",
  "facilities": [
    {
      "id": "sandpiper-alf-saint-petersburg-33707",   // stable slug
      "name": "Sandpiper ALF",
      "street": "6439 First Avenue South",
      "city": "Saint Petersburg",
      "state": "FL",
      "zip": "33707",
      "photos": ["images/placeholder-facility-1.svg", ...]
    },
    ...
  ]
}
```

**Facility IDs** are stable slugs derived from `{name}-{city}-{zip}` (lowercase, hyphens).  
To add a new facility, append an entry following the same schema.

### Adding Real Facility Photos

1. Add photo files to the `images/` directory (JPEG or WebP recommended, ~800 × 600 px).
2. Update the `photos` array for the relevant facility in `data/facilities.pinellas.json`:

```json
"photos": [
  "images/my-facility-exterior.jpg",
  "images/my-facility-common-room.jpg"
]
```

Placeholder SVGs (`images/placeholder-facility-1.svg`, `-2.svg`, `-3.svg`) are used until real photos are provided.

## JavaScript Modules

| File | Purpose |
|------|---------|
| `js/facilities.js` | Loads `data/facilities.pinellas.json`, exposes `window.FacilitiesLoader` with `load()`, `getById(id)`, `getByZip(zip)`, `allZips()` |
| `js/demoStore.js` | localStorage-backed demo store, exposes `window.DemoStore` with `getFacilityStats(id)`, `incrementFacilityRequest(id)`, `saveSessionRequest(req)`, `getSessionRequests()` |

## Facility-Specific Micro Pages

Any facility can be linked directly via:

```
facility.html?id=<facilityId>
```

Example:

```
facility.html?id=sandpiper-alf-saint-petersburg-33707
```

When a valid `?id=` is present the page shows:
- Facility name and address as the hero heading
- Photo gallery (placeholders until real images are added)
- Social proof — "Your family could be the first" when count is 0, or the number of families who have requested sessions
- A link to the pilot facility map (BatchGeo)

When no `?id=` is present the generic Facility Partner Overview is displayed.

## Testing Facility Pages Locally

Because `js/facilities.js` uses `fetch()` to load the JSON data file, you must serve the project from a local HTTP server (not open `index.html` directly as a `file://` URL).

**Option 1 — Python (built-in):**

```bash
cd /path/to/SilverCare-Connect
python3 -m http.server 8080
# then open http://localhost:8080
```

**Option 2 — Node.js (`npx serve`):**

```bash
npx serve .
# then open the URL shown in terminal
```

**Testing a specific facility page:**

```
http://localhost:8080/facility.html?id=sandpiper-alf-saint-petersburg-33707
```

## Accessibility

- Multi-language support: English, Español, 中文
- Adjustable font sizes (A− / A / A+)
- High contrast mode toggle
- Reduced motion toggle
- Screen reader friendly (ARIA labels, landmarks, skip-to-content link)
- Keyboard navigable

## Pilot

> 🟡 Pilot Demo — No payments collected. Session requests only.

- **Session length:** 30 minutes
- **Days:** Monday – Wednesday
- **Hours:** 8:00 AM – 8:00 PM (local time)
- **Area:** Pinellas County, FL (~20 mi radius)
- **Facility map:** [BatchGeo outreach map](https://www.batchgeo.com/map/0bab8e4477dc55548d1a79dc440e8ab2)

---

*SilverCare Connect — Reducing isolation, one session at a time.*
