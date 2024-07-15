import { palette } from '@guardian/source/foundations';
import type { DCRContainerPalette } from '../types/front';
import type { ContainerOverrides } from '../types/palette';
import { transparentColour } from './transparentColour';

const {
	brand,
	brandAlt,
	culture,
	news,
	neutral,
	specialReport,
	specialReportAlt,
	sport,
	labs,
} = palette;

const textCardHeadline = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return neutral[100];
		case 'LongRunningPalette':
			return neutral[7];
		case 'SombrePalette':
			return neutral[100];
		case 'BreakingPalette':
			return neutral[100];
		case 'EventPalette':
			return brand[300];
		case 'EventAltPalette':
			return brand[300];
		case 'LongRunningAltPalette':
			return neutral[7];
		case 'SombreAltPalette':
			return neutral[93];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'PodcastPalette':
			return neutral[100];
		case 'Branded':
			return neutral[20];
	}
};

const textCardStandfirst = textCardHeadline;
const textCardFooter = textCardHeadline;

const textContainerSummary = (
	containerPalette: DCRContainerPalette,
): string => {
	switch (containerPalette) {
		case 'Branded':
			return labs[400];
		default:
			return neutral[46];
	}
};

const backgroundContainerLeftColumn = (
	containerPalette: Extract<DCRContainerPalette, 'Branded'>,
): string => {
	switch (containerPalette) {
		case 'Branded':
			return labs[400];
	}
};

const backgroundContainerOuter = (
	containerPalette: Extract<DCRContainerPalette, 'MediaPalette'>,
): string => {
	switch (containerPalette) {
		case 'MediaPalette':
			return neutral[100];
	}
};

const backgroundContainerSummary = (
	containerPalette: Extract<DCRContainerPalette, 'Branded'>,
): string => {
	switch (containerPalette) {
		case 'Branded':
			return neutral[0];
	}
};

const borderCarouselArrow = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return neutral[100];
		default:
			return neutral[7];
	}
};

const backgroundCarouselDot = (
	containerPalette: DCRContainerPalette,
): string => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return neutral[7];
		default:
			return brandAlt[400];
	}
};

const backgroundCarouselArrow = (
	containerPalette: DCRContainerPalette,
): string => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return neutral[7];
		default:
			return brandAlt[400];
	}
};

const backgroundCarouselArrowHover = (
	containerPalette: DCRContainerPalette,
): string => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return brandAlt[400];
		default:
			return brandAlt[200];
	}
};

const textCardKicker = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string | undefined => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'LongRunningPalette':
			return news[400];
		case 'LongRunningAltPalette':
			return news[400];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return specialReportAlt[200];
		case 'EventAltPalette':
			return news[400];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return labs[200];
		case 'PodcastPalette':
			return undefined;
	}
};

const textCardByline = textCardKicker;

const textContainerDate = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'LongRunningPalette':
			return news[400];
		case 'LongRunningAltPalette':
			return news[400];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return specialReportAlt[200];
		case 'EventAltPalette':
			return news[400];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return neutral[100];
		case 'MediaPalette':
			return neutral[100];
		case 'PodcastPalette':
			return neutral[100];
	}
};

const textCardCommentCount = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return neutral[46];
		case 'LongRunningAltPalette':
			return neutral[46];
		case 'SombrePalette':
			return neutral[86];
		case 'SombreAltPalette':
			return neutral[60];
		case 'InvestigationPalette':
			return neutral[86];
		case 'BreakingPalette':
			return neutral[86];
		case 'EventPalette':
			return neutral[46];
		case 'EventAltPalette':
			return neutral[20];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'PodcastPalette':
			return neutral[86];
		case 'Branded':
			return neutral[46];
	}
};

const textLiveKicker = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string | undefined => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return specialReport[400];
		case 'LongRunningPalette':
			return neutral[97];
		case 'LongRunningAltPalette':
			return neutral[97];
		case 'SombrePalette':
			return specialReport[300];
		case 'SombreAltPalette':
			return specialReport[100];
		case 'BreakingPalette':
			return news[200];
		case 'EventPalette':
			return specialReport[800];
		case 'EventAltPalette':
			return neutral[97];
		case 'SpecialReportAltPalette':
			return neutral[97];
		case 'Branded':
			return neutral[97];
		case 'PodcastPalette':
			return undefined;
	}
};

