// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types/Format';
import { none, some } from '@guardian/types/option';
import type { Item, Review } from 'item';

// ----- Fixture ----- //

const fields = {
	theme: Pillar.News,
	display: Display.Standard,
	body: [],
	headline:
		'Reclaimed lakes and giant airports: how Mexico City might have looked',
	standfirst: none,
	byline: '',
	bylineHtml: none,
	publishDate: none,
	contributors: [],
	mainMedia: none,
	series: some({
		id: '',
		type: 0,
		webTitle: '',
		webUrl: '',
		apiUrl: '',
		references: [],
	}),
	commentable: false,
	tags: [],
	shouldHideReaderRevenue: false,
	branding: none,
	internalShortId: none,
	commentCount: none,
	relatedContent: none,
};

const article: Item = {
	design: Design.Article,
	...fields,
};

const analysis: Item = {
	design: Design.Analysis,
	...fields,
};

const feature: Item = {
	design: Design.Feature,
	...fields,
};

const review: Review = {
	design: Design.Review,
	starRating: 4,
	...fields,
};

const advertisementFeature: Item = {
	design: Design.AdvertisementFeature,
	logo: none,
	...fields,
};

const comment: Item = {
	design: Design.Comment,
	...fields,
};

// ----- Exports ----- //

export { article, analysis, feature, review, advertisementFeature, comment };
