// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	background as coreBackground,
	text as coreText,
	culture,
	lifestyle,
	neutral,
	news,
	opinion,
	sport,
} from '@guardian/src-foundations/palette';

// ----- Types ----- //

type Colour = string;

interface Palette {
	text: {
		headlinePrimary: Colour;
		headlinePrimaryInverse: Colour;
		standfirstPrimary: Colour;
		standfirstPrimaryInverse: Colour;
	};
	background: {
		headlinePrimary: Colour;
		headlinePrimaryInverse: Colour;
		standfirstPrimary: Colour;
		standfirstPrimaryInverse: Colour;
	};
	border: {
		primary: Colour;
		primaryInverse: Colour;
	};
}

// ----- Functions ----- //

const textHeadlinePrimary = (format: ArticleFormat): Colour => {
	if (
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Media) {
		return neutral[100];
	}

	if (format.design === ArticleDesign.LiveBlog) {
		return format.theme === ArticlePillar.Culture ? neutral[86] : neutral[93];
	}

	if (format.design === ArticleDesign.DeadBlog) {
		return neutral[7];
	}

	if (
		format.design === ArticleDesign.Feature ||
		format.design === ArticleDesign.Review
	) {
		switch (format.theme) {
			case ArticlePillar.Opinion:
				return opinion[300];
			case ArticlePillar.Sport:
				return sport[300];
			case ArticlePillar.Culture:
				return culture[300];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			default:
				return news[300];
		}
	}

	return coreText.primary;
};

const textHeadlinePrimaryInverse = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return neutral[93];
	}

	return neutral[86];
};

const textStandfirstPrimary = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.Media:
			return neutral[86];
		default:
			return neutral[7];
	}
}

const textStandfirstPrimaryInverse = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[60];
	}
}

const backgroundHeadlinePrimary = (format: ArticleFormat): Colour => {
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
		return coreBackground.inverse;
	}

	return coreBackground.primary;
};

const backgroundHeadlinePrimaryInverse = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
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
	return coreBackground.inverse;
};

const borderPrimary = (format: ArticleFormat): Colour => {
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

const borderPrimaryInverse = borderPrimary;

const backgroundStandfirstPrimary = ({ design, theme }: ArticleFormat): Colour => {
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

	return neutral[100];
}

const backgroundStandfirstPrimaryInverse = ({ design, theme }: ArticleFormat): Colour => {
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
			return neutral[7];
	}
}

// ----- API ----- //

const text = {
	headlinePrimary: textHeadlinePrimary,
	headlinePrimaryInverse: textHeadlinePrimaryInverse,
	standfirstPrimary: textStandfirstPrimary,
	standfirstPrimaryInverse: textStandfirstPrimaryInverse,
};

const background = {
	headlinePrimary: backgroundHeadlinePrimary,
	headlinePrimaryInverse: backgroundHeadlinePrimaryInverse,
	standfirstPrimary: backgroundStandfirstPrimary,
	standfirstPrimaryInverse: backgroundStandfirstPrimaryInverse,
};

const border = {
	primary: borderPrimary,
	primaryInverse: borderPrimaryInverse,
};

const palette = (format: ArticleFormat): Palette => ({
	text: {
		headlinePrimary: text.headlinePrimary(format),
		headlinePrimaryInverse: text.headlinePrimaryInverse(format),
		standfirstPrimary: text.standfirstPrimary(format),
		standfirstPrimaryInverse: text.standfirstPrimaryInverse(format),
	},
	background: {
		headlinePrimary: background.headlinePrimary(format),
		headlinePrimaryInverse: background.headlinePrimaryInverse(format),
		standfirstPrimary: background.standfirstPrimary(format),
		standfirstPrimaryInverse: backgroundStandfirstPrimaryInverse(format),
	},
	border: {
		primary: border.primary(format),
		primaryInverse: border.primaryInverse(format),
	},
});

// ----- Exports ----- //

export { Colour, text, background, border, palette };
