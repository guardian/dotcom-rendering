import { JSDOM } from 'jsdom';

export const extractExpeditedIslands = (html: string): string[] => {
	const dom = new JSDOM(html);

	const expedited = dom.window.document.querySelectorAll(
		'gu-island[expediteLoading="true"]',
	);

	const islands = Array.from(expedited)
		.map((island) => {
			const name = island.getAttribute('name');
			if (name) return `${name}-importable`;
			return undefined;
		})
		.filter((name: string | undefined): name is string => !!name);

	// Deduplicate - there could be multiple of the same island used, but we only
	// need to load the script once!
	return [...new Set(islands)];
};
