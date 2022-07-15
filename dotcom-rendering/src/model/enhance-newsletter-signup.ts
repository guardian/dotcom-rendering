/**
 * Finds a position in the elements array that is at or near the middle
 * and bewteen two paragraph elements. Returns the middle position if
 * no between paragraphs is found.
 *
 * @param elements the elements in the article block
 * @returns an index to place the NewsletterSignup component at
 */
const findIndexToInsertAt = (elements: CAPIElement[]): number => {
	const isBetweenParagraphs: { (index: number): boolean } = (index) =>
		elements[index - 1]?._type ===
			'model.dotcomrendering.pageElements.TextBlockElement' &&
		elements[index]?._type ===
			'model.dotcomrendering.pageElements.TextBlockElement';

	const targetIndex = Math.floor(elements.length / 2);

	// If the target position is between two paragraphs, place the NewsletterSignup there
	if (isBetweenParagraphs(targetIndex)) {
		return targetIndex;
	}

	const maxDistance = Math.floor(elements.length / 5);

	// find the positions within the elements that are between two paragraphs
	// and within the maxDistance
	const possiblePositions = elements
		.slice(1)
		.map((element, index) => ({
			index,
			distance: Math.abs(index - targetIndex),
			okay: isBetweenParagraphs(index),
		}))
		.filter((spot) => spot.okay && spot.distance <= maxDistance)
		.sort((a, b) => a.distance - b.distance); // closest spot first

	// Place at the closest spot between two paragraphs - if there are none, place at the target position
	return possiblePositions[0]?.index || targetIndex;
};

const isBlog = (format: CAPIFormat): boolean =>
	format.design === 'DeadBlogDesign' || format.design === 'LiveBlogDesign';

const isInteractive = (format: CAPIFormat): boolean =>
	format.design === 'FullPageInteractiveDesign' ||
	format.design === 'InteractiveDesign';

const shouldNotPlaceInline = (format: CAPIFormat): boolean =>
	format.design === 'QuizDesign' || // the quiz is rendered as a single element.
	format.design === 'NewsletterSignupDesign'; // a dedicated sign-up page would use the newsletter data differently

export const enhanceNewsletterSignup = (
	blocks: Block[],
	format: CAPIFormat,
	newsletter?: Newsletter,
): Block[] => {
	if (!newsletter) {
		return blocks;
	}

	if (
		isBlog(format) ||
		isInteractive(format) ||
		shouldNotPlaceInline(format)
	) {
		return blocks;
	}

	const { elements } = blocks[0];

	elements.splice(findIndexToInsertAt(elements), 0, {
		_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		newsletter: newsletter,
		elementId: newsletter.elementId,
	});

	return blocks;
};
