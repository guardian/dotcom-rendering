import { palette as sourcePalette } from '@guardian/source/foundations';
import type { palette } from '../palette';
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
} = sourcePalette;

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
const cardHeadlineTrailTextLight: ContainerFunction = (
	containerPalette: DCRContainerPalette,
) => {
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
		case 'MediaPalette':
			return neutral[100];
	}
};
const cardHeadlineTrailTextDark: ContainerFunction = (
	containerPalette: DCRContainerPalette,
) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return neutral[93];
		case 'LongRunningPalette':
			return neutral[93];
		case 'SombrePalette':
			return neutral[100];
		case 'BreakingPalette':
			return neutral[100];
		case 'EventPalette':
			return brand[800];
		case 'EventAltPalette':
			return brand[800];
		case 'LongRunningAltPalette':
			return neutral[86];
		case 'SombreAltPalette':
			return neutral[93];
		case 'SpecialReportAltPalette':
			return specialReportAlt[700];
		case 'PodcastPalette':
			return neutral[100];
		case 'Branded':
			return neutral[86];
		case 'MediaPalette':
			return neutral[100];
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
		case 'LongRunningPalette':
			return news[400];
		case 'LongRunningAltPalette':
			return news[200];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'BreakingPalette':
			return news[200];
		case 'EventPalette':
			return news[400];
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

const cardKickerTextLight: ContainerFunction = (containerPalette) => {
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
		case 'MediaPalette':
			return neutral[7];
	}
};
const cardKickerTextDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return brandAlt[200];
		case 'LongRunningPalette':
			return news[600];
		case 'LongRunningAltPalette':
			return news[600];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return specialReportAlt[300];
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return specialReportAlt[700];
		case 'Branded':
			return labs[400];
		case 'PodcastPalette':
		case 'MediaPalette':
			return neutral[7];
	}
};

const kickerTextLiveLight: ContainerFunction = (containerPalette) => {
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
			return specialReportAlt[700];
		case 'Branded':
			return neutral[97];
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};

const kickerTextLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return specialReport[400];
		case 'LongRunningPalette':
			return sport[100];
		case 'LongRunningAltPalette':
			return neutral[20];
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
			return specialReportAlt[100];
		case 'Branded':
			return neutral[20];
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};

const kickerBackgroundLiveLight: ContainerFunction = (containerPalette) => {
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
		case 'MediaPalette':
			return neutral[7];
	}
};
const kickerBackgroundLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return brandAlt[200];
		case 'LongRunningPalette':
			return news[600];
		case 'LongRunningAltPalette':
			return news[600];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return specialReportAlt[200];
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return specialReportAlt[700];
		case 'Branded':
			return labs[400];
		case 'PodcastPalette':
		case 'MediaPalette':
			return neutral[7];
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

const articleBorderLight: ContainerFunction = (containerPalette) => {
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
const articleBorderDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return transparentColour(neutral[60], 0.4);
		case 'LongRunningAltPalette':
			return neutral[10];
		case 'SombrePalette':
			return neutral[38];
		case 'SombreAltPalette':
			return neutral[46];
		case 'InvestigationPalette':
			return neutral[38];
		case 'BreakingPalette':
			return neutral[10];
		case 'EventPalette':
			return neutral[93];
		case 'EventAltPalette':
			return neutral[10];
		case 'SpecialReportAltPalette':
			return neutral[38];
		case 'Branded':
			return neutral[38];
		case 'MediaPalette':
			return neutral[46];
		case 'PodcastPalette':
			return neutral[10];
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

const cardBackgroundLight: ContainerFunction = (containerPalette) => {
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
			return 'transparent';
		case 'MediaPalette':
			return neutral[0];
		case 'PodcastPalette':
			return neutral[100];
	}
};
const cardBackgroundDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return 'transparent';
		case 'LongRunningPalette':
			return sport[100];
		case 'SombrePalette':
			return specialReport[100];
		case 'LongRunningAltPalette':
			return neutral[20];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return 'transparent';
		case 'MediaPalette':
			return neutral[0];
		case 'BreakingPalette':
			return 'transparent';
		case 'SombreAltPalette':
		case 'EventPalette':
		case 'EventAltPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};

const sectionBackgroundOuterLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'MediaPalette':
		case 'EventPalette':
		case 'SombreAltPalette':
		case 'EventAltPalette':
		case 'InvestigationPalette':
		case 'LongRunningAltPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'SpecialReportAltPalette':
		case 'Branded':
		case 'PodcastPalette':
			return neutral[100];
	}
};
const sectionBackgroundOuterDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'MediaPalette':
			return neutral[0];
		case 'EventPalette':
		case 'SombreAltPalette':
		case 'EventAltPalette':
		case 'InvestigationPalette':
		case 'LongRunningAltPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'SpecialReportAltPalette':
		case 'Branded':
		case 'PodcastPalette':
			return neutral[7];
	}
};
const sectionBackgroundInnerLight: ContainerFunction = (containerPalette) => {
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
const sectionBackgroundInnerDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sport[100];
		case 'SombrePalette':
			return specialReport[100];
		case 'EventPalette':
			return specialReport[100];
		case 'EventAltPalette':
			return culture[50];
		case 'BreakingPalette':
			return news[100];
		case 'LongRunningAltPalette':
			return neutral[20];
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return neutral[20];
		case 'MediaPalette':
			return neutral[0];

		case 'InvestigationPalette':
			return neutral[20];
		case 'SombreAltPalette':
		case 'PodcastPalette':
			return neutral[7];
	}
};

const sectionBackgroundLeftLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return labs[400];
		case 'InvestigationPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'EventPalette':
		case 'EventAltPalette':
		case 'LongRunningAltPalette':
		case 'SombreAltPalette':
		case 'SpecialReportAltPalette':
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'transparent';
	}
};
const sectionBackgroundLeftDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return labs[200];
		case 'InvestigationPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'EventPalette':
		case 'EventAltPalette':
		case 'LongRunningAltPalette':
		case 'SombreAltPalette':
		case 'SpecialReportAltPalette':
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'transparent';
	}
};

const sectionDateLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return news[400];
		case 'LongRunningAltPalette':
			return news[200];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'BreakingPalette':
			return news[800];
		case 'EventPalette':
			return news[400];
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
const sectionDateDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return news[600];
		case 'LongRunningAltPalette':
			return news[800];
		case 'SombrePalette':
			return brand[800];
		case 'SombreAltPalette':
			return news[500];
		case 'InvestigationPalette':
			return brandAlt[400];
		case 'BreakingPalette':
			return news[600];
		case 'EventPalette':
			return news[400];
		case 'EventAltPalette':
			return news[400];
		case 'SpecialReportAltPalette':
			return specialReportAlt[700];
		case 'Branded':
			return neutral[100];
		case 'MediaPalette':
			return neutral[100];
		case 'PodcastPalette':
			return neutral[100];
	}
};

const sectionTitleLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return 'inherit';
		case 'LongRunningAltPalette':
			return 'inherit';
		case 'SombrePalette':
			return 'inherit';
		case 'SombreAltPalette':
			return neutral[93];
		case 'InvestigationPalette':
			return neutral[100];
		case 'BreakingPalette':
			return neutral[100];
		case 'EventPalette':
			return 'inherit';
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return specialReportAlt[100];
		case 'Branded':
			return neutral[100];
		case 'MediaPalette':
			return neutral[100];
		case 'PodcastPalette':
			return 'inherit';
	}
};
const sectionTitleDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return 'inherit';
		case 'LongRunningAltPalette':
			return 'inherit';
		case 'SombrePalette':
			return 'inherit';
		case 'SombreAltPalette':
			return neutral[93];
		case 'InvestigationPalette':
			return neutral[93];
		case 'BreakingPalette':
			return 'inherit';
		case 'EventPalette':
			return 'inherit';
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return specialReportAlt[700];
		case 'Branded':
			return neutral[97];
		case 'MediaPalette':
			return neutral[100];
		case 'PodcastPalette':
			return 'inherit';
	}
};

const treatTextLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return neutral[46];
		case 'EventPalette':
		case 'SombreAltPalette':
		case 'EventAltPalette':
		case 'InvestigationPalette':
		case 'LongRunningAltPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'SpecialReportAltPalette':
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};
const treatTextDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return neutral[38];
		case 'EventPalette':
		case 'SombreAltPalette':
		case 'EventAltPalette':
		case 'InvestigationPalette':
		case 'LongRunningAltPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'SpecialReportAltPalette':
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
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

type ColourName = Parameters<typeof palette>[0];

type ContainerFunction = (containerPalette: DCRContainerPalette) => string;

const containerColours = {
	'--card-background': {
		light: cardBackgroundLight,
		dark: cardBackgroundDark,
	},
	'--card-headline-trail-text': {
		light: cardHeadlineTrailTextLight,
		dark: cardHeadlineTrailTextDark,
	},
	'--card-footer-text': {
		light: cardHeadlineTrailTextLight,
		dark: cardHeadlineTrailTextDark,
	},
	'--card-kicker-text': {
		light: cardKickerTextLight,
		dark: cardKickerTextDark,
	},
	'--article-border': {
		light: articleBorderLight,
		dark: articleBorderDark,
	},
	'--article-section-title': {
		light: sectionTitleLight,
		dark: sectionTitleDark,
	},
	'--section-background-outer': {
		light: sectionBackgroundOuterLight,
		dark: sectionBackgroundOuterDark,
	},
	'--section-date': {
		light: sectionDateLight,
		dark: sectionDateDark,
	},
	'--section-background-inner': {
		light: sectionBackgroundInnerLight,
		dark: sectionBackgroundInnerDark,
	},
	'--section-background-left': {
		light: sectionBackgroundLeftLight,
		dark: sectionBackgroundLeftDark,
	},
	'--kicker-background-live': {
		light: kickerBackgroundLiveLight,
		dark: kickerBackgroundLiveDark,
	},
	'--kicker-text-live': {
		light: kickerTextLiveLight,
		dark: kickerTextLiveDark,
	},
	'--kicker-pulsing-dot-live': {
		light: kickerTextLiveLight,
		dark: kickerTextLiveDark,
	},
	'--byline': {
		light: cardKickerTextLight,
		dark: cardKickerTextDark,
	},
	'--treat-text': {
		light: treatTextLight,
		dark: treatTextDark,
	},
	'--carousel-text': {
		//text?.container
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-title-highlight': {
		//text?.container
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-border': {
		//border?.lines
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-dot': {
		//sourcePalette.neutral[93]
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-dot-hover': {
		//sourcePalette.neutral[86]
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-active-dot': {
		//background?.carouselDot
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-arrow': {
		//border?.carouselArrow
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-arrow-background': {
		//background?.carouselArrow
		light: () => 'inherit',
		dark: () => 'inherit',
	},
	'--carousel-arrow-background-hover': {
		//background?.carouselArrowHover
		light: () => 'inherit',
		dark: () => 'inherit',
	},
} as const satisfies Partial<
	Record<
		ColourName,
		{
			light: ContainerFunction;
			dark: ContainerFunction;
		}
	>
>;

/**
 * Builds a list of CSS custom property declarations representing colours.
 * These can be used to override the palette on any element, given a specific
 * container palette.
 */
export const containerDeclarations = (
	containerPalette: DCRContainerPalette,
	colourScheme: 'light' | 'dark',
): string[] =>
	Object.entries(containerColours).map(
		([colourName, colour]) =>
			`${colourName}: ${colour[colourScheme](containerPalette)};`,
	);
