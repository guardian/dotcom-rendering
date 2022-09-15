// ----- Imports ----- //

import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign } from '@guardian/libs';
import { OptionKind } from '@guardian/types';
import { getAdIndices } from 'ads';
import type { Body, BodyElement, NewsletterSignUp } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Item } from 'item';
import { logger } from 'logger';
import { Result } from 'result';
import { stringToPillar } from 'themeStyles';

// ----- Constants ----- //

const enum ElementCategory {
	'ParagraphText' = 'PARAGRAPH',
	'BoldParagraphText' = 'BOLD_PARAGRAPH',
	'NonParagraphText' = 'OTHER TEXT ELEMENT',
	'Heading' = 'HEADING',
	'NonText' = 'NON TEXT',
	'WhiteSpace' = 'WHITE SPACE',
	'Error' = 'error',
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

const DEBUG = {
	log: true,
	logContent: false,
};

// ----- pure functions ---//

function categoriseResult(
	result: Result<string, BodyElement>,
): ElementCategory {
	if (result.isOk()) {
		if (
			result.value.kind === ElementKind.HeadingThree ||
			result.value.kind === ElementKind.HeadingTwo
		) {
			return ElementCategory.Heading;
		}
		if (result.value.kind !== ElementKind.Text) {
			return ElementCategory.NonText;
		}
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
	} else {
		return ElementCategory.Error;
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
 * Predict the indices of bodyElement that would
 * have an ad slot inserted before them on the current
 * ad placement logic.
 *
 * This logic is not perfect as the ad placement logic
 * insert after the bodyElement have been renderer by
 * counting paragraph elements in ReactNodes, whereas here
 * we are looking at bodyElement before they are have been
 * rendered.
 *
 * @param contentOnlyBody an subset of an article Body, with the
 * non-rendered elements (errors and whitespace) removed.
 * @returns the indices of the elements that are expected to
 * have an adslot placed before them.
 */
function predictIndicesOfParagraphsAfterAdslots(
	contentOnlyBody: Body,
): number[] {
	const indicesOfParagraphs = contentOnlyBody
		.filter((result) =>
			[
				ElementCategory.ParagraphText,
				ElementCategory.NonParagraphText,
				ElementCategory.BoldParagraphText,
			].includes(categoriseResult(result)),
		)
		.map((result) => contentOnlyBody.indexOf(result));

	return getAdIndices()
		.filter((index) => index < indicesOfParagraphs.length)
		.map((index) => indicesOfParagraphs[index]);
}

/**
 * 	Rules Desired by editorial/Product:
 *   - Hide embeds in articles that are less than 300 words         (DO SERVER SIDE!)
 *	 - Prevent sign up form from appearing straight after bold text (done)
 *	 - Prevent sign up from from appearing under headings           (done)
 *	 - Prevent embeds from rendering in heavily formatted articles  (needs clarification)
 *	 - Must have plain body text above and below                    (done)
 *
 * 	Rules to duplicat DCR behaviour:
 *   - Must be within 3 elements from the middle of the article
 *   - The best position is the last (furthest down) of the suitable positions
 *
 * 	The body is not mutated by this function.
 *
 * @param body an Item.Body
 * @returns the best index in that body to insert a sign-up block, or -1
 * if there is no suitable place
 */
function findInsertIndex(body: Body): number {
	// create a filtered copy of the body without:
	//  - 'Error' Results as well as 'ok' Results
	//  -  Text BodyElements representing text node of whitespace between HTML element
	// These are not rendered/visibile, so are should be ignored
	// when deciding which elements to put the sign-up block between.
	const contentOnlyBody = body.filter(
		(result) =>
			![ElementCategory.Error, ElementCategory.WhiteSpace].includes(
				categoriseResult(result),
			),
	);

	const paragraphsAfterAnAdslot =
		predictIndicesOfParagraphsAfterAdslots(contentOnlyBody);
	const [minIndex, maxIndex] = getRange(contentOnlyBody.length);

	function isSuitable(index: number): boolean {
		// RULE: must be within range and not next to an adslot
		if (
			index > maxIndex ||
			index < minIndex ||
			paragraphsAfterAnAdslot.includes(index)
		) {
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

		// RULE: Must be have a plain paragraph before it and a
		// plain or bold paragraph after it.
		return (
			[ElementCategory.ParagraphText].includes(
				categoriseResult(contentBefore),
			) &&
			[
				ElementCategory.ParagraphText,
				ElementCategory.BoldParagraphText,
			].includes(categoriseResult(contentAfter))
		);
	}

	// Map the filtered copy to boolean array:
	const suitabilityList = contentOnlyBody.map((_, index) =>
		isSuitable(index),
	);

	// Find the best place in the contentOnly array:
	// RULE: the best place is the last suitable place
	const bestIndexInContentOnlyBody = suitabilityList.lastIndexOf(true);

	// Find the corresponding index in the original body array:
	const bestIndexInOriginalBody = body.indexOf(
		contentOnlyBody[bestIndexInContentOnlyBody],
	);

	if (DEBUG.log) {
		debugLoggingForFindIndex(
			bestIndexInContentOnlyBody,
			bestIndexInOriginalBody,
			contentOnlyBody,
			suitabilityList,
			paragraphsAfterAnAdslot,
		);
	}

	return bestIndexInOriginalBody;
}

// ----- Procedures ----- //

function debugLoggingForFindIndex(
	bestIndexInContentOnlyBody: number,
	bestIndexInOriginalBody: number,
	contentOnlyBody: Body,
	suitabilityList: boolean[],
	paragraphsAfterAnAdslot: number[],
): void {
	contentOnlyBody.forEach((result, index) => {
		if (paragraphsAfterAnAdslot.includes(index)) {
			console.log('\n*** ADSLOT before paragaph ***\n');
			// on the actual render, the find ad slot script count the
			// 3x paragraphs in the sign-up block when placing the ads
			// so this logging wont be accurate after bestIndexInContentOnlyBody
		}
		if (index === bestIndexInContentOnlyBody) {
			console.log('\n[SIGN UP GOES HERE]\n');
		}
		console.log(
			`[${index}]`,
			suitabilityList[index],
			categoriseResult(result),
		);

		if (DEBUG.logContent) {
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
		paragraphsAfterAnAdslot,
	});
}

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
