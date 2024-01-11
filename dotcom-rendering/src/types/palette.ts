export type Colour = string;

export type Palette = {
	text: {
		headlineWhenMatch: Colour;
		standfirst: Colour;
		standfirstLink: Colour;
		disclaimerLink: Colour;
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
		bullet: Colour;
		bulletStandfirst: Colour;
		imageTitle: Colour;
		speechBubble: Colour;
		headlineTag: Colour;
		mostViewedTab: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		treat: Colour;
		designTag: Colour;
		lightboxDivider: Colour;
		messageForm: Colour;
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
	};
	hover: {
		standfirstLink: Colour;
	};
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
