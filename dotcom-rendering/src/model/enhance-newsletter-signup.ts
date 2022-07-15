/**
 * Finds a position in the elements array that is at or near the middle
 * and after a paragraph element. Returns the middle position if
 * no place after a paragraphs is found with the specified
 * maximum distance of the middle.
 *
 * @param elements the elements in the article block
 * @param maxDistance maximum distance from the middle position
 * @returns an index to place the NewsletterSignup component at
 */
const getPlaceNearMiddleToInsertElement = (
	elements: CAPIElement[],
	maxDistance = 0,
): number => {
	const isAfterParagraph: { (index: number): boolean } = (index) =>
		elements[index - 1]?._type ===
		'model.dotcomrendering.pageElements.TextBlockElement';

	const targetIndex = Math.floor(elements.length / 2);

	// If the target position is between two paragraphs, place the NewsletterSignup there
	if (isAfterParagraph(targetIndex) || maxDistance === 0) {
		return targetIndex;
	}

	// find the positions within the elements that are between two paragraphs
	// and within the maxDistance
	const possiblePositions = elements
		.slice(
			Math.min(0, targetIndex - maxDistance),
			Math.max(elements.length - 1, targetIndex + maxDistance),
		)
		.map((element, index) => ({
			index,
			distance: Math.abs(index - targetIndex),
			okay: isAfterParagraph(index),
		}))
		.filter((spot) => spot.okay) // exclude spots not after a paragraph
		.sort((a, b) => a.distance - b.distance); // closest spot first

	// Place at the closest spot between two paragraphs - if there are none, place at the target position
	return possiblePositions[0]?.index || targetIndex;
};

const addSignupElementToMiddleOfArticle: {
	(newsletter: Newsletter, blocks: Block[]): Block[];
} = (newsletter, blocks) => {
	const { elements } = blocks[0];

	elements.splice(getPlaceNearMiddleToInsertElement(elements, 4), 0, {
		_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		newsletter: newsletter,
		elementId: newsletter.elementId,
	});

	return blocks;
};

// blog pages have different structure with multiple blocks of elements
// there is no instruction on how / if / where sign-up block should be
// placed in blogs as yet, so they are excluded for now
const isBlog = (format: CAPIFormat): boolean =>
	format.design === 'DeadBlogDesign' || format.design === 'LiveBlogDesign';

const shouldNotPlaceInline = (format: CAPIFormat): boolean =>
	format.design === 'FullPageInteractiveDesign' ||
	format.design === 'InteractiveDesign' ||
	format.design === 'QuizDesign' || // the quiz is rendered as a single element.
	format.design === 'NewsletterSignupDesign'; // a dedicated sign-up page would use the newsletter data differently

export const enhanceNewsletterSignup = (
	blocks: Block[],
	format: CAPIFormat,
	newsletter?: Newsletter,
): Block[] => {
	if (!newsletter || isBlog(format) || shouldNotPlaceInline(format)) {
		return blocks;
	}

	return addSignupElementToMiddleOfArticle(newsletter, blocks);
};
