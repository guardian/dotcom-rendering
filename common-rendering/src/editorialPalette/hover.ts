// ----- Imports ----- //

import { ArticleFormat, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import {
	news,
	neutral,
	lifestyle,
	sport,
	culture,
	opinion,
	labs,
	specialReport,
	palette,
} from '@guardian/source-foundations';
import { Colour } from '.';

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
			return palette.specialReportAlt[100];
	}
};

const newsletterSignUpFormButton = (_format: ArticleFormat): Colour =>
	neutral[7];
const newsletterSignUpFormButtonDark = (_format: ArticleFormat): Colour =>
	neutral[86];

// ----- API ----- //

const hover = {
	pagination,
	newsletterSignUpFormButton,
	newsletterSignUpFormButtonDark,
};

// ----- Exports ----- //

export { hover };
