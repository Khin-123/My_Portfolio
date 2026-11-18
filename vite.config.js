import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL: siteUrl } = loadEnv(mode, process.cwd())
  const tags = []

  if (siteUrl) {
    const canonical = new URL(siteUrl)
    if (canonical.protocol !== 'https:' || canonical.username || canonical.password || canonical.search || canonical.hash) {
      throw new Error('VITE_SITE_URL must be the public HTTPS portfolio URL without credentials, query, or fragment')
    }
    const image = new URL('images/portfolio-share.jpg', `${canonical.href.replace(/\/$/, '')}/`)
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: canonical.href }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:url', content: canonical.href }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image', content: image.href }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Khin Thida Hnin, Embedded Systems & IoT' }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
    )
  }

  return {
    plugins: [react(), tailwindcss(), {
      name: 'portfolio-social-metadata',
      transformIndexHtml: () => tags,
    }],
  }
})
