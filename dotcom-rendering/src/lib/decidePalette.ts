import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	border,
	brandAlt,
	brandAltBackground,
	culture,
	labs,
	lifestyle,
	neutral,
	news,
	opinion,
	palette,
	specialReport,
	sport,
	text,
} from '@guardian/source-foundations';
// Here is the one place where we use `pillarPalette`
import { pillarPalette_DO_NOT_USE as pillarPalette } from '../lib/pillars';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';
import { decideContainerOverrides } from './decideContainerOverrides';
import { transparentColour } from './transparentColour';

const WHITE = neutral[100];
const BLACK = neutral[7];

const blogsGrayBackgroundPalette = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Opinion:
			return opinion[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
		case ArticleSpecial.Labs:
			return labs[300];
	}
};

const textHeadline = (format: ArticleFormat): string => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			if (format.theme === ArticleSpecial.SpecialReport) return WHITE;
			switch (format.design) {
				case ArticleDesign.PrintShop:
					return BLACK;
				default:
					return WHITE;
			}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			if (
				format.theme === ArticleSpecial.SpecialReport &&
				format.design !== ArticleDesign.Interview
			)
				return specialReport[100];

			if (format.theme === ArticleSpecial.SpecialReportAlt) {
				if (format.design === ArticleDesign.Interview)
					return palette.specialReportAlt[800];

				if (
					format.design !== ArticleDesign.LiveBlog &&
					format.design !== ArticleDesign.DeadBlog
				)
					return neutral[7];
			}

			switch (format.design) {
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Feature:
					return pillarPalette[format.theme].dark;
				case ArticleDesign.Interview:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.Picture:
					return WHITE;
				default:
					return BLACK;
			}
		}
		default:
			return BLACK;
	}
};

const textSeriesTitle = (format: ArticleFormat): string => {
	if (
		format.theme === ArticleSpecial.Labs &&
		format.design !== ArticleDesign.LiveBlog
	) {
		return BLACK;
	}

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog &&
		format.design !== ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[100];

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return WHITE;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (format.design) {
				case ArticleDesign.Analysis: {
					switch (format.theme) {
						case Pillar.News:
							return news[300];
						default:
							return pillarPalette[format.theme].main;
					}
				}
				case ArticleDesign.LiveBlog:
					switch (format.theme) {
						case Pillar.News:
							return news[600];
						case Pillar.Sport:
						case Pillar.Lifestyle:
						case Pillar.Culture:
						case Pillar.Opinion:
						default:
							return WHITE;
					}
				case ArticleDesign.DeadBlog:
					return blogsGrayBackgroundPalette(format);
				case ArticleDesign.MatchReport:
					return BLACK;
				case ArticleDesign.Picture:
					return palette.neutral[86];
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return BLACK;
	}
};

const textSeriesTitleWhenMatch = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.MatchReport:
		case ArticleDesign.LiveBlog:
			return BLACK;
		default:
			return textSeriesTitle(format);
	}
};

const textHeadlineWhenMatch = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.MatchReport:
		case ArticleDesign.LiveBlog:
			return BLACK;
		default:
			return textSeriesTitle(format);
	}
};

const textSectionTitle = textSeriesTitle;

const textByline = (format: ArticleFormat): string => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	)
		return blogsGrayBackgroundPalette(format);

	if (format.theme === ArticleSpecial.Labs) return BLACK;

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	switch (format.display) {
		case ArticleDisplay.Immersive:
			return WHITE;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (format.design) {
				case ArticleDesign.Analysis: {
					switch (format.theme) {
						case Pillar.News:
							return news[300];
						default:
							return pillarPalette[format.theme].main;
					}
				}
				case ArticleDesign.Gallery: {
					switch (format.theme) {
						case Pillar.Culture:
							return pillarPalette[format.theme].bright;
						default:
							return pillarPalette[format.theme].main;
					}
				}
				case ArticleDesign.Interview:
					return BLACK;
				case ArticleDesign.Picture:
					return palette.neutral[86];
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textHeadlineByline = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[400];
			case Pillar.Culture:
				return culture[400];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case ArticleSpecial.Labs:
				return labs[400];
			case ArticleSpecial.SpecialReport:
				return specialReport[400];
			case ArticleSpecial.SpecialReportAlt:
				return palette.specialReportAlt[100];
		}
	}

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (format.theme === ArticleSpecial.Labs) return BLACK;

	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Opinion:
			return opinion[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReportAlt:
			return palette.specialReportAlt[100];
	}
};

