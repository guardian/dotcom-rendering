import { Display, Design, Special, Pillar } from '@guardian/types';
import type { Format } from '@guardian/types';
import {
	neutral,
	text,
	specialReport,
	opinion,
	news,
	sport,
	brandAltBackground,
	border,
	brand,
	brandAlt,
	lifestyle,
	culture,
	labs,
} from '@guardian/src-foundations';

// Here is the one place where we use `pillarPalette`
import { pillarPalette_DO_NOT_USE as pillarPalette } from '@root/src/lib/pillars';

const WHITE = neutral[100];
const BLACK = neutral[7];

const textHeadline = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			if (format.theme === Special.SpecialReport) return WHITE;
			switch (format.design) {
				case Design.PrintShop:
					return BLACK;
				default:
					return WHITE;
			}
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard: {
			if (
				format.theme === Special.SpecialReport &&
				format.design !== Design.Interview
			)
				return specialReport[100];
			switch (format.design) {
				case Design.Review:
				case Design.Recipe:
				case Design.Feature:
					return pillarPalette[format.theme].dark;
				case Design.Interview:
				case Design.LiveBlog:
					return WHITE;
				default:
					return BLACK;
			}
		}
		default:
			return BLACK;
	}
};

const textSeriesTitle = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	switch (format.display) {
		case Display.Immersive:
			return WHITE;
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard:
			switch (format.design) {
				case Design.LiveBlog:
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
				case Design.MatchReport:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return BLACK;
	}
};

const textSectionTitle = textSeriesTitle;

const textByline = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	switch (format.display) {
		case Display.Immersive:
			return WHITE;
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard:
			switch (format.design) {
				case Design.Interview:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textHeadlineByline = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	if (format.theme === Special.Labs) return BLACK;
	return pillarPalette[format.theme].main;
};

const textStandfirst = (format: Format): string => {
	if (format.design === Design.LiveBlog) return WHITE;
	return BLACK;
};

const textTwitterHandle = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textCaption = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	if (format.theme === Special.Labs) return neutral[20];

	switch (format.design) {
		case Design.PhotoEssay:
			return pillarPalette[format.theme].dark;
		default:
			return text.supporting;
	}
};

const textCaptionLink = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const textSubMeta = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return pillarPalette[format.theme].main;
};

const textSubMetaLabel = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textSubMetaLink = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textSyndicationButton = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return text.supporting;
};

const textArticleLink = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[400];
	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textDisclaimerLink = (format: Format): string =>
	pillarPalette[format.theme].dark;

const textWitnessIcon = (format: Format): string =>
	pillarPalette[format.theme].main;

const textWitnessTitle = (format: Format): string =>
	pillarPalette[format.theme].main;

const textWitnessAuthor = (format: Format): string =>
	pillarPalette[format.theme].main;

const textPullQuote = (format: Format): string => {
	return pillarPalette[format.theme].dark;
};

const textStandfirstLink = (format: Format): string => {
	if (format.design === Design.LiveBlog) return WHITE;
	if (format.theme === Special.SpecialReport) return specialReport[400];
	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textBranding = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	return pillarPalette[format.theme].main;
};

