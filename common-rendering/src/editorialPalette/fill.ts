// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleFormat,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	news,
	lifestyle,
	sport,
	culture,
	opinion,
	labs,
	specialReport,
	neutral,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const cameraCaptionIcon = (): Colour => neutral[46];
const cameraCaptionIconDark = (): Colour => neutral[60];

const editionsCameraIcon = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[800];
		case ArticlePillar.Sport:
			return sport[800];
		case ArticlePillar.Culture:
			return culture[800];
		case ArticlePillar.Lifestyle:
			return lifestyle[800];
		case ArticleSpecial.SpecialReport:
			return specialReport[800];
		case ArticleSpecial.Labs:
			return specialReport[800];
		case ArticlePillar.News:
		default:
			return news[800];
	}
};

const commentCount = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[86];
	}

	if (format.design === ArticleDesign.DeadBlog) {
		return neutral[46];
	}

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
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};
const commentCountDark = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return neutral[60];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const commentCountWide = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return neutral[46];
	}

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
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const icon = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticlePillar.News:
		default:
			return news[400];
	}
};

const iconDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticlePillar.News:
		default:
			return news[500];
	}
};

const blockquoteIcon = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[350];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
	}
};

const blockquoteIconDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog:
			return neutral[60];
		default:
			return blockquoteIcon(format);
	}
};

const richLink = (_format: ArticleFormat): Colour => {
	return neutral[100];
};

const richLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

/**
 *  This is applied server-side. When the page loads, client-side JS applies a class name that overrides this style.
 */
const richLinkSvgPreload = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

/**
 *  This is applied server-side. When the page loads, client-side JS applies a class name that overrides this style.
 */
const richLinkSvgPreloadDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const lines = (_format: ArticleFormat): Colour => neutral[86];

const linesDark = (_format: ArticleFormat): Colour => neutral[20];

const newsletterSignUpFormButton = (_format: ArticleFormat): Colour => neutral[7];

const newsletterSignUpFormButtonDark = (_format: ArticleFormat): Colour => neutral[86];

// ----- API ----- //

const fill = {
	cameraCaptionIcon,
	cameraCaptionIconDark,
	editionsCameraIcon,
	commentCount,
	commentCountDark,
	commentCountWide,
	icon,
	iconDark,
	blockquoteIcon,
	blockquoteIconDark,
	lines,
	linesDark,
	richLink,
	richLinkDark,
	richLinkSvgPreload,
	richLinkSvgPreloadDark,
	newsletterSignUpFormButton,
	newsletterSignUpFormButtonDark,
};

// ----- Exports ----- //

export { fill };
