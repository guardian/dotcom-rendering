import {
	ArticleDisplay,
	ArticleDesign,
	ArticleSpecial,
	ArticlePillar,
} from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
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
			switch (format.design) {
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Feature:
					return pillarPalette[format.theme].dark;
				case ArticleDesign.Interview:
				case ArticleDesign.LiveBlog:
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
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return WHITE;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (format.design) {
				case ArticleDesign.LiveBlog:
					switch (format.theme) {
						case ArticlePillar.News:
							return news[600];
						case ArticlePillar.Sport:
						case ArticlePillar.Lifestyle:
						case ArticlePillar.Culture:
						case ArticlePillar.Opinion:
						default:
							return WHITE;
					}
				case ArticleDesign.MatchReport:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return BLACK;
	}
};

const textSectionTitle = textSeriesTitle;

const textByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return WHITE;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (format.design) {
				case ArticleDesign.Interview:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textHeadlineByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	return pillarPalette[format.theme].main;
};

const textStandfirst = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;
	return BLACK;
};

const textTwitterHandle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return text.supporting;
};

const textCaption = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	if (format.theme === ArticleSpecial.Labs) return neutral[20];

	switch (format.design) {
		case ArticleDesign.PhotoEssay:
			return pillarPalette[format.theme].dark;
		default:
			return text.supporting;
	}
};

const textCaptionLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return pillarPalette[format.theme].main;
};

const textSubMeta = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	return pillarPalette[format.theme].main;
};

const textSubMetaLabel = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return text.supporting;
};

const textSubMetaLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return text.supporting;
};

const textSyndicationButton = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	return text.supporting;
};

const textArticleLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];
	switch (format.theme) {
		case ArticlePillar.Opinion:
		case ArticlePillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
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
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];
	switch (format.theme) {
		case ArticlePillar.Opinion:
		case ArticlePillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textBranding = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	return pillarPalette[format.theme].main;
};

const textArticleLinkHover = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	switch (format.theme) {
		case ArticlePillar.Opinion:
		case ArticlePillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textCardHeadline = (format: ArticleFormat): string => {
	if (format.display === ArticleDisplay.Immersive) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport) return WHITE;
	switch (format.design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
			return pillarPalette[format.theme].dark;
		case ArticleDesign.Media:
			return WHITE;
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return BLACK;
				case ArticlePillar.News:
				case ArticlePillar.Sport:
				case ArticlePillar.Opinion:
				case ArticlePillar.Culture:
				case ArticlePillar.Lifestyle:
				default:
					return WHITE;
			}
		default:
			return BLACK;
	}
};

const textCardStandfirst = textCardHeadline;

const textCardKicker = (format: ArticleFormat): string => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		// TODO: Pull this in from source as opinion[550]
		// https://theguardian.design/2a1e5182b/p/492a30-light-palette
		return '#ff9941';
	if (format.theme === ArticleSpecial.SpecialReport) return brandAlt[400];
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return WHITE;
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.Labs:
				default:
					return BLACK;
			}
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case ArticlePillar.Lifestyle:
				case ArticlePillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textCardFooter = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					// TODO: Pull this in from souce once we see it here:
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				default:
					return neutral[60];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return WHITE;
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticleSpecial.Labs:
				default:
					return BLACK;
			}
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case ArticlePillar.Lifestyle:
				case ArticlePillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[60];
			}
	}
};

const textLinkKicker = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const backgroundArticle = (format: ArticleFormat): string => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	)
		return neutral[93];
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === ArticleDesign.Letter) return opinion[800];
	if (format.design === ArticleDesign.Comment) return opinion[800];
	if (format.design === ArticleDesign.Editorial) return opinion[800];
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[800]; // Note, check theme rather than design here
	if (
		format.theme === ArticleSpecial.Labs &&
		format.display !== ArticleDisplay.Immersive
	)
		return neutral[97];

	return 'transparent';
};

const backgroundSeriesTitle = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;
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

const backgroundAvatar = (format: ArticleFormat): string => {
	switch (format.theme) {
		case ArticleSpecial.SpecialReport:
			return specialReport[800];
		case ArticlePillar.Opinion:
			return pillarPalette[ArticlePillar.Opinion].main;
		default:
			return pillarPalette[format.theme].bright;
	}
};

const backgroundCard = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return opinion[800];
		case ArticleDesign.Media:
			return neutral[20];
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticlePillar.News:
				case ArticlePillar.Sport:
				case ArticlePillar.Opinion:
				case ArticlePillar.Lifestyle:
				case ArticlePillar.Culture:
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

const backgroundHeadlineByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;
	return 'transparent';
};

const backgroundBullet = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return pillarPalette[format.theme].main;
};

const backgroundBulletStandfirst = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			return neutral[60];
		default:
			return neutral[86]; // default previously defined in Standfirst.tsx
	}
};

const backgroundHeader = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return pillarPalette[format.theme][400];
		default:
			return backgroundArticle(format);
	}
};

const backgroundStandfirst = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return pillarPalette[format.theme][300];
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return backgroundArticle(format);
	}
};

const backgroundImageTitle = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const backgroundSpeechBubble = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const fillCommentCount = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillShareIcon = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillCaptionCamera = (format: ArticleFormat): string =>
	textCaption(format);

