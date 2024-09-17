export type Colour = string;

export type Palette = {
	text: {
		standfirst: Colour;
		standfirstLink: Colour;
		disclaimerLink: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		betaLabel: Colour;
		dateLine: Colour;
		expandableAtom: Colour;
		expandableAtomHover: Colour;
	};
	background: {
		analysisContrast: Colour;
		analysisContrastHover: Colour;
		bullet: Colour;
		bulletStandfirst: Colour;
		imageTitle: Colour;
		speechBubble: Colour;
		filterButton: Colour;
		filterButtonHover: Colour;
		filterButtonActive: Colour;
		treat: Colour;
		lightboxDivider: Colour;
	};
	fill: {
		guardianLogo: Colour;
	};
	border: {
		standfirstLink: Colour;
		headline: Colour;
		navPillar: Colour;
		lines: Colour;
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
		container: Colour;
		containerFooter: Colour;
		containerToggle: Colour;
		containerDate: Colour;
		containerSummary: Colour;
		liveKicker?: Colour;
	};
	border: {
		container: Colour;
		lines: Colour;
		carouselArrow: Colour;
	};
	background: {
		card: Colour;
		container: Colour;
		containerLeftColumn?: Colour;
		containerOuter?: Colour;
		containerSummary?: Colour;
		carouselDot: Colour;
		carouselArrow: Colour;
		carouselArrowHover: Colour;
		liveKicker?: Colour;
		pulsingDot?: Colour;
	};
	topBar?: {
		card?: Colour;
	};
};
