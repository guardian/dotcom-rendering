import { Newsletter, Item } from 'item';
import { Option, Result, ResultKind } from '@guardian/types';
import { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { ArticleDesign } from '@guardian/libs';
import { logger } from 'logger';

	// PROBLEM
	// in AR, sets of paragraphs are combined into one Text BodyElement
	// may need to call this function BEFORE the content.blocks.elements
	// are combined into an Item :(

const findInsertPosition = (
	body: Result<string, BodyElement>[],
): number | null => {

	return 1;
};

const tryToinsertNewsletterIntoStandard = (
	body: Array<Result<string, BodyElement>>,
	newsletter: Newsletter,
	internalShortId: Option<string>,
): Array<Result<string, BodyElement>> => {
	const insertPosition = findInsertPosition(body);

	if (insertPosition === null) {
		logger.warn(
			`Unable to find suitable place for NewsletterSignupBlockElement`,
			internalShortId,
		);
		return body;
	}

	const resultToInsert: Result<string, BodyElement> = {
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.NewsletterSignUp,
			...newsletter,
		},
	};

	return [
		...body.slice(0, insertPosition),
		resultToInsert,
		...body.slice(insertPosition),
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
