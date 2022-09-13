// ----- Imports ----- //

import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign } from '@guardian/libs';
import { OptionKind } from '@guardian/types';
import type { Body, BodyElement, NewsletterSignUp } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Item } from 'item';
import { Result } from 'result';
import { stringToPillar } from 'themeStyles';

// ----- type ----- //
type BodyResult = Result<string, BodyElement>;

// ----- Constants ----- //

const enum BodyResultCategory {
	'paragraphText' = 'PARAGRAPH',
	'whiteSpaceText' = 'WHITE SPACE',
	'nonParagraphText' = 'OTHER TEXT ELEMENT',
	'nonText' = 'NON TEXT',
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

function categoriseResult(result: BodyResult): BodyResultCategory {
	if (result.isOk()) {
		if (result.value.kind !== ElementKind.Text) {
			return BodyResultCategory.nonText;
		}
		if (result.value.doc.textContent?.trim().length === 0) {
			return BodyResultCategory.whiteSpaceText;
		}
		if (result.value.doc.nodeName === 'P') {
			return BodyResultCategory.paragraphText;
		} else {
			return BodyResultCategory.nonParagraphText;
		}
	} else {
		return BodyResultCategory.error;
	}
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

/**
 * 	Rules Desired by editorial/Product:
 *   - Hide embeds in articles that are less than 300 words         (DO SERVER SIDE!)
 *	 - Prevent sign up form from appearing straight after bold text (not done)
 *	 - Prevent sign up from from appearing under headings           (done)
 *	 - Prevent embeds from rendering in heavily formatted articles  (not done - needs clarification )
 *	 - Must have plain body text above and below                    (done)
 *
 * 	Rules assumed for development purposes:
 *   - Must be at least 4 elements after the start of the article
 *   - Must be at least 2 element before the end of the article
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

	const minIndex = 4;
	const maxIndex = contentOnlyBody.length - 2;

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
			categoriseResult(contentAfter) ===
				BodyResultCategory.paragraphText &&
			categoriseResult(contentBefore) === BodyResultCategory.paragraphText
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
	});
	console.log({
		method: 'new',
		bestIndexInContentOnlyBody,
		bestIndexInOriginalBody,
	});

	return bestIndexInOriginalBody;
}

function insertNewsletterIntoBody(
	item: Item & { body: Body },
	newsletterSignUp: NewsletterSignUp,
): Item {
	const insertIndex = findInsertIndex(item.body);
	if (insertIndex === -1) {
		return item;
	}
	item.body = [
		...item.body.slice(0, insertIndex),
		Result.ok(newsletterSignUp) as BodyResult,
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