const textContainer = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return neutral[100];
		case 'LongRunningPalette':
			return neutral[7];
		case 'SombrePalette':
			return neutral[100];
		case 'BreakingPalette':
			return neutral[100];
		case 'EventPalette':
			return brand[300];
		case 'EventAltPalette':
			return brand[300];
		case 'LongRunningAltPalette':
			return neutral[7];
		case 'SombreAltPalette':
			return neutral[93];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		// Branded is expected to be used with LabsSection
		case 'Branded':
			return neutral[100];
		case 'MediaPalette':
			return neutral[100];
		case 'PodcastPalette':
			return neutral[7];
	}
};

const textContainerToggle = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return neutral[20];
		case 'LongRunningAltPalette':
			return neutral[20];
		case 'SombrePalette':
			return neutral[86];
		case 'SombreAltPalette':
			return neutral[86];
		case 'InvestigationPalette':
			return neutral[97];
		case 'BreakingPalette':
			return neutral[46];
		case 'EventPalette':
			return neutral[46];
		case 'EventAltPalette':
			return neutral[46];
		case 'SpecialReportAltPalette':
			return neutral[60];
		case 'Branded':
			return neutral[7];
		case 'MediaPalette':
			return neutral[46];
		case 'PodcastPalette':
			return neutral[86];
	}
};

const borderContainer = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return transparentColour(neutral[60], 0.4);
		case 'LongRunningAltPalette':
			return neutral[86];
		case 'SombrePalette':
			return neutral[60];
		case 'SombreAltPalette':
			return neutral[46];
		case 'InvestigationPalette':
			return neutral[60];
		case 'BreakingPalette':
			return neutral[86];
		case 'EventPalette':
			return neutral[86];
		case 'EventAltPalette':
			return neutral[86];
		case 'SpecialReportAltPalette':
			return neutral[60];
		case 'Branded':
			return neutral[60];
		case 'MediaPalette':
			return neutral[46];
		case 'PodcastPalette':
			return neutral[86];
	}
};

const borderLines = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return neutral[100];
		case 'LongRunningAltPalette':
			return neutral[7];
		case 'SombrePalette':
			return neutral[100];
		case 'SombreAltPalette':
			return neutral[100];
		case 'InvestigationPalette':
			return neutral[100];
		case 'BreakingPalette':
			return neutral[100];
		case 'EventPalette':
			return brand[300];
		case 'EventAltPalette':
			return brand[300];
		case 'SpecialReportAltPalette':
			return transparentColour(neutral[46], 0.3);
		case 'Branded':
			return neutral[60];
		case 'MediaPalette':
			return neutral[46];
		case 'PodcastPalette':
			return neutral[86];
	}
};

const backgroundContainer = (containerPalette: DCRContainerPalette): string => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return specialReport[400];
		case 'LongRunningPalette':
			return sport[800];
		case 'SombrePalette':
			return specialReport[300];
		case 'BreakingPalette':
			return news[200];
		case 'EventPalette':
			return specialReport[800];
		case 'EventAltPalette':
			return culture[800];
		case 'LongRunningAltPalette':
			return neutral[93];
		case 'SombreAltPalette':
			return neutral[7];
		case 'SpecialReportAltPalette':
			return specialReportAlt[800];
		case 'Branded':
			return neutral[93];
		case 'MediaPalette':
			return neutral[0];
		case 'PodcastPalette':
			return neutral[100];
	}
};

const backgroundLiveKicker = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string | undefined => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'LongRunningPalette':
			return news[400];
		case 'LongRunningAltPalette':
			return news[400];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return specialReportAlt[200];
		case 'EventAltPalette':
			return news[400];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return labs[200];
		case 'PodcastPalette':
			return undefined;
	}
};

const backgroundPulsingDot = (
	containerPalette: Exclude<DCRContainerPalette, 'MediaPalette'>,
): string | undefined => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return transparentColour(specialReport[400], 0.75);
		case 'LongRunningPalette':
		case 'LongRunningAltPalette':
			return transparentColour(news[600], 0.75);
		case 'SombrePalette':
			return transparentColour(specialReport[300], 0.75);
		case 'SombreAltPalette':
			return transparentColour(specialReport[100], 0.75);
		case 'BreakingPalette':
			return transparentColour(news[200], 0.75);
		case 'EventPalette':
			return transparentColour(specialReport[800], 0.75);
		case 'EventAltPalette':
			return transparentColour(news[600], 0.75);
		case 'SpecialReportAltPalette':
			return transparentColour(neutral[97], 0.75);
		case 'Branded':
			return transparentColour(neutral[97], 0.75);
		case 'PodcastPalette':
			return undefined;
	}
};

