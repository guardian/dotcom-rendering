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
	opinion,
	sport,
	culture,
	lifestyle,
	news,
	labs,
	specialReport,
	brandAlt,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const adLabel = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const adLabelDark = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

const adSlot = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const mediaArticleBody = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const mediaArticleBodyLinkDark = (format: ArticleFormat): Colour => {
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
	}
};

const branding = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const brandingDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const byline = (_format: ArticleFormat): Colour => {
	return neutral[46];
};

const bylineAnchor = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[300];
			case ArticlePillar.Culture:
				return culture[300];
			case ArticlePillar.Opinion:
				return opinion[300];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			case ArticleSpecial.Labs:
				return labs[300];
			case ArticleSpecial.SpecialReport:
				return brandAlt[300];
			case ArticlePillar.News:
			default:
				return news[300];
		}
	}
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
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
};

const bylineAnchorDark = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[500];
			case ArticlePillar.Culture:
				return culture[500];
			case ArticlePillar.Opinion:
				return opinion[500];
			case ArticlePillar.Lifestyle:
				return lifestyle[500];
			case ArticlePillar.News:
			default:
				return news[500];
		}
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
	}
};

const calloutFormAnchor = (format: ArticleFormat): Colour => {
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
};

const calloutSpeechBubble = (_format: ArticleFormat): Colour => {
	return neutral[100];
};

const commentCount = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[93];
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
	}
};

const commentCountWide = (_format: ArticleFormat): Colour => {
	return neutral[46];
};

const dropCap = (format: ArticleFormat): Colour => {
	switch (format.theme) {
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
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const dropCapDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.News:
			return news[500];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const headline = (format: ArticleFormat): Colour => {
	if (
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video ||
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

	if (format.design === ArticleDesign.Interview) {
		return neutral[100];
	}

	return neutral[7];
};

const headlineDark = (format: ArticleFormat): Colour => {
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

const bylineLeftColumn = (format: ArticleFormat): Colour => {
	switch (format.design) {
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
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
	}
};

const bylineLeftColumnDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.DeadBlog:
		default:
			return neutral[86];
	}
};
const bylineInline = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.DeadBlog:
		default:
			switch (format.theme) {
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
				case ArticlePillar.News:
				default:
					return news[400];
			}
	}
};

const bylineInlineDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.DeadBlog:
		default:
			return neutral[86];
	}
};

const headlineTag = (_format: ArticleFormat): Colour => neutral[100];

const headlineTagDark = (_format: ArticleFormat): Colour => neutral[10];

const follow = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			switch (format.design) {
				case ArticleDesign.Analysis:
					return news[300];
				default:
					return news[400];
			}
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
};

const followDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		default:
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
					return specialReport[500];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
	}
};

const bylineDark = (format: ArticleFormat): Colour => {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const linkDark = (format: ArticleFormat): Colour => {
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
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const articleLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
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
					return specialReport[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
		default:
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
					return specialReport[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
	}
};

const interactiveAtomLink = (format: ArticleFormat): Colour => {
	switch (format.theme) {
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
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
};

const keyEventsInline = ({ theme }: ArticleFormat): Colour => {
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
};

const keyEventsLeftColumn = ({ theme }: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const mediaArticleSeries = (format: ArticleFormat): Colour => {
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
	}
};

const standfirst = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return neutral[86];
		default:
			return neutral[7];
	}
};

const standfirstDark = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[60];
	}
};

const standfirstLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
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
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
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
			switch (format.theme) {
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
};

const standfirstLinkDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
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
			return neutral[60];
		}
	}
};

const kicker = (format: ArticleFormat): Colour => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return opinion[550];

	if (format.theme === ArticleSpecial.SpecialReport) {
		return brandAlt[400];
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return neutral[100];
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.Labs:
				default:
					return neutral[0];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return opinion[550];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[600];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[400];
			}
	}
};

const seriesTitle = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[100];
	}

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
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}

		case ArticleDesign.LiveBlog:
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
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
	}
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
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
};

const relatedCard = (_format: ArticleFormat): Colour => {
	return neutral[100];
};

const relatedCardLink = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

const relatedCardLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const relatedCardTimeAgo = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Gallery:
			return neutral[100];
	}
	return neutral[46];
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
	}
};

const richLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const richLinkAnchor = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

const richLinkAnchorDark = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

const seriesTitleDark = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[100];
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
	}
};

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
	}
};

const pullquote = (format: ArticleFormat): Colour => {
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
};

const pullquoteDark = (format: ArticleFormat): Colour => {
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
	}
};

const figCaption = (_format: ArticleFormat): Colour => neutral[46];

const figCaptionDark = (_format: ArticleFormat): Colour => neutral[60];

const tag = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[97];
		default:
			return neutral[7];
	}
};

const tagDark = (_format: ArticleFormat): Colour => neutral[86];

const paragraph = (_format: ArticleFormat): Colour => neutral[7];

const paragraphDark = (_format: ArticleFormat): Colour => neutral[86];

const signUpForm = (_format: ArticleFormat): string => {
	return neutral[7];
};

const signUpFormDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const privacyMessage = (_format: ArticleFormat): string => {
	return neutral[46];
};

const privacyMessageDark = (_format: ArticleFormat): string => {
	return neutral[46];
};

const signUpFormButton = (_format: ArticleFormat): string => {
	return neutral[100];
};

const signUpFormButtonDark = (_format: ArticleFormat): string => {
	return neutral[0];
};

const gallery = (_format: ArticleFormat): string => {
	return neutral[100];
};

const galleryDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

// ----- API ----- //

const text = {
	adLabel,
	adLabelDark,
	adSlot,
	articleLink,
	branding,
	brandingDark,
	byline,
	bylineAnchor,
	bylineAnchorDark,
	bylineDark,
	bylineLeftColumn,
	bylineLeftColumnDark,
	bylineInline,
	bylineInlineDark,
	calloutFormAnchor,
	calloutSpeechBubble,
	commentCount,
	commentCountDark,
	commentCountWide,
	dropCap,
	dropCapDark,
	figCaption,
	figCaptionDark,
	follow,
	followDark,
	headline,
	headlineDark,
	headlineTag,
	headlineTagDark,
	interactiveAtomLink,
	keyEventsInline,
	keyEventsLeftColumn,
	kicker,
	linkDark,
	mediaArticleBody,
	mediaArticleBodyLinkDark,
	mediaArticleSeries,
	pullquote,
	pullquoteDark,
	relatedCard,
	relatedCardLink,
	relatedCardLinkDark,
	relatedCardTimeAgo,
	richLink,
	richLinkAnchor,
	richLinkAnchorDark,
	richLinkDark,
	standfirst,
	standfirstDark,
	standfirstLink,
	standfirstLinkDark,
	seriesTitle,
	seriesTitleDark,
	tag,
	tagDark,
	pagination,
	paragraph,
	paragraphDark,
	signUpForm,
	signUpFormDark,
	privacyMessage,
	privacyMessageDark,
	signUpFormButton,
	signUpFormButtonDark,
	gallery,
	galleryDark,
};

// ----- Exports ----- //

export { text };
