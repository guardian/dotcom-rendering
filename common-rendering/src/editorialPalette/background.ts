// ----- Imports ----- //

import {
	ArticleFormat,
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	neutral,
	culture,
	sport,
	lifestyle,
	opinion,
	news,
	specialReport,
	labs,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const headline = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[7];
	} else if (format.design === ArticleDesign.DeadBlog) {
		return neutral[97];
	} else if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return culture[300];
			case ArticlePillar.Sport:
				return sport[300];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			case ArticlePillar.Opinion:
				return opinion[300];
			case ArticlePillar.News:
				return news[300];
			default:
				return news[300];
		}
	} else if (
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Letter ||
		format.design === ArticleDesign.Editorial
	) {
		return opinion[800];
	} else if (format.design === ArticleDesign.Media) {
		return neutral[10];
	}

	return neutral[100];
};

const headlineDark = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.DeadBlog) {
		return neutral[7];
	} else if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return culture[200];
			case ArticlePillar.Sport:
				return sport[200];
			case ArticlePillar.Lifestyle:
				return lifestyle[200];
			case ArticlePillar.Opinion:
				return opinion[200];
			case ArticlePillar.News:
				return news[200];
			default:
				return news[200];
		}
	}
	return neutral[10];
};

const standfirst = ({ design, theme }: ArticleFormat): Colour => {
	if (design === ArticleDesign.DeadBlog) {
		return neutral[93];
	}

	if (design === ArticleDesign.LiveBlog) {
		switch (theme) {
			case ArticlePillar.Opinion:
				return opinion[200];
			case ArticlePillar.Sport:
				return sport[100];
			case ArticlePillar.Culture:
				return culture[200];
			case ArticlePillar.Lifestyle:
				return lifestyle[200];
			case ArticlePillar.News:
			default:
				return news[200];
		}
	}

	if (design === ArticleDesign.Comment) {
		return opinion[800];
	}

	return neutral[100];
};

const standfirstDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[10];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case ArticlePillar.Opinion:
					return opinion[100];
				case ArticlePillar.Sport:
					return sport[100];
				case ArticlePillar.Culture:
					return culture[100];
				case ArticlePillar.Lifestyle:
					return lifestyle[100];
				case ArticlePillar.News:
				default:
					return news[100];
			}
		default:
			return neutral[10];
	}
};

const bulletDark = (
	{ design, theme }: ArticleFormat,
	returnPillarColour: boolean,
): Colour => {
	if (returnPillarColour) {
		switch (design) {
			case ArticleDesign.DeadBlog:
				return neutral[46];
			case ArticleDesign.LiveBlog:
				switch (theme) {
					case ArticlePillar.Opinion:
						return opinion[550];
					case ArticlePillar.Sport:
						return sport[500];
					case ArticlePillar.Culture:
						return culture[500];
					case ArticlePillar.Lifestyle:
						return lifestyle[500];
					case ArticlePillar.News:
						return news[550];
					default:
						return neutral[46];
				}
			default:
				return neutral[46];
		}
	}

	return neutral[46];
};

const articleContentDark = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[7];
		case ArticleDesign.LiveBlog:
			return neutral[0];
		default:
			return neutral[10];
	}
};

const avatar = (format: ArticleFormat): string => {
	switch (format.theme) {
		case ArticleSpecial.SpecialReport:
			return specialReport[800];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.News:
			return news[500];
	}
};
const keyEvents = (_format: ArticleFormat): Colour => neutral[100];

const keyEventsWide = (_format: ArticleFormat): Colour => neutral[97];

const keyEventsDark = (_format: ArticleFormat): Colour => neutral[10];

const keyEventsWideDark = articleContentDark;

const headlineTag = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.News:
			return news[300];
	}
}

// ----- API ----- //

const background = {
	avatar,
	headline,
	headlineDark,
	headlineTag,
	keyEvents,
	keyEventsWide,
	keyEventsDark,
	keyEventsWideDark,
	standfirst,
	standfirstDark,
	articleContentDark,
	bulletDark,
};

// ----- Exports ----- //

export { background };
