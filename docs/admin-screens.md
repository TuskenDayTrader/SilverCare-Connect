# Admin Dashboard — Screen Designs & Requirements

**SilverCare Connect — Internal Administration Panel**  
Version 0.1 (Planning / Pre-Build)  
Last Updated: April 2026

---

## Purpose

This document describes the planned admin dashboard for SilverCare Connect staff. It covers:
- Screen-by-screen layout descriptions (text-based wireframes)
- Data requirements for each screen
- Key metrics for MVP reporting
- Suggested technical approach

The admin panel is **not yet built**. This document is the design specification to guide frontend and backend development.

---

## Personas

| Persona | Role | Primary Need |
|---------|------|-------------|
| **SilverCare Coordinator** | Internal staff | Manage incoming session requests; confirm or reschedule; contact families |
| **SilverCare Manager** | Internal leadership | View aggregate metrics; track pilot progress; report to stakeholders |
| **Facility Liaison** | External partner at facility | View upcoming sessions for their facility only |

---

## Screens Overview

| # | Screen | Primary Persona | Status |
|---|--------|----------------|--------|
| 1 | Login | All | Planned |
| 2 | Dashboard Home | Coordinator, Manager | Planned |
| 3 | Session Requests (List) | Coordinator | Planned |
| 4 | Session Request (Detail) | Coordinator | Planned |
| 5 | Facilities Management | Coordinator | Planned |
| 6 | Analytics & Reports | Manager | Planned |
| 7 | User Management | Manager | Planned |
| 8 | Facility Liaison View | Facility Liaison | Future |

---

## Screen Designs

---

### Screen 1 — Login

```
┌─────────────────────────────────────────────┐
│         SilverCare Connect — Admin          │
│                                             │
│  Email    [ __________________________ ]    │
│  Password [ __________________________ ]    │
│                                             │
│           [ Log In ]                        │
│                                             │
│  Forgot password?                           │
└─────────────────────────────────────────────┘
```

**Requirements:**
- Email + password authentication via `POST /api/auth/login`.
- JWT token stored in memory (not localStorage) for security.
- Redirect to Dashboard Home on success.
- Show inline error on invalid credentials.
- "Forgot password" triggers a password reset email (future feature).

---

### Screen 2 — Dashboard Home

```
┌──────────────────────────────────────────────────────────────┐
│  SilverCare Connect Admin          [Coordinator Name]  Logout │
├──────────────────────────────────────────────────────────────┤
│  NAV: Dashboard | Requests | Facilities | Reports | Users    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Pending │  │Confirmed │  │Completed │  │Cancelled │    │
│  │    12    │  │    8     │  │   47     │  │    3     │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
│  Upcoming Sessions Today (Mon Apr 15)                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 9:00 AM  | Sandpiper ALF     | Jane → Margaret Smith  │  │
│  │ 10:30 AM | Azalea Manor      | Carlos → Rosa Mendez   │  │
│  │ 2:00 PM  | Salterra Largo    | Chen → Wei Chen        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Recent Requests (last 24 hrs)                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 3 new requests — [ View All ]                          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Active Facilities: 18 / 24 enrolled                        │
│  Families Served This Month: 31                             │
└──────────────────────────────────────────────────────────────┘
```

**Key Metrics (MVP):**
- Total pending requests (requires action today)
- Total confirmed sessions (upcoming)
- Total completed sessions (historical)
- Total cancelled sessions
- Upcoming sessions today (chronological list)
- New requests in last 24 hours
- Active facility count vs. total enrolled facilities
- Unique families served this month

---

### Screen 3 — Session Requests (List)

```
┌──────────────────────────────────────────────────────────────┐
│  Session Requests                                            │
├──────────────────────────────────────────────────────────────┤
│  Filters: [Status ▾] [Facility ▾] [Date Range ▾] [Search 🔍]│
├──────────────────────────────────────────────────────────────┤
│  ID   │ Family       │ Resident    │ Facility      │ Date    │ Status   │ Actions │
│  101  │ Jane Smith   │ M. Smith    │ Sandpiper ALF │ Apr 15  │ Pending  │ [View]  │
│  102  │ Carlos R.    │ Rosa M.     │ Azalea Manor  │ Apr 15  │ Confirmed│ [View]  │
│  103  │ Amy Chen     │ Wei Chen    │ Salterra Lg.  │ Apr 17  │ Pending  │ [View]  │
│  ...                                                         │
├──────────────────────────────────────────────────────────────┤
│  Showing 1–20 of 70    [ < Prev ]  [ Next > ]               │
└──────────────────────────────────────────────────────────────┘
```

**Status Filter Options:** All | Pending | Confirmed | Completed | Cancelled  
**Sort:** Date (default), Facility, Family Name, Status  
**Search:** by family name, resident name, or facility name

**API requirement:** `GET /api/admin/sessions?status=&facilityId=&from=&to=&q=&page=&limit=`

---

### Screen 4 — Session Request (Detail)

```
┌─────────────────────────────────────────────────────────┐
│  Session Request #101            Status: [ Pending ▾ ]  │
├─────────────────────────────────────────────────────────┤
│  Family Contact                                         │
│  Name:   Jane Smith                                     │
│  Email:  jane@example.com          [ Send Email ]       │
│                                                         │
│  Resident                                               │
│  Name:   Margaret Smith                                 │
│  Facility: Sandpiper ALF                                │
│  Address:  6439 First Ave S, St. Petersburg, FL 33707   │
│                                                         │
│  Session Details                                        │
│  Date:   Monday, April 15, 2026                         │
│  Time:   9:00 AM                                        │
│  Notes:  "Grandma loves mornings"                       │
│                                                         │
│  Internal Notes (staff only)                            │
│  [ ______________________________________________ ]     │
│  [ Save Notes ]                                         │
│                                                         │
│  Actions                                                │
│  [ Confirm Session ]  [ Reschedule ]  [ Cancel ]        │
│                                                         │
│  Timeline                                               │
│  Apr 14 11:32 AM — Request submitted by family          │
│  Apr 14 11:32 AM — Confirmation email sent to family    │
└─────────────────────────────────────────────────────────┘
```

