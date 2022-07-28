interface PlaceInArticle {
	index: number;
	distanceFromTarget: number;
	afterText: boolean;
	distanceAfterFloating: number;
}

type PositionOption = 'MIDDLE' | 'NONE';

const floatingElementRoleTypes: FloatingElementRole[] = [
	'supporting',
	'thumbnail',
	'richLink',
];

const MINIMUM_DISTANCE_AFTER_FLOATING_ELEMENT = 4;
// This value is an approximation - the aim is to avoid a blank space between
// the element before the SignUp and the end of the floating element.
// The SignUp block css uses 'clear:both' so a floating element won't interfer
// with its layout.
// However, the actual heights of the elements when rendered is not taken into
// account. 4 paragraphs should be enough, but if the floating element was
// taller than all 4 paragraphs combined, there would be a gap, as illustrated below.
// This is why sortPlaces prioritises  distanceAfterFloating over distanceFromTarget.

//    | TextTextTextTextTextText
//    | TextTextTextText
//    |
//  +-----+ TextTextTextTextText
//  |float|
//  |float| TextTextTextTextText
//  |float| TextTextTextText
//  |float|
//  |float| TextTextTextTextText
//  |float|
//  |float| TextTextTextText
//  |float|
//  |float|
//  |float|
//  +-----+
//    |   +---------------------+
//    |   |      SignUp         |
//    |   +---------------------+

const MAXIMUM_DISTANCE_FROM_MIDDLE = 4;

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
		// it would be more logical to return Infinity here,
		// but having an outsized finite value simplifies the sort function
		// (Infinity - Infinity == NaN)
		return elements.length * 10;
	}

	return index - elements.indexOf(lastFloatingElementBeforePlace);
};

const getPlaces = (
	targetIndex: number,
	elements: CAPIElement[],
): PlaceInArticle[] => {
	return elements.map((element, index) => ({
		index,
		distanceFromTarget: Math.abs(index - targetIndex),
		afterText: isAfterText(index, elements),
		distanceAfterFloating: getDistanceAfterFloating(index, elements),
	}));
};

const placeIsSuitable = (place: PlaceInArticle): boolean =>
	place.afterText &&
	place.distanceAfterFloating >= MINIMUM_DISTANCE_AFTER_FLOATING_ELEMENT &&
	place.distanceFromTarget <= MAXIMUM_DISTANCE_FROM_MIDDLE;

/**
 * Sort the places, putting those furtherest from a previous floating elment
 * first, then by distance from the target
 */
const sortPlaces = (placeA: PlaceInArticle, placeB: PlaceInArticle): number => {
	const floatingComparison =
		placeB.distanceAfterFloating - placeA.distanceAfterFloating;
	if (floatingComparison !== 0) {
		return floatingComparison;
	}
	return placeA.distanceFromTarget - placeB.distanceFromTarget;
};

/**
 * Finds a suitable place within the existing element of the block to insert a
 * NewsletterSignupBlockElement, defaulting to the end of the article if no
 * suitable place is found in range of the target.
 *
 * @param elements the elements in the article block
 * @param targetIndex the target place to put the NewsletterSignupBlockElement
 * @returns the index insert the NewsletterSignupBlockElement component at
 */
const findInsertIndex = (
	elements: CAPIElement[],
	targetIndex: number,
): number => {
	const suitablePlacesInOrderOfPrefence = getPlaces(targetIndex, elements)
		.filter(placeIsSuitable)
		.sort(sortPlaces);

	// Return index of the best place - if there are none, return the end of the article
	return suitablePlacesInOrderOfPrefence[0]?.index || elements.length;
};

// NOTE: blog pages have different structure with multiple blocks of elements
// any future function to place sign-up blocks in blog pages would need to
// take this into acccount.
const insertAtMiddle = (
	promotedNewsletter: Newsletter,
	elements: CAPIElement[],
): CAPIElement[] => {
	const index = findInsertIndex(elements, Math.floor(elements.length / 2));

	return [
		...elements.slice(0, index),
		{
			_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			newsletter: promotedNewsletter,
		},
		...elements.slice(index),
	];
};

// current instruction is to aim to place the SignUp block in the middle of standard articles,
// This might change, other placements be set for different formats
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
							? insertAtMiddle(promotedNewsletter, block.elements)
							: block.elements,
				};
			});
		case 'NONE':
		default:
			return blocks;
	}
};
