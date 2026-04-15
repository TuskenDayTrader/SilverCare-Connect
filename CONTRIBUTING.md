# Contributing to SilverCare Connect

Thank you for helping reduce isolation for seniors and their families. This guide explains how to set up the project locally, follow our branching conventions, and submit high-quality pull requests.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Running the Frontend](#running-the-frontend)
6. [Running the Backend API](#running-the-backend-api)
7. [Branching Strategy](#branching-strategy)
8. [Commit Messages](#commit-messages)
9. [Pull Request Process](#pull-request-process)
10. [Code Style](#code-style)
11. [Adding or Updating Facility Data](#adding-or-updating-facility-data)
12. [Internationalization (i18n)](#internationalization-i18n)
13. [Accessibility Standards](#accessibility-standards)
14. [Reporting Bugs](#reporting-bugs)
15. [Requesting Features](#requesting-features)

---

## Code of Conduct

Be kind and respectful. We are building tools for vulnerable people and their families. Discriminatory, dismissive, or harmful behavior will not be tolerated.

---

## Getting Started

### Prerequisites

| Tool | Minimum Version | Purpose |
|------|----------------|---------|
| Node.js | 18 LTS | Backend API |
| npm | 9+ | Package management |
| Python 3 **or** `npx serve` | Any modern version | Local frontend server |
| MySQL 8 **or** SQLite | — | Backend database (SQLite recommended for dev) |
| Git | 2.30+ | Version control |

### 1 — Clone the repository

```bash
git clone https://github.com/TuskenDayTrader/SilverCare-Connect.git
cd SilverCare-Connect
```

### 2 — Set up the backend

```bash
cd server
cp .env.example .env
# Edit .env — see Environment Variables section below
npm install
npm run dev        # starts API on http://localhost:4000
```

### 3 — Start the frontend

In a **separate terminal** (stay in the project root):

```bash
# Option A — Python (no extra install)
python3 -m http.server 8080

# Option B — Node.js
npx serve .
```

Then open **http://localhost:8080** in your browser.

---

## Project Structure

```
SilverCare-Connect/
├── index.html            # Homepage (hero, how-it-works, booking form)
├── facility.html         # Facility overview / facility micro-page
├── styles.css            # Shared responsive stylesheet
├── js/
│   ├── facilities.js     # Loads facility JSON; exposes window.FacilitiesLoader
│   └── demoStore.js      # localStorage demo store; exposes window.DemoStore
├── data/
│   └── facilities.pinellas.json   # Pinellas County facility data
├── images/               # Static images and SVG placeholders
├── assets/               # Additional static assets
├── server/               # Node.js / Express backend
│   ├── app.js            # Express entry point
│   ├── db.js             # Sequelize / database connection
│   ├── middleware.js      # JWT auth middleware
│   ├── models/           # Sequelize models (User, SessionRequest)
│   ├── routes/           # API routes (auth, sessions)
│   └── utils/            # JWT helpers, email sender
├── docs/                 # Project documentation (user stories, admin design)
├── LEGAL/                # Privacy policy, terms of service, consent forms
└── email-templates/      # Transactional email templates
```

---

## Environment Variables

Copy `server/.env.example` to `server/.env` and fill in your values.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | API port (default: `4000`) |
| `DB_HOST` | MySQL only | MySQL host (e.g. `localhost`) |
| `DB_USER` | MySQL only | MySQL username |
| `DB_PASS` | MySQL only | MySQL password |
| `DB_NAME` | MySQL only | MySQL database name (create it first: `CREATE DATABASE silvercare;`) |
| `JWT_SECRET` | **Yes** | Long random string — **never commit this** |
| `EMAIL_HOST` | Email only | SMTP host (e.g. `smtp.sendgrid.net`) |
| `EMAIL_PORT` | Email only | SMTP port (usually `587`) |
| `EMAIL_USER` | Email only | SMTP username / API key |
| `EMAIL_PASS` | Email only | SMTP password |

### SQLite (recommended for local development)

Edit `server/db.js` and change the dialect block to:

```js
dialect: "sqlite",
storage: "./database.sqlite",
```

Then remove `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_NAME` from your `.env`.

> **Security:** Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## Running the Frontend

The frontend is plain HTML/CSS/JS with no build step.

```bash
# From project root
python3 -m http.server 8080
# Open http://localhost:8080
```

Testing a specific facility page:

```
http://localhost:8080/facility.html?id=sandpiper-alf-saint-petersburg-33707
```

See [README.md](README.md#testing-facility-pages-locally) for more details.

---

## Running the Backend API

```bash
cd server
npm run dev     # nodemon — auto-restarts on save
# API available at http://localhost:4000
```

### Connecting the frontend to a local backend

The homepage form automatically tries `http://localhost:4000/api/sessions/public`. If the backend is not running it falls back to demo mode (localStorage). No changes needed for local development.

To point to a deployed API, edit the `API_BASE` variable at the top of the `<script>` block in `index.html`:

```js
var API_BASE = 'https://your-deployed-api.example.com';
```

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `dev` | Active integration branch |
| `feature/<short-description>` | New features (branch from `dev`) |
| `fix/<short-description>` | Bug fixes (branch from `dev`) |
| `docs/<short-description>` | Documentation-only changes |
| `data/<short-description>` | Data file updates (facility JSON, etc.) |

**Never push directly to `main`.** Always open a PR.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-new-feature
# ... make changes ...
git push origin feature/my-new-feature
# Then open a PR on GitHub
```

---

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>
```

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation change |
| `data` | Facility data update |
| `style` | CSS / formatting (no logic change) |
| `refactor` | Code restructure (no behavior change) |
| `test` | Adding or updating test cases |
| `chore` | Tooling, dependencies, CI |

**Examples:**

```
feat(form): add preferred-language field to session request
fix(facilities): correct ZIP code for Sandpiper ALF
docs(contributing): add SQLite setup instructions
data(pinellas): add 5 new Clearwater facilities
```

---

## Pull Request Process

1. Keep PRs **small and focused** — one feature or fix per PR.
2. Fill in the pull request template completely.
3. Ensure your branch is up to date with `dev` before opening the PR.
4. Describe *what* changed, *why*, and how to test it.
5. Tag at least one reviewer.
6. Do not merge your own PR without a review (except documentation-only changes).
7. All CI checks must pass before merging.

---

## Code Style

- **No build step** — all JavaScript is plain ES5/ES6 served directly; avoid transpiler-only syntax.
- **CSS custom properties** — colors, spacing, and radii live in `:root {}` in `styles.css`. Edit variables there, not inline.
- **i18n** — every user-visible string in `index.html` must be added to all three language blocks (`en`, `es`, `zh`) in the `translations` object. For `facility.html`, add to `facilityTranslations`.
- **Accessibility** — new form fields must include a `<label>`, an `aria-describedby` pointer to an error `<span>`, and be keyboard-navigable.
- **Indentation** — 2 spaces (HTML/CSS/JS).
- **No trailing whitespace.**
- **End files with a newline.**

---

## Adding or Updating Facility Data

1. Open `data/facilities.pinellas.json`.
2. Append a new object to the `facilities` array following the existing schema:

```json
{
  "id": "facility-name-city-zip",
  "name": "Full Facility Name",
  "street": "123 Main St",
  "city": "Clearwater",
  "state": "FL",
  "zip": "33756",
  "phone": "(727) 555-0100",
  "type": "Assisted Living Facility",
  "capacity": 40,
  "photoMissing": true,
  "photos": [
    "images/placeholder-facility-1.svg",
    "images/placeholder-facility-2.svg",
    "images/placeholder-facility-3.svg"
  ]
}
```

3. **ID rules:** lowercase, hyphens, format `{name-slug}-{city-slug}-{zip}`. **Never change an existing ID** after links have been shared.
4. Replace placeholder photos with real images (JPEG or WebP, ~800 × 600 px) placed in `images/` and update the `photos` array. Set `"photoMissing": false` once real photos are added.

---

## Internationalization (i18n)

- All UI strings in `index.html` live in the `translations` object (bottom of the file).
- To add a new language, copy the `en` block, give it a new language code, and translate every value.
- String keys use dot notation (e.g. `form.field.name.label`).
- For `facility.html`, strings live in `facilityTranslations` in the same file's `<script>` block.

---

## Accessibility Standards

All contributions must maintain or improve the existing accessibility posture:

- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`).
- Every interactive element reachable by keyboard (Tab / Shift+Tab).
- Visible focus rings on all focusable elements — **do not** set `outline: none` without a replacement.
- Images must have descriptive `alt` text (or `alt=""` for decorative images).
- Color contrast ratio ≥ 4.5:1 for normal text; ≥ 3:1 for large text (WCAG AA).
- ARIA attributes used only where native HTML semantics are insufficient.

---

## Reporting Bugs

Use the **Bug Report** issue template on GitHub. Include:

- Steps to reproduce.
- Expected vs. actual behavior.
- Browser, OS, and screen reader (if relevant).
- Screenshots or console output.

---

## Requesting Features

Use the **Feature Request** issue template. Include:

- The user story ("As a [persona], I want…").
- Why the feature matters for the mission.
- Any design or UX considerations.

---

*SilverCare Connect — Reducing isolation, one session at a time.*
