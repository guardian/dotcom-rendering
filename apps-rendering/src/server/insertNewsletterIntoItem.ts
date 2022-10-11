// ----- Imports ----- //
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign } from '@guardian/libs';
import { OptionKind } from '@guardian/types';
import type { Body, BodyElement, NewsletterSignUp } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Item } from 'item';
import { logger } from 'logger';
import { Result } from 'result';
import { stringToPillar } from 'themeStyles';

// ----- Constants ----- //

enum ElementCategory {
	'ParagraphText',
	'BoldParagraphText',
	'NonParagraphText',
	'Heading',
	'NonText',
	'WhiteSpace',
	'Error',
}

// ----- pure functions ---//

function categoriseElement(
	result: Result<string, BodyElement>,
): ElementCategory {
	if (!result.isOk()) {
		// using result.isErr does not convince the compiler that result.value exists
		return ElementCategory.Error;
	}

	switch (result.value.kind) {
		case ElementKind.HeadingThree:
		case ElementKind.HeadingTwo:
			return ElementCategory.Heading;
		case ElementKind.Text: {
			const { doc } = result.value;
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
 *   - Should not be next to an adSlot (NOT IMPLEMENTED HERE)
 *   - The best place is the last place meeting the criteria above.
 *
 * @param body an Item.Body
 * @returns A Result with the insertIndex or an error
 */
function findInsertIndex(body: Body): Result<string, number> {
	// create a filtered copy of the body without:
	//  - 'Error' Results
	//  -  Text BodyElements representing whitespace between HTML elements
	const contentOnlyBody = body.filter(
		(result) =>
			![ElementCategory.Error, ElementCategory.WhiteSpace].includes(
				categoriseElement(result),
			),
	);

	const [minIndex, maxIndex] = getRange(contentOnlyBody.length);

	function isSuitable(index: number): boolean {
		if (index > maxIndex || index < minIndex) {
			return false;
		}

		const contentBefore = contentOnlyBody[index - 1];
		const contentAfter = contentOnlyBody[index];

		// NOTE - this is a type safety check. TypeScript will cast a value
		// accessed from an array index as being of type of the Array member, even
		// if the index is out of bounds and the value is actually undefined.
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- because 👆
		if (!contentBefore || !contentAfter) {
			return false;
		}

		return (
			[ElementCategory.ParagraphText].includes(
				categoriseElement(contentBefore),
			) &&
			[
				ElementCategory.ParagraphText,
				ElementCategory.BoldParagraphText,
			].includes(categoriseElement(contentAfter))
		);
	}

	const suitabilityList = contentOnlyBody.map((_, index) =>
		isSuitable(index),
	);

	const bestIndexInContentOnlyBody = suitabilityList.lastIndexOf(true);

	// Find the corresponding index in the original body array:
	const bestIndexInOriginalBody = body.indexOf(
		contentOnlyBody[bestIndexInContentOnlyBody],
	);

	return bestIndexInOriginalBody === -1
		? Result.err('Unable to find suitable place for NewsletterSignUp')
		: Result.ok(bestIndexInOriginalBody);
}

// ----- Procedures ----- //

function buildBodyElement(newsletter: Newsletter): NewsletterSignUp {
	return {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
		theme: stringToPillar(newsletter.theme),
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
				Result.ok(newsletterSignUp),
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
