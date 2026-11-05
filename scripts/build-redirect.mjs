// Builds the small site that replaces the old GitHub Pages address after moving to Cloudflare Pages.
//
// Every page of the old address (https://dbarretol.github.io/cv-dblara/) sends visitors and search engines to the
// new one: index.html and 404.html (GitHub Pages serves it for any unknown path) with a canonical link and an
// immediate meta refresh, which Google treats as a permanent redirect. The current PDF is copied so that old
// download links keep working.
//
// Usage: node scripts/build-redirect.mjs   (after `npm run build`; writes redirect/)
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TARGET = (process.env.SITE_URL ?? 'https://cv-davidbarretolara.pages.dev').replace(/\/?$/, '/');
const OUT = fileURLToPath(new URL('../redirect/', import.meta.url));
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PDF = 'david-barreto-lara-cv.pdf';

const html = `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>David Barreto Lara | Hoja de vida (nueva dirección)</title>
		<link rel="canonical" href="${TARGET}" />
		<meta http-equiv="refresh" content="0; url=${TARGET}" />
		<style>
			body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #faf7ee; color: #212529; font: 1.05rem/1.5 system-ui, sans-serif; }
			a { color: #790123; font-weight: 600; }
		</style>
	</head>
	<body>
		<p>La hoja de vida de David Barreto Lara se mudó a <a href="${TARGET}">${TARGET.replace(/^https:\/\/|\/$/g, '')}</a>.</p>
	</body>
</html>
`;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'index.html'), html);
await writeFile(join(OUT, '404.html'), html);
await copyFile(join(DIST, PDF), join(OUT, PDF));
console.log(`Redirect site written to redirect/ (target ${TARGET})`);
