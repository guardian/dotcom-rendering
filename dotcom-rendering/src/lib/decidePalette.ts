import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial, Pillar } from '@guardian/libs';
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
import { palette as themePalette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';
import { decideContainerOverrides } from './decideContainerOverrides';
import { transparentColour } from './transparentColour';

const WHITE = neutral[100];
const BLACK = neutral[7];

const textHeadlineWhenMatch = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.MatchReport:
		case ArticleDesign.LiveBlog:
			return BLACK;
		default:
			return themePalette('--series-title-text');
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

const textDisclaimerLink = (format: ArticleFormat): string =>
	pillarPalette[format.theme].dark;

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

const textCricketScoreboardLink = (): string => {
	return sport[300];
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

const fillGuardianLogo = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.NewsletterSignup) return WHITE;

	return WHITE;
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

const hoverStandfirstLink = (format: ArticleFormat): string => {
	return textStandfirstLink(format);
};

const borderNavPillar: (format: ArticleFormat) => string = (format) =>
	pillarPalette[format.theme].bright;

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

const borderCricketScoreboardTop = (): string => {
	return sport[300];
};

const borderCricketScoreboardDivider = (): string => {
	return neutral[86];
};

const borderFilterButton = (): string => neutral[60];

const backgroundAnalysisContrastColour = (): string => '#F2E8E6';
const backgroundAnalysisContrastHoverColour = (): string => '#e9d9d5';

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

const textNumberedPosition = (): string => {
	return text.supporting;
};

const textFilterButton = (): string => neutral[7];

const textFilterButtonHover = (): string => neutral[100];

const textFilterButtonActive = (): string => neutral[100];

const backgroundFilterButton = (): string => neutral[100];

const backgroundHeadlineTag = (format: ArticleFormat): string =>
	pillarPalette[format.theme].dark;

const backgroundMostViewedTab = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
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
			headlineWhenMatch: textHeadlineWhenMatch(format),
			standfirst: textStandfirst(format),
			standfirstLink: textStandfirstLink(format),
			lastUpdated: textLastUpdated(format),
			disclaimerLink: textDisclaimerLink(format),
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
			youtubeOverlayKicker: textYoutubeOverlayKicker(format),
		},
		background: {
			analysisContrast: backgroundAnalysisContrastColour(),
			analysisContrastHover: backgroundAnalysisContrastHoverColour(),
			bullet: backgroundBullet(format),
			bulletStandfirst: backgroundBulletStandfirst(format),
			imageTitle: backgroundImageTitle(format),
			lightboxDivider: backgroundLightboxDivider(format),
			speechBubble: backgroundSpeechBubble(format),
			headlineTag: backgroundHeadlineTag(format),
			mostViewedTab: backgroundMostViewedTab(format),
			filterButton: backgroundFilterButton(),
			filterButtonHover: backgroundFilterButtonHover(format),
			filterButtonActive: backgroundFilterButtonActive(format),
			treat: backgroundTreat(format),
			designTag: backgroundDesignTag(format),
			messageForm: backgroundMessageForm(format),
			dynamoSublink:
				overrides?.background.dynamoSublink ??
				backgroundDynamoSublink(format),
		},
		fill: {
			guardianLogo: fillGuardianLogo(format),
		},
		border: {
			pinnedPost: borderPinnedPost(format),
			standfirstLink: borderStandfirstLink(format),
			headline: borderHeadline(format),
			navPillar: borderNavPillar(format),
			lines: overrides?.border.lines ?? borderLines(format),
			cricketScoreboardTop: borderCricketScoreboardTop(),
			cricketScoreboardDivider: borderCricketScoreboardDivider(),
			cardSupporting: borderCardSupporting(format),
			filterButton: borderFilterButton(),
		},
		hover: {
			standfirstLink: hoverStandfirstLink(format),
		},
	};
};
