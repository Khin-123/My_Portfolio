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
| `src/index.css` | Colors, typography, responsive layouts, and hover effects |
| `src/theme.css` | Current cyan/light-blue visual theme, Kanit headings, and section designs |
| `index.html` | Browser title, description, and other page metadata |
| `public/` | Static files such as a CV or project screenshots |

The current hero uses your portrait at `public/images/profile-photo.jpg`. Replace that file to update the photo. The earlier IoT illustration remains as an unused asset. Design sources, font licensing, and the earlier image prompt are recorded in `docs/design-notes.md`. Kanit fonts are served locally; no font CDN is required.

The workspace was empty before setup, so there were no existing project files to replace.

## Add your information

Your name, email, phone, university, major, and study period are configured in `src/data/profile.js`. Edit the introduction, About paragraphs, and skill groups there. Add your complete LinkedIn URL when available.

The GitHub profile URL is derived from the supplied project repository links. Verify it before publishing. Unavailable LinkedIn and CV links stay hidden until configured. Leave any unavailable optional link as `null`.

To enable the CV download:

1. Put your actual PDF at `public/cv/cv.pdf`.
2. Set `profile.cvUrl` to `'/cv/cv.pdf'`.
3. Optionally change `profile.cvFileName` to the preferred download filename.

Update the title and meta description in `index.html` when you personalize the site. No personal photo or avatar is required.

## Add certificate images

Place certificate files in `public/certificates/`, then set the matching `certificateUrl` in `src/data/achievements.js`, such as `'/certificates/jlpt-n3.jpg'`. See `public/certificates/README.md` for all suggested filenames and supported formats. The **View certificate** link appears only after the URL is configured; null values show a pending message. Run `npm run check` to catch missing local files before publishing.

## Add or edit projects

Edit the exported `projects` array in `src/data/projects.js`. Each object creates one card and provides the content for its **View Details** dialog. For example:

```js
{
  id: 'my-project', // Unique, stable identifier
  title: '[Project title]',
  year: '2026',
  subtitle: '[One-line project summary]',
  description: '[A short, factual description]',
  category: 'Software',
  technologies: ['React', 'Tailwind CSS'],
  github: null, // Or a complete https://github.com/... URL
  demo: null, // Or a complete https://... URL
  visual: 'software',
  image: null, // Optional: '/projects/my-project.webp'
  details: {
    overview: '[Additional information about the project]',
    highlights: ['[A verified feature or implementation detail]'],
  },
}
```

Supported categories are `Software`, `Hardware`, and `IoT/Embedded`. Designed illustrations are available for `greenhouse`, `music`, `remote`, and `health`; other `visual` values use a software illustration. An optional image path can point to a file in `public/`, such as `public/projects/my-project.webp`, or a complete image URL.

GitHub and Live Demo links appear only when their values are provided. Project details should describe only features you have actually implemented. The supplied four projects use the information in the brief, without invented performance figures or project capabilities.

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
   | Environment Variables | None required |

5. Click **Deploy** and open the URL Vercel provides.

Subsequent pushes trigger deployments through the Git integration. This is a single page with hash-based section links, so it does not require client-side route rewrites.

Deployment guidance follows the official [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite), [Vercel Git integration documentation](https://vercel.com/docs/git), and [Vite static deployment guide](https://vite.dev/guide/static-deploy). The project has not been deployed automatically.
