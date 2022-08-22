import { JSDOM } from 'jsdom';

const extractText = (element: SubheadingBlockElement): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

export const validateSlug = (slug: string, array: string[]) => {
	if (array.includes(slug)) {
		const occurenceCount = array.filter((currentItem) => currentItem == slug).length;
		return `${slug}-${occurenceCount}`;
	}
	return slug;
};

const slugify = (text: string) => {
	return text
		.toString() // Cast to string (optional)
		.normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string (optional)
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const slugifiedIds: string[] = []
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		// If this element is a subheading, insert the element ID as its ID
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const text = extractText(element);
			const slug = text ? slugify(text) : element.elementId;
			const validatedSlug = validateSlug(slug, slugifiedIds);
			slugifiedIds.push(slug)
			const withId = element.html.replace(
				'<h2>',
				// add ID to H2 element
				`<h2 id='${validatedSlug}'>`,
			);
			enhanced.push({
				...element,
				html: withId,
			});
		} else {
			// Otherwise, do nothing
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceH2s = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
