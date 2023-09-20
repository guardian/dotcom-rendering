// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import {
	culture,
	labs,
	lifestyle,
	neutral,
	news,
	opinion,
	palette,
	specialReport,
	sport,
} from '@guardian/source-foundations';
import type { Colour } from './colour';

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

const bylineLink = (_format: ArticleFormat): Colour => {
	return neutral[46];
};

const bylineLinkDark = bylineLink;

const commentCount = (_format: ArticleFormat): Colour => {
	return 'rgba(255, 255, 255, 0.4)';
};

const commentCountDark = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const commentCountWide = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const commentCountWideDark = (_format: ArticleFormat): Colour => {
	return neutral[20];
};
const interactiveAtomLink = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const liveBlock = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const liveBlockDark = (format: ArticleFormat): Colour => {
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

const relatedCard = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const relatedCardDark = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const standfirstLink = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Picture
	) {
		return neutral[46];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[600];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[600];
		case ArticlePillar.Culture:
			return culture[600];
		case ArticlePillar.Opinion:
			return opinion[600];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[600];
	}
};

const standfirstBlogLink = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[100];
	}
	if (format.theme === ArticleSpecial.SpecialReport) {
		return specialReport[400];
	}
	return neutral[86];
};

const richLink = (format: ArticleFormat): Colour => {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const richLinkSvg = richLink;

const richLinkSvgDark = (format: ArticleFormat): Colour => {
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
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

/**
 * This is applied server-side. When the page loads, client-side JS applies a
 * class name that overrides this style.
 */
const richLinkPreload = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

/**
 * This is applied server-side. When the page loads, client-side JS applies a
 * class name that overrides this style.
 */
const richLinkSvgPreload = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

/**
 * This is applied server-side. When the page loads, client-side JS applies a
 * class name that overrides this style.
 */
const richLinkSvgPreloadDark = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

const richLinkDark = (format: ArticleFormat): Colour => {
	return neutral[60];
};

const standfirstLinkDark = (format: ArticleFormat): Colour => {
	return neutral[46];
};

const pagination = (format: ArticleFormat): Colour => {
	return neutral[86];
};

const pinnedPost = (format: ArticleFormat): string => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[300];
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
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};

const galleryImage = (_format: ArticleFormat): string => {
	return neutral[20];
};

const newsletterSignUpForm = (_format: ArticleFormat): string => {
	return neutral[0];
};

const newsletterSignUpFormDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const tableOfContents = (_format: ArticleFormat): string => {
	return neutral[86];
};

const tableOfContentsHover = (_format: ArticleFormat): string => {
	return neutral[20];
};

const tableOfContentsDark = (_format: ArticleFormat): string => {
	return neutral[20];
};

const tableOfContentsHoverDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const specialReportAltAtom = (_format: ArticleFormat): string => {
	return neutral[46];
};

const specialReportAltAtomDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const specialReportAltButton = (_format: ArticleFormat): string => {
	return palette.specialReportAlt[200];
};

const specialReportAltButtonDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

// ----- API ----- //

const border = {
	articleLink,
	articleLinkDark,
	bylineLink,
	bylineLinkDark,
	commentCount,
	commentCountDark,
	commentCountWide,
	commentCountWideDark,
	interactiveAtomLink,
	liveBlock,
	liveBlockDark,
	pagination,
	relatedCard,
	relatedCardDark,
	richLink,
	richLinkDark,
	richLinkPreload,
	richLinkSvg,
	richLinkSvgDark,
	richLinkSvgPreload,
	richLinkSvgPreloadDark,
	standfirstLink,
	standfirstBlogLink,
	standfirstLinkDark,
	pinnedPost,
	galleryImage,
	newsletterSignUpForm,
	newsletterSignUpFormDark,
	tableOfContents,
	tableOfContentsHover,
	tableOfContentsDark,
	tableOfContentsHoverDark,
	specialReportAltAtom,
	specialReportAltAtomDark,
	specialReportAltButton,
	specialReportAltButtonDark,
};

// ----- Exports ----- //

export { border };