const textArticleLinkHover = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[100];
	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textCardHeadline = (format: Format): string => {
	if (format.display === Display.Immersive) return WHITE;
	if (format.theme === Special.SpecialReport) return WHITE;
	switch (format.design) {
		case Design.Feature:
		case Design.Interview:
			return pillarPalette[format.theme].dark;
		case Design.Media:
			return WHITE;
		case Design.LiveBlog:
			switch (format.theme) {
				case Special.Labs:
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

const textCardKicker = (format: Format): string => {
	if (
		format.theme === Special.SpecialReport &&
		(format.design === Design.Comment || format.design === Design.Letter)
	)
		// TODO: Pull this in from source as opinion[550]
		// https://theguardian.design/2a1e5182b/p/492a30-light-palette
		return '#ff9941';
	if (format.theme === Special.SpecialReport) return brandAlt[400];
	if (format.display === Display.Immersive)
		return pillarPalette[format.theme].bright;
	switch (format.design) {
		case Design.LiveBlog:
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
				case Special.Labs:
				default:
					return BLACK;
			}
		case Design.Media:
			switch (format.theme) {
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case Pillar.Lifestyle:
				case Pillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textCardFooter = (format: Format): string => {
	switch (format.design) {
		case Design.Comment:
		case Design.Letter:
			switch (format.theme) {
				case Special.SpecialReport:
					// TODO: Pull this in from souce once we see it here:
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				default:
					return neutral[60];
			}
		case Design.LiveBlog:
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
				case Special.SpecialReport:
					return brandAlt[400];
				case Special.Labs:
				default:
					return BLACK;
			}
		case Design.Media:
			switch (format.theme) {
				case Special.SpecialReport:
					return brandAlt[400];
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case Pillar.Lifestyle:
				case Pillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			switch (format.theme) {
				case Special.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[60];
			}
	}
};

const textLinkKicker = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const backgroundArticle = (format: Format): string => {
	if (format.design === Design.LiveBlog || format.design === Design.DeadBlog)
		return neutral[93];
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === Design.Letter) return opinion[800];
	if (format.design === Design.Comment) return opinion[800];
	if (format.design === Design.Editorial) return opinion[800];
	if (format.theme === Special.SpecialReport) return specialReport[800]; // Note, check theme rather than design here
	if (format.theme === Special.Labs && format.display !== Display.Immersive)
		return neutral[97];

	return 'transparent';
};

const backgroundSeriesTitle = (format: Format): string => {
	if (format.theme === Special.SpecialReport)
		return brandAltBackground.primary;
	switch (format.display) {
		case Display.Immersive:
			return pillarPalette[format.theme].main;
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard:
		default:
			return 'transparent';
	}
};

const backgroundSectionTitle = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			return pillarPalette[format.theme].main;
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard:
		default:
			return 'transparent';
	}
};

const backgroundAvatar = (format: Format): string => {
	switch (format.theme) {
		case Special.SpecialReport:
			return specialReport[800];
		case Pillar.Opinion:
			return pillarPalette[Pillar.Opinion].main;
		default:
			return pillarPalette[format.theme].bright;
	}
};

const backgroundCard = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	switch (format.design) {
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
			return opinion[800];
		case Design.Media:
			return neutral[20];
		case Design.LiveBlog:
			switch (format.theme) {
				case Special.Labs:
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

const backgroundHeadline = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			if (format.theme === Special.SpecialReport)
				return specialReport[300];
			return BLACK;
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard:
			if (format.design === Design.Interview) return BLACK;
			return 'transparent';
		default:
			return 'transparent';
	}
};

const backgroundHeadlineByline = (format: Format): string => {
	if (format.theme === Special.SpecialReport)
		return brandAltBackground.primary;
	return 'transparent';
};

const backgroundBullet = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const backgroundHeader = (format: Format): string => {
	switch (format.design) {
		case Design.LiveBlog:
			return pillarPalette[format.theme][400];
		default:
			return backgroundArticle(format);
	}
};

const backgroundStandfirst = (format: Format): string => {
	switch (format.design) {
		case Design.LiveBlog:
			return pillarPalette[format.theme][300];
		case Design.DeadBlog:
			return neutral[86];
		default:
			return backgroundArticle(format);
	}
};

const backgroundImageTitle = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const backgroundSpeechBubble = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const fillCommentCount = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillShareIcon = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillCaptionTriangle = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillBlockquoteIcon = (format: Format): string =>
	pillarPalette[format.theme].main;

const fillCardIcon = (format: Format): string => {
	// Setting Card clock colour for immersive cards to all be dark grey
	if (format.display === Display.Immersive) return neutral[60];
	switch (format.design) {
		case Design.Comment:
		case Design.Letter:
			switch (format.theme) {
				case Special.SpecialReport:
					// TODO: Pull this in from source once we see it here:
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				default:
					return neutral[46];
			}
			return lifestyle[500];
		case Design.LiveBlog:
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
				case Special.SpecialReport:
					return brandAlt[400];
				case Special.Labs:
				default:
					return BLACK;
			}
		case Design.Media:
			switch (format.theme) {
				case Special.SpecialReport:
					return brandAlt[400];
				case Pillar.News:
					return news[600];
				case Pillar.Sport:
					return sport[600];
				case Pillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case Pillar.Lifestyle:
				case Pillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			switch (format.theme) {
				case Special.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[46];
			}
	}
};

const borderSyndicationButton = (format: Format): string => {
	if (format.theme === Special.Labs) return neutral[60];
	return border.secondary;
};

const borderSubNav = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const borderLiveBlock = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const borderArticleLink = (format: Format): string => {
	if (format.theme === Special.Labs) return neutral[60];
	if (format.theme === Special.SpecialReport) return specialReport[400];
	return border.secondary;
};

const borderStandfirstLink = (format: Format): string => {
	if (format.design === Design.LiveBlog) return WHITE;
	if (format.theme === Special.SpecialReport) return specialReport[400];
	return border.secondary;
};

const borderHeadline = (format: Format): string => {
	if (format.design === Design.LiveBlog) return '#9F2423';
	if (format.design === Design.DeadBlog) return '#CDCDCD';
	return border.secondary;
};

const borderStandfirst = (format: Format): string => {
	if (format.design === Design.LiveBlog) return '#8C2222';
	if (format.design === Design.DeadBlog) return '#BDBDBD';
	return border.secondary;
};

const borderArticleLinkHover = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return pillarPalette[format.theme].main;
};

const topBarCard = (format: Format): string => {
	if (format.theme === Special.SpecialReport)
		return brandAltBackground.primary;
	return pillarPalette[format.theme].main;
};

const hoverHeadlineByline = (format: Format): string => {
	if (format.theme === Special.Labs) return BLACK;
	return pillarPalette[format.theme].dark;
};

const textRichLink: (format: Format) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[Pillar.News][400];
};

