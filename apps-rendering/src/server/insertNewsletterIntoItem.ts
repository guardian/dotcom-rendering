// ----- Imports ----- //

import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign } from '@guardian/libs';
import { OptionKind } from '@guardian/types';
import type { Body, NewsletterSignUp } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Item } from 'item';
import { Result } from 'result';
import { stringToPillar } from 'themeStyles';

// ----- Constants ----- //

const TEST_NEWSLETTER: Newsletter = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: 'opinion',
	successDescription: 'signed up',
};

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
	item.body.unshift(Result.ok(newsletterSignUp));
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
