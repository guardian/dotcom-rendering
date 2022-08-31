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
const getUnique = (slug: string, array: string[]): string => {
	if (array.includes(slug)) {
		const occurenceCount = array.filter(
			(currentItem) => currentItem === slug,
		).length;
		return `${slug}-${occurenceCount}`;
	}
	return slug;
};

/**
 * We want ids to be readable to humans so that we can use them for navigation.
 * This function takes a string and turns it into a slug.
 * There's a bunch of ways to achieve this but we have taken inspiration from https://gist.github.com/codeguy/6684588?permalink_comment_id=3243980#gistcomment-3243980
 */
const slugify = (text: string) => {
	return text
		.normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, '-') // Replace spaces with "-"
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple "-" with single "-"
		.replace(/-$/g, ''); // Remove trailing -
};

/**
 * This function creates a sluggified string if we have test available. If not, then it retuns the element id so that we always have an id.
 */
const generateId = (text: string, elementId: string) => {
	if (!text) return elementId;
	return slugify(text) || elementId;
};

/**
 * If our h2 element is a subheading then we want to insert a humanised slug of the header text as its ID.
 * We make sure to store each slug inside an array so that we can verify if this slug already exists as an id. If it does, we add the number of times it appears on the page to make sure the id is always unique.
 */
const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const slugifiedIds: string[] = [];
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const text = extractText(element);
			const id = generateId(text, element.elementId);
			const uniqueId = getUnique(id, slugifiedIds);

			slugifiedIds.push(id);
			const withId = element.html.replace(
				'<h2>',
				// add ID to H2 element
				`<h2 id='${uniqueId}'>`,
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
