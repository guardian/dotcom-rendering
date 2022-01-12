// ----- Imports ----- //

import {
  culture,
  lifestyle,
  news,
  neutral,
  opinion,
  specialReport,
  sport,
  labs,
} from "@guardian/source-foundations";
import { ArticleDesign, ArticleDisplay, ArticleFormat, ArticlePillar, ArticleSpecial } from "@guardian/libs";

// ----- Types ----- //

type Colour = string;

interface Palette {
	text: {
		articleLink: Colour;
		byline: Colour;
		follow: Colour;
		headline: Colour;
		headlineDark: Colour;
		invertedByline: Colour;
		invertedFollow: Colour;
		invertedLink: Colour;
		keyEventsWhiteBackground: Colour;
		keyEventsGrayBackground: Colour;
		standfirst: Colour;
		standfirstDark: Colour;
		standfirstLink: Colour;
		seriesTitle: Colour;
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
		liveBlock: Colour;
		standfirstLink: Colour;
		standfirstLinkDark: Colour;
	};
  fill: {
	commentCount: Colour;
    icon: Colour;
    iconDark: Colour;
	blockquoteIcon: Colour;
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

const textByline = (format: ArticleFormat): Colour => {
	switch(format.design) {
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
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
			}
		case ArticleDesign.LiveBlog:
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
			}
		default:
			switch(format.theme) {
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
			}
	}
}

const textFollow = (format: ArticleFormat): Colour => {
	switch(format.theme) {
		case ArticlePillar.News:
				return news[400];
			case ArticlePillar.Lifestyle:
				return lifestyle[400];
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
	}
}

const textInvertedByline = (format: ArticleFormat): Colour => {
	switch(format.theme) {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
}

const textInvertedFollow = (format: ArticleFormat): Colour => {
	switch(format.theme) {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
}

const textInvertedLink = (format: ArticleFormat): Colour => {
	switch(format.theme) {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
}

const textArticleLink = (format: ArticleFormat): Colour => {
	switch(format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch(format.theme) {
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
					return specialReport[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
		default:
			switch(format.theme) {
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
					return specialReport[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
	}
}

const textKeyEventsWhiteBackground = ({theme}: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Culture:
			return culture[350];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
}

const textKeyEventsGrayBackground = ({theme} : ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
}

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

const textStandfirstLink = (format: ArticleFormat): Colour => {
	switch(format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.DeadBlog:
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
			}
		case ArticleDesign.Media:
			switch(format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
		default: {
			switch(format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
		}
	}
}

const textSeriesTitle = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
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
	}
}

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

const borderLiveBlock = (format: ArticleFormat): Colour => {
	switch(format.theme) {
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
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
}

const borderStandfirstLink = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[100];
	}
	if (format.theme === ArticleSpecial.SpecialReport) {
		return specialReport[400];
	}
	return neutral[86];
};

const borderStandfirstLinkDark = (format: ArticleFormat): Colour => {
	return neutral[46];
}

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
			return neutral[10];
	}
};

const fillCommentCount = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
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
	}
}

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

const fillBlockquoteIcon = (format: ArticleFormat): Colour => {
	switch(format.design) {
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
			}
	}


}

// ----- API ----- //

const text = {
	articleLink: textArticleLink,
	byline: textByline,
	follow: textFollow,
	headline: textHeadline,
	headlineDark: textHeadlineDark,
	invertedByline: textInvertedByline,
	invertedFollow: textInvertedFollow,
	invertedLink: textInvertedLink,
	keyEventsWhiteBackground: textKeyEventsWhiteBackground,
	keyEventsGrayBackground: textKeyEventsGrayBackground,
	standfirst: textStandfirst,
	standfirstDark: textStandfirstDark,
	standfirstLink: textStandfirstLink,
	seriesTitle: textSeriesTitle,
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
	liveBlock: borderLiveBlock,
	standfirstLink: borderStandfirstLink,
	standfirstLinkDark: borderStandfirstLinkDark,
};

const fill = {
  commentCount: fillCommentCount,
  icon: fillIcon,
  iconDark: fillIconDark,
  blockquoteIcon: fillBlockquoteIcon,
};

const palette = (format: ArticleFormat): Palette => ({
	text: {
		articleLink: text.articleLink(format),
		byline: text.byline(format),
		follow: text.follow(format),
		headline: text.headline(format),
		headlineDark: text.headlineDark(format),
		invertedByline: text.invertedByline(format),
		invertedFollow: text.invertedFollow(format),
		invertedLink: text.invertedLink(format),
		keyEventsWhiteBackground: text.keyEventsWhiteBackground(format),
		keyEventsGrayBackground: text.keyEventsGrayBackground(format),
		standfirst: text.standfirst(format),
		standfirstDark: text.standfirstDark(format),
		standfirstLink: text.standfirstLink(format),
		seriesTitle: text.seriesTitle(format),
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
		liveBlock: border.liveBlock(format),
		standfirstLink: border.standfirstLink(format),
		standfirstLinkDark: border.standfirstLinkDark(format),
	},
  fill: {
	commentCount: fill.commentCount(format),
    icon: fill.icon(format),
    iconDark: fill.iconDark(format),
	blockquoteIcon: fill.blockquoteIcon(format),
  }
});

// ----- Exports ----- //

export type { Colour };

export { text, background, border, fill, palette };
