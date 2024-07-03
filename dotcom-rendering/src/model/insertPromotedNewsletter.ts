import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, isOneOf } from '@guardian/libs';
import { logger } from '../server/lib/logging';
import type { FEElement, Newsletter } from '../types/content';

type PlaceInArticle = {
	position: number;
	distanceFromTarget: number;
	isAfterText: boolean;
	distanceAfterFloating: number;
	isAfterListElement: boolean;
};

const MINIMUM_DISTANCE_AFTER_FLOATING_ELEMENT = 3;
// This value is an approximation - the aim is to avoid a blank space between
// the element before the SignUp and the end of the floating element.
// The SignUp block css uses 'clear:left' so a left floating element won't interfer
// with its layout.
// However, the actual heights of the elements when rendered is not taken into
// account. 3 paragraphs should be enough, but if the floating element was
// taller than all 3 paragraphs combined, there would be a gap, as illustrated below.
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
//  |float|
//  |float|
//  |float|
//  +-----+
//    |  +----------------------+
//    |  |      SignUp          |
//    |  +----------------------+

// Note this logic does need to account for adslots in the righthand
// column, because having clear:left (not clear:both) allows the adslot
// to float around the SignUp block.
// The elements in the right hand colomn don't 'hang over' into the
// main coloum as left coloumn element can.
//    | TextTextTextTextTextText  | +------+
//    | TextTextTextText          | |adslot|
//    |                           | |adslot|
//    | TextTextTextTextTextText  | |adslot|
//    | TextTextTextText          | |      |
//    |  +----------------------+ | |      |
//    |  |      SignUp          | | |      |
//    |  +----------------------+ | |      |
//    | TextTextTextTextTextText  | +------+
//    | TextTextTextText          |

/**
 * The maximum distance is set so that the sort function does not always place
 * the SignUp as high as possible to be above a (fairly distant) floating element
 * resulting in the block being higher than is ideal.
 * @example
 *	 0 TEXT
 *	 1 TEXT
 *	 2 TEXT
 *    [too high] <--  Without this rule the SignUp
 *	 3 RICHLINK     | tends to go too high so it's
 *	 4 TEXT         | above the floating element
 *	 5 TEXT         |
 *	 6 TEXT         |
 *	 7 TEXT         |
 *     [target] ----+ Staying here would probably be
 *	 8 TEXT           fine as there are four paragraphs
 *	 9 TEXT           between this spot and the richlink
 *	10 TEXT
 *	11 TEXT
 *	12 TEXT
 *	13 TEXT
 *	14 TEXT
 */
const MAXIMUM_DISTANCE_AFTER_FLOATING_ELEMENT = 4;

/**
 * The maximum distance from the center of the article that the
 * signup can be placed.
 */
const MAXIMUM_DISTANCE_FROM_MIDDLE = 4;

const checkIfAfterText = (index: number, elements: FEElement[]): boolean =>
	elements[index - 1]?._type ===
	'model.dotcomrendering.pageElements.TextBlockElement';

const listElements = [
	'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
	'model.dotcomrendering.pageElements.QAndAExplainerBlockElement',
	'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
	'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
] as const;

const isListElement = isOneOf(listElements);

const checkIfAfterNestedListElement = (
	index: number,
	elements: FEElement[],
): boolean => {
	return !elements.slice(index).some(({ _type }) => isListElement(_type));
};

const getDistanceAfterFloating = (
	index: number,
	elements: FEElement[],
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

	// it would be more logical to return Infinity here,
	// but having an outsized finite value simplifies the sort function
	// (Infinity - Infinity == NaN)
	const outsizedValue = elements.length + 1;

	// if there are no floating elements before the position, return the outsizedValue
	if (!lastFloatingElementBeforePlace) {
		return outsizedValue;
	}

	// if the last floating element is more than the maximum distance before the postions, return the outsizedValue
	const distance = index - elements.indexOf(lastFloatingElementBeforePlace);
	if (distance > MAXIMUM_DISTANCE_AFTER_FLOATING_ELEMENT) {
		return outsizedValue;
	}

	return distance;
};

const placeIsSuitable = (place: PlaceInArticle): boolean =>
	place.isAfterText &&
	place.isAfterListElement &&
	place.distanceAfterFloating >= MINIMUM_DISTANCE_AFTER_FLOATING_ELEMENT &&
	place.distanceFromTarget <= MAXIMUM_DISTANCE_FROM_MIDDLE;

/**
 * Sort the suitable places in descending order of preference by:
 *  - preferring places not close after a floating element, then
 *  - preferrring places further down
 */
const sortPlaces = (placeA: PlaceInArticle, placeB: PlaceInArticle): number => {
	const floatingComparison =
		placeB.distanceAfterFloating - placeA.distanceAfterFloating;
	if (floatingComparison !== 0) {
		return floatingComparison;
	}
	return placeB.position - placeA.position;
};

/**
 * Finds an index for where the NewsletterSignupBlockElement component can
 * be inserted
 *
 * @param elements the elements in the article block
 * @returns the index or null if no suitable place found
 */
const findInsertPosition = (elements: FEElement[]): number | null => {
	// Aim for the middle
	const targetPosition = Math.floor(elements.length / 2);
	const places = elements.map((_, index) => ({
		position: index,
		distanceFromTarget: Math.abs(index - targetPosition),
		isAfterText: checkIfAfterText(index, elements),
		isAfterListElement: checkIfAfterNestedListElement(index, elements),
		distanceAfterFloating: getDistanceAfterFloating(index, elements),
	}));
	const suitablePlacesInOrderOfPrefence = places
		.filter(placeIsSuitable)
		.sort(sortPlaces);

	// Return the position to insert the embed or null if none was found
	return suitablePlacesInOrderOfPrefence[0]?.position ?? null;
};

/**
 * Attempts to find a place to insert the newsletter embed
 *
 * @param promotedNewsletter the embed to insert
 * @param elements all elements for an article
 * @param blockId we only use this for logging
 * @returns The updated array of elements
 */
const tryToInsert = (
	promotedNewsletter: Newsletter,
	elements: FEElement[],
	blockId: string,
): FEElement[] => {
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
	elements: FEElement[],
	blockId: string,
	format: ArticleFormat,
	promotedNewsletter: Newsletter,
): FEElement[] => {
	switch (format.design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Review:
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Feature:
		case ArticleDesign.Recipe:
		case ArticleDesign.MatchReport:
		case ArticleDesign.Interview:
		case ArticleDesign.Editorial:
		case ArticleDesign.Obituary:
		case ArticleDesign.Explainer:
			return tryToInsert(promotedNewsletter, elements, blockId);
		default:
			return elements;
	}
};
