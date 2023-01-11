import * as htmlparser2 from 'htmlparser2';

export const extractExpeditedIslands = (html: string): string[] => {
	const islands: string[] = [];

	const parser = new htmlparser2.Parser({
		onopentag(name, attributes) {
			// htmlparser2 appears to parse all attributes as lowercase, so we need to check for
			// attributes.expediteloading not attributes.expediteLoading!
			if (
				name === 'gu-island' &&
				attributes.expediteloading === 'true' &&
				attributes.name
			) {
				islands.push(`${attributes.name}-importable`);
			}
		},
	});

	parser.write(html);
	parser.end();

	// Deduplicate - there could be multiple of the same island used, but we only
	// need to load the script once!
	return [...new Set(islands)];
};
