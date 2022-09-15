// ----- Imports ----- //
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
	'Error' = 'ERROR',
}

const DEBUG = {
	log: false,
	logContent: false,
};

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
			].includes(categoriseElement(result)),
		)
		.map((result) => contentOnlyBody.indexOf(result));

	return getAdIndices()
		.filter((index) => index < indicesOfParagraphs.length)
		.map((index) => indicesOfParagraphs[index]);
}

/**
 *  Find the place to insert a insert a sign-up block in to an article body,
 *  using these rules:
 *	 - Don't put straight after bold text
 *	 - Don't put under headings
 *	 - Must have plain body text above and below
 *   - Must be within 3 elements from the middle of the article
 *   - Should not be next to a adSlot
 *   - The best place is the last place meeting the criteria above.
 *
 * @param body an Item.Body
 * @returns the best index in that body to insert a sign-up block, or -1
 * if there is no suitable place
 */
function findInsertIndex(body: Body): number {
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
	const paragraphsAfterAnAdslot =
		predictIndicesOfParagraphsAfterAdslots(contentOnlyBody);

	function isSuitable(index: number): boolean {
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
			categoriseElement(result),
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
	if (item.promotedNewsletter.kind === OptionKind.None) {
		return undefined;
	}
	const { value: newsletter } = item.promotedNewsletter;
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