const textStandfirst = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;
	if (format.design === ArticleDesign.Picture) return palette.neutral[86];
	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[100];

	return BLACK;
};

const textLastUpdated = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[600];
			case Pillar.Culture:
				return culture[600];
			case Pillar.Lifestyle:
				return lifestyle[600];
			case Pillar.Sport:
				return sport[600];
			case Pillar.Opinion:
				return opinion[600];
			case ArticleSpecial.Labs:
				return news[600];
			case ArticleSpecial.SpecialReport:
				return specialReport[700];
			case ArticleSpecial.SpecialReportAlt:
				return news[600];
		}
	}
	return BLACK;
};

const textTwitterHandle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	return text.supporting;
};

const textTwitterHandleBelowDesktop = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;

	return textTwitterHandle(format);
};

const textSubMeta = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.design === ArticleDesign.Picture) return palette.neutral[86];
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	if (
		format.design === ArticleDesign.DeadBlog ||
		format.design === ArticleDesign.LiveBlog
	)
		return blogsGrayBackgroundPalette(format);
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const textSubMetaLabel = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog &&
		format.design != ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[100];
	if (format.design === ArticleDesign.Picture) return palette.neutral[60];
	return text.supporting;
};

const textSubMetaLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.design === ArticleDesign.Picture) return palette.neutral[86];
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return text.supporting;
};

const textSyndicationButton = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog &&
		format.design !== ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[100];

	return text.supporting;
};

const textArticleLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.DeadBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[400];
			case Pillar.Culture:
				return culture[350];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[300];
			case ArticleSpecial.SpecialReportAlt:
				return news[400];
		}
	}
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			case Pillar.Culture:
				return culture[350];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[300];
			case ArticleSpecial.SpecialReportAlt:
				return palette.specialReportAlt[200];
		}
	}
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog
	)
		return palette.specialReportAlt[200];

	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		case Pillar.News:
			return news[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const textDisclaimerLink = (format: ArticleFormat): string =>
	pillarPalette[format.theme].dark;

const textWitnessIcon = (format: ArticleFormat): string =>
	pillarPalette[format.theme].main;

const textWitnessTitle = (format: ArticleFormat): string =>
	pillarPalette[format.theme].main;

const textWitnessAuthor = (format: ArticleFormat): string =>
	pillarPalette[format.theme].main;

const textPullQuote = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
};

const textStandfirstLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;
	if (format.design === ArticleDesign.DeadBlog) {
		switch (format.theme) {
			case Pillar.Opinion:
				return opinion[200];
			case Pillar.News:
				return news[400];
			default:
				return pillarPalette[format.theme].dark;
		}
	}
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.Opinion:
				return opinion[200];
			case Pillar.Culture:
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].dark;
		}
	}

	if (format.design === ArticleDesign.Picture)
		return pillarPalette[format.theme].bright;

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textArticleLinkHover = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.DeadBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[400];
			case Pillar.Culture:
				return culture[350];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[100];
			case ArticleSpecial.SpecialReportAlt:
				return news[400];
		}
	}
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			case Pillar.Culture:
				return culture[350];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[100];
			case ArticleSpecial.SpecialReportAlt:
				return palette.specialReportAlt[200];
		}
	}
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog
	)
		return palette.specialReportAlt[200];

	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textCardHeadline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport) return WHITE;

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	if (
		// Galleries are now considered Immersive, which would give them a dark background, so mustn't have `BLACK` text.
		// There color is decided below in the `format.design` `switch`.
		// see: https://github.com/guardian/content-api-scala-client/pull/387/files#diff-9384ebc9ebed8b6773587afc23b56246ec6ad014752a9b3718fd68339b705f1fR209
		format.design !== ArticleDesign.Gallery &&
		format.display === ArticleDisplay.Immersive
	) {
		return BLACK;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return WHITE;
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return BLACK;
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				default:
					return WHITE;
			}
		default:
			return BLACK;
	}
};

