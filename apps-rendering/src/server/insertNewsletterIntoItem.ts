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

const enum BodyResultCategory {
	'paragraphText' = 'PARAGRAPH',
	'boldParagraphText' = 'BOLD_PARAGRAPH',
	'nonParagraphText' = 'OTHER TEXT ELEMENT',
	'nonText' = 'NON TEXT',
	'whiteSpaceText' = 'WHITE SPACE',
	'error' = 'error',
}

const TEST_NEWSLETTER: Newsletter = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: 'opinion',
	successDescription: 'signed up',
};

// ----- pure functions ---//

function categoriseResult(
	result: Result<string, BodyElement>,
): BodyResultCategory {
	if (result.isOk()) {
		if (result.value.kind !== ElementKind.Text) {
			return BodyResultCategory.nonText;
		}
		const { doc } = result.value;
		if (doc.textContent?.trim().length === 0) {
			return BodyResultCategory.whiteSpaceText;
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
					return BodyResultCategory.boldParagraphText;
				}
			}
			return BodyResultCategory.paragraphText;
		} else {
			return BodyResultCategory.nonParagraphText;
		}
	} else {
		return BodyResultCategory.error;
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
 * 	Rules Desired by editorial/Product:
 *   - Hide embeds in articles that are less than 300 words         (DO SERVER SIDE!)
 *	 - Prevent sign up form from appearing straight after bold text (done)
 *	 - Prevent sign up from from appearing under headings           (done)
 *	 - Prevent embeds from rendering in heavily formatted articles  (not done - needs clarification )
 *	 - Must have plain body text above and below                    (done)
 *
 * 	Rules to duplicat DCR behaviour:
 *   - Must be within 3 elements from the middle of the article
 *   - The best position is the last (furthest down) of the suitable positions
 * @param body an Item.Body
 * @returns the best index in that body to insert a sign-up block, or -1
 * if there is no suitable place
 */
function findInsertIndex(body: Body): number {
	// Item.Body can contain:
	//  - 'Error' Results as well as 'ok' Results
	//  -  Text BodyElements representing text node of whitespace between HTML element
	// These are not rendered/visibile, so are should be ignored
	// when deciding which elements to put the sign-up block between.

	// IE this is NOT a valid placement - visually, the SignUp appears
	// direcly below the Image even though there is a "Text" between them.
	//
	// [Text]
	// [Text]
	// [Image]
	// [Text](whitespace)
	// <-------------------- [SignUp]
	// [Text]

	// create a filtered copy of the body without whitespace and errors
	const contentOnlyBody = body.filter(
		(result) =>
			![
				BodyResultCategory.error,
				BodyResultCategory.whiteSpaceText,
			].includes(categoriseResult(result)),
	);

	const [minIndex, maxIndex] = getRange(contentOnlyBody.length);

	// Define the test for whether an index would be suitable to
	// insert the signup component into the filtered copy of the body
	function isASuitableIndex(index: number): boolean {
		if (index > maxIndex || index < minIndex) {
			return false;
		}
		const contentBefore = contentOnlyBody[index - 1];
		const contentAfter = contentOnlyBody[index];
		if (!contentBefore || !contentAfter) {
			return false;
		}

		return (
			[
				BodyResultCategory.paragraphText,
				BodyResultCategory.boldParagraphText,
			].includes(categoriseResult(contentAfter)) &&
			[BodyResultCategory.paragraphText].includes(
				categoriseResult(contentBefore),
			)
		);
	}

	// Map the filtered copy to boolean array:
	const suitabilityList = contentOnlyBody.map((_, index) =>
		isASuitableIndex(index),
	);

	// Find the best place in the contentOnly array:
	const bestIndexInContentOnlyBody = suitabilityList.lastIndexOf(true);

	// The body is not mutated by this function. The return value
	// needs to be the index in the original body array, not the
	// filtered body.

	// Find the corresponding index in the original body array:
	const bestIndexInOriginalBody = body.indexOf(
		contentOnlyBody[bestIndexInContentOnlyBody],
	);

	// logging - TO DO - remove when ready
	contentOnlyBody.forEach((result, index) => {
		if (index === bestIndexInContentOnlyBody) {
			console.log('[SIGN UP GOES HERE]');
		}
		console.log(
			`[${index}]`,
			isASuitableIndex(index),
			categoriseResult(result),
		);

		if (
			[
				BodyResultCategory.paragraphText,
				BodyResultCategory.boldParagraphText,
			].includes(categoriseResult(result))
		) {
			const doc =
				result.isOk() && result.value.kind === ElementKind.Text
					? result.value.doc
					: undefined;

			if (doc && doc.nodeType === 1) {
				const element = doc as Element;
				console.log(element.outerHTML);
			}
		}
	});
	console.log({
		bestIndexInContentOnlyBody,
		bestIndexInOriginalBody,
	});

	return bestIndexInOriginalBody;
}

// ----- Procedures ----- //

function buildBodyElement(item: Item): NewsletterSignUp | undefined {
	const newsletter =
		item.promotedNewsletter.kind === OptionKind.Some
			? item.promotedNewsletter.value
			: TEST_NEWSLETTER; // TO DO - change to undefined when done testing

	// if (!newsletter) {
	// 	return undefined;
	// }

	return {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
		theme: stringToPillar(newsletter.theme),
	};
}

function insertNewsletterIntoBody(
	item: Item & { body: Body },
	newsletterSignUp: NewsletterSignUp,
): Item {
	const insertIndex = findInsertIndex(item.body);
	if (insertIndex === -1) {
		logger.warn(
			`Unable to find suitable place for NewsletterSignUp: ${item.webUrl}`,
		);
		return item;
	}
	item.body = [
		...item.body.slice(0, insertIndex),
		Result.ok(newsletterSignUp),
		...item.body.slice(insertIndex),
	];
	return item;
}

function insertNewsletterIntoItem(item: Item): void {
	const newsletterSignUp = buildBodyElement(item);
	if (!newsletterSignUp) {
		return;
	}

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
		case ArticleDesign.Obituary:
			insertNewsletterIntoBody(item, newsletterSignUp);
			break;
		default:
			break;
	}
}

// ----- Exports ----- //
export { insertNewsletterIntoItem };
