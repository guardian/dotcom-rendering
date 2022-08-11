import { Newsletter, Item } from 'item';
import { Option, Result, ResultKind } from '@guardian/types';
import { BodyElement, NewsletterSignUp, Text } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { ArticleDesign } from '@guardian/libs';
import { logger } from 'logger';
import { JSDOM } from 'jsdom';

// The DCR-enhanced capi response breaks out the TextElements
// into individual paragraphs, but in AR, they have the original
// CAPI structure where each continual block of html text is a
// single TextElement.

const wrapInResult = (element: BodyElement): Result<string, BodyElement> => ({
	kind: ResultKind.Ok,
	value: element,
});

const isTextResult = (_: Result<string, BodyElement>): boolean =>
	_.kind === ResultKind.Ok && _.value.kind === ElementKind.Text;

const splitTextElementAndInsertBetweenParts = (
	textElement: Text,
	elementToInsert: BodyElement,
	fraction = 1 / 2,
): [Text, BodyElement, Text] => {
	// uses a clone of the original doc to avoid mutations
	const childNodeArray = Array.from(textElement.doc.cloneNode(true).childNodes);
	const splitPoint = childNodeArray.length * fraction;

	const newDocs: [DocumentFragment, DocumentFragment] = [
		JSDOM.fragment(''),
		JSDOM.fragment(''),
	];

	childNodeArray.slice(0, Math.floor(splitPoint)).forEach((element) => {
		newDocs[0].appendChild(element);
	});

	childNodeArray.slice(Math.floor(splitPoint)).forEach((element) => {
		newDocs[1].appendChild(element);
	});

	return [
		{
			kind: ElementKind.Text,
			doc: newDocs[0],
		},
		elementToInsert,
		{
			kind: ElementKind.Text,
			doc: newDocs[1],
		},
	];
};

const tryToinsertNewsletterIntoStandard = (
	body: Array<Result<string, BodyElement>>,
	newsletter: Newsletter,
	internalShortId: Option<string>,
): Array<Result<string, BodyElement>> => {
	const textElementResults = body.filter(isTextResult) as {
		kind: ResultKind.Ok;
		value: Text;
	}[];

	if (textElementResults.length === 0) {
		logger.warn(
			`Unable to find suitable place for NewsletterSignupBlockElement`,
			internalShortId,
		);
		return body;
	}

	const indexOfFirstTextResult = body.findIndex(isTextResult);

	const newsletterElement: NewsletterSignUp = {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
	};
	const textWithNewsletter = splitTextElementAndInsertBetweenParts(
		textElementResults[0].value,
		newsletterElement,
		6 / 10,
	);

	return [
		...body.slice(0, indexOfFirstTextResult),
		...textWithNewsletter.map(wrapInResult),
		...body.slice(indexOfFirstTextResult),
	];
};

export const insertNewsletterIntoItem = (
	item: Item,
	promotedNewsletter?: Newsletter,
): Item => {
	if (!promotedNewsletter) {
		return item;
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
			item.body = tryToinsertNewsletterIntoStandard(
				item.body,
				promotedNewsletter,
				item.internalShortId,
			);
			break;
	}

	return item;
};