**Status Change Options:** Pending → Confirmed, Completed, Cancelled  
**Actions:**
- "Confirm Session" → updates status to Confirmed, triggers confirmation email to family
- "Reschedule" → opens date/time picker modal; on save, updates record and emails family
- "Cancel" → prompts confirmation, updates status, emails family cancellation notice

**API requirements:**
- `GET /api/admin/sessions/:id`
- `PATCH /api/admin/sessions/:id` (status, internalNotes)
- `POST /api/admin/sessions/:id/email` (trigger email to family)

---

### Screen 5 — Facilities Management

```
┌─────────────────────────────────────────────────────────┐
│  Facilities (24 enrolled)            [ + Add Facility ] │
├─────────────────────────────────────────────────────────┤
│  [Search _______________]  [Status: All ▾]              │
├─────────────────────────────────────────────────────────┤
│  Facility Name              │ City       │ Sessions │ Status   │
│  Sandpiper ALF              │ St. Pete   │    12    │ Active   │
│  Azalea Manor               │ St. Pete   │     5    │ Active   │
│  Emerald Court Retirement   │ Pinellas Pk│     0    │ Inactive │
│  Curlew Care of Clearwater  │ Clearwater │     8    │ Active   │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

**Facility Detail (on row click):**
- Name, address, phone
- Contact name and email at facility
- Total sessions requested / completed
- Active / Inactive / Paused toggle
- Notes field (e.g. "Prefer sessions before noon")
- Link to facility micro-page

**API requirements:**
- `GET /api/admin/facilities`
- `GET /api/admin/facilities/:id`
- `PATCH /api/admin/facilities/:id`

---

### Screen 6 — Analytics & Reports

```
┌─────────────────────────────────────────────────────────┐
│  Analytics & Reports           Period: [ This Month ▾ ] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Key Metrics                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Requests │ │Completed │ │Families  │ │Facilities│  │
│  │    70    │ │    47    │ │    31    │ │   18     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  Requests by Day of Week                                │
│  Mon ████████████████ 28                                │
│  Tue ███████████ 19                                     │
│  Wed ████████████████████ 23                            │
│                                                         │
│  Top Facilities by Requests                             │
│  1. Sandpiper ALF              12 sessions              │
│  2. Salterra Senior Living     10 sessions              │
│  3. Curlew Care of Clearwater   8 sessions              │
│                                                         │
│  Language Used (form submissions)                       │
│  English: 58%  |  Español: 28%  |  中文: 14%           │
│                                                         │
│  [ Export CSV ]  [ Export PDF ]                         │
└─────────────────────────────────────────────────────────┘
```

**MVP Reporting Metrics:**

| Metric | Why It Matters |
|--------|---------------|
| Total session requests | Overall demand signal |
| Completed sessions | Core program impact |
| Cancellation rate | Reliability indicator |
| Unique families served | Reach metric |
| Active facilities | Partner health |
| Requests by day of week | Capacity planning |
| Requests by language | Equity and accessibility signal |
| Sessions per facility | Identify high-demand facilities |
| Average lead time (request → session) | Operational efficiency |
| No-show rate | Scheduling reliability |

**API requirement:** `GET /api/admin/reports?from=&to=`

---

### Screen 7 — User Management

```
┌─────────────────────────────────────────────────────────┐
│  Users                                [ + Invite User ] │
├─────────────────────────────────────────────────────────┤
│  Name           │ Email                │ Role       │ Last Login │
│  Sam Torres     │ sam@silvercare.com   │ Coordinator│ Today      │
│  Maria Lopez    │ maria@silvercare.com │ Manager    │ Yesterday  │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

**Roles:**
- **Coordinator** — full access to requests, facilities; no analytics export or user management
- **Manager** — full access including analytics and user management
- **Facility Liaison** *(future)* — read-only view of sessions at their own facility

---

### Screen 8 — Facility Liaison View (Future)

A scoped read-only view for facility partners:
- Shows only sessions scheduled at their facility.
- Today's schedule view with resident name, time, and family contact.
- No access to admin functions, other facilities, or analytics.

---

## Technical Recommendations

| Area | Recommendation |
|------|---------------|
| Authentication | Extend existing JWT middleware; add `role` claim to token |
| Authorization | Middleware that checks `req.user.role` before admin routes |
| Admin routes | Prefix all admin endpoints with `/api/admin/` |
| Frontend framework | Vanilla JS (consistent with existing project) or lightweight framework (Alpine.js / Petite Vue) |
| Charts | Chart.js (no build step required, CDN-served) |
| CSV export | Backend endpoint returning CSV with `Content-Disposition: attachment` header |
| Pagination | Cursor-based or offset pagination on all list endpoints |

---

## Open Questions

1. Will the facility liaison view require a separate login or a scoped role on the same auth system?
2. Should "Reschedule" notifications go to the family only, or also to the facility contact?
3. What is the retention policy for completed session data in the admin view?
4. Is two-factor authentication (2FA) required for admin accounts given the sensitivity of resident information?
5. Should analytics data be exportable only by Managers, or by Coordinators too?

---

*Last updated: April 2026. File owner: SilverCare Connect — product/design team.*
