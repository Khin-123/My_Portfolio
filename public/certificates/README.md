# Add certificate images

Put your real certificate images in this folder. Suggested names:

- `ieee-conference-2026.jpg`
- `jlpt-n3.jpg`
- `it-passport.jpg`
- `fundamental-it-engineer.jpg`

Then edit `src/data/achievements.js` and set each matching entry's `certificateUrl`, for example:

```js
certificateUrl: '/certificates/jlpt-n3.jpg',
```

PNG, WebP, JPEG, and PDF files also work; use the actual filename and extension in the URL. Omit `public` from the URL. Keep `certificateUrl: null` until the file is available. The section shows a pending message for null values and a **View certificate** link when configured. Links open the image or document in a new tab.

Run `npm run check` and `npm run build` after adding files. Redeploy to update the hosted portfolio.
