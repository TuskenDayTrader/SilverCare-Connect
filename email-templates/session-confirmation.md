# Session Confirmation Email

**Template ID:** `session-confirmation`  
**Trigger:** Immediately after a session request is accepted/confirmed (backend event)  
**From:** SilverCare Connect \<noreply@silvercareconnect.com\>  
**To:** `{{familyEmail}}`  
**Subject:** Your SilverCare Session is Confirmed — {{facilityName}}, {{sessionDate}}

---

## Plain Text Version

```
Hi {{familyName}},

Great news — your video session has been confirmed!

SESSION DETAILS
───────────────────────────────────────────────────
Facility:    {{facilityName}}
             {{facilityStreet}}, {{facilityCity}}, {{facilityState}} {{facilityZip}}
Resident:    {{residentName}}
Date:        {{sessionDayOfWeek}}, {{sessionDate}}
Time:        {{sessionTime}} Eastern Time
Session ID:  #{{sessionId}}
───────────────────────────────────────────────────

WHAT TO EXPECT
A SilverCare staff member will be with {{residentName}} to help with the technology. 
All you need to do is join the video call at the scheduled time. 
We'll send you a reminder 24 hours before your session.

NEED TO CANCEL OR RESCHEDULE?
Life happens. If you need to change your session, please let us know at least 
24 hours in advance so we can offer the time to another family.
Cancel or reschedule: {{cancellationLink}}

QUESTIONS?
Reply to this email or contact us at support@silvercareconnect.com.

Thank you for connecting with your loved one.

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
  <title>Your SilverCare Session is Confirmed</title>
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
          ✅ Your session is confirmed!
        </h1>
        <p>Hi {{familyName}},</p>
        <p>
          We're looking forward to connecting you with <strong>{{residentName}}</strong> 
          at <strong>{{facilityName}}</strong>.
        </p>

        <!-- Session Details Box -->
        <table width="100%" bgcolor="#f0f7f4" cellpadding="16" cellspacing="0"
               style="border-radius: 6px; margin: 24px 0;">
          <tr>
            <td>
              <strong style="color: #1a6b4b;">SESSION DETAILS</strong><br><br>
              <strong>Facility:</strong> {{facilityName}}<br>
              &nbsp;&nbsp;&nbsp;{{facilityStreet}}, {{facilityCity}}, {{facilityState}} {{facilityZip}}<br><br>
              <strong>Resident:</strong> {{residentName}}<br>
              <strong>Date:</strong> {{sessionDayOfWeek}}, {{sessionDate}}<br>
              <strong>Time:</strong> {{sessionTime}} Eastern Time<br>
              <strong>Session ID:</strong> #{{sessionId}}
            </td>
          </tr>
        </table>

        <h2 style="font-size: 16px; color: #333;">What to Expect</h2>
        <p>
          A SilverCare staff member will be with {{residentName}} to help with the technology.
          All you need to do is join the video call at the scheduled time.
          We'll send you a reminder 24 hours before your session.
        </p>

        <h2 style="font-size: 16px; color: #333;">Need to Cancel or Reschedule?</h2>
        <p>
          Life happens. If you need to change your session, please let us know at least
          <strong>24 hours in advance</strong> so we can offer the time to another family.
        </p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="{{cancellationLink}}"
             style="background: #c0392b; color: #fff; padding: 12px 24px; border-radius: 4px;
                    text-decoration: none; font-weight: bold;">
            Cancel or Reschedule
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
| `{{familyName}}` | Session request | Jane Smith |
| `{{familyEmail}}` | Session request | jane@example.com |
| `{{residentName}}` | Session request | Margaret Smith |
| `{{facilityName}}` | Facilities data | Sandpiper ALF |
| `{{facilityStreet}}` | Facilities data | 6439 First Avenue South |
| `{{facilityCity}}` | Facilities data | Saint Petersburg |
| `{{facilityState}}` | Facilities data | FL |
| `{{facilityZip}}` | Facilities data | 33707 |
| `{{sessionDayOfWeek}}` | Derived from date | Monday |
| `{{sessionDate}}` | Session request | April 15, 2026 |
| `{{sessionTime}}` | Session request | 9:00 AM |
| `{{sessionId}}` | Database record | 101 |
| `{{cancellationLink}}` | Backend URL | https://app.silvercareconnect.com/cancel/abc123 |
| `{{logoUrl}}` | CDN / hosted asset | https://cdn.silvercareconnect.com/logo.png |
| `{{unsubscribeLink}}` | Mailer | https://... |
| `{{privacyPolicyLink}}` | Static URL | https://silvercareconnect.com/legal/privacy |

---

## Localization Notes

- If the family submitted the form in **Español**, send a Spanish-language version of this template.
- If the family submitted the form in **中文**, send a Mandarin Chinese version.
- The backend should check `req.body.lang` or a stored user language preference to select the correct template.

---

*See also: [session-reminder.md](session-reminder.md) | [session-cancellation.md](session-cancellation.md)*
