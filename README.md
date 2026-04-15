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

## Testing the Session Request Flow

After starting a local server, walk through the following manual test steps:

1. **Open** `http://localhost:8080` in a browser.
2. **Click** "Request a Session" in the navigation or hero — confirm the page scrolls to the form.
3. **Submit the empty form** — all required fields should show inline error messages and the error summary should appear at the top of the form.
4. **Enter an invalid email** (e.g. `notanemail`) — confirm the per-field error updates on blur.
5. **Enter a valid ZIP code** (e.g. `33707`) — confirm the facility dropdown populates with matching facilities.
6. **Select a facility** — confirm the preview card appears with the facility name, address, and a link to its page.
7. **Pick a non-Mon/Wed date** (e.g. a Thursday) — confirm the date field shows an error on submission.
8. **Fill all fields correctly with a Monday–Wednesday date** — confirm the form submits, the success message appears, and the form resets.
9. **Test language switching** — switch to Español and 中文 and verify all form labels, placeholders, and error messages appear in the selected language.
10. **Inspect localStorage** (DevTools → Application → Local Storage) and verify a new entry was saved under key `sc_session_requests`.

### Modifying the Session Request Form

- **Adding a new field**: Add the HTML input inside a `<div class="form-group">` in `index.html`, then add validation logic for the new field inside `validateForm()` in the same file's `<script>` block. Add i18n keys for all three languages (`en`, `es`, `zh`).
- **Changing available time slots**: Edit the `<option>` elements inside `#preferred-time` in `index.html`.
- **Changing pilot days**: Update the `validateForm()` date check (currently enforces day 1–3, Mon–Wed) and update the `form.field.date.hint` translation strings.

## Accessibility

- Multi-language support: English, Español, 中文
- Adjustable font sizes (A− / A / A+)
- High contrast mode toggle
- Reduced motion toggle
- Screen reader friendly (ARIA labels, landmarks, skip-to-content link, `aria-live` regions)
- Keyboard navigable — visible focus rings on all interactive elements
- Per-field inline error messages linked via `aria-describedby`
- Form error summary with focus management on failed submission

## Contributor Tips

- **No build step** — all JavaScript is vanilla ES5/ES6 served directly. Open the HTML files (via a local server) and refresh.
- **CSS custom properties** — all colours, spacing, and radii are defined as CSS variables in `:root {}` inside `styles.css`. Change them once to update the whole site.
- **i18n** — all user-visible strings in `index.html` are stored in the `translations` object near the bottom of the file. To add a new language, copy the `en` block, change the language code, and translate the values. For `facility.html`, strings live in `facilityTranslations` inside that page's `<script>` block.
- **Facility data** — modify `data/facilities.pinellas.json` to add, rename, or remove facilities. The `id` field is the stable slug used in `?id=` URLs — **do not change existing IDs** after links have been shared.
- **Demo store** — `js/demoStore.js` persists session requests in `localStorage`. To inspect or clear demo data, use DevTools → Application → Local Storage and look for keys `sc_session_requests` and `sc_facility_stats`.
- **High-contrast & reduced-motion** — both are supported via CSS classes (`body.high-contrast`, `body.reduce-motion`) toggled by the accessibility bar, *and* by native OS/browser media queries (`prefers-contrast: more`, `prefers-reduced-motion: reduce`).

## Pilot

> 🟡 Pilot Demo — No payments collected. Session requests only.

- **Session length:** 30 minutes
- **Days:** Monday – Wednesday
- **Hours:** 8:00 AM – 8:00 PM (local time)
- **Area:** Pinellas County, FL (~20 mi radius)
- **Facility map:** [BatchGeo outreach map](https://www.batchgeo.com/map/0bab8e4477dc55548d1a79dc440e8ab2)

---

## Backend (Node.js / Express)

The `/server` directory contains a full Express + Sequelize REST API for user accounts and session requests.

### Directory structure

```
server/
  app.js               ← Express entry point
  db.js                ← Sequelize / MySQL (or SQLite) connection
  middleware.js        ← JWT auth middleware
  package.json
  .env.example
  models/
    User.js
    SessionRequest.js
  routes/
    auth.js            ← /api/auth/register  /api/auth/login
    sessions.js        ← /api/sessions/public  /api/sessions
  utils/
    jwt.js
    sendEmail.js
```

### 1 — Configure environment variables

```bash
cd server
cp .env.example .env
```

Open `.env` and set:

| Variable | Description |
|----------|-------------|
| `PORT` | Port the API listens on (default `4000`) |
| `DB_HOST` | MySQL host (e.g. `localhost`) |
| `DB_USER` | MySQL username |
| `DB_PASS` | MySQL password |
| `DB_NAME` | MySQL database name (create it first: `CREATE DATABASE silvercare;`) |
| `JWT_SECRET` | A long random string — keep this secret |
| `EMAIL_HOST/PORT/USER/PASS` | SMTP credentials for outgoing email |

**SQLite (easiest for local dev — no MySQL needed):**  
Edit `server/db.js` and replace the `dialect: "mysql"` block with:

```js
dialect: "sqlite",
storage: "./database.sqlite",
```

Then remove `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` from `.env`.

### 2 — Install dependencies and start the server

```bash
cd server
npm install
npm run dev    # uses nodemon — auto-restarts on file changes
# or: npm start
```

The API will be available at **http://localhost:4000**.

### 3 — Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | None | Register a new user |
| `POST` | `/api/auth/login` | None | Login, receive JWT token |
| `POST` | `/api/sessions/public` | None | Submit a session request (used by the homepage form) |
| `POST` | `/api/sessions` | Bearer JWT | Create a session linked to your account |
| `GET`  | `/api/sessions` | Bearer JWT | List your session requests |

### Example requests

**Register:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","password":"secret123"}'
```

**Public session request (same as homepage form):**
```bash
curl -X POST http://localhost:4000/api/sessions/public \
  -H "Content-Type: application/json" \
  -d '{
    "familyName": "Jane Smith",
    "contactEmail": "jane@example.com",
    "residentName": "Margaret Smith",
    "facilityId": "sandpiper-alf-saint-petersburg-33707",
    "date": "2026-05-12",
    "time": "10:00",
    "notes": "Grandma loves mornings"
  }'
```

### Frontend integration

`index.html` automatically POSTs the session-request form to `http://localhost:4000/api/sessions/public`.  
If the backend is not running the form falls back to demo mode (localStorage only).

To point the frontend at a deployed backend, change the `API_BASE` variable at the top of the `<script>` block in `index.html`:

```js
var API_BASE = 'https://your-deployed-api.example.com';
```

---

*SilverCare Connect — Reducing isolation, one session at a time.*
