## Summary

<!-- Describe what this PR does and why. One or two sentences is fine for small changes. -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation / data update
- [ ] Refactor (no behavior change)
- [ ] Style / accessibility improvement
- [ ] CI / tooling

## Related issue(s)

<!-- Link any relevant issues: "Closes #123" or "Related to #456" -->

## Changes made

<!-- Bullet-point list of the specific changes in this PR. -->

- 

## How to test

<!-- Step-by-step instructions for a reviewer to verify your changes work correctly. -->

1. 
2. 
3. 

## Screenshots (if applicable)

<!-- Add before/after screenshots for any UI or layout changes. -->

## Checklist

- [ ] My branch is up to date with `dev`
- [ ] I have tested my changes locally (frontend served via `python3 -m http.server` or `npx serve`)
- [ ] All new user-visible strings have been added to **all three** language blocks (`en`, `es`, `zh`) in the `translations` object
- [ ] New form fields include a `<label>`, error `<span>`, and `aria-describedby`
- [ ] New facility entries follow the ID naming convention (`{name-slug}-{city-slug}-{zip}`) and **existing IDs are unchanged**
- [ ] No `.env` secrets or API keys are included in this PR
- [ ] Documentation has been updated (if relevant)
- [ ] I have reviewed the diff and removed any debug logs or temporary code
