import { Newsletter, Item } from 'item';
import { Option, Result, ResultKind } from '@guardian/types';
import { BodyElement, Text } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { ArticleDesign } from '@guardian/libs';
import { logger } from 'logger';
import { JSDOM } from 'jsdom';

// The DCR-enhanced capi response breaks out the TextElements
// into individual paragraphs, UL's, h2's etc, but in AR, they have the original
// CAPI structure where each continual block of html text is a
// single TextElement.

type TextElementDescription = {
	isError: false;
	kind: ElementKind.Text;
	paragraphs: number;
	text: Text;
};
type OtherElementDescription = {
	isError: false;
	paragraphs: 0;
	kind: Exclude<ElementKind, ElementKind.Text>;
};
type ErrorDescription = {
	isError: true;
	paragraphs: 0;
};

type BodyElementDescription =
	| TextElementDescription
	| OtherElementDescription
	| ErrorDescription;

const wrapInResult = (element: BodyElement): Result<string, BodyElement> => ({
	kind: ResultKind.Ok,
	value: element,
});

const getBodyDescription = (
	body: Array<Result<string, BodyElement>>,
): BodyElementDescription[] => {
	return body.map((_) => {
		if (_.kind === ResultKind.Err) {
			return {
				isError: true,
				paragraphs: 0,
			};
		}

		if (_.value.kind === ElementKind.Text) {
			const paragraphs = _.value.doc.childElementCount;
			return {
				isError: false,
				kind: _.value.kind,
				paragraphs,
				text: _.value,
			};
		}

		return {
			isError: false,
			kind: _.value.kind,
			paragraphs: 0,
		};
	});
};

const findWhereToInsert = (
	body: Array<Result<string, BodyElement>>,
	fraction = 1 / 2,
): {
	bodyResultIndex: number;
	bodyResultParagraphIndex: number;
	text: Text;
} | null => {
	const bodyDescription = getBodyDescription(body);
	const totalParagraphs = bodyDescription.reduce(
		(previous: number, current) => {
			return previous + (current?.paragraphs || 0);
		},
		0,
	);
	const targetPlace = Math.floor(totalParagraphs * fraction);

	let paragraphsFromPreviousElements = 0;
	for (let i = 0; i < bodyDescription.length; i++) {
		const current = bodyDescription[i];

		if (current.isError || current.kind !== ElementKind.Text) {
			continue;
		}

		if (paragraphsFromPreviousElements + current.paragraphs < targetPlace) {
			paragraphsFromPreviousElements += current.paragraphs;
			continue;
		}

		return {
			bodyResultIndex: i,
			bodyResultParagraphIndex:
				targetPlace - paragraphsFromPreviousElements,
			text: current.text,
		};
	}

	return null;
};

const splitTextElementAndInsertBetweenParts = (
	textElement: Text,
	elementToInsert: BodyElement,
	splitPoint = 1,
): [Text, BodyElement, Text] => {
	// uses a clone of the original doc to avoid mutations
	const childNodeArray = Array.from(
		textElement.doc.cloneNode(true).childNodes,
	);

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
	const insertPlace = findWhereToInsert(body);

	if (!insertPlace) {
		logger.warn(
			`Unable to find suitable place for NewsletterSignupBlockElement`,
			internalShortId,
		);
		return body;
	}

	const { bodyResultIndex, bodyResultParagraphIndex, text } = insertPlace;

	const textWithNewsletter = splitTextElementAndInsertBetweenParts(
		text,
		{
			kind: ElementKind.NewsletterSignUp,
			...newsletter,
		},
		bodyResultParagraphIndex || 1, // don't place at zero (before first paragraph)
	);

	return [
		...body.slice(0, bodyResultIndex),
		...textWithNewsletter.map(wrapInResult),
		...body.slice(bodyResultIndex),
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
