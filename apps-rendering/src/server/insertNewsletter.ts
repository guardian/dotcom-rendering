import { Newsletter, Item } from 'item';
import { Result, ResultKind } from '@guardian/types';
import { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { ArticleDesign } from '@guardian/libs';


const insertNewsletterIntoStandard = (
	body: Array<Result<string, BodyElement>>,
	newsletter: Newsletter,
): Array<Result<string, BodyElement>> => {
	const element: BodyElement = {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
	};

	body.unshift({
		kind: ResultKind.Ok,
		value: element,
	});
	return body;
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
			item.body = insertNewsletterIntoStandard(
				item.body,
				promotedNewsletter,
			);
			break;
	}

	return item;
};


