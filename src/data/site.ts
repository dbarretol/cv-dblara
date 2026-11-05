// Site-level settings that are not part of the CV data (src/data/cv.json is generated from master_cv.yaml).

export const site = {
	/** Honorific shown before the name; the name itself comes from cv.json without it. */
	honorific: 'Dr.',
	headline: 'Ingeniero mecánico-electricista, doctor en Energética y MBA',
	focus: 'Inteligencia artificial aplicada, energía y gestión de mantenimiento',
	/** Credentials shown as tags under the summary (only what the headline does not already say). */
	credentials: ['CIP 330188'],
	/** Consulting landing page (sister site). Its Person entity is shared through @id. */
	landing: {
		url: 'https://davidbarretolara.pages.dev/',
		personId: 'https://davidbarretolara.pages.dev/#persona',
		label: 'Ver servicios de consultoría',
	},
	pdfFileName: 'david-barreto-lara-cv.pdf',
	googleSiteVerification: 'P5qltKpOPurl-wwZD7BLoqxinueTII81nIR0boz1aVE',
	locale: 'es-PE',
} as const;

/** Section order, titles (sentence case, as in Spanish) and short labels for the navigation bar. */
export const sections = [
	{ id: 'experience', title: 'Experiencia profesional', nav: 'Experiencia' },
	{ id: 'ai-training', title: 'Formación en inteligencia artificial', nav: 'Formación en IA' },
	{ id: 'projects', title: 'Proyectos de implementación de IA', nav: 'Proyectos' },
	{ id: 'education', title: 'Formación académica', nav: 'Formación académica' },
	{ id: 'certifications', title: 'Certificaciones', nav: 'Certificaciones' },
	{ id: 'skills', title: 'Habilidades y competencias', nav: 'Habilidades' },
	{ id: 'languages', title: 'Idiomas', nav: 'Idiomas' },
	{ id: 'publications', title: 'Publicaciones', nav: 'Publicaciones' },
	{ id: 'awards', title: 'Premios y reconocimientos', nav: 'Reconocimientos' },
	{ id: 'activities', title: 'Otras actividades', nav: 'Actividades' },
	{ id: 'courses', title: 'Cursos de capacitación', nav: 'Cursos' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Titles for the technical skill groups of master_cv.yaml. */
export const skillGroups: Record<string, string> = {
	programming_and_data: 'Programación y análisis de datos',
	cloud_and_ai: 'Cloud e inteligencia artificial',
	engineering_and_simulation: 'Ingeniería, energía y simulación',
	management_and_finance: 'Gestión y finanzas',
	research_and_teaching: 'Investigación y docencia',
	web_and_tools: 'Desarrollo web y herramientas',
};
export const softSkillsTitle = 'Habilidades interpersonales';

export const publicationTypes: Record<string, string> = {
	journal_article: 'Artículo en revista',
	conference_proceedings: 'Artículo en actas de congreso',
	book_chapter: 'Capítulo de libro',
	thesis_phd: 'Tesis doctoral',
	thesis_masters: 'Tesis de maestría',
	thesis_mba: 'Tesis de MBA',
	thesis_undergraduate: 'Tesis de titulación',
};

/**
 * Badge images kept in the repo (src/assets/badges) for certifications whose image is not in the master CV yet,
 * keyed by certification id.
 */
export const certificationBadges: Record<string, string> = {
	'cert-009': 'microsoft_AI103',
};

/** Flag images (src/assets/flags) by language name in cv.json. */
export const flags: Record<string, string> = {
	Español: 'peru',
	Inglés: 'usa',
	Italiano: 'italy',
	Francés: 'france',
};