const textCardStandfirst = textCardHeadline;

const textCardByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[700];

	if (format.display === ArticleDisplay.Immersive)
		return pillarPalette[format.theme].main;

	return textByline(format);
};

const textCardKicker = (format: ArticleFormat): string => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return brandAlt[400];
	if (format.theme === ArticleSpecial.SpecialReportAlt) return neutral[7];

	if (format.theme === ArticleSpecial.SpecialReport) return brandAlt[400];

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return BLACK;
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				default:
					return neutral[100];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case Pillar.News:
					return news[550];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					return opinion[550];
				case Pillar.Lifestyle:
					return lifestyle[500];
				case Pillar.Culture:
					return culture[500];
				case ArticleSpecial.Labs:
					return labs[400];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return labs[200];
				default:
					return pillarPalette[format.theme].main;
			}
	}
};

const textCardFooter = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return neutral[86];
				default:
					return neutral[46];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return BLACK;
				default:
					return neutral[100];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return neutral[86];
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[46];
			}
	}
};

const textLinkKicker = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const textCricketScoreboardLink = (): string => {
	return sport[300];
};

//could we remove?
const backgroundArticle = (format: ArticleFormat): string => {
	// specialreport blogs should have specialreport background
	if (
		(format.design === ArticleDesign.LiveBlog ||
			format.design === ArticleDesign.DeadBlog) &&
		format.theme !== ArticleSpecial.SpecialReport
	)
		return neutral[97];
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === ArticleDesign.Letter) return opinion[800];
	if (format.design === ArticleDesign.Comment) {
		if (format.theme === ArticleSpecial.SpecialReportAlt)
			return palette.specialReportAlt[800];

		return opinion[800];
	}
	if (format.design === ArticleDesign.Editorial) return opinion[800];

	if (format.design === ArticleDesign.Analysis) {
		if (format.theme === ArticleSpecial.SpecialReportAlt)
			return palette.specialReportAlt[800];
		else return news[800];
	}

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[800]; // Note, check theme rather than design here

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[800];

	if (
		format.theme === ArticleSpecial.Labs &&
		format.display !== ArticleDisplay.Immersive
	)
		return neutral[97];
	if (format.design === ArticleDesign.Picture) return BLACK;

	return 'transparent';
};

const backgroundSeriesTitle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;

	switch (format.display) {
		case ArticleDisplay.Immersive: {
			if (format.theme === ArticleSpecial.SpecialReportAlt)
				return palette.specialReportAlt[300];

			return pillarPalette[format.theme].main;
		}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default:
			return 'transparent';
	}
};

const backgroundSectionTitle = (format: ArticleFormat): string => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return pillarPalette[format.theme].main;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default:
			return 'transparent';
	}
};

const backgroundCard = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[700];
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return opinion[800];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return neutral[20];
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return labs[400];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Opinion:
				case Pillar.Lifestyle:
				case Pillar.Culture:
				default:
					return pillarPalette[format.theme][300];
			}
		default:
			return neutral[97];
	}
};

const backgroundHeadline = (format: ArticleFormat): string => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			if (format.theme === ArticleSpecial.SpecialReport)
				return specialReport[300];
			return BLACK;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			if (format.design === ArticleDesign.Interview) return BLACK;
			return 'transparent';
		default:
			return 'transparent';
	}
};

const backgroundAgeWarning = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return backgroundArticle(format);
		default:
			return backgroundHeadline(format);
	}
};

const backgroundHeadlineByline = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) return 'transparent';
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;
	return 'transparent';
};

