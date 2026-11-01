// Post-build checks on dist/: no private data, single h1, JSON-LD present and safe.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const files = [];
(function walk(dir) {
	for (const f of readdirSync(dir)) {
		const p = join(dir, f);
		statSync(p).isDirectory() ? walk(p) : files.push(p);
	}
})(DIST);

const errors = [];
const text = files.filter((f) => /\.(html|xml|txt|json|js|css)$/.test(f));
for (const f of text) {
	const s = readFileSync(f, 'utf8');
	// Peruvian mobile numbers (9 digits starting with 9), with optional separators and +51.
	if (/(\+?51[\s.-]?)?9\d{2}[\s.-]?\d{3}[\s.-]?\d{3}(?!\d)/.test(s.replace(/sha256-[A-Za-z0-9+/=]+/g, '')))
		errors.push(`${f}: looks like a phone number`);
	if (/telephone|tel:/i.test(s)) errors.push(`${f}: telephone field or tel: link`);
}

const index = readFileSync(join(DIST, 'index.html'), 'utf8');
if ((index.match(/<h1[\s>]/g) ?? []).length !== 1) errors.push('index.html: expected exactly one <h1>');
const ld = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ld) errors.push('index.html: missing JSON-LD');
else {
	JSON.parse(ld[1]);
	if (ld[1].includes('<')) errors.push('index.html: unescaped "<" in JSON-LD');
}
if (!/<meta http-equiv="content-security-policy"/i.test(index)) errors.push('index.html: missing CSP meta tag');

if (errors.length) {
	console.error('check-dist failed:\n- ' + errors.join('\n- '));
	process.exit(1);
}
console.log(`check-dist: ${text.length} files OK`);
