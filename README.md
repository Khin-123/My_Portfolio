# Personal portfolio

A responsive, single-page portfolio for a final-year IT student and aspiring developer. Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React. Everything runs in the browser; no backend, database, or environment variables are required.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm. From this directory:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To validate the content and create a production build:

```sh
npm run check
npm run build
npm run preview
```

`npm run preview` serves the production build locally. The deployable files are generated in `dist/`.

## Files to edit

| File or folder | Purpose |
| --- | --- |
| `src/data/profile.js` | Name, introduction, About text, social/contact links, CV, education, and skill groups |
| `src/data/projects.js` | Project cards, categories, technologies, links, and modal details |
| `src/data/achievements.js` | Achievements, certifications, and conference paper title |
| `src/components/` | Reusable navigation, project, illustration, and dialog UI |
| `src/App.jsx` | Page sections and composition |
| `src/index.css` | Theme, typography, responsive layouts, and interaction styles |
| `index.html` | Browser title, description, and other page metadata |
| `public/` | Static files such as a CV or project screenshots |

The current hero uses your portrait at `public/images/profile-photo.jpg`. Replace that file to update the photo. The earlier IoT illustration remains as an unused asset. Design sources, font licensing, and the earlier image prompt are recorded in `docs/design-notes.md`. Kanit fonts are served locally; no font CDN is required.

## Add your information

Your contact information, career target, degree, and study period are configured in `src/data/profile.js`. Set `education.expectedGraduation` to your confirmed month and year, `profile.availability` to your confirmed start window, and `profile.linkedin` to your maintained LinkedIn profile when available.

The GitHub profile URL is derived from the supplied project repository links. Verify it before publishing. Unavailable LinkedIn and CV links stay hidden until configured. Leave any unavailable optional link as `null`.

To enable the CV download:

1. Put your actual PDF at `public/cv/cv.pdf`.
2. Set `profile.cvUrl` to `'/cv/cv.pdf'`.
3. Optionally change `profile.cvFileName` to the preferred download filename.

For social previews, set `VITE_SITE_URL` to your public HTTPS portfolio URL before building. Vite uses it for the canonical URL and the full URL to `public/images/portfolio-share.jpg`. The title and description live in `index.html`.

## Add certificate images

Place flattened, redacted certificate files in `public/certificates/`, then set the matching `certificateUrl` in `src/data/achievements.js`, such as `'/certificates/jlpt-n3.jpg'`. Keep originals in private storage. Run `npm run check` to catch missing local files before publishing.

## Add or edit projects

Edit the exported `projects` array in `src/data/projects.js`. Each object creates a card and a case study at `/#project-<id>`. For example:

```js
{
  id: 'my-project', // Unique, stable identifier
  title: '[Project title]',
  year: '2026',
  description: '[A short, factual description]',
  category: 'Software',
  specialty: 'Digital signal processing',
  technologies: ['React', 'Tailwind CSS'],
  github: null, // Or a complete https://github.com/... URL
  details: {
    overview: '[Additional information about the project]',
    highlights: ['[A verified feature or implementation detail]'],
  },
}
```

Supported categories are `IoT & Embedded`, `Hardware`, and `Software`. The `technologies` list appears as tags on each project card and in the case study. Use `specialty` for areas such as DSP or modeling. Add `contribution` and `verification` to show your role and a verified result in the case study. The **View details** link opens case study content, including optional photos and videos. Follow the existing `evidence` objects for the media format.

Projects with a public GitHub URL show **View repository** on the card. App links appear in the case study when their URLs are supplied. The current TuneWave clips use synthetic speech processed with the project’s speech enhancement code. The sample concentration plot uses the simulator’s own plotting function with fictitious parameters.

## Interaction and accessibility

The page includes section navigation, a mobile menu, keyboard focus styles, accessible project dialogs, and reduced-motion support. Dialogs can be closed with the close button or Escape. Content is responsive across desktop, tablet, and mobile layouts.

## Deploy on Vercel

1. Run `npm run check` and `npm run build` locally.
2. Push the project to a GitHub, GitLab, or Bitbucket repository. Include `package-lock.json`; leave `node_modules/` and `dist/` out of Git.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Select the project root and confirm these settings:

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | Automatic npm detection |
   | Environment Variables | Set `VITE_SITE_URL` to your public HTTPS portfolio URL for social previews |

5. Click **Deploy** and open the URL Vercel provides.

Subsequent pushes trigger deployments through the Git integration. This is a single page with hash-based section links, so it does not require client-side route rewrites.

Deployment guidance follows the official [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite), [Vercel Git integration documentation](https://vercel.com/docs/git), and [Vite static deployment guide](https://vite.dev/guide/static-deploy). The project has not been deployed automatically.
