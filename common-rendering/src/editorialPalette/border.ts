// ----- Imports ----- //

import {
	ArticleFormat,
	ArticlePillar,
	ArticleSpecial,
	ArticleDesign,
} from '@guardian/libs';
import {
	opinion,
	sport,
	culture,
	lifestyle,
	news,
	labs,
	specialReport,
	neutral,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const articleLink = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.News:
		default:
			return news[400];
	}
};

const articleLinkDark = articleLink;

const liveBlock = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const standfirstLink = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[100];
	}
	if (format.theme === ArticleSpecial.SpecialReport) {
		return specialReport[400];
	}
	return neutral[86];
};

const standfirstLinkDark = (format: ArticleFormat): Colour => {
	return neutral[46];
};

const pagination = (format: ArticleFormat): Colour => {
	return neutral[86];
};

// ----- API ----- //

const border = {
	articleLink,
	articleLinkDark,
	liveBlock,
	standfirstLink,
	standfirstLinkDark,
	pagination,
};

// ----- Exports ----- //

export { border };
