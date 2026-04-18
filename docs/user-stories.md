# SilverCare Connect — User Stories & Manual Test Cases

This document records all user stories and manual end-to-end test scenarios for SilverCare Connect. It is the authoritative reference for QA, design review, and acceptance testing.

Run all frontend tests against a locally served instance:
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

---

## Table of Contents

- [User Stories](#user-stories)
- [Manual Test Cases](#manual-test-cases)
- [Backend Integration Test Scenarios](#backend-integration-test-scenarios)
- [Accessibility Test Scenarios](#accessibility-test-scenarios)
- [Multilingual Test Scenarios](#multilingual-test-scenarios)

---

## User Stories

### US-01 — Family Member Requests a Session

> **As** a family member,  
> **I want** to fill out a short form to request a video session at my loved one's facility,  
> **so that** SilverCare staff can confirm the booking without me needing to call anyone.

**Acceptance Criteria:**
- Required fields: Your Name, Email Address, Resident's Name, Preferred Date, Preferred Time.
- Submitting with any required field empty shows a clear inline error for that field.
- An error summary appears at the top of the form listing all problems.
- After a successful submission the form resets and a confirmation message appears.

---

### US-02 — Family Member Finds a Facility by ZIP Code

> **As** a family member who knows the facility's ZIP code,  
> **I want** to filter the facility dropdown by ZIP,  
> **so that** I can quickly find and select the right facility without scrolling through a long list.

**Acceptance Criteria:**
- Entering a 5-digit ZIP populates the dropdown with matching facilities.
- Each option shows the facility name and city.
- Entering fewer than 5 digits keeps the dropdown disabled with placeholder text.
- Entering a ZIP with no matching facilities shows a "no facilities found" message.

---

### US-03 — Family Member Previews a Facility Before Booking

> **As** a family member,  
> **I want** to see a preview card with the facility's name, address, and a link to its dedicated page when I select it,  
> **so that** I can verify I've chosen the right place before submitting.

**Acceptance Criteria:**
- Selecting a facility from the dropdown shows a preview card.
- The preview card contains: facility name, full address, and a link that opens the facility page in a new tab.
- Deselecting (choosing the blank option) hides the preview card.

---

### US-04 — Validation Prevents Incomplete Submissions

> **As** a family member who accidentally misses a field,  
> **I want** to see specific, readable error messages next to the problem fields,  
> **so that** I know exactly what to fix without guessing.

**Acceptance Criteria:**
- Submitting an empty form shows errors on every required field.
- An error summary appears at the top of the form listing all problems.
- Keyboard focus moves to the error summary so screen-reader users are immediately informed.
- Fixing a field and tabbing away (blur) clears that field's error.

---

### US-05 — Date Validation Enforces Pilot Schedule

> **As** a family member,  
> **I want** the form to tell me if I've selected a date outside the pilot schedule (Mon–Wed, future dates only),  
> **so that** I don't submit a request for a day SilverCare doesn't operate.

**Acceptance Criteria:**
- Selecting a past date shows "Please select a future date."
- Selecting Thursday–Sunday shows "Sessions are available Monday through Wednesday only."
- Selecting a valid future Mon–Wed date clears the error.

---

### US-06 — Multilingual Support

> **As** a Spanish-speaking or Mandarin-speaking family member,  
> **I want** to switch the page language and see all labels, placeholders, and error messages in my language,  
> **so that** I can complete the booking form without needing a translator.

**Acceptance Criteria:**
- Clicking Español translates all `data-i18n` labels, placeholders, and error messages on `index.html`.
- Clicking 中文 does the same in Mandarin Chinese.
- Clicking English restores all text to English.
- The `lang` attribute on `<html>` updates to match the selected language.
- Nav and footer text on `facility.html` also translates when the language is switched.

---

### US-07 — Facility-Specific Page Shows Social Proof

> **As** a family member browsing a specific facility's page,  
> **I want** to see how many other families have already requested sessions there,  
> **so that** I feel confident the facility is active in the program.

**Acceptance Criteria:**
- When count is 0, the page shows "Your family could be the first to connect here."
- When count is ≥ 1, the page shows "{N} famil(ies) have requested a session at this facility."
- After submitting a request with that facility selected, the count increments.

---

### US-08 — Accessible Navigation and Keyboard Support

> **As** a keyboard-only user,  
> **I want** to navigate the entire session request flow without a mouse,  
> **so that** I can use SilverCare Connect without accessibility barriers.

**Acceptance Criteria:**
- Tab order follows a logical reading order through the page.
- The skip-to-content link appears on the first Tab press.
- All form fields, buttons, and links have a visible focus ring.
- The facility dropdown can be navigated and selected with keyboard alone.
- Error links in the error summary move focus to the relevant field when activated.

---

### US-09 — Family Member Cancels or Reschedules

> **As** a family member with a confirmed session,  
> **I want** to cancel or reschedule my session online with at least 24 hours notice,  
> **so that** SilverCare can offer the timeslot to another family.

**Acceptance Criteria:**
- A cancellation option is accessible from the confirmation email or account dashboard.
- The system prevents cancellation fewer than 24 hours before the session and explains the policy.
- On successful cancellation, the family receives a cancellation confirmation email.

**Status:** Pending backend implementation — `DELETE /api/sessions/:id` endpoint required.

---

### US-10 — Family Member Receives Email Confirmation

> **As** a family member who has submitted a session request,  
> **I want** to receive an email confirmation with the session details,  
> **so that** I have a record of the booking and know what to expect.

**Acceptance Criteria:**
- Confirmation email is sent within 5 minutes of a successful form submission (via backend).
- Email contains: facility name, date, time, resident's name, and cancellation instructions.
- Email is legible on mobile devices.

**Status:** Pending backend email integration — see `email-templates/session-confirmation.md`.

---

### US-11 — Family Member Receives a Reminder

> **As** a family member with an upcoming session,  
> **I want** to receive a reminder email 24 hours before my session,  
> **so that** I don't forget to show up.

**Acceptance Criteria:**
- Reminder email is sent automatically 24 hours before the scheduled session time.
- Email contains: facility name, date, time, and a link to cancel if needed.

**Status:** Pending backend scheduled job — see `email-templates/session-reminder.md`.

---

### US-12 — Admin Views All Session Requests

> **As** a SilverCare staff member (admin),  
> **I want** to view all pending and confirmed session requests in a dashboard,  
> **so that** I can coordinate with facilities and track program adoption.

**Acceptance Criteria:**
- Admin can filter requests by facility, date range, and status (pending / confirmed / cancelled).
- Admin can update the status of a request.
- Dashboard shows aggregate stats: total requests, sessions completed, facilities active.

**Status:** Planned — see `docs/admin-screens.md`.

---

### US-13 — New Team Member Onboards Quickly

> **As** a new developer or contributor,  
> **I want** to set up the project locally in under 15 minutes using the documentation,  
> **so that** I can start contributing without needing to ask for help.

**Acceptance Criteria:**
- `README.md` and `CONTRIBUTING.md` provide complete, accurate setup instructions.
- All required environment variables are documented with example values.
- A local frontend and backend can be started following only the written instructions.

---

## Manual Test Cases

### TC-01 — Empty Form Submission

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open `http://localhost:8080` | Page loads; form visible in "Request a Session" section |
| 2 | Click "Submit Request" without filling any field | Error summary appears at top of form listing all required fields |
| 3 | Verify inline errors | Each required field (Name, Email, Resident's Name, Date, Time) shows a red error message |
| 4 | Verify ARIA | Error spans have `role="alert"`; error summary has `role="alert"` |

---

### TC-02 — Invalid Email Address

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Type `hello` in the Email field, then Tab away | Field shows "Please enter a valid email address" |
| 2 | Type `hello@` in the Email field, then Tab away | Same error persists |
| 3 | Type `hello@example.com`, then Tab away | Error clears |

---

### TC-03 — ZIP Code Facility Filter

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Type `3370` (4 digits) in ZIP field | Dropdown stays disabled with placeholder text |
| 2 | Type `33707` (5 digits) | Dropdown populates with matching facilities (e.g. Sandpiper ALF — Saint Petersburg) |
| 3 | Type `99999` (ZIP with no matches) | Dropdown shows "No facilities found for this ZIP" |
| 4 | Clear the ZIP field | Dropdown resets to placeholder and disables |

---

### TC-04 — Facility Preview Card

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter a valid ZIP and wait for facilities to load | Dropdown is enabled |
| 2 | Select a facility from the dropdown | Preview card appears with name, address, and "View facility page ↗" link |
| 3 | Click "View facility page ↗" | Facility-specific page opens in a new tab |
| 4 | Change selection to the blank option | Preview card hides |

---

### TC-05 — Date Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter yesterday's date in Preferred Date, then Tab away | Error: "Please select a future date" |
| 2 | Enter a future Friday's date, then Tab away | Error: "Sessions are available Monday through Wednesday only" |
| 3 | Enter a future Monday's date, then Tab away | Error clears |

---

### TC-06 — Successful Form Submission

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Fill all required fields with valid data (name, email, resident, Mon–Wed date, time) | No errors shown |
| 2 | Click "Submit Request" | Success message appears ("✅ Your request has been submitted…") |
| 3 | Verify form reset | All fields clear; facility dropdown returns to placeholder |
| 4 | Open DevTools → Application → Local Storage → `sc_session_requests` | New entry present with all submitted values and a `submittedAt` timestamp |

---

### TC-07 — Language Switching (index.html)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Español" | All labels, placeholders, hero text, and nav links switch to Spanish |
| 2 | Submit the form empty | Error messages appear in Spanish |
| 3 | Click "中文" | All text switches to Mandarin Chinese |
| 4 | Submit the form empty | Error messages appear in Chinese |
| 5 | Click "English" | All text restores to English |

---

### TC-08 — Language Switching (facility.html)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open `http://localhost:8080/facility.html` | Nav and footer show English text |
| 2 | Click "Español" | Nav links and footer text switch to Spanish |
| 3 | Click "中文" | Nav links and footer text switch to Chinese |

---

### TC-09 — Accessibility Bar Controls

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "A+" twice | Font size increases; page text visibly larger |
| 2 | Click "A" (reset) | Font size returns to default (16px) |
| 3 | Click "A−" | Font size decreases |
| 4 | Click "High Contrast" | Page background and text switch to high-contrast palette; button shows `aria-pressed="true"` |
| 5 | Click "High Contrast" again | High contrast deactivates; `aria-pressed="false"` |
| 6 | Click "Reduce Motion" | CSS transitions stop; button shows `aria-pressed="true"` |

---

### TC-10 — Keyboard Navigation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Press Tab on page load | "Skip to main content" link appears and is focused |
| 2 | Press Enter on the skip link | Focus jumps to `<main>` |
| 3 | Tab through the accessibility bar | All buttons reachable and show visible focus ring |
| 4 | Tab through the session request form | Fields receive focus in DOM order; inputs have visible outline |
| 5 | Attempt to submit empty form with Enter | Error summary receives focus; first error field is announced |

---

### TC-11 — Facility Micro-Page (with `?id=`)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `facility.html?id=sandpiper-alf-saint-petersburg-33707` | Facility name "Sandpiper ALF" appears as the page heading |
| 2 | Verify address | "6439 First Avenue South, Saint Petersburg, FL 33707" is displayed |
| 3 | Verify photo gallery | 3 placeholder images (or real photos if added) shown |
| 4 | Verify social proof | Shows "Your family could be the first" (count 0) or "{N} families have requested…" (count ≥ 1) |
| 5 | Submit a request with this facility selected on index.html | Return to facility page; social proof count has incremented by 1 |

---

### TC-12 — Facility Page Without `?id=`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `facility.html` (no query string) | Generic "Facility Partner Overview" content is displayed |
| 2 | Verify no facility-specific heading or address is shown | ✓ Generic overview copy visible |

---

### TC-13 — Backend Session Request (API)

*Requires backend running at `http://localhost:4000`.*

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start the backend: `cd server && npm run dev` | Terminal shows "Server running on port 4000" |
| 2 | Submit the homepage form with valid data | Network tab shows POST to `/api/sessions/public` with HTTP 201 response |
| 3 | Verify response body | Contains `{ "id": <number>, "familyName": "...", "status": "pending" }` |
| 4 | Register a user via API and log in | POST `/api/auth/register` → POST `/api/auth/login` → receive JWT token |
| 5 | Create an authenticated session request | POST `/api/sessions` with `Authorization: Bearer <token>` header → HTTP 201 |
| 6 | List authenticated session requests | GET `/api/sessions` with same token → array containing the created session |

---

## Backend Integration Test Scenarios

The following scenarios describe expected system behavior once the backend is fully integrated. They are not yet testable with the frontend-only demo mode.

| Scenario | Expected Behavior |
|----------|------------------|
| Backend offline | Frontend falls back to localStorage demo mode; success message still shows |
| Backend returns 500 | Frontend shows a friendly error message; no stack trace exposed to user |
| Duplicate session request (same email + date + facility) | Backend returns 409; frontend shows "You already have a request for this date and facility" |
| Facility not in pilot area | Backend validates ZIP and returns 400; frontend shows "This facility is not currently in our service area" |
| Date outside Mon–Wed | Frontend prevents submission before API call; backend also validates and returns 422 if bypassed |

---

## Accessibility Test Scenarios

| Scenario | Tool | Expected Result |
|----------|------|----------------|
| Screen reader announces error summary | NVDA / VoiceOver + Chrome | "Error: please correct the following" is announced on form submission failure |
| All form controls have accessible names | axe DevTools or Lighthouse | 0 accessibility violations on form section |
| Color contrast on error text | browser inspector / Colour Contrast Analyser | Contrast ratio ≥ 4.5:1 |
| High-contrast mode visual check | Enable OS high-contrast theme | All text and controls remain visible and legible |
| Reduced motion | Enable OS "Reduce Motion" | All CSS transitions and animations stop |
| Focus visible on all interactive elements | Manual keyboard tab | Every focusable element has a clearly visible outline |

---

## Multilingual Test Scenarios

| String | English | Español | 中文 |
|--------|---------|---------|------|
| Form heading | "Request a Session" | "Solicitar una sesión" | "申请视频通话" |
| Name field label | "Your Name" | "Tu nombre" | "您的姓名" |
| Email error (invalid) | "Please enter a valid email address" | "Por favor, ingresa un correo electrónico válido" | "请输入有效的电子邮件地址" |
| Date error (past) | "Please select a future date" | "Por favor selecciona una fecha futura" | "请选择未来的日期" |
| Date error (wrong day) | "Sessions are available Monday through Wednesday only" | "Las sesiones están disponibles solo de lunes a miércoles" | "视频通话仅在周一至周三提供" |
| Submit button | "Submit Request" | "Enviar solicitud" | "提交申请" |
| Success message | "✅ Your request has been submitted…" | "✅ Tu solicitud ha sido enviada…" | "✅ 您的申请已提交…" |

*Verify each string in the browser by switching languages and checking the form live.*

---

*Last updated: April 2026. File owner: SilverCare Connect — documentation team.*
