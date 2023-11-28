export type Colour = string;

export type Palette = {
	text: {
		headline: Colour;
		headlineWhenMatch: Colour;
		seriesTitle: Colour;
		sectionTitle: Colour;
		seriesTitleWhenMatch: Colour;
		articleLink: Colour;
		articleLinkHover: Colour;
		cardHeadline: Colour;
		cardKicker: Colour;
		dynamoHeadline: Colour;
		dynamoKicker: Colour;
		dynamoMeta: Colour;
		cardStandfirst: Colour;
		cardFooter: Colour;
		standfirst: Colour;
		standfirstLink: Colour;
		lastUpdated: Colour;
		disclaimerLink: Colour;
		signInLink: Colour;
		witnessIcon: Colour;
		witnessAuthor: Colour;
		witnessTitle: Colour;
		carouselTitle: Colour;
		pagination: Colour;
		dropCap: Colour;
		numberedTitle: Colour;
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
		subNavLink: Colour;
		youtubeOverlayKicker: Colour;
	};
	background: {
		article: Colour;
		audioAtom: Colour;
		seriesTitle: Colour;
		sectionTitle: Colour;
		card: Colour;
		headline: Colour;
		bullet: Colour;
		bulletStandfirst: Colour;
		standfirst: Colour;
		imageTitle: Colour;
		speechBubble: Colour;
		carouselDot: Colour;
		headlineTag: Colour;
		mostViewedTab: Colour;
		matchNav: Colour;
		analysisUnderline: Colour;
		matchStats: Colour;
		ageWarning: Colour;
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
		commentCount: Colour;
		commentCountUntilDesktop: Colour;
		guardianLogo: Colour;
	};
	border: {
		subNav: Colour;
		articleLink: Colour;
		articleLinkHover: Colour;
		liveBlock: Colour;
		pinnedPost: Colour;
		standfirstLink: Colour;
		headline: Colour;
		standfirst: Colour;
		navPillar: Colour;
		article: Colour;
		lines: Colour;
		matchTab: Colour;
		activeMatchTab: Colour;
		cricketScoreboardTop: Colour;
		cricketScoreboardDivider: Colour;
		cardSupporting: Colour;
		filterButton: Colour;
		secondary: Colour;
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
