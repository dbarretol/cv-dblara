// Generates the downloadable PDF from the built site (dist/) using its print stylesheet.
//
// Serves dist/ under the configured base path, opens it in Chromium, expands folded sections and prints to A4.
// Browser: PDF_BROWSER_CHANNEL (e.g. "msedge" or "chrome") if set; otherwise Playwright's Chromium
// (install it once with `npx playwright install chromium`), falling back to installed Edge or Chrome.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const FILE = 'david-barreto-lara-cv.pdf';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
	const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
	if (!path.startsWith(BASE)) return res.writeHead(404).end();
	let file = normalize(join(DIST, path.slice(BASE.length)));
	if (!file.startsWith(normalize(DIST))) return res.writeHead(403).end();
	try {
		if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
		res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(await readFile(file));
	} catch {
		res.writeHead(404).end();
	}
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const url = `http://127.0.0.1:${server.address().port}${BASE}`;

async function launch() {
	const channels = process.env.PDF_BROWSER_CHANNEL ? [process.env.PDF_BROWSER_CHANNEL] : [undefined, 'msedge', 'chrome'];
	for (const channel of channels) {
		try {
			return await chromium.launch(channel ? { channel } : {});
		} catch (e) {
			if (channel === channels.at(-1)) throw e;
		}
	}
}

const browser = await launch();
try {
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle' });
	await page.evaluate(async () => {
		document.querySelectorAll('details').forEach((d) => (d.open = true));
		document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
		await document.fonts.ready;
		await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
	});
	await page.emulateMedia({ media: 'print' });
	await page.pdf({
		path: join(DIST, FILE),
		format: 'A4',
		printBackground: true,
		preferCSSPageSize: true,
		displayHeaderFooter: true,
		headerTemplate: '<span></span>',
		footerTemplate:
			'<div style="width:100%;font:8px sans-serif;color:#5f656d;padding:0 14mm;display:flex;justify-content:space-between"><span>David Barreto Lara · Hoja de vida</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
		tagged: true,
		outline: true,
	});
	console.log(`PDF written to dist/${FILE}`);
} finally {
	await browser.close();
	server.close();
}
