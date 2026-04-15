# SilverCare Connect — Frontend Test Cases & User Stories

This document covers manual test cases and user stories for the full session booking and connection flow.  
Run these against a locally served instance (see [README.md](README.md#testing-facility-pages-locally)).

---

## User Stories

### US-01 — Family Member Requests a Session
> **As** a family member,  
> **I want** to fill out a short form to request a video session at my loved one's facility,  
> **so that** SilverCare staff can confirm the booking without me needing to call anyone.

**Acceptance Criteria:**
- Required fields: Your Name, Email Address, Resident's Name, Preferred Date, Preferred Time.
- Submitting with any required field empty shows a clear error for that field.
- After a successful submission the form resets and a confirmation message appears.

---

### US-02 — Family Member Finds a Facility by ZIP Code
> **As** a family member who knows the facility's ZIP code,  
> **I want** to filter the facility dropdown by ZIP,  
> **so that** I can quickly find and select the right facility without scrolling through a long list.

**Acceptance Criteria:**
- Entering a 5-digit ZIP populates the dropdown with matching facilities.
- Each option shows the facility name and city.
- Entering fewer than 5 digits keeps the dropdown disabled and shows the placeholder text.
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
- Keyboard focus moves to the error summary so screen reader users are immediately informed.
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

## Manual Test Cases

### TC-01 — Empty Form Submission

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open `http://localhost:8080` | Page loads; form visible in Request a Session section |
| 2 | Click "Submit Request" without filling any field | Error summary appears at top of form listing all required fields |
| 3 | Verify inline errors | Each required field (Name, Email, Resident's Name, Date, Time) shows a red error message |
| 4 | Verify ARIA | Error spans have `role="alert"` and the error summary has `role="alert"` |

---

### TC-02 — Invalid Email Address

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Type `hello` in the Email field, then Tab away | Field shows "Please enter a valid email address" |
| 2 | Type `hello@` in the Email field, then Tab away | Field shows the same error |
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
| 1 | Fill all required fields with valid data (name, email, resident, Mon–Wed date, time) | No errors |
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

## Backend Integration Notes

The following items require backend API support before the session request flow is production-ready:

- **Form submission endpoint** — `handleFormSubmit()` currently writes to `localStorage` only. A real implementation needs a `POST /api/session-requests` endpoint. The payload shape is already defined in `DemoStore.saveSessionRequest()`.
- **Confirmation email** — After successful submission, the family should receive an email confirmation. This requires a backend email service triggered by the API endpoint.
- **Facility availability** — The date picker does not check real availability. The backend would need to expose `GET /api/availability?facilityId=&date=` to block already-booked slots.
- **Cancellation** — The pilot details mention "24 hours notice" cancellation. A `DELETE /api/session-requests/:id` endpoint and corresponding UI are needed.
- **ZIP code coverage** — Currently, any 5-digit ZIP is accepted and filtered locally against the JSON file. The backend could validate whether the ZIP falls within the pilot service area (~20 mi of Pinellas County).
