// ----- Imports ----- //
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign } from '@guardian/libs';
import { OptionKind } from '../vendor/@guardian/types/index';
import { getPillarOrElseNews } from 'articleFormat';
import type { Body, BodyElement, NewsletterSignUp } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Item } from 'item';
import { logger } from 'logger';
import { Result } from 'result';

// ----- Constants ----- //

enum ElementCategory {
	ParagraphText,
	BoldParagraphText,
	NonParagraphText,
	Heading,
	NonText,
	WhiteSpace,
	Error,
}

type ElementCategoryAndIndex = {
	category: ElementCategory;
	index: number;
};

// ----- pure functions ---//

function categoriseElement(element: BodyElement): ElementCategory {
	switch (element.kind) {
		case ElementKind.HeadingThree:
		case ElementKind.HeadingTwo:
			return ElementCategory.Heading;
		case ElementKind.Text: {
			const { doc } = element;
			if (doc.textContent?.trim().length === 0) {
				return ElementCategory.WhiteSpace;
			}

			if (doc.nodeName === 'P') {
				if (doc.nodeType === 1) {
					const element = doc as Element;
					// for paragraphs containing only single <strong> child ("bold text"),
					// the sign up block can be put before them, but not after them.
					if (
						element.children.length === 1 &&
						element.firstElementChild?.tagName === 'STRONG'
					) {
						return ElementCategory.BoldParagraphText;
					}
				}
				return ElementCategory.ParagraphText;
			} else {
				return ElementCategory.NonParagraphText;
			}
		}
		default:
			return ElementCategory.NonText;
	}
}

/**
 * Get the target range of places within a list of visible elements
 * that the sign-up block can be placed in, being the places within
 * 3 elements from the middle of the article (by element number only;
 * not taking account of the length/height of each element)
 *
 * @param numberOfElements
 * @returns The minimum and maximum index for the target range
 */
function getRange(numberOfElements: number): [number, number] {
	const middle = Math.floor(numberOfElements / 2);
	return [Math.max(0, middle - 3), Math.min(numberOfElements, middle + 3)];
}

/**
 *  Find the place to insert a insert a sign-up block in to an article body,
 *  using these rules:
 *	 - Don't put straight after bold text
 *	 - Don't put under headings
 *	 - Must have plain body text above and below
 *   - Must be within 3 elements from the middle of the article
 *   - Should not be next to an adSlot (currented addressed by the
 *     existing adslot placement module - the sidgn-up block is enclosed
 *     in an <aside> and the adslots are placed after <p> elements  )
 *   - The best place is the last place meeting the criteria above.
 *
 * @param body an Item.Body
 * @returns A Result with the insertIndex or an error
 */
function findInsertIndex(body: Body): Result<string, number> {
	const positionsWithContent: ElementCategoryAndIndex[] = body
		.map((element, index) => ({
			index,
			category: categoriseElement(element),
		}))
		.filter(
			(item) =>
				![ElementCategory.Error, ElementCategory.WhiteSpace].includes(
					item.category,
				),
		);

	// get the slice from positionsWithContent that has the elements
	// with the target range.
	// The slice starts are minIndex-1 as the isSuitable function
	// needs to check the category of the element before the element
	// it is testing.
	const [minIndex, maxIndex] = getRange(positionsWithContent.length);
	const possibleElementsToPlaceBefore = positionsWithContent.slice(
		minIndex - 1,
		maxIndex,
	);

	function isSuitable(index: number): boolean {
		const elementBeforeInsertPoint =
			possibleElementsToPlaceBefore[index - 1];
		const elementAfterInsertPoint = possibleElementsToPlaceBefore[index];

		// NOTE - this is a type safety check. TypeScript will cast a value
		// accessed from an array index as being of type of the Array member, even
		// if the index is out of bounds and the value is actually undefined.
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- because 👆
		if (!elementBeforeInsertPoint || !elementAfterInsertPoint) {
			return false;
		}

		return (
			// the element before must be regular text (not bold paragraph)
			[ElementCategory.ParagraphText].includes(
				elementBeforeInsertPoint.category,
			) &&
			// the element after must be regular text, or a bold paragraph.
			[
				ElementCategory.ParagraphText,
				ElementCategory.BoldParagraphText,
			].includes(elementAfterInsertPoint.category)
		);
	}

	// Define a recursive function go backwards through the possible
	// positions until it finds one that is suitable or reaches
	// possibleElementsToPlaceBefore[0] - which is actually out of range, but
	// has to be include to test if possiblePoistions[1] is suitable.
	const findLastSuitablePosition = (
		indexInPossibleElementsList: number,
	): Result<string, ElementCategoryAndIndex> => {
		if (indexInPossibleElementsList <= 0) {
			return Result.err(
				'Unable to find suitable place for NewsletterSignUp',
			);
		}
		if (isSuitable(indexInPossibleElementsList)) {
			return Result.ok(
				possibleElementsToPlaceBefore[indexInPossibleElementsList],
			);
		}
		return findLastSuitablePosition(indexInPossibleElementsList - 1);
	};

	// call the recursive function, starting at the last position in
	// possibleElementsToPlaceBefore
	const insertPosition = findLastSuitablePosition(
		possibleElementsToPlaceBefore.length - 1,
	);

	return insertPosition.map((categoryAndIndex) => categoryAndIndex.index);
}

// ----- Procedures ----- //

function buildBodyElement(newsletter: Newsletter): NewsletterSignUp {
	const theme = getPillarOrElseNews(newsletter.theme);
	return {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
		theme,
	};
}

function insertNewsletterIntoBody(
	body: Body,
	newsletterSignUp: NewsletterSignUp,
): Result<string, Body> {
	return findInsertIndex(body).either(
		(errorString) => {
			return Result.err(errorString);
		},
		(insertIndex) => {
			return Result.ok([
				...body.slice(0, insertIndex),
				newsletterSignUp,
				...body.slice(insertIndex),
			]);
		},
	);
}

function insertNewsletterIntoItem(item: Item): Item {
	if (item.promotedNewsletter.kind === OptionKind.None) {
		return item;
	}
	const newsletterSignUp = buildBodyElement(item.promotedNewsletter.value);

	switch (item.design) {
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
		case ArticleDesign.Obituary: {
			return insertNewsletterIntoBody(item.body, newsletterSignUp).either(
				(errorString) => {
					logger.info(`${errorString}: ${item.webUrl}`);
					return item;
				},

				(body) => ({
					...item,
					body,
				}),
			);
		}
		default:
			return item;
	}
}

// ----- Exports ----- //
export { insertNewsletterIntoItem };
