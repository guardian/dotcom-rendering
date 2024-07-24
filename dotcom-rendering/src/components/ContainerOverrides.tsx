import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { transparentColour } from '../lib/transparentColour';
import { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import { useConfig } from './ConfigContext';

const cardHeadlineTrailTextLight: ContainerFunction = (
	containerPalette: DCRContainerPalette,
) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[300];
		case 'EventAltPalette':
			return sourcePalette.brand[300];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
		case 'Branded':
			return sourcePalette.neutral[20];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
	}
};
const cardHeadlineTrailTextDark: ContainerFunction = (
	containerPalette: DCRContainerPalette,
) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.neutral[93];
		case 'LongRunningPalette':
			return sourcePalette.neutral[93];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[800];
		case 'EventAltPalette':
			return sourcePalette.brand[800];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[86];
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
		case 'Branded':
			return sourcePalette.neutral[86];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
	}
};

const cardKickerTextLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[400];
		case 'LongRunningPalette':
			return sourcePalette.news[400];
		case 'LongRunningAltPalette':
			return sourcePalette.news[400];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[200];
		case 'EventAltPalette':
			return sourcePalette.news[400];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return sourcePalette.labs[200];
		case 'PodcastPalette':
		case 'MediaPalette':
			return sourcePalette.neutral[7];
	}
};
const cardKickerTextDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[200];
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[600];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[300];
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.labs[400];
		case 'PodcastPalette':
		case 'MediaPalette':
			return sourcePalette.neutral[7];
	}
};

const kickerTextLiveLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.specialReport[400];
		case 'LongRunningPalette':
			return sourcePalette.neutral[97];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[97];
		case 'SombrePalette':
			return sourcePalette.specialReport[300];
		case 'SombreAltPalette':
			return sourcePalette.specialReport[100];
		case 'BreakingPalette':
			return sourcePalette.news[200];
		case 'EventPalette':
			return sourcePalette.specialReport[800];
		case 'EventAltPalette':
			return sourcePalette.neutral[97];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.neutral[97];
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};

const kickerTextLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.specialReport[400];
		case 'LongRunningPalette':
			return sourcePalette.sport[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SombrePalette':
			return sourcePalette.specialReport[300];
		case 'SombreAltPalette':
			return sourcePalette.specialReport[100];
		case 'BreakingPalette':
			return sourcePalette.news[200];
		case 'EventPalette':
			return sourcePalette.specialReport[800];
		case 'EventAltPalette':
			return sourcePalette.neutral[97];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return sourcePalette.neutral[20];
		case 'MediaPalette':
		case 'PodcastPalette':
			return 'inherit';
	}
};

const kickerBackgroundLiveLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[400];
		case 'LongRunningPalette':
			return sourcePalette.news[400];
		case 'LongRunningAltPalette':
			return sourcePalette.news[400];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[200];
		case 'EventAltPalette':
			return sourcePalette.news[400];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return sourcePalette.labs[200];
		case 'PodcastPalette':
		case 'MediaPalette':
			return sourcePalette.neutral[7];
	}
};
const kickerBackgroundLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[200];
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[600];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[200];
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.labs[400];
		case 'PodcastPalette':
		case 'MediaPalette':
			return sourcePalette.neutral[7];
	}
};

const sectionToggleButtonLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[20];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SombrePalette':
			return sourcePalette.neutral[86];
		case 'SombreAltPalette':
			return sourcePalette.neutral[86];
		case 'InvestigationPalette':
			return sourcePalette.neutral[97];
		case 'BreakingPalette':
			return sourcePalette.neutral[46];
		case 'EventPalette':
			return sourcePalette.neutral[46];
		case 'EventAltPalette':
			return sourcePalette.neutral[46];
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[60];
		case 'Branded':
			return sourcePalette.neutral[7];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[86];
	}
};
const sectionToggleButtonDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[20];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SombrePalette':
			return sourcePalette.neutral[86];
		case 'SombreAltPalette':
			return sourcePalette.neutral[86];
		case 'InvestigationPalette':
			return sourcePalette.neutral[97];
		case 'BreakingPalette':
			return sourcePalette.neutral[46];
		case 'EventPalette':
			return sourcePalette.neutral[46];
		case 'EventAltPalette':
			return sourcePalette.neutral[46];
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[60];
		case 'Branded':
			return sourcePalette.neutral[7];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[86];
	}
};
const sectionToggleButtonHoverLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[7];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'SombreAltPalette':
			return sourcePalette.neutral[100];
		case 'InvestigationPalette':
			return sourcePalette.neutral[60];
		case 'BreakingPalette':
			return sourcePalette.neutral[7];
		case 'EventPalette':
			return sourcePalette.neutral[7];
		case 'EventAltPalette':
			return sourcePalette.neutral[7];
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[93];
		case 'Branded':
			return sourcePalette.neutral[20];
		case 'MediaPalette':
			return sourcePalette.neutral[7];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
	}
};
const sectionToggleButtonHoverDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return 'inherit';
		case 'LongRunningAltPalette':
			return 'inherit';
		case 'SombrePalette':
			return 'inherit';
		case 'SombreAltPalette':
			return 'inherit';
		case 'InvestigationPalette':
			return 'inherit';
		case 'BreakingPalette':
			return 'inherit';
		case 'EventPalette':
			return 'inherit';
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return 'inherit';
		case 'Branded':
			return 'inherit';
		case 'MediaPalette':
			return 'inherit';
		case 'PodcastPalette':
			return 'inherit';
	}
};

const cardBorderTopLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'SombreAltPalette':
			return sourcePalette.neutral[100];
		case 'InvestigationPalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[300];
		case 'EventAltPalette':
			return sourcePalette.brand[300];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[60];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[86];
	}
};
const cardBorderTopDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'SombreAltPalette':
			return sourcePalette.neutral[100];
		case 'InvestigationPalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[300];
		case 'EventAltPalette':
			return sourcePalette.brand[300];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[60];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[86];
	}
};

const articleBorderLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'SombreAltPalette':
			return sourcePalette.neutral[100];
		case 'InvestigationPalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[300];
		case 'EventAltPalette':
			return sourcePalette.brand[300];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[60];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[86];
	}
};

const articleBorderDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return transparentColour(sourcePalette.neutral[60], 0.4);
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[10];
		case 'SombrePalette':
			return sourcePalette.neutral[38];
		case 'SombreAltPalette':
			return sourcePalette.neutral[46];
		case 'InvestigationPalette':
			return sourcePalette.neutral[38];
		case 'BreakingPalette':
			return sourcePalette.neutral[10];
		case 'EventPalette':
			return sourcePalette.neutral[20];
		case 'EventAltPalette':
			return sourcePalette.neutral[10];
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[38];
		case 'Branded':
			return sourcePalette.neutral[38];
		case 'MediaPalette':
			return sourcePalette.neutral[46];
		case 'PodcastPalette':
			return sourcePalette.neutral[10];
	}
};

const cardBackgroundLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.specialReport[400];
		case 'LongRunningPalette':
			return sourcePalette.sport[800];
		case 'SombrePalette':
			return sourcePalette.specialReport[300];
		case 'BreakingPalette':
			return sourcePalette.news[200];
		case 'EventPalette':
			return sourcePalette.specialReport[800];
		case 'EventAltPalette':
			return sourcePalette.culture[800];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[93];
		case 'SombreAltPalette':
			return sourcePalette.neutral[7];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[800];
		case 'Branded':
			return palette('--section-background-inner');
		case 'MediaPalette':
			return sourcePalette.neutral[0];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
	}
};
const cardBackgroundDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return palette('--section-background-inner');
		case 'LongRunningPalette':
			return sourcePalette.sport[100];
		case 'SombrePalette':
			return sourcePalette.specialReport[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return palette('--section-background-inner');
		case 'MediaPalette':
			return sourcePalette.neutral[0];
		case 'BreakingPalette':
			return palette('--section-background-inner');
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
			return sourcePalette.neutral[100];
	}
};
const sectionBackgroundOuterDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'MediaPalette':
			return sourcePalette.neutral[0];
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
			return sourcePalette.neutral[7];
	}
};
const sectionBackgroundInnerLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.specialReport[400];
		case 'LongRunningPalette':
			return sourcePalette.sport[800];
		case 'SombrePalette':
			return sourcePalette.specialReport[300];
		case 'BreakingPalette':
			return sourcePalette.news[200];
		case 'EventPalette':
			return sourcePalette.specialReport[800];
		case 'EventAltPalette':
			return sourcePalette.culture[800];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[93];
		case 'SombreAltPalette':
			return sourcePalette.neutral[7];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[800];
		case 'Branded':
			return sourcePalette.neutral[93];
		case 'MediaPalette':
			return sourcePalette.neutral[0];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
	}
};
const sectionBackgroundInnerDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.sport[100];
		case 'SombrePalette':
			return sourcePalette.specialReport[100];
		case 'EventPalette':
			return sourcePalette.specialReport[100];
		case 'EventAltPalette':
			return sourcePalette.culture[50];
		case 'BreakingPalette':
			return sourcePalette.news[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return sourcePalette.neutral[20];
		case 'MediaPalette':
			return sourcePalette.neutral[0];

		case 'InvestigationPalette':
			return sourcePalette.neutral[20];
		case 'SombreAltPalette':
		case 'PodcastPalette':
			return sourcePalette.neutral[7];
	}
};

const sectionBackgroundLeftLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return sourcePalette.labs[400];
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
			return palette('--section-background-inner');
	}
};
const sectionBackgroundLeftDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return sourcePalette.labs[200];
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
			return palette('--section-background-inner');
	}
};

const sectionDateLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.news[400];
		case 'LongRunningAltPalette':
			return sourcePalette.news[200];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[400];
		case 'BreakingPalette':
			return sourcePalette.news[800];
		case 'EventPalette':
			return sourcePalette.news[400];
		case 'EventAltPalette':
			return sourcePalette.news[400];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return sourcePalette.neutral[100];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
	}
};

const sectionDateDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[800];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'InvestigationPalette':
			return sourcePalette.brandAlt[400];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.news[400];
		case 'EventAltPalette':
			return sourcePalette.news[400];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.neutral[100];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
	}
};

const sectionTitleLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningPalette':
			return sourcePalette.neutral[7];
		case 'SombrePalette':
			return sourcePalette.neutral[100];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[300];
		case 'EventAltPalette':
			return sourcePalette.brand[300];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[7];
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		// Branded is expected to be used with LabsSection
		case 'Branded':
			return sourcePalette.neutral[100];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
		case 'PodcastPalette':
			return sourcePalette.neutral[7];
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
			return sourcePalette.neutral[93];
		case 'InvestigationPalette':
			return sourcePalette.neutral[93];
		case 'BreakingPalette':
			return 'inherit';
		case 'EventPalette':
			return 'inherit';
		case 'EventAltPalette':
			return 'inherit';
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.neutral[97];
		case 'MediaPalette':
			return sourcePalette.neutral[100];
		case 'PodcastPalette':
			return 'inherit';
	}
};

const treatTextLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return sourcePalette.neutral[46];
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
			return sourcePalette.neutral[38];
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

const carouselDot: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return sourcePalette.neutral[7];
		default:
			return sourcePalette.brandAlt[400];
	}
};

const carouselActiveDot: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return sourcePalette.brandAlt[400];
		default:
			return sourcePalette.news[400];
	}
};

const carouselArrow: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return sourcePalette.neutral[100];
		default:
			return sourcePalette.neutral[7];
	}
};

const carouselArrowBackground: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return sourcePalette.neutral[7];
		default:
			return sourcePalette.brandAlt[400];
	}
};

const carouselArrowBackgroundHover: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'PodcastPalette':
			return sourcePalette.brandAlt[400];
		default:
			return sourcePalette.brandAlt[200];
	}
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
	'--section-toggle-button': {
		light: sectionToggleButtonLight,
		dark: sectionToggleButtonDark,
	},
	'--section-toggle-button-hover': {
		light: sectionToggleButtonHoverLight,
		dark: sectionToggleButtonHoverDark,
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
	'--card-border-top': {
		light: cardBorderTopLight,
		dark: cardBorderTopDark,
	},
	'--carousel-dot': {
		light: carouselDot,
		dark: carouselDot,
	},
	'--carousel-active-dot': {
		light: carouselActiveDot,
		dark: carouselActiveDot,
	},
	'--carousel-arrow': {
		light: carouselArrow,
		dark: carouselArrow,
	},
	'--carousel-arrow-background': {
		light: carouselArrowBackground,
		dark: carouselArrowBackground,
	},
	'--carousel-arrow-background-hover': {
		light: carouselArrowBackgroundHover,
		dark: carouselArrowBackgroundHover,
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
const containerPaletteDeclarations = (
	containerPalette: DCRContainerPalette,
	colourScheme: 'light' | 'dark',
): string[] =>
	Object.entries(containerColours).map(
		([colourName, colour]) =>
			`${colourName}: ${colour[colourScheme](containerPalette)};`,
	);

type Props = {
	children: React.ReactNode;
	containerPalette?: DCRContainerPalette;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/display-box#contents */
const displayContents = css`
	display: contents;
`;

/**
 * Add CSS custom property overrides for palette colours in a given container
 */
export const ContainerOverrides = ({ containerPalette, children }: Props) => {
	const { darkModeAvailable } = useConfig();
	const [isStorybook, setIsStorybook] = useState(false);

	useEffect(() => {
		if (!('STORIES' in window)) return;
		setIsStorybook(true);
	}, []);

	if (!containerPalette) return children;

	return (
		<div
			data-container-palette={containerPalette}
			css={[
				displayContents,
				containerPaletteDeclarations(containerPalette, 'light'),
				darkModeAvailable &&
					css`
						@media (prefers-color-scheme: dark) {
							${containerPaletteDeclarations(
								containerPalette,
								'dark',
							)}
						}
					`,
				isStorybook &&
					css`
						[data-color-scheme='light'] & {
							${containerPaletteDeclarations(
								containerPalette,
								'light',
							)}
						}

						[data-color-scheme='dark'] & {
							${containerPaletteDeclarations(
								containerPalette,
								'dark',
							)}
						}
					`,
			]}
		>
			{children}
		</div>
	);
};