const borderRichLink: (format: Format) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[Pillar.News][400];
};

const borderNavPillar: (format: Format) => string = (format) =>
	pillarPalette[format.theme].bright;

const borderArticle: (format: Format) => string = (format) => {
	if (format.design === Design.LiveBlog || format.design === Design.DeadBlog)
		return '#CDCDCD';
	if (format.theme === Special.Labs) return neutral[60];
	return border.secondary;
};

const borderLines: (format: Format) => string = (format) => {
	if (format.theme === Special.Labs) return border.primary;
	return border.secondary;
};

const backgroundRichLink: (format: Format) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[Pillar.News][400];
};

const fillRichLink: (format: Format) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[Pillar.News][400];
};

const fillQuoteIcon: (format: Format) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[Pillar.News][400];
};

const textPullQuoteAttribution = (format: Format): string =>
	fillQuoteIcon(format);

const textSignInLink = (format: Format): string => {
	return pillarPalette[format.theme].dark;
};

const textCarouselTitle = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const textCalloutHeading = (): string => {
	return brand[500];
};

const textDropCap = (format: Format): string => {
	switch (format.design) {
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
			return format.theme === Pillar.Opinion
				? opinion[400]
				: pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].dark;
	}
};

const textBlockquote = (format: Format): string => {
	switch (format.design) {
		case Design.LiveBlog:
		case Design.DeadBlog:
			return BLACK;
		default:
			return neutral[46];
	}
};

const textNumberedTitle = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const textNumberedPosition = (): string => {
	return text.supporting;
};

const backgroundHeadlineTag = (format: Format): string =>
	pillarPalette[format.theme].dark;

