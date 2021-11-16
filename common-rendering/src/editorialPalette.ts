// ----- Imports ----- //

import {
	culture,
	lifestyle,
	news,
	opinion,
	specialReport,
	sport,
} from "@guardian/source-foundations";
import type { ArticleFormat } from "@guardian/libs";
import { ArticlePillar, ArticleSpecial } from "@guardian/libs";

// ----- Types ----- //

type Colour = string;

// ----- Functions ----- //

const fillIconPrimary = (format: ArticleFormat): Colour => {
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

const fillIconPrimaryInverse = (format: ArticleFormat): Colour => {
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

// ----- API ----- //

const fill = {
	iconPrimary: fillIconPrimary,
	iconPrimaryInverse: fillIconPrimaryInverse,
};

// ----- Exports ----- //

export { fill };