const backgroundBullet = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const backgroundBulletStandfirst = (format: ArticleFormat): string => {
	if (
		format.design === ArticleDesign.DeadBlog ||
		format.design === ArticleDesign.Analysis
	) {
		return neutral[60];
	}

	if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[600];
			case Pillar.Culture:
				return culture[400];
			case Pillar.Lifestyle:
				return lifestyle[500];
			case Pillar.Sport:
				return sport[600];
			case Pillar.Opinion:
				return opinion[500];
			case ArticleSpecial.Labs:
				return news[600];
			case ArticleSpecial.SpecialReport:
				return specialReport[700];
			case ArticleSpecial.SpecialReportAlt:
				return news[600];
		}
	}

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	return neutral[86]; // default previously defined in Standfirst.tsx
};

const backgroundHeader = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return news[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return news[300];
				default:
					return pillarPalette[format.theme][300];
			}
		default:
			return backgroundArticle(format);
	}
};

const backgroundStandfirst = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case Pillar.News:
					return news[200];
				case Pillar.Culture:
					return culture[200];
				case Pillar.Sport:
					return sport[100];
				case Pillar.Lifestyle:
					return lifestyle[200];
				case Pillar.Opinion:
					return opinion[200];
				case ArticleSpecial.Labs:
					return news[200];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[200];
			}
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return specialReport[700];
				default:
					return neutral[93];
			}

		default:
			return backgroundArticle(format);
	}
};

const backgroundImageTitle = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const backgroundLightboxDivider = backgroundImageTitle;

const backgroundSpeechBubble = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const backgroundFilterButtonHover = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[200];
		case Pillar.Culture:
			return culture[200];
		case Pillar.Lifestyle:
			return lifestyle[200];
		case Pillar.Sport:
			return sport[200];
		case Pillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[200];
		case ArticleSpecial.SpecialReport:
			return specialReport[200];
		default:
			return news[200];
	}
};

const backgroundFilterButtonActive = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		default:
			return news[300];
	}
};

const fillCommentCount = (format: ArticleFormat): string => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	)
		return neutral[46];
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	if (format.design === ArticleDesign.Picture) {
		return palette.neutral[86];
	}
	return pillarPalette[format.theme].main;
};

const fillCommentCountUntilDesktop = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;

	return fillCommentCount(format);
};

const fillShareIcon = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.DeadBlog) {
		switch (format.theme) {
			case Pillar.Culture:
				return culture[350];
			case Pillar.News:
				return news[400];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[300];
			case ArticleSpecial.SpecialReportAlt:
				return news[400];
		}
	}
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.Culture:
				return culture[350];
			case Pillar.News:
				return news[300];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return BLACK;
			case ArticleSpecial.SpecialReport:
				return specialReport[300];
			case ArticleSpecial.SpecialReportAlt:
				return palette.specialReportAlt[100];
		}
	}
	if (
		format.design === ArticleDesign.NewsletterSignup &&
		format.display === ArticleDisplay.Standard
	)
		return BLACK;

	if (format.design === ArticleDesign.Picture) return palette.neutral[86];
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog
	)
		return palette.specialReportAlt[100];

	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Opinion:
			return opinion[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const fillShareIconGrayBackground = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return blogsGrayBackgroundPalette(format);
		default:
			return pillarPalette[format.theme].dark;
	}
};

const fillBlockquoteIcon = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			switch (format.theme) {
				case Pillar.News:
					return news[400];
				case Pillar.Opinion:
					return opinion[400];
				case Pillar.Sport:
					return sport[400];
				case Pillar.Culture:
					return culture[400];
				case Pillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
				case ArticleSpecial.Labs:
					return labs[400];
			}
		}
		case ArticleDesign.Analysis: {
			switch (format.theme) {
				case Pillar.News:
					return news[300];
				case Pillar.Opinion:
					return opinion[300];
				case Pillar.Sport:
					return sport[400];
				case Pillar.Culture:
					return culture[400];
				case Pillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[200];
				case ArticleSpecial.Labs:
					return labs[400];
			}
		}
		default: {
			switch (format.theme) {
				case Pillar.News:
					return news[400];
				case Pillar.Opinion:
					return opinion[300];
				case Pillar.Sport:
					return sport[400];
				case Pillar.Culture:
					return culture[400];
				case Pillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return palette.specialReportAlt[200];
				case ArticleSpecial.Labs:
					return labs[400];
			}
		}
	}
};

