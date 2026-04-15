# Session Reminder Email

**Template ID:** `session-reminder`  
**Trigger:** Automatically 24 hours before the scheduled session (cron job / scheduled task)  
**From:** SilverCare Connect \<noreply@silvercareconnect.com\>  
**To:** `{{familyEmail}}`  
**Subject:** Reminder: Your SilverCare Session Tomorrow — {{sessionTime}}, {{facilityName}}

---

## Plain Text Version

```
Hi {{familyName}},

Just a friendly reminder — your video session is tomorrow!

SESSION DETAILS
───────────────────────────────────────────────────
Facility:    {{facilityName}}
Resident:    {{residentName}}
Date:        {{sessionDayOfWeek}}, {{sessionDate}}
Time:        {{sessionTime}} Eastern Time
Session ID:  #{{sessionId}}
───────────────────────────────────────────────────

WHAT TO DO
Simply be available at the scheduled time. 
A SilverCare staff member will get {{residentName}} set up on their end.
No app to download — just be ready to join.

NEED TO CANCEL?
If something has come up, please cancel as soon as possible so we can 
offer the slot to another family.
Cancel or reschedule: {{cancellationLink}}

See you tomorrow!
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
  <title>Your SilverCare Session is Tomorrow</title>
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
        <h1 style="color: #1a6b4b; font-size: 22px; margin-top: 0;">
          ⏰ Your session is tomorrow!
        </h1>
        <p>Hi {{familyName}},</p>
        <p>
          Just a friendly reminder that your video session with 
          <strong>{{residentName}}</strong> at <strong>{{facilityName}}</strong> 
          is scheduled for <strong>tomorrow</strong>.
        </p>

        <!-- Session Details Box -->
        <table width="100%" bgcolor="#f0f7f4" cellpadding="16" cellspacing="0"
               style="border-radius: 6px; margin: 24px 0;">
          <tr>
            <td>
              <strong style="color: #1a6b4b;">SESSION DETAILS</strong><br><br>
              <strong>Facility:</strong> {{facilityName}}<br>
              <strong>Resident:</strong> {{residentName}}<br>
              <strong>Date:</strong> {{sessionDayOfWeek}}, {{sessionDate}}<br>
              <strong>Time:</strong> {{sessionTime}} Eastern Time<br>
              <strong>Session ID:</strong> #{{sessionId}}
            </td>
          </tr>
        </table>

        <h2 style="font-size: 16px; color: #333;">What to Do</h2>
        <p>
          Simply be available at the scheduled time. 
          A SilverCare staff member will get {{residentName}} set up on their end. 
          No app to download — just be ready to join.
        </p>

        <h2 style="font-size: 16px; color: #333;">Need to Cancel?</h2>
        <p>
          If something has come up, please cancel as soon as possible so we can 
          offer the slot to another family.
        </p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="{{cancellationLink}}"
             style="background: #c0392b; color: #fff; padding: 12px 24px; border-radius: 4px;
                    text-decoration: none; font-weight: bold;">
            Cancel Session
          </a>
        </p>

        <p style="color: #666; font-size: 14px;">
          Questions? Reply to this email or contact 
          <a href="mailto:support@silvercareconnect.com">support@silvercareconnect.com</a>.
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
| `{{sessionDayOfWeek}}` | Derived from date | Tuesday |
| `{{sessionDate}}` | Session record | April 16, 2026 |
| `{{sessionTime}}` | Session record | 9:00 AM |
| `{{sessionId}}` | Database record | 101 |
| `{{cancellationLink}}` | Backend URL | https://app.silvercareconnect.com/cancel/abc123 |
| `{{logoUrl}}` | CDN / hosted asset | https://cdn.silvercareconnect.com/logo.png |
| `{{unsubscribeLink}}` | Mailer | https://... |
| `{{privacyPolicyLink}}` | Static URL | https://silvercareconnect.com/legal/privacy |

---

## Backend Implementation Notes

- This email must be triggered by a **scheduled job** (cron) that runs daily and queries for sessions scheduled in the next 24 hours.
- Example cron expression: `0 8 * * *` (runs daily at 8:00 AM ET — adjust for timezone).
- Use the `sendEmail()` utility in `server/utils/sendEmail.js`.
- Track whether the reminder was sent (add a `reminderSentAt` column to the `SessionRequests` table) to prevent duplicate sends.

---

*See also: [session-confirmation.md](session-confirmation.md) | [session-cancellation.md](session-cancellation.md)*
