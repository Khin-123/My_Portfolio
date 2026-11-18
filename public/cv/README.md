# Add your CV

Place your actual CV PDF here as `cv.pdf`, then edit `src/data/profile.js`:

```js
cvUrl: '/cv/cv.pdf',
cvFileName: 'CV.pdf',
```

Files in `public/` are served from the website root. For example, `public/cv/cv.pdf` becomes `/cv/cv.pdf`.

Until a real CV is provided, keep `cvUrl: null` so the portfolio does not offer a broken download. This folder intentionally contains no placeholder CV with fabricated personal information.
