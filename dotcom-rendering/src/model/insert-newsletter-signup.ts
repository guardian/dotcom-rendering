/**
 * Finds a place within the existing element of the block to insert a
 * NewsletterSignupBlockElement, within a given distance from a given
 * target index, prefering a place after TextBlockElement
 *
 * @param elements the elements in the article block
 * @param targetIndex the target place to put the NewsletterSignupBlockElement
 * @param maxDistance how far to move from the targetIndex to find a place after a paragraph
 * @returns the index insert the NewsletterSignupBlockElement component at
 */
const findInsertIndex = (
	elements: CAPIElement[],
	targetIndex: number,
	maxDistance = 0,
): number => {
	const isAfterText: { (index: number): boolean } = (index) =>
		elements[index - 1]?._type ===
		'model.dotcomrendering.pageElements.TextBlockElement';

	// If the target position is after a paragraphs, place the NewsletterSignup there
	if (isAfterText(targetIndex) || maxDistance === 0) {
		return targetIndex;
	}

	// find the places within the maxDistance of targetIndex
	const possiblePlaces = elements
		.slice(
			Math.min(0, targetIndex - maxDistance),
			Math.max(elements.length - 1, targetIndex + maxDistance),
		)
		.map((element, index) => ({
			index,
			distance: Math.abs(index - targetIndex),
			afterText: isAfterText(index),
		}))
		.filter((place) => place.afterText) // exclude places not after a paragraph
		.sort((a, b) => a.distance - b.distance); // sort, closest place first

	// Return index of the closest place - if there are none, return the targetIndex
	return possiblePlaces[0]?.index || targetIndex;
};

const insert = (
	newsletter: Newsletter,
	elements: CAPIElement[],
	targetIndex: number,
	maxDistance = 0,
): CAPIElement[] => {
	elements.splice(findInsertIndex(elements, targetIndex, maxDistance), 0, {
		_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		newsletter: newsletter,
		elementId: newsletter.elementId,
	});

	return elements;
};

// blog pages have different structure with multiple blocks of elements
// there is no instruction on how / if / where sign-up block should be
// placed in blogs as yet, so they are excluded for now
const isBlog = (format: CAPIFormat): boolean =>
	format.design === 'DeadBlogDesign' || format.design === 'LiveBlogDesign';

const shouldNotPlaceInline = (format: CAPIFormat): boolean =>
	format.design === 'FullPageInteractiveDesign' || // interactive pages are all custom content, so should not be inserting extra elements.
	format.design === 'InteractiveDesign' ||
	format.design === 'QuizDesign' || // the quiz is rendered as a single element.
	format.design === 'NewsletterSignupDesign'; // a dedicated sign-up page would use the newsletter data differently

export const insertNewsletterSignup = (
	blocks: Block[],
	format: CAPIFormat,
	newsletter?: Newsletter,
): Block[] => {
	if (!newsletter || isBlog(format) || shouldNotPlaceInline(format)) {
		return blocks;
	}

	return blocks.map((block: Block, index: number) => {
		return {
			...block,
			elements:
				// aside from blogs (excluded above) all article formats only contain 1 block, so
				// the index conditional should not be necessary - but should another format with
				// mutiple blocks be introduced, the NewsletterSignupBlockElement should only be
				// included once
				index === 0
					? insert(
							newsletter,
							block.elements,
							Math.floor(block.elements.length / 2), // current instruction is to place the SignUp block in the middle of the article - this might change
							4, // allow the SignUp block to be a few spaces higher of lower to find a spot after a paragraph rather than a subheading or picture etc
					  )
					: block.elements,
		};
	});
};
