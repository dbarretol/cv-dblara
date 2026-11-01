// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public URL in one place (see README). Defaults to GitHub Pages; for another host (e.g. Cloudflare Pages)
// set SITE_URL=https://<project>.pages.dev and BASE_PATH=/ at build time.
const SITE_URL = process.env.SITE_URL ?? 'https://dbarretol.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/cv-dblara';

export default defineConfig({
	site: SITE_URL,
	base: BASE_PATH,
	trailingSlash: 'ignore',
	build: { inlineStylesheets: 'always' },
	security: {
		// Hash-based CSP delivered as <meta>: only the site's own scripts and styles run.
		// frame-ancestors only works as an HTTP header; it lives in public/_headers (used by Cloudflare Pages).
		csp: {
			algorithm: 'SHA-256',
			directives: [
				"default-src 'self'",
				"img-src 'self' data:",
				"font-src 'self' data:",
				"connect-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'none'",
				'upgrade-insecure-requests',
			],
		},
	},
	integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
