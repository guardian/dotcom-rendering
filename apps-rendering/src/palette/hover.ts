// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
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
} from '@guardian/source/foundations';
import type { Colour } from './colour';

// ----- Functions ----- //

const pagination = (format: ArticleFormat): Colour => {
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
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const newsletterSignUpFormButton = (_format: ArticleFormat): Colour =>
	neutral[7];
const newsletterSignUpFormButtonDark = (_format: ArticleFormat): Colour =>
	neutral[86];

const specialReportAltButton = (_format: ArticleFormat): Colour =>
	palette.specialReportAlt[100];

const specialReportAltButtonDark = (_format: ArticleFormat): Colour =>
	neutral[20];

// ----- API ----- //

const hover = {
	pagination,
	newsletterSignUpFormButton,
	newsletterSignUpFormButtonDark,
	specialReportAltButton,
	specialReportAltButtonDark,
};

// ----- Exports ----- //

export { hover };
