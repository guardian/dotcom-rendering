import { JSDOM } from 'jsdom';

const extractText = (element: SubheadingBlockElement): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

/**
 * We need the ids to be unique so we can navigate to them.
 * This function checks if the slug already exists and if it does it adds the count to the end of the slug.
 */
export const getUnique = (slug: string, array: string[]): string => {
	if (array.includes(slug)) {
		const occurenceCount = array.filter(
			(currentItem) => currentItem === slug,
		).length;
		return `${slug}-${occurenceCount}`;
	}
	return slug;
};

const slugify = (text: string) => {
	return text
		.normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, '-') // Replace spaces with "-"
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-'); // Replace multiple "-" with single "-"
};

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const slugifiedIds: string[] = [];
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		// If this element is a subheading, insert a humanised slug of the text as its ID
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const text = extractText(element);
			const slug = text ? slugify(text) : element.elementId;
			const uniqueSlug = getUnique(slug, slugifiedIds);

			//remember the slug so we can check against it next time
			slugifiedIds.push(slug);
			const withId = element.html.replace(
				'<h2>',
				// add ID to H2 element
				`<h2 id='${uniqueSlug}'>`,
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