/**
 * When a container is given a special `containerPalette` then this function decides the override colours to be used
 * for it and its cards
 *
 * @see {@link https://github.com/guardian/interactive-atom-container-colours/blob/master/shared/css/_variables.scss Frontend code}
 * @param {DCRContainerPalette} containerPalette
 * @returns {ContainerOverrides} an object with the overrides set as properties
 */
export const decideContainerOverrides = (
	containerPalette: DCRContainerPalette,
): ContainerOverrides => {
	if (containerPalette === 'Branded') {
		return {
			text: {
				cardHeadline: textCardHeadline(containerPalette),
				cardKicker: textCardKicker(containerPalette),
				liveKicker: textLiveKicker(containerPalette),
				cardFooter: textCardFooter(containerPalette),
				container: textContainer(containerPalette),
				containerToggle: textContainerToggle(containerPalette),
				containerFooter: neutral[46],
				containerSummary: textContainerSummary(containerPalette),
				containerDate: textContainerDate(containerPalette),
			},
			border: {
				container: borderContainer(containerPalette),
				lines: borderLines(containerPalette),
				carouselArrow: borderCarouselArrow(containerPalette),
			},
			background: {
				card: backgroundContainer(containerPalette),
				container: backgroundContainer(containerPalette),
				containerLeftColumn:
					backgroundContainerLeftColumn(containerPalette),
				containerSummary: backgroundContainerSummary(containerPalette),
				carouselDot: backgroundCarouselDot(containerPalette),
				carouselArrow: backgroundCarouselArrow(containerPalette),
				carouselArrowHover:
					backgroundCarouselArrowHover(containerPalette),
				liveKicker: backgroundLiveKicker(containerPalette),
				pulsingDot: backgroundPulsingDot(containerPalette),
			},
		};
	}
	if (containerPalette === 'MediaPalette') {
		return {
			text: {
				container: textContainer(containerPalette),
				containerToggle: textContainerToggle(containerPalette),
				containerDate: textContainerDate(containerPalette),
				containerSummary: textContainerSummary(containerPalette),
				containerFooter: neutral[46],
			},
			border: {
				container: borderContainer(containerPalette),
				lines: borderLines(containerPalette),
				carouselArrow: borderCarouselArrow(containerPalette),
			},
			background: {
				card: backgroundContainer(containerPalette),
				container: backgroundContainer(containerPalette),
				containerOuter: backgroundContainerOuter(containerPalette),
				carouselDot: backgroundCarouselDot(containerPalette),
				carouselArrow: backgroundCarouselArrow(containerPalette),
				carouselArrowHover:
					backgroundCarouselArrowHover(containerPalette),
			},
		};
	}
	return {
		text: {
			cardHeadline: textCardHeadline(containerPalette),
			cardStandfirst: textCardStandfirst(containerPalette),
			cardKicker: textCardKicker(containerPalette),
			cardByline: textCardByline(containerPalette),
			cardFooter: textCardFooter(containerPalette),
			cardCommentCount: textCardCommentCount(containerPalette),
			liveKicker: textLiveKicker(containerPalette),
			container: textContainer(containerPalette),
			containerToggle: textContainerToggle(containerPalette),
			containerDate: textContainerDate(containerPalette),
			containerSummary: textContainerSummary(containerPalette),
			containerFooter: neutral[46],
		},
		border: {
			container: borderContainer(containerPalette),
			lines: borderLines(containerPalette),
			carouselArrow: borderCarouselArrow(containerPalette),
		},
		background: {
			card: backgroundContainer(containerPalette),
			container: backgroundContainer(containerPalette),
			carouselDot: backgroundCarouselDot(containerPalette),
			carouselArrow: backgroundCarouselArrow(containerPalette),
			carouselArrowHover: backgroundCarouselArrowHover(containerPalette),
			liveKicker: backgroundLiveKicker(containerPalette),
			pulsingDot: backgroundPulsingDot(containerPalette),
		},
	};
};
