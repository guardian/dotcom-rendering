// ----- Imports ----- //

import {
  culture,
  lifestyle,
  neutral,
  news,
  opinion,
  specialReport,
  sport,
} from "@guardian/src-foundations/palette";
import { ArticleDesign, ArticleDisplay, ArticleFormat, ArticlePillar, ArticleSpecial } from "@guardian/libs";

// ----- Types ----- //

type Colour = string;

interface Palette {
	text: {
		headline: Colour;
		headlineDark: Colour;
		standfirst: Colour;
		standfirstDark: Colour;
	};
	background: {
		headline: Colour;
		headlineDark: Colour;
		standfirst: Colour;
		standfirstDark: Colour;
	};
	border: {
		articleLink: Colour;
		articleLinkDark: Colour;
	};
  fill: {
    icon: Colour;
    iconDark: Colour;
  }
}

// ----- Functions ----- //

const textHeadline = (format: ArticleFormat): Colour => {
	if (
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Media ||
		format.design === ArticleDesign.LiveBlog
	) {
		return neutral[100];
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

	return neutral[7];
};

const textHeadlineDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return format.theme === ArticlePillar.Culture
				? neutral[86]
				: neutral[93];
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[86];
	}
};

const textStandfirst = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.Media:
			return neutral[86];
		default:
			return neutral[7];
	}
};

const textStandfirstDark = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[60];
	}
};

const backgroundHeadline = (format: ArticleFormat): Colour => {
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

const backgroundHeadlineDark = (format: ArticleFormat): Colour => {
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
	return neutral[10];
};

const borderArticleLink = (format: ArticleFormat): Colour => {
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

const borderArticleLinkDark = borderArticleLink;

const backgroundStandfirst = ({
	design,
	theme,
}: ArticleFormat): Colour => {
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
};

const backgroundStandfirstDark = ({
	design,
	theme,
}: ArticleFormat): Colour => {
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
};

const fillIcon = (format: ArticleFormat): Colour => {
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

const fillIconDark = (format: ArticleFormat): Colour => {
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

const text = {
	headline: textHeadline,
	headlineDark: textHeadlineDark,
	standfirst: textStandfirst,
	standfirstDark: textStandfirstDark,
};

const background = {
	headline: backgroundHeadline,
	headlineDark: backgroundHeadlineDark,
	standfirst: backgroundStandfirst,
	standfirstDark: backgroundStandfirstDark,
};

const border = {
	articleLink: borderArticleLink,
	articleLinkDark: borderArticleLinkDark,
};

const fill = {
  icon: fillIcon,
  iconDark: fillIconDark,
};

const palette = (format: ArticleFormat): Palette => ({
	text: {
		headline: text.headline(format),
		headlineDark: text.headlineDark(format),
		standfirst: text.standfirst(format),
		standfirstDark: text.standfirstDark(format),
	},
	background: {
		headline: background.headline(format),
		headlineDark: background.headlineDark(format),
		standfirst: background.standfirst(format),
		standfirstDark: backgroundStandfirstDark(format),
	},
	border: {
		articleLink: border.articleLink(format),
		articleLinkDark: border.articleLinkDark(format),
	},
  fill: {
    icon: fill.icon(format),
    iconDark: fill.iconDark(format),
  }
});

// ----- Exports ----- //

export type { Colour };

export { text, background, border, fill, palette };
