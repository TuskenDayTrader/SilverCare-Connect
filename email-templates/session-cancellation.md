# Session Cancellation Email

**Template ID:** `session-cancellation`  
**Trigger:** When a session is cancelled — by the family, by SilverCare staff, or by the facility  
**From:** SilverCare Connect \<noreply@silvercareconnect.com\>  
**To:** `{{familyEmail}}`  
**Subject:** Your SilverCare Session Has Been Cancelled — Session #{{sessionId}}

---

## Plain Text Version

```
Hi {{familyName}},

We're sorry to let you know that your upcoming video session has been cancelled.

CANCELLED SESSION
───────────────────────────────────────────────────
Facility:    {{facilityName}}
Resident:    {{residentName}}
Date:        {{sessionDayOfWeek}}, {{sessionDate}}
Time:        {{sessionTime}} Eastern Time
Session ID:  #{{sessionId}}
Cancelled by: {{cancelledBy}}
Reason:      {{cancellationReason}}
───────────────────────────────────────────────────

WHAT TO DO NEXT
We'd love to help you schedule a new session. 
Request a new time: {{bookingLink}}

If you have questions or concerns, please contact us at 
support@silvercareconnect.com or reply to this email.

We're sorry for the inconvenience and look forward to connecting your 
family again soon.

— The SilverCare Connect Team

──────────────────────────────────────────────
SilverCare Connect | Pinellas County, FL
Reducing isolation, one session at a time.
Unsubscribe: {{unsubscribeLink}}
Privacy Policy: {{privacyPolicyLink}}
```

---

## HTML Version (structure only — apply brand styles)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SilverCare Session Has Been Cancelled</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">

  <!-- Header -->
  <table width="100%" bgcolor="#1a6b4b" cellpadding="20" cellspacing="0">
    <tr>
      <td align="center">
        <img src="{{logoUrl}}" alt="SilverCare Connect" height="48">
      </td>
    </tr>
  </table>

  <!-- Body -->
  <table width="600" align="center" bgcolor="#ffffff" cellpadding="32" cellspacing="0"
         style="margin: 24px auto; border-radius: 8px;">
    <tr>
      <td>
        <h1 style="color: #c0392b; font-size: 22px; margin-top: 0;">
          ❌ Your session has been cancelled
        </h1>
        <p>Hi {{familyName}},</p>
        <p>
          We're sorry to let you know that your upcoming video session with 
          <strong>{{residentName}}</strong> at <strong>{{facilityName}}</strong> 
          has been cancelled.
        </p>

        <!-- Cancelled Session Box -->
        <table width="100%" bgcolor="#fdf0ef" cellpadding="16" cellspacing="0"
               style="border-radius: 6px; margin: 24px 0; border-left: 4px solid #c0392b;">
          <tr>
            <td>
              <strong style="color: #c0392b;">CANCELLED SESSION</strong><br><br>
              <strong>Facility:</strong> {{facilityName}}<br>
              <strong>Resident:</strong> {{residentName}}<br>
              <strong>Date:</strong> {{sessionDayOfWeek}}, {{sessionDate}}<br>
              <strong>Time:</strong> {{sessionTime}} Eastern Time<br>
              <strong>Session ID:</strong> #{{sessionId}}<br>
              <strong>Cancelled by:</strong> {{cancelledBy}}<br>
              {{#if cancellationReason}}
              <strong>Reason:</strong> {{cancellationReason}}<br>
              {{/if}}
            </td>
          </tr>
        </table>

        <h2 style="font-size: 16px; color: #333;">What to Do Next</h2>
        <p>
          We'd love to help you schedule a new session at a time that works for your family.
        </p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="{{bookingLink}}"
             style="background: #1a6b4b; color: #fff; padding: 12px 24px; border-radius: 4px;
                    text-decoration: none; font-weight: bold;">
            Request a New Session
          </a>
        </p>

        <p>
          If you have questions or this cancellation was made in error, please 
          contact us at 
          <a href="mailto:support@silvercareconnect.com">support@silvercareconnect.com</a> 
          or reply to this email.
        </p>

        <p>
          We're sorry for the inconvenience and look forward to connecting your 
          family again soon.
        </p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="600" align="center" cellpadding="16" cellspacing="0"
         style="margin: 0 auto;">
    <tr>
      <td align="center" style="color: #999; font-size: 12px;">
        SilverCare Connect | Pinellas County, FL<br>
        <em>Reducing isolation, one session at a time.</em><br><br>
        <a href="{{unsubscribeLink}}" style="color: #999;">Unsubscribe</a> &nbsp;|&nbsp;
        <a href="{{privacyPolicyLink}}" style="color: #999;">Privacy Policy</a>
      </td>
    </tr>
  </table>

</body>
</html>
```

---

## Template Variables

| Variable | Source | Example |
|----------|--------|---------|
| `{{familyName}}` | Session record | Jane Smith |
| `{{familyEmail}}` | Session record | jane@example.com |
| `{{residentName}}` | Session record | Margaret Smith |
| `{{facilityName}}` | Facilities data | Sandpiper ALF |
| `{{sessionDayOfWeek}}` | Derived from date | Monday |
| `{{sessionDate}}` | Session record | April 15, 2026 |
| `{{sessionTime}}` | Session record | 9:00 AM |
| `{{sessionId}}` | Database record | 101 |
| `{{cancelledBy}}` | Event metadata | `Family` / `SilverCare Staff` / `Facility` |
| `{{cancellationReason}}` | Admin note (optional) | "Resident not feeling well" / blank |
| `{{bookingLink}}` | Static URL | https://silvercareconnect.com/#request |
| `{{logoUrl}}` | CDN / hosted asset | https://cdn.silvercareconnect.com/logo.png |
| `{{unsubscribeLink}}` | Mailer | https://... |
| `{{privacyPolicyLink}}` | Static URL | https://silvercareconnect.com/legal/privacy |

---

## Cancellation Scenarios

| Who Cancelled | `{{cancelledBy}}` Value | `{{cancellationReason}}` |
|---------------|------------------------|--------------------------|
| Family (self-service) | `You (family request)` | Blank / optional message |
| SilverCare staff | `SilverCare Connect` | e.g. "Scheduling conflict" |
| Facility staff | `Facility staff` | e.g. "Resident unavailable" |
| System (automatic — no-show) | `System (no-show policy)` | "Session not attended" |

---

## Backend Implementation Notes

- This email must be sent whenever a session's `status` changes to `cancelled`.
- The cancellation can originate from:
  1. `DELETE /api/sessions/:id` — family self-service (frontend cancel link)
  2. `PATCH /api/admin/sessions/:id` — admin updating status to `cancelled`
  3. Automated no-show detection (future)
- The `cancelledBy` field should be derived from the source of the status change.
- If the cancellation is staff-initiated, the admin should be prompted to optionally provide a reason before confirming.

---

*See also: [session-confirmation.md](session-confirmation.md) | [session-reminder.md](session-reminder.md)*
