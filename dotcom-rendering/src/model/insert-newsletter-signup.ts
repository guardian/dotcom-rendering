interface PlaceInArticle {
	index: number;
	distance: number;
	afterText: boolean;
	afterSupporting: boolean;
	distanceAfterFloating: number;
}

type PositionOption = 'MIDDLE' | 'NONE';

const floatingElementRoleTypes: FloatingElementRole[] = [
	'supporting',
	'thumbnail',
	'richLink',
];

const isCloseAfterSupportingElement = (
	index: number,
	elements: CAPIElement[],
): boolean => {
	const elementIsSupporting = (element?: CAPIElement): boolean =>
		!!(element && 'role' in element && element.role === 'supporting');

	return (
		elementIsSupporting(elements[index - 1]) ||
		elementIsSupporting(elements[index - 2])
	);
};

const isAfterText = (index: number, elements: CAPIElement[]): boolean =>
	elements[index - 1]?._type ===
	'model.dotcomrendering.pageElements.TextBlockElement';

const getDistanceAfterFloating = (
	index: number,
	elements: CAPIElement[],
): number => {
	const lastFloatingElementBeforePlace = elements
		.slice(0, index)
		.reverse()
		.find(
			(element) =>
				'role' in element &&
				typeof element.role == 'string' &&
				floatingElementRoleTypes.includes(
					element.role as FloatingElementRole,
				),
		);

	if (!lastFloatingElementBeforePlace) {
		return Infinity;
	}

	return index - elements.indexOf(lastFloatingElementBeforePlace);
};

const getPlaces = (
	targetIndex: number,
	elements: CAPIElement[],
): PlaceInArticle[] => {
	return elements.map((element, index) => ({
		index,
		distance: Math.abs(index - targetIndex),
		afterText: isAfterText(index, elements),
		afterSupporting: isCloseAfterSupportingElement(index, elements),
		distanceAfterFloating: getDistanceAfterFloating(index, elements),
	}));
};

const placeIsSuitable = (place: PlaceInArticle): boolean =>
	place.afterText && !place.afterSupporting;

/**
 * Finds a place within the existing element of the block to insert a
 * NewsletterSignupBlockElement, within a given distance from a given
 * target index, prefering a place after TextBlockElement and not within
 * two places after a supporting element (eg pullquote).
 *
 * @param elements the elements in the article block
 * @param targetIndex the target place to put the NewsletterSignupBlockElement
 * @param maxDistance how far to move from the targetIndex to find a place after a paragraph
 * @returns the index insert the NewsletterSignupBlockElement component at
 */
export const findInsertIndex = (
	elements: CAPIElement[],
	targetIndex: number,
	maxDistance = 0,
): number => {
	const possiblePlaces = getPlaces(targetIndex, elements)
		.filter(placeIsSuitable)
		.filter((place) => place.distance <= maxDistance)
		.sort((a, b) => a.distance - b.distance); // sort, closest place first

	// Return index of the closest place - if there are none, return the targetIndex
	return possiblePlaces[0]?.index || targetIndex;
};

/**
 * Find the role of the last floating element before the index,
 * (if any), not matter how far before the floating element is.
 *
 * @param index where in the array the element will be inserted
 * @param elements the array of elements
 * @returns the role of the floating element before the index
 */
const findLastFloatingElementTypeBeforePlace = (
	index: number,
	elements: CAPIElement[],
): FloatingElementRole | undefined => {
	const lastFloatingElementBeforePlace = elements
		.slice(0, index)
		.reverse()
		.find(
			(element) =>
				'role' in element &&
				typeof element.role == 'string' &&
				floatingElementRoleTypes.includes(
					element.role as FloatingElementRole,
				),
		);

	// Ideally wouldn't need to test for "'role' in element" again
	return lastFloatingElementBeforePlace &&
		'role' in lastFloatingElementBeforePlace
		? (lastFloatingElementBeforePlace.role as FloatingElementRole)
		: undefined;
};

// NOTE: blog pages have different structure with multiple blocks of elements
// any future function to place sign-up blocks in blog pages would need to
// take this into acccount.
const insert = (
	promotedNewsletter: Newsletter,
	elements: CAPIElement[],
	targetIndex: number,
	maxDistance = 0,
): CAPIElement[] => {
	const index = findInsertIndex(elements, targetIndex, maxDistance);

	const previousFloatingElementType = findLastFloatingElementTypeBeforePlace(
		index,
		elements,
	);

	return [
		...elements.slice(0, index),
		{
			_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			newsletter: promotedNewsletter,
			previousFloatingElementType,
		},
		...elements.slice(index),
	];
};

const getPositionOption = (format: CAPIFormat): PositionOption => {
	switch (format.design) {
		case 'ArticleDesign':
		case 'GalleryDesign':
		case 'AudioDesign':
		case 'VideoDesign':
		case 'ReviewDesign':
		case 'AnalysisDesign':
		case 'CommentDesign':
		case 'FeatureDesign':
		case 'RecipeDesign':
		case 'MatchReportDesign':
		case 'InterviewDesign':
		case 'EditorialDesign':
		case 'ObituaryDesign':
			return 'MIDDLE';
		default:
			return 'NONE';
	}
};

export const insertPromotedNewsletter = (
	blocks: Block[],
	format: CAPIFormat,
	promotedNewsletter?: Newsletter,
): Block[] => {
	if (!promotedNewsletter) {
		return blocks;
	}

	switch (getPositionOption(format)) {
		case 'MIDDLE':
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
									promotedNewsletter,
									block.elements,
									Math.floor(block.elements.length / 2), // current instruction is to place the SignUp block in the middle of the article - this might change
									4, // allow the SignUp block to be a few spaces higher of lower to find a suitable place
							  )
							: block.elements,
				};
			});
		case 'NONE':
		default:
			return blocks;
	}
};
