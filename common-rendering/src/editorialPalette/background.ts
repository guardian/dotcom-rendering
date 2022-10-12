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
	brandAlt,
	brand,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const adSlot = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			return neutral[86];
		default:
			return neutral[97];
	}
};

const adSlotDark = (_format: ArticleFormat) => neutral[20];

const mediaArticleBody = (_format: ArticleFormat) => {
	return neutral[10];
};

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
	} else if (format.design === ArticleDesign.Gallery) {
		return neutral[7];
	} else if (
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video
	) {
		return neutral[10];
	} else if (format.design === ArticleDesign.Interview) {
		return neutral[0];
	} else if (format.design === ArticleDesign.Analysis) {
		return news[800];
	}

	return neutral[100];
};

const headlineByline = (_format: ArticleFormat): Colour => brandAlt[400];

const headlineBylineDark = (_format: ArticleFormat): Colour => brandAlt[200];

const headlineDark = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[7];
	}

	switch (format.design) {
		case ArticleDesign.DeadBlog:
			return neutral[7];
		case ArticleDesign.LiveBlog: {
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
				default:
					return news[200];
			}
		}
		case ArticleDesign.Interview:
			return neutral[20];
		default:
			return neutral[10];
	}
};

const richLink = (_format: ArticleFormat): Colour => {
	return neutral[97];
};

const richLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const richLinkSvg = (format: ArticleFormat): Colour => {
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

const liveblogMetadata = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[200];
		case ArticlePillar.Lifestyle:
			return lifestyle[200];
		case ArticlePillar.Sport:
			return sport[200];
		case ArticlePillar.Culture:
			return culture[200];
		case ArticlePillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[200];
		case ArticleSpecial.SpecialReport:
			return specialReport[200];
	}
};

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
	}
};

const standfirst = ({ design, theme }: ArticleFormat): Colour => {
	if (design === ArticleDesign.DeadBlog) {
		return neutral[93];
	}

	if (design === ArticleDesign.Analysis) {
		return news[800];
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

	if (
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Editorial
	) {
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

const bullet = (format: ArticleFormat): Colour => {
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
				switch (theme) {
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

const relatedCardBylineImage = (format: ArticleFormat): string => {
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
			return opinion[400];
	}
};

const keyEvents = (_format: ArticleFormat): Colour => neutral[100];

const keyEventsWide = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticleSpecial.SpecialReport:
			return specialReport[800];
		default:
			return neutral[97];
	}
};

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
};

const headlineTagDark = (format: ArticleFormat): Colour => {
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
	}
};

const relatedCard = (format: ArticleFormat): Colour => {
	if (format.theme === ArticleSpecial.Labs) {
		return neutral[93];
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.Lifestyle:
					return lifestyle[200];
				case ArticlePillar.Sport:
					return sport[200];
				case ArticlePillar.Culture:
					return culture[200];
				case ArticlePillar.Opinion:
					return opinion[200];
				case ArticleSpecial.SpecialReport:
					return specialReport[200];
				case ArticlePillar.News:
				default:
					return news[200];
			}
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Gallery:
			return neutral[10];
	}

	return neutral[97];
};

const relatedCardDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.Lifestyle:
					return lifestyle[100];
				case ArticlePillar.Sport:
					return sport[100];
				case ArticlePillar.Culture:
					return culture[100];
				case ArticlePillar.Opinion:
					return opinion[100];
				case ArticleSpecial.Labs:
					return labs[200];
				case ArticleSpecial.SpecialReport:
					return specialReport[100];
				case ArticlePillar.News:
				default:
					return news[100];
			}
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Gallery:
			return neutral[10];
	}

	return neutral[0];
};

const relatedCardIcon = (format: ArticleFormat): Colour => {
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

const relatedCardImage = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const calloutSpeechBubble = (format: ArticleFormat): Colour => {
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

const supportBanner = (_format: ArticleFormat): Colour => {
	return brandAlt[400];
};

const supportBannerDark = (_format: ArticleFormat): Colour => {
	return brandAlt[200];
};

const series = (format: ArticleFormat): Colour => {
	if (
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Gallery
	) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[400];
			case ArticlePillar.Culture:
				return culture[400];
			case ArticlePillar.Opinion:
				return opinion[400];
			case ArticlePillar.Lifestyle:
				return lifestyle[400];
			case ArticleSpecial.Labs:
				return labs[400];
			case ArticleSpecial.SpecialReport:
				return brandAlt[400];
			case ArticlePillar.News:
			default:
				return news[400];
		}
	}

	return neutral[100];
};

const seriesDark = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[400];
			case ArticlePillar.Culture:
				return culture[400];
			case ArticlePillar.Opinion:
				return opinion[400];
			case ArticlePillar.Lifestyle:
				return lifestyle[400];
			case ArticleSpecial.Labs:
				return labs[400];
			case ArticleSpecial.SpecialReport:
				return brandAlt[400];
			case ArticlePillar.News:
			default:
				return news[400];
		}
	}

	return neutral[10];
};

const tag = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[10];
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return neutral[86];
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.Analysis:
			return neutral[100];
		default:
			return neutral[97];
	}
};

const tagDark = (_format: ArticleFormat): Colour => neutral[20];

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
	}
};

const onwardContent = (_format: ArticleFormat): Colour => neutral[97];

const onwardContentDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[10];
		default:
			return neutral[0];
	}
};

const footer = (_format: ArticleFormat): Colour => neutral[97];

const footerDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[10];
		default:
			return neutral[0];
	}
};

const articleContent = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Analysis:
			return news[800];
		case ArticleDesign.Gallery:
			return neutral[7];
		default:
			return neutral[100];
	}
};

const signUpFormDark = (_format: ArticleFormat): Colour => neutral[10];

const editionsCameraIcon = (format: ArticleFormat): Colour => {
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
			return specialReport[400];
		case ArticleSpecial.Labs:
			return specialReport[400];
		case ArticlePillar.News:
		default:
			return news[400];
	}
};

// ----- API ----- //

const background = {
	adSlot,
	adSlotDark,
	articleContentDark,
	avatar,
	bullet,
	bulletDark,
	calloutSpeechBubble,
	footer,
	footerDark,
	headline,
	headlineByline,
	headlineBylineDark,
	headlineDark,
	headlineTag,
	headlineTagDark,
	keyEvents,
	keyEventsWide,
	keyEventsDark,
	keyEventsWideDark,
	liveblogMetadata,
	mediaArticleBody,
	onwardContent,
	onwardContentDark,
	relatedCard,
	relatedCardDark,
	relatedCardIcon,
	relatedCardImage,
	relatedCardBylineImage,
	richLink,
	richLinkDark,
	richLinkSvg,
	richLinkSvgDark,
	series,
	seriesDark,
	standfirst,
	standfirstDark,
	supportBanner,
	supportBannerDark,
	tag,
	tagDark,
	pinnedPost,
	articleContent,
	signUpFormDark,
	editionsCameraIcon,
};

// ----- Exports ----- //

export { background };
