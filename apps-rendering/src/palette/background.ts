// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	brandAlt,
	culture,
	labs,
	lifestyle,
	neutral,
	news,
	opinion,
	palette,
	specialReport,
	sport,
} from '@guardian/source-foundations';
import type { Colour } from './colour';

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

const adSlotDark = (_format: ArticleFormat): Colour => neutral[20];

const analysisContrastColour = '#f2e8e6';
const analysisContrastHoverColour = '#e9d9d5';

const mediaArticleBody = (_format: ArticleFormat): Colour => {
	return neutral[10];
};

const headline = ({ design, display, theme }: ArticleFormat): Colour => {
	if (display === ArticleDisplay.Immersive) {
		return neutral[7];
	}

	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[97];
		case ArticleDesign.LiveBlog: {
			switch (theme) {
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
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return opinion[800];
			}
		case ArticleDesign.Gallery:
			return neutral[7];
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return neutral[10];
		case ArticleDesign.Interview:
			return neutral[0];
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return news[800];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return neutral[100];
			}
		default:
			return neutral[100];
	}
};

const headlineByline = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[700];
				default:
					return brandAlt[400];
			}
		default:
			return brandAlt[400];
	}
};

const headlineBylineDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return brandAlt[200];
			}
		default:
			return brandAlt[200];
	}
};

const headlineDark = ({ design, display, theme }: ArticleFormat): Colour => {
	if (display === ArticleDisplay.Immersive) {
		return neutral[7];
	}

	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[7];
		case ArticleDesign.LiveBlog: {
			switch (theme) {
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
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[7];
				default:
					return neutral[20];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[100];
				default:
					return neutral[10];
			}
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
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
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
		case ArticleSpecial.SpecialReportAlt:
			return news[200];
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
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const standfirst = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[93];
		case ArticleDesign.LiveBlog: {
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
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return news[800];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return opinion[800];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return neutral[100];
			}
		default:
			return neutral[100];
	}
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
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[100];
				default:
					return neutral[10];
			}
		default:
			return neutral[10];
	}
};

const bullet = (format: ArticleFormat, returnPillarColour = true): Colour => {
	if (returnPillarColour) {
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
			case ArticleSpecial.SpecialReportAlt:
				return news[400];
		}
	}
	return format.design === ArticleDesign.Analysis ? neutral[60] : neutral[86];
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

const articleContentFollowIcon = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case ArticlePillar.Opinion:
					return opinion[200];
				case ArticlePillar.Sport:
					return sport[200];
				case ArticlePillar.Culture:
					return culture[200];
				case ArticlePillar.Lifestyle:
					return lifestyle[200];
				case ArticlePillar.News:
				default:
					return news[200];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return news[800];
			}
		case ArticleDesign.Gallery:
			return neutral[7];
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return opinion[800];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return neutral[100];
			}
		default:
			return neutral[100];
	}
};

const articleContent = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return news[800];
			}
		case ArticleDesign.Gallery:
			return neutral[7];
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return opinion[800];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[800];
				default:
					return neutral[100];
			}
		default:
			return neutral[100];
	}
};

const articleContentDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return neutral[7];
		case ArticleDesign.LiveBlog:
			return neutral[0];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[100];
				default:
					return neutral[10];
			}
		default:
			return neutral[10];
	}
};

const avatar = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[200];
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
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return news[500];
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
	}
};

const avatarDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[46];
				default:
					return neutral[20];
			}
		default:
			return neutral[20];
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
		case ArticleSpecial.SpecialReportAlt:
			return opinion[400];
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

const designTag = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
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
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[100];
			}
		default:
			switch (theme) {
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
				case ArticleSpecial.SpecialReportAlt:
					return news[300];
			}
	}
};

const designTagDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
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
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[700];
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
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return news[500];
			}
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
		case ArticleDesign.Picture:
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
		case ArticleDesign.Picture:
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
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const relatedCardImage = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const supportBanner = (_format: ArticleFormat): Colour => {
	return brandAlt[400];
};

const supportBannerDark = (_format: ArticleFormat): Colour => {
	return brandAlt[200];
};

const series = ({ design, display, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Gallery:
			switch (theme) {
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
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
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
					case ArticleSpecial.SpecialReportAlt:
						return palette.specialReportAlt[300];
					case ArticlePillar.News:
					default:
						return news[400];
				}
			}

			return neutral[100];
		default:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
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
	}
};

const seriesDark = ({ design, display, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
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
					case ArticleSpecial.SpecialReportAlt:
						return palette.specialReportAlt[200];
					case ArticlePillar.News:
					default:
						return news[400];
				}
			}

			return neutral[10];
		default:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
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
	}
};

const tag = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Gallery:
			return neutral[10];
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return neutral[86];
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[86];
				default:
					return neutral[100];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[86];
				default:
					return neutral[97];
			}
		default:
			return neutral[97];
	}
};

const tagDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[7];
				default:
					return neutral[20];
			}
		default:
			return neutral[20];
	}
};

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
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
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

const newsletterSignUpFormDark = (_format: ArticleFormat): Colour =>
	neutral[10];

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

const specialReportAltButton = (_format: ArticleFormat): Colour =>
	palette.specialReportAlt[200];

const specialReportAltButtonDark = ({
	design,
	theme,
}: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[100];
				default:
					return neutral[10];
			}
		default:
			return neutral[10];
	}
};

// ----- API ----- //

const background = {
	adSlot,
	adSlotDark,
	articleContent,
	articleContentFollowIcon,
	articleContentDark,
	analysisContrastColour,
	analysisContrastHoverColour,
	avatar,
	avatarDark,
	bullet,
	bulletDark,
	footer,
	footerDark,
	headline,
	headlineByline,
	headlineBylineDark,
	headlineDark,
	designTag,
	designTagDark,
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
	newsletterSignUpFormDark,
	editionsCameraIcon,
	specialReportAltButton,
	specialReportAltButtonDark,
};

// ----- Exports ----- //

export { background };
