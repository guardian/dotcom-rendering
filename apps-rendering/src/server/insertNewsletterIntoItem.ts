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

	if (result.isOk() ) {
		if (result.value.kind !== ElementKind.Text) {
			return BodyResultCategory.nonText
		}
		if (result.value.doc.textContent?.trim().length === 0){
			return BodyResultCategory.whiteSpaceText
		}
		if (result.value.doc.nodeName === 'P') {
			return BodyResultCategory.paragraphText
		} else {
			return BodyResultCategory.nonParagraphText
		}
	} else {
		return BodyResultCategory.error
	}

}

function isNonEmptyText(result: BodyResult): boolean {
	if (result.isOk() && result.value.kind === ElementKind.Text) {
		const { textContent } = result.value.doc;
		return textContent ? textContent.trim().length > 0 : false;
	}
	return false;
}

function isWhiteSpace(result: BodyResult): boolean {
	if (result.isOk() && result.value.kind === ElementKind.Text) {
		const { textContent } = result.value.doc;
		return textContent ? textContent.trim().length === 0 : false;
	}
	return false;
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
 * 	Desired Rules:
 *   - Hide embeds in articles that are less than 300 words (DO SERVER SIDE!)
 *	 - Prevent sign up form from appearing straight after bold text
 *	 - Prevent sign up from from appearing under headings
 *	 - Prevent embeds from rendering in heavily formatted articles
 *	 - Must have plain body text above and below
 * @param body
 * @returns the index to insert at
 */
function findInsertIndex(body: Body): number {
	// Item.Body can contain 'Error' Results as well as 'ok' Results
	// these are not rendered, but cannot be excluded from the array
	// so need to be ignored for the purpose of choosing an index.

	// Item.Body models white space between HTML elements as Text BodyElements
	// These need to be ignore for the purpose of the placemenr rules
	// IE this is not a valid placement - the SignUp appears direcly below the
	// Image even though there is a "Text" between them.
	//
	// [Text]
	// [Text]
	// [Image]
	// [Text](whitespace)
	// <-------------------- [SignUp]
	// [Text]

	// note - the min and max should ignore whitespace
	// and error, but do not.
	const minIndex = 0;
	const maxIndex = body.length;

	function findPreviousOkThatIsNotWhiteSpace(
		index: number,
	): BodyResult | undefined {
		return body
			.slice(0, index)
			.reverse()
			.find((result) => result.isOk() && !isWhiteSpace(result));
	}

	function findNextOkThatIsNotWhiteSpace(
		index: number,
	): BodyResult | undefined {
		return body
			.slice(index)
			.find((result) => result.isOk() && !isWhiteSpace(result));
	}

	function isASuitableIndex(index: number): boolean {
		if (index > maxIndex || index < minIndex) {
			return false;
		}
		const contentBefore = findPreviousOkThatIsNotWhiteSpace(index);
		const contentAfter = findNextOkThatIsNotWhiteSpace(index);
		if (!contentBefore || !contentAfter) {
			return false;
		}
		return isNonEmptyText(contentAfter) && isNonEmptyText(contentBefore);
	}

	const suitabilityMap = body.map((_, index) => isASuitableIndex(index));

	body.forEach((result, index) => {
		console.log(
			`[${index}]`,
			isASuitableIndex(index),
			categoriseResult(result),
		);
	});

	const bestIndex = suitabilityMap.lastIndexOf(true);
	console.log({ bestIndex });
	return bestIndex;
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
