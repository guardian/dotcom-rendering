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
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const signUpFormButton = (_format: ArticleFormat): Colour => neutral[7];
const signUpFormButtonDark = (_format: ArticleFormat): Colour => neutral[86];

// ----- API ----- //

const hover = {
	pagination,
	signUpFormButton,
	signUpFormButtonDark,
};

// ----- Exports ----- //

export { hover };