const fillTwitterHandleBelowDesktop = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[100];

	return neutral[46];
};

const fillGuardianLogo = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.NewsletterSignup) return WHITE;

	return WHITE;
};

const fillTwitterHandle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[100];

	return neutral[46];
};

const borderSyndicationButton = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return neutral[60];
	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.DeadBlog &&
		format.design !== ArticleDesign.LiveBlog
	)
		return palette.specialReportAlt[100];

	return border.secondary;
};

const borderSubNav = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const borderLiveBlock = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.DeadBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[400];
			case Pillar.Culture:
				return culture[350];
			case Pillar.Lifestyle:
				return lifestyle[400];
			case Pillar.Sport:
				return sport[400];
			case Pillar.Opinion:
				return opinion[300];
			case ArticleSpecial.Labs:
				return labs[400];
			case ArticleSpecial.SpecialReport:
				return specialReport[400];
			case ArticleSpecial.SpecialReportAlt:
				return news[400];
		}
	}

	return pillarPalette[format.theme].main;
};

const borderPinnedPost = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};

const borderArticleLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return neutral[60];

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.DeadBlog &&
		format.design !== ArticleDesign.LiveBlog
	)
		return transparentColour(neutral[60], 0.3);

	return border.secondary;
};

const borderStandfirstLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case Pillar.News:
				return news[600];
			case Pillar.Culture:
				return culture[400];
			case Pillar.Lifestyle:
				return lifestyle[500];
			case Pillar.Sport:
				return sport[600];
			case Pillar.Opinion:
				return opinion[500];
			case ArticleSpecial.Labs:
				return news[600];
			case ArticleSpecial.SpecialReport:
				return specialReport[450];
			case ArticleSpecial.SpecialReportAlt:
				return news[600];
		}
	}
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(neutral[60], 0.3);

	return border.secondary;
};

const borderHeadline = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) {
		return 'rgba(255,255,255, 0.2)';
	}
	if (format.design === ArticleDesign.DeadBlog) return '#CDCDCD';
	return border.secondary;
};

const borderStandfirst = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) {
		return 'rgba(255,255,255, 0.2)';
	}
	if (format.design === ArticleDesign.DeadBlog) return '#BDBDBD';
	return border.secondary;
};

const matchTab = (): string => {
	return border.secondary;
};

const activeMatchTab = (): string => {
	return sport[300];
};

const borderCardSupporting = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return opinion[550];
				default:
					return neutral[86];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					return WHITE;
				case Pillar.Culture:
					return culture[600];
				case Pillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticleSpecial.Labs:
				default:
					return neutral[86];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[600];
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					return opinion[550];
				case Pillar.Lifestyle:
					return lifestyle[500];
				case Pillar.Culture:
					return culture[500];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return neutral[86];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[86];
			}
	}
};

const backgroundMatchNav = (): string => {
	return brandAlt[400];
};

const backgroundUnderline = (format: ArticleFormat): string =>
	transparentColour(textCardKicker(format));

const borderArticleLinkHover = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.LiveBlog &&
		format.design !== ArticleDesign.DeadBlog
	)
		return palette.specialReportAlt[200];

	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const topBarCard = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt) return neutral[60];
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const hoverHeadlineByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	return pillarPalette[format.theme].dark;
};

const textRichLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) return news[300];
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Culture:
			return culture[350];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return BLACK;
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const textPagination = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const hoverStandfirstLink = (format: ArticleFormat): string => {
	return textStandfirstLink(format);
};

const borderRichLink: (format: ArticleFormat) => string = (format) => {
	switch (format.theme) {
		case Pillar.News:
			return format.design === ArticleDesign.Analysis
				? news[300]
				: news[400];
		case Pillar.Culture:
			return culture[350];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const borderNavPillar: (format: ArticleFormat) => string = (format) =>
	pillarPalette[format.theme].bright;

const borderArticle: (format: ArticleFormat) => string = (format) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(neutral[60], 0.3);
	if (format.design === ArticleDesign.Picture)
		return transparentColour(neutral[60], 0.5);

	if (format.theme === ArticleSpecial.Labs) return neutral[60];

	return neutral[86];
};

const borderLines = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return neutral[60];
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return neutral[46];

	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return transparentColour(neutral[60], 0.3);
	if (format.design === ArticleDesign.Picture)
		return transparentColour(neutral[60], 0.5);

	return neutral[86];
};

const backgroundRichLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const borderCricketScoreboardTop = (): string => {
	return sport[300];
};

const borderCricketScoreboardDivider = (): string => {
	return neutral[86];
};

const borderFilterButton = (): string => neutral[60];

const borderSecondary = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(neutral[60], 0.3);
	if (format.design === ArticleDesign.Picture)
		return transparentColour(neutral[60], 0.5);
	return neutral[86];
};

const borderPagination = () => {
	return neutral[86];
};

const fillRichLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) return news[400];
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Culture:
			return culture[350];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const fillQuoteIcon = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const backgroundAnalysisContrastColour = (): string => '#F2E8E6';
const backgroundAnalysisContrastHoverColour = (): string => '#e9d9d5';

const backgroundPullQuote = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[800];

	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return '#fbe6d5';
		case ArticleDesign.Analysis:
			return backgroundAnalysisContrastColour();

		default:
			return neutral[97];
	}
};

const backgroundMessageForm = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[100];
		case Pillar.Sport:
			return sport[200];
		case Pillar.Lifestyle:
			return lifestyle[100];
		case Pillar.Culture:
			return culture[100];
		case Pillar.Opinion:
			return opinion[100];
		case ArticleSpecial.SpecialReport:
			return specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			return news[100];
		default:
			return news[100];
	}
};

const textPullQuoteAttribution = (format: ArticleFormat): string =>
	fillQuoteIcon(format);

const textSignInLink = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
};

const textCarouselTitle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt) return neutral[7];

	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case Pillar.News:
				return news[300];
			default:
				return pillarPalette[format.theme].main;
		}
	}
	return pillarPalette[format.theme].main;
};

const textDropCap = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Analysis: {
			switch (format.theme) {
				case Pillar.News:
					return news[300];
				default:
					return pillarPalette[format.theme].main;
			}
		}
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return format.theme === Pillar.Opinion
				? pillarPalette[format.theme].main
				: pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].dark;
	}
};

const textBetaLabel = (): string => neutral[46];

const textDesignTag = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[800];

	return neutral[100];
};

const textDateLine = (format: ArticleFormat): string => {
	if (
		format.theme === ArticleSpecial.SpecialReportAlt &&
		format.design !== ArticleDesign.DeadBlog &&
		format.design !== ArticleDesign.LiveBlog
	)
		return palette.specialReportAlt[100];

	return neutral[46];
};

const textBlockquote = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt) return neutral[7];

	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return BLACK;
		case ArticleDesign.Analysis:
			return neutral[7];
		default:
			return neutral[46];
	}
};

const textNumberedTitle = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const textNumberedPosition = (): string => {
	return text.supporting;
};

const textFilterButton = (): string => neutral[7];

const textFilterButtonHover = (): string => neutral[100];

const textFilterButtonActive = (): string => neutral[100];

const backgroundFilterButton = (): string => neutral[100];

const backgroundHeadlineTag = (format: ArticleFormat): string =>
	pillarPalette[format.theme].dark;

const backgroundCarouselDot = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return palette.specialReportAlt[100];
	}
};

const backgroundMostViewedTab = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
};

const backgroundMatchStats = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[97];
		default:
			return '#d9edf6';
	}
};

const backgroundTreat = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};

const backgroundDesignTag = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return palette.specialReportAlt[100];
	}
};

const hoverPagination = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const backgroundAudioAtom = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
			return news[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const textExpandableAtom = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return lifestyle[300];
		case ArticleSpecial.SpecialReport:
			return news[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};

const textExpandableAtomHover = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
			return news[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const textSubNavLink = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Picture:
			return WHITE;
		default:
			return palette.neutral[7];
	}
};

const discussion = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
			return news[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
		default:
			return news[400];
	}
};

