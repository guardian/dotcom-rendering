import { logger } from '../server/lib/logging';

type PlaceInArticle = {
	position: number;
	distanceFromTarget: number;
	isAfterText: boolean;
	distanceAfterFloating: number;
};

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

const checkIfAfterText = (index: number, elements: CAPIElement[]): boolean =>
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
				['supporting', 'thumbnail', 'richLink'].includes(element.role),
		);

	if (!lastFloatingElementBeforePlace) {
		// it would be more logical to return Infinity here,
		// but having an outsized finite value simplifies the sort function
		// (Infinity - Infinity == NaN)
		return elements.length * 10;
	}

	return index - elements.indexOf(lastFloatingElementBeforePlace);
};

const placeIsSuitable = (place: PlaceInArticle): boolean =>
	place.isAfterText &&
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
 * Finds an index for where the NewsletterSignupBlockElement component can
 * be inserted
 *
 * @param elements the elements in the article block
 * @returns the index or null if no suitable place found
 */
const findInsertPosition = (elements: CAPIElement[]): number | null => {
	// Aim for the middle
	const targetPosition = Math.floor(elements.length / 2);
	const places = elements.map((_, index) => ({
		position: index,
		distanceFromTarget: Math.abs(index - targetPosition),
		isAfterText: checkIfAfterText(index, elements),
		distanceAfterFloating: getDistanceAfterFloating(index, elements),
	}));

	const suitablePlacesInOrderOfPrefence = places
		.filter(placeIsSuitable)
		.sort(sortPlaces);

	// Return the position to insert the embed or null if none was found
	return suitablePlacesInOrderOfPrefence[0]?.position || null;
};

const tryToInsert = (
	promotedNewsletter: Newsletter,
	elements: CAPIElement[],
	blockId: string,
): CAPIElement[] => {
	const insertPosition = findInsertPosition(elements);

	if (insertPosition === null) {
		logger.warn(
			`Unable to find suitable place for NewsletterSignupBlockElement`,
			blockId,
		);
		return elements;
	}

	return [
		...elements.slice(0, insertPosition),
		{
			_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			newsletter: promotedNewsletter,
		},
		...elements.slice(insertPosition),
	];
};

export const insertPromotedNewsletter = (
	blocks: Block[],
	format: CAPIFormat,
	promotedNewsletter?: Newsletter,
): Block[] => {
	if (!promotedNewsletter) {
		return blocks;
	}

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
			return blocks.map((block: Block) => {
				return {
					...block,
					elements: tryToInsert(
						promotedNewsletter,
						block.elements,
						block.id,
					),
				};
			});
		default:
			return blocks;
	}
};
