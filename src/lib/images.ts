import type { ImageMetadata } from 'astro';

// Images downloaded by scripts/export-cv.mjs (src/assets/cv) and language flags (src/assets/flags).
const cvImages = import.meta.glob<ImageMetadata>('../assets/cv/*', { eager: true, import: 'default' });
const flagImages = import.meta.glob<ImageMetadata>('../assets/flags/*', { eager: true, import: 'default' });

const byName = (files: Record<string, ImageMetadata>) =>
	new Map(Object.entries(files).map(([path, img]) => [path.split('/').pop()!, img]));

const cvMap = byName(cvImages);
const flagMap = new Map([...byName(flagImages)].map(([name, img]) => [name.replace(/\.[^.]+$/, ''), img]));

export function cvImage(name?: string): ImageMetadata | undefined {
	if (!name) return undefined;
	const img = cvMap.get(name);
	if (!img) throw new Error(`Missing image src/assets/cv/${name}. Run the export script again.`);
	return img;
}

export const flagImage = (name?: string) => (name ? flagMap.get(name) : undefined);
