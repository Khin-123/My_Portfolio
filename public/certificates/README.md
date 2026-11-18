# Add certificate images

Put only flattened, redacted public copies in this folder. Remove dates of birth, candidate and certificate numbers, and any embedded image metadata. Keep the name, credential, issuer, and date readable. Suggested names:

- `ieee-conference-2026.jpg`
- `jlpt-n3.jpg`
- `it-passport.jpg`
- `fundamental-it-engineer.jpg`

Then edit `src/data/achievements.js` and set each matching entry's `certificateUrl`, for example:

```js
certificateUrl: '/certificates/jlpt-n3.jpg',
```

PNG, WebP, JPEG, and PDF files also work. Use the actual filename and extension in the URL and omit `public` from the URL. Set `certificateUrl` to `null` until the redacted file is available. Links open the image or document in a new tab.

Run `npm run check` and `npm run build` after adding files. Redeploy to update the hosted portfolio.
