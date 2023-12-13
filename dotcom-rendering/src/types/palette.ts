export type Colour = string;

export type Palette = {
	text: {
		headlineWhenMatch: Colour;
		cardHeadline: Colour;
		cardKicker: Colour;
		dynamoHeadline: Colour;
		dynamoKicker: Colour;
		cardStandfirst: Colour;
		cardFooter: Colour;
		standfirst: Colour;
		standfirstLink: Colour;
		lastUpdated: Colour;
		disclaimerLink: Colour;
		signInLink: Colour;
		pagination: Colour;
		numberedPosition: Colour;
		cricketScoreboardLink: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		betaLabel: Colour;
		designTag: Colour;
		dateLine: Colour;
		expandableAtom: Colour;
		expandableAtomHover: Colour;
		youtubeOverlayKicker: Colour;
	};
	background: {
		analysisContrast: Colour;
		analysisContrastHover: Colour;
		audioAtom: Colour;
		card: Colour;
		bullet: Colour;
		bulletStandfirst: Colour;
		imageTitle: Colour;
		speechBubble: Colour;
		headlineTag: Colour;
		mostViewedTab: Colour;
		analysisUnderline: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		treat: Colour;
		designTag: Colour;
		lightboxDivider: Colour;
		messageForm: Colour;
		discussionPillarButton: Colour;
		dynamoSublink: Colour;
	};
	fill: {
		guardianLogo: Colour;
	};
	border: {
		pinnedPost: Colour;
		standfirstLink: Colour;
		headline: Colour;
		navPillar: Colour;
		lines: Colour;
		cricketScoreboardTop: Colour;
		cricketScoreboardDivider: Colour;
		cardSupporting: Colour;
		filterButton: Colour;
		pagination: Colour;
	};
	topBar: {
		card: Colour;
	};
	hover: {
		standfirstLink: Colour;
		pagination: Colour;
	};
	discussionGeneric: Colour;
};

export type ContainerOverrides = {
	text: {
		cardHeadline?: Colour;
		cardStandfirst?: Colour;
		cardKicker?: Colour;
		cardByline?: Colour;
		cardFooter?: Colour;
		cardCommentCount?: Colour;
		dynamoHeadline?: Colour;
		dynamoKicker?: Colour;
		dynamoSublinkKicker?: Colour;
		dynamoMeta?: Colour;
		container: Colour;
		containerFooter: Colour;
		containerToggle: Colour;
		containerDate: Colour;
		containerSummary: Colour;
	};
	border: {
		container: Colour;
		lines: Colour;
		carouselArrow: Colour;
	};
	background: {
		container: Colour;
		containerLeftColumn?: Colour;
		containerOuter?: Colour;
		containerSummary?: Colour;
		card?: Colour;
		carouselDot: Colour;
		carouselArrow: Colour;
		carouselArrowHover: Colour;
		dynamoSublink: Colour;
	};
	topBar?: {
		card?: Colour;
	};
};