const backgroundCarouselDot = (format: Format): string => {
	return pillarPalette[format.theme][400];
};

const backgroundCarouselDotFocus = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const backgroundMostViewedTab = (format: Format): string => {
	return pillarPalette[format.theme].dark;
};

export const decidePalette = (format: Format): Palette => {
	return {
		text: {
			headline: textHeadline(format),
			seriesTitle: textSeriesTitle(format),
			sectionTitle: textSectionTitle(format),
			byline: textByline(format),
			twitterHandle: textTwitterHandle(format),
			caption: textCaption(format),
			captionLink: textCaptionLink(format),
			subMeta: textSubMeta(format),
			subMetaLabel: textSubMetaLabel(format),
			subMetaLink: textSubMetaLink(format),
			syndicationButton: textSyndicationButton(format),
			articleLink: textArticleLink(format),
			articleLinkHover: textArticleLinkHover(format),
			cardHeadline: textCardHeadline(format),
			cardKicker: textCardKicker(format),
			linkKicker: textLinkKicker(format),
			cardStandfirst: textCardStandfirst(format),
			cardFooter: textCardFooter(format),
			headlineByline: textHeadlineByline(format),
			standfirst: textStandfirst(format),
			standfirstLink: textStandfirstLink(format),
			branding: textBranding(format),
			disclaimerLink: textDisclaimerLink(format),
			signInLink: textSignInLink(format),
			richLink: textRichLink(format),
			pullQuote: textPullQuote(format),
			pullQuoteAttribution: textPullQuoteAttribution(format),
			witnessIcon: textWitnessIcon(format),
			witnessAuthor: textWitnessAuthor(format),
			witnessTitle: textWitnessTitle(format),
			carouselTitle: textCarouselTitle(format),
			calloutHeading: textCalloutHeading(),
			dropCap: textDropCap(format),
			blockquote: textBlockquote(format),
			numberedTitle: textNumberedTitle(format),
			numberedPosition: textNumberedPosition(),
		},
		background: {
			article: backgroundArticle(format),
			seriesTitle: backgroundSeriesTitle(format),
			sectionTitle: backgroundSectionTitle(format),
			avatar: backgroundAvatar(format),
			card: backgroundCard(format),
			headline: backgroundHeadline(format),
			headlineByline: backgroundHeadlineByline(format),
			bullet: backgroundBullet(format),
			header: backgroundHeader(format),
			standfirst: backgroundStandfirst(format),
			richLink: backgroundRichLink(format),
			imageTitle: backgroundImageTitle(format),
			speechBubble: backgroundSpeechBubble(format),
			carouselDot: backgroundCarouselDot(format),
			carouselDotFocus: backgroundCarouselDotFocus(format),
			headlineTag: backgroundHeadlineTag(format),
			mostViewedTab: backgroundMostViewedTab(format),
		},
		fill: {
			commentCount: fillCommentCount(format),
			shareIcon: fillShareIcon(format),
			captionTriangle: fillCaptionTriangle(format),
			cardIcon: fillCardIcon(format),
			richLink: fillRichLink(format),
			quoteIcon: fillQuoteIcon(format),
			blockquoteIcon: fillBlockquoteIcon(format),
		},
		border: {
			syndicationButton: borderSyndicationButton(format),
			subNav: borderSubNav(format),
			articleLink: borderArticleLink(format),
			articleLinkHover: borderArticleLinkHover(format),
			liveBlock: borderLiveBlock(format),
			standfirstLink: borderStandfirstLink(format),
			headline: borderHeadline(format),
			standfirst: borderStandfirst(format),
			richLink: borderRichLink(format),
			navPillar: borderNavPillar(format),
			article: borderArticle(format),
			lines: borderLines(format),
		},
		topBar: {
			card: topBarCard(format),
		},
		hover: {
			headlineByline: hoverHeadlineByline(format),
		},
	};
};