const fillBlockquoteIcon = (format: ArticleFormat): string =>
	pillarPalette[format.theme].main;

const fillCardIcon = (format: ArticleFormat): string => {
	// Setting Card clock colour for immersive cards to all be dark grey
	if (format.display === ArticleDisplay.Immersive) return neutral[60];
	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					// TODO: Pull this in from source once we see it here:
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				default:
					return neutral[46];
			}
			return lifestyle[500];
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return WHITE;
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticleSpecial.Labs:
				default:
					return BLACK;
			}
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAlt[400];
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					// TODO: Pull this in from source as opinion[550]
					// https://theguardian.design/2a1e5182b/p/492a30-light-palette
					return '#ff9941';
				case ArticlePillar.Lifestyle:
				case ArticlePillar.Culture:
				default:
					return pillarPalette[format.theme][500];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return brandAltBackground.primary;
				default:
					return neutral[46];
			}
	}
};

const borderSyndicationButton = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return neutral[60];
	return border.secondary;
};

const borderSubNav = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const borderLiveBlock = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const borderArticleLink = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return neutral[60];
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];
	return border.secondary;
};

const borderStandfirstLink = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return WHITE;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[400];
	return border.secondary;
};

const borderHeadline = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return '#9F2423';
	if (format.design === ArticleDesign.DeadBlog) return '#CDCDCD';
	return border.secondary;
};

const borderStandfirst = (format: ArticleFormat): string => {
	if (format.design === ArticleDesign.LiveBlog) return '#8C2222';
	if (format.design === ArticleDesign.DeadBlog) return '#BDBDBD';
	return border.secondary;
};

const borderArticleLinkHover = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	if (format.theme === ArticleSpecial.SpecialReport)
		return specialReport[100];
	return pillarPalette[format.theme].main;
};

const topBarCard = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return brandAltBackground.primary;
	return pillarPalette[format.theme].main;
};

const hoverHeadlineByline = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) return BLACK;
	return pillarPalette[format.theme].dark;
};

const textRichLink: (format: ArticleFormat) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[ArticlePillar.News][400];
};

const borderRichLink: (format: ArticleFormat) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[ArticlePillar.News][400];
};

const borderNavPillar: (format: ArticleFormat) => string = (format) =>
	pillarPalette[format.theme].bright;

const borderArticle: (format: ArticleFormat) => string = (format) => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	)
		return '#CDCDCD';
	if (format.theme === ArticleSpecial.Labs) return neutral[60];
	return border.secondary;
};

const borderLines: (format: ArticleFormat) => string = (format) => {
	if (format.theme === ArticleSpecial.Labs) return border.primary;
	return border.secondary;
};

const backgroundRichLink: (format: ArticleFormat) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[ArticlePillar.News][400];
};

const fillRichLink: (format: ArticleFormat) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[ArticlePillar.News][400];
};

const fillQuoteIcon: (format: ArticleFormat) => string = (format) => {
	if (format) {
		return pillarPalette[format.theme].main;
	}
	return pillarPalette[ArticlePillar.News][400];
};

const textPullQuoteAttribution = (format: ArticleFormat): string =>
	fillQuoteIcon(format);

const textSignInLink = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
};

const textCarouselTitle = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const textCalloutHeading = (): string => {
	return brand[500];
};

const textDropCap = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return format.theme === ArticlePillar.Opinion
				? pillarPalette[format.theme].main
				: pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].dark;
	}
};

const textBlockquote = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return BLACK;
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

const textOverlayed = (): string => {
	return WHITE;
};

const backgroundHeadlineTag = (format: ArticleFormat): string =>
	pillarPalette[format.theme].dark;

const backgroundCarouselDot = (format: ArticleFormat): string => {
	return pillarPalette[format.theme][400];
};

const backgroundCarouselDotFocus = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].main;
};

const backgroundMostViewedTab = (format: ArticleFormat): string => {
	return pillarPalette[format.theme].dark;
};

const textPagination = (format: ArticleFormat): string => {
	switch (format.theme) {
		case ArticlePillar.News:
		case ArticlePillar.Lifestyle:
		case ArticlePillar.Sport:
			return pillarPalette[format.theme][400];
		default:
			return pillarPalette[format.theme][300];
	}
};

const borderPagination = (): string => {
	return neutral[86];
};

const hoverPagination = (format: ArticleFormat): string => {
	switch (format.theme) {
		case ArticlePillar.News:
		case ArticlePillar.Lifestyle:
		case ArticlePillar.Sport:
			return pillarPalette[format.theme][400];
		default:
			return pillarPalette[format.theme][300];
	}
};

export const decidePalette = (format: ArticleFormat): Palette => {
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
			overlayedCaption: textOverlayed(),
			pagination: textPagination(format),
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
			bulletStandfirst: backgroundBulletStandfirst(format),
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
			cameraCaptionIcon: fillCaptionCamera(format),
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
			pagination: borderPagination(),
		},
		topBar: {
			card: topBarCard(format),
		},
		hover: {
			headlineByline: hoverHeadlineByline(format),
			pagination: hoverPagination(format),
		},
	};
};