const backgroundDiscussionPillarButton = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return lifestyle[300];
		default:
			return news[300];
	}
};

const backgroundSubmeta = (format: ArticleFormat) => {
	// specialreport blogs should have specialreport background
	if (
		(format.design === ArticleDesign.LiveBlog ||
			format.design === ArticleDesign.DeadBlog) &&
		format.theme !== ArticleSpecial.SpecialReport
	)
		return neutral[97];

	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === ArticleDesign.Letter) return opinion[800];

	if (format.design === ArticleDesign.Comment) {
		if (format.theme === ArticleSpecial.SpecialReportAlt)
			return palette.specialReportAlt[800];

		return opinion[800];
	}
	if (format.design === ArticleDesign.Editorial) return opinion[800];

	if (format.design === ArticleDesign.Analysis) {
		if (format.theme === ArticleSpecial.SpecialReportAlt)
			return palette.specialReportAlt[800];
		else return news[800];
	}

	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[800]; // Note, check theme rather than design here

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return palette.specialReportAlt[800];

	if (
		format.theme === ArticleSpecial.Labs &&
		format.display !== ArticleDisplay.Immersive
	)
		return neutral[97];
	if (format.design === ArticleDesign.Picture) return BLACK;

	return neutral[100];
};

const textYoutubeOverlayKicker = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return news[400];
		case Pillar.Opinion:
			return news[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const backgroundDynamoSublink = (_format: ArticleFormat): string =>
	palette.neutral[97];

export const decidePalette = (
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): Palette => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);
	return {
		text: {
			headline: textHeadline(format),
			headlineWhenMatch: textHeadlineWhenMatch(format),
			seriesTitle: textSeriesTitle(format),
			seriesTitleWhenMatch: textSeriesTitleWhenMatch(format),
			sectionTitle: textSectionTitle(format),
			byline: textByline(format),
			twitterHandle: textTwitterHandle(format),
			twitterHandleBelowDesktop: textTwitterHandleBelowDesktop(format),
			subMeta: textSubMeta(format),
			subMetaLabel: textSubMetaLabel(format),
			subMetaLink: textSubMetaLink(format),
			syndicationButton: textSyndicationButton(format),
			articleLink: textArticleLink(format),
			articleLinkHover: textArticleLinkHover(format),
			cardHeadline:
				overrides?.text.cardHeadline ?? textCardHeadline(format),
			dynamoHeadline:
				overrides?.text.dynamoHeadline ?? textCardHeadline(format),
			cardByline: overrides?.text.cardByline ?? textCardByline(format),
			cardKicker: overrides?.text.cardKicker ?? textCardKicker(format),
			dynamoKicker:
				overrides?.text.dynamoKicker ?? textCardKicker(format),
			linkKicker: textLinkKicker(format),
			cardStandfirst:
				overrides?.text.cardStandfirst ?? textCardStandfirst(format),
			cardFooter: overrides?.text.cardFooter ?? textCardFooter(format),
			dynamoMeta: overrides?.text.dynamoMeta ?? textCardFooter(format),
			headlineByline: textHeadlineByline(format),
			standfirst: textStandfirst(format),
			standfirstLink: textStandfirstLink(format),
			lastUpdated: textLastUpdated(format),
			disclaimerLink: textDisclaimerLink(format),
			signInLink: textSignInLink(format),
			richLink: textRichLink(format),
			pagination: textPagination(format),
			pullQuote: textPullQuote(format),
			pullQuoteAttribution: textPullQuoteAttribution(format),
			witnessIcon: textWitnessIcon(format),
			witnessAuthor: textWitnessAuthor(format),
			witnessTitle: textWitnessTitle(format),
			carouselTitle: textCarouselTitle(format),
			dropCap: textDropCap(format),
			blockquote: textBlockquote(format),
			numberedTitle: textNumberedTitle(format),
			numberedPosition: textNumberedPosition(),
			cricketScoreboardLink: textCricketScoreboardLink(),
			filterButton: textFilterButton(),
			filterButtonHover: textFilterButtonHover(),
			filterButtonActive: textFilterButtonActive(),
			betaLabel: textBetaLabel(),
			designTag: textDesignTag(format),
			dateLine: textDateLine(format),
			expandableAtom: textExpandableAtom(format),
			expandableAtomHover: textExpandableAtomHover(format),
			subNavLink: textSubNavLink(format),
			youtubeOverlayKicker: textYoutubeOverlayKicker(format),
		},
		background: {
			article: backgroundArticle(format),
			analysisContrast: backgroundAnalysisContrastColour(),
			analysisContrastHover: backgroundAnalysisContrastHoverColour(),
			audioAtom: backgroundAudioAtom(format),
			seriesTitle: backgroundSeriesTitle(format),
			sectionTitle: backgroundSectionTitle(format),
			card: overrides?.background.card ?? backgroundCard(format),
			headline: backgroundHeadline(format),
			headlineByline: backgroundHeadlineByline(format),
			bullet: backgroundBullet(format),
			bulletStandfirst: backgroundBulletStandfirst(format),
			header: backgroundHeader(format),
			standfirst: backgroundStandfirst(format),
			richLink: backgroundRichLink(format),
			imageTitle: backgroundImageTitle(format),
			lightboxDivider: backgroundLightboxDivider(format),
			speechBubble: backgroundSpeechBubble(format),
			carouselDot: backgroundCarouselDot(format),
			headlineTag: backgroundHeadlineTag(format),
			mostViewedTab: backgroundMostViewedTab(format),
			matchNav: backgroundMatchNav(),
			analysisUnderline: backgroundUnderline(format),
			matchStats: backgroundMatchStats(format),
			ageWarning: backgroundAgeWarning(format),
			filterButton: backgroundFilterButton(),
			filterButtonHover: backgroundFilterButtonHover(format),
			filterButtonActive: backgroundFilterButtonActive(format),
			treat: backgroundTreat(format),
			designTag: backgroundDesignTag(format),
			pullQuote: backgroundPullQuote(format),
			messageForm: backgroundMessageForm(format),
			discussionPillarButton: backgroundDiscussionPillarButton(format),
			subMeta: backgroundSubmeta(format),
			dynamoSublink:
				overrides?.background.dynamoSublink ??
				backgroundDynamoSublink(format),
		},
		fill: {
			commentCount: fillCommentCount(format),
			commentCountUntilDesktop: fillCommentCountUntilDesktop(format),
			shareIcon: fillShareIcon(format),
			shareIconGrayBackground: fillShareIconGrayBackground(format),
			richLink: fillRichLink(format),
			quoteIcon: fillQuoteIcon(format),
			blockquoteIcon: fillBlockquoteIcon(format),
			twitterHandleBelowDesktop: fillTwitterHandleBelowDesktop(format),
			twitterHandle: fillTwitterHandle(format),
			guardianLogo: fillGuardianLogo(format),
		},
		border: {
			syndicationButton: borderSyndicationButton(format),
			subNav: borderSubNav(format),
			articleLink: borderArticleLink(format),
			articleLinkHover: borderArticleLinkHover(format),
			liveBlock: borderLiveBlock(format),
			pinnedPost: borderPinnedPost(format),
			standfirstLink: borderStandfirstLink(format),
			headline: borderHeadline(format),
			standfirst: borderStandfirst(format),
			richLink: borderRichLink(format),
			navPillar: borderNavPillar(format),
			article: borderArticle(format),
			lines: overrides?.border.lines ?? borderLines(format),
			cricketScoreboardTop: borderCricketScoreboardTop(),
			cricketScoreboardDivider: borderCricketScoreboardDivider(),
			matchTab: matchTab(),
			activeMatchTab: activeMatchTab(),
			cardSupporting: borderCardSupporting(format),
			filterButton: borderFilterButton(),
			secondary: borderSecondary(format),
			pagination: borderPagination(),
		},
		topBar: {
			card: overrides?.topBar?.card ?? topBarCard(format),
		},
		hover: {
			headlineByline: hoverHeadlineByline(format),
			standfirstLink: hoverStandfirstLink(format),
			pagination: hoverPagination(format),
		},
		discussionGeneric: discussion(format),
	};
};
