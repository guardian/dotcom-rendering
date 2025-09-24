import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { transparentColour } from '../lib/transparentColour';
import { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import { useConfig } from './ConfigContext';

const cardHeadlineLight: ContainerFunction = (
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
		// TODO: @commercial-dev to update to neutral[7] when launching Redesigned Labs Containers
		case 'Branded':
			return sourcePalette.neutral[20];
	}
};
const cardHeadlineDark: ContainerFunction = (
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
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[86];
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.neutral[86];
	}
};

const cardTrailTextLight: ContainerFunction = (
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
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-trail-text') when launching Redesigned Labs Containers
			return sourcePalette.neutral[20];
	}
};
const cardTrailTextDark: ContainerFunction = (
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
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[86];
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-trail-text') when launching Redesigned Labs Containers
			return sourcePalette.neutral[86];
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
			// TODO: @commercial-dev to update to labs[100] when launching Redesigned Labs Containers
			return sourcePalette.labs[200];
	}
};
const cardKickerTextDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return cardKickerTextLight(containerPalette);
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[550];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[300];
		case 'EventAltPalette':
			return sourcePalette.news[600];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.labs[400];
	}
};

const cardQuoteIconLight: ContainerFunction = (containerPalette) => {
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
			// TODO: @commercial-dev to update to labs[100] when launching Redesigned Labs Containers
			return sourcePalette.labs[200];
	}
};
const cardQuoteIconDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return cardKickerTextLight(containerPalette);
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[550];
		case 'SombrePalette':
			return sourcePalette.brand[800];
		case 'SombreAltPalette':
			return sourcePalette.news[500];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.specialReportAlt[300];
		case 'EventAltPalette':
			return sourcePalette.news[600];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return sourcePalette.labs[400];
	}
};

const kickerTextLiveLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return palette('--card-background');
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
	}
};

const kickerTextLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return kickerTextLiveLight(containerPalette);
		case 'LongRunningPalette':
			return palette('--card-background');
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
	}
};
const kickerBackgroundLiveDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return kickerBackgroundLiveLight(containerPalette);
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[550];
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
			return palette('--section-toggle-button');
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
			return palette('--section-toggle-button');
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
			return palette('--section-toggle-button-hover');
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
	}
};

const cardBorderTopLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[60];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[60];
		case 'SombrePalette':
		case 'SombreAltPalette':
			return sourcePalette.neutral[60];
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.neutral[73];
		case 'EventAltPalette':
			return sourcePalette.neutral[73];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[73];
	}
};

const cardBorderTopDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[60];
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'BreakingPalette':
			return cardBorderTopLight(containerPalette);
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'EventPalette':
			return sourcePalette.brand[800];
		case 'EventAltPalette':
			return sourcePalette.neutral[60];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[60];
	}
};

const cardSublinksBackgroundLight: ContainerFunction = (containerPalette) => {
	return cardBackgroundLight(containerPalette);
};

const cardSublinksBackgroundDark: ContainerFunction = (containerPalette) => {
	return cardBackgroundDark(containerPalette);
};
const articleBorderLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[60];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[73];
		case 'SombrePalette':
			return sourcePalette.neutral[60];
		case 'SombreAltPalette':
			return sourcePalette.neutral[46];
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.neutral[73];
		case 'EventAltPalette':
			return sourcePalette.neutral[73];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[73];
	}
};

const articleBorderDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return transparentColour(sourcePalette.neutral[60], 0.4);
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[60];
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'InvestigationPalette':
		case 'BreakingPalette':
			return articleBorderLight(containerPalette);
		case 'EventPalette':
			return sourcePalette.neutral[38];
		case 'EventAltPalette':
			return sourcePalette.neutral[38];
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[38];
		case 'Branded':
			return sourcePalette.neutral[38];
	}
};

const cardBackgroundLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return palette('--section-background');
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
			return palette('--section-background');
	}
};

const cardBackgroundDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
			return palette('--section-background');
		case 'LongRunningPalette':
			return palette('--section-background');
		case 'SombrePalette':
			return palette('--section-background');
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return palette('--section-background');
		case 'BreakingPalette':
			return palette('--section-background');
		case 'SombreAltPalette':
		case 'EventPalette':
		case 'EventAltPalette':
			return 'inherit';
	}
};

const cardMediaBackgroundLight: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineLight(containerPalette), 0.1);
const cardMediaBackgroundDark: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineDark(containerPalette), 0.1);

const cardMediaWaveformLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
		case 'SombrePalette':
		case 'SombreAltPalette':
			return sourcePalette.neutral[46];
		case 'LongRunningPalette':
		case 'EventPalette':
			return sourcePalette.neutral[86];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[73];
		case 'BreakingPalette':
			return sourcePalette.news[300];
		case 'EventAltPalette':
			return sourcePalette.culture[600];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[800];
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-media-waveform') when launching Redesigned Labs Containers
			return sourcePalette.neutral[86];
	}
};

const cardMediaWaveformDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
		case 'LongRunningAltPalette':
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'EventPalette':
		case 'SpecialReportAltPalette':
			return sourcePalette.neutral[38];
		case 'LongRunningPalette':
			return sourcePalette.brand[400];
		case 'BreakingPalette':
			return sourcePalette.news[300];
		case 'EventAltPalette':
			return sourcePalette.culture[300];
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-media-waveform') when launching Redesigned Labs Containers
			return sourcePalette.neutral[38];
	}
};

const sectionBackgroundLight: ContainerFunction = (containerPalette) => {
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
			return palette('--section-background');
	}
};

const sectionBackgroundDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'InvestigationPalette':
		case 'BreakingPalette':
			return sectionBackgroundLight(containerPalette);
		case 'LongRunningPalette':
			return sourcePalette.brand[300];
		case 'SombrePalette':
			return sourcePalette.specialReport[300];
		case 'SombreAltPalette':
			return sourcePalette.neutral[7];
		case 'EventPalette':
			return sourcePalette.specialReport[100];
		case 'EventAltPalette':
			return sourcePalette.neutral[20];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[20];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return palette('--section-background');
	}
};

const sectionBackgroundLeftLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'Branded':
			return sourcePalette.labs[700];
		case 'InvestigationPalette':
		case 'LongRunningPalette':
		case 'SombrePalette':
		case 'BreakingPalette':
		case 'EventPalette':
		case 'EventAltPalette':
		case 'LongRunningAltPalette':
		case 'SombreAltPalette':
		case 'SpecialReportAltPalette':
			return palette('--section-background');
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
			return palette('--section-background');
	}
};

const cardBorderSupportingLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[73];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[73];
		case 'SombrePalette':
		case 'SombreAltPalette':
			return sourcePalette.neutral[60];
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.neutral[73];
		case 'EventAltPalette':
			return sourcePalette.neutral[73];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-border-supporting') when launching Redesigned Labs Containers
			return sourcePalette.neutral[73];
	}
};
const cardBorderSupportingDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[73];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[60];
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'BreakingPalette':
			return cardBorderTopLight(containerPalette);
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'EventPalette':
			return sourcePalette.brand[800];
		case 'EventAltPalette':
			return sourcePalette.neutral[60];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			// TODO: @commercial-dev to update to palette('--card-border-supporting') when launching Redesigned Labs Containers
			return sourcePalette.neutral[46];
	}
};

const sectionBorderLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
		case 'LongRunningAltPalette':
		case 'EventPalette':
		case 'EventAltPalette':
		case 'Branded':
			return sourcePalette.neutral[86];
		case 'SombrePalette':
		case 'SombreAltPalette':
			return sourcePalette.neutral[60];
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'BreakingPalette':
			return sourcePalette.news[600];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
	}
};
const sectionBorderDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'EventPalette':
			return sourcePalette.neutral[46];
		case 'LongRunningPalette':
			return sourcePalette.neutral[46];
		case 'LongRunningAltPalette':
			return sourcePalette.neutral[60];
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'BreakingPalette':
			return cardBorderTopLight(containerPalette);
		case 'InvestigationPalette':
			return sourcePalette.neutral[73];
		case 'EventAltPalette':
			return sourcePalette.neutral[46];
		case 'SpecialReportAltPalette':
			return transparentColour(sourcePalette.neutral[46], 0.3);
		case 'Branded':
			return sourcePalette.neutral[46];
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
			return sourcePalette.news[600];
		case 'EventPalette':
			return sourcePalette.news[400];
		case 'EventAltPalette':
			return sourcePalette.news[400];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[100];
		case 'Branded':
			return palette('--section-date');
	}
};

const sectionDateDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.news[600];
		case 'LongRunningAltPalette':
			return sourcePalette.news[550];
		case 'SombrePalette':
		case 'SombreAltPalette':
		case 'InvestigationPalette':
		case 'BreakingPalette':
			return sectionDateLight(containerPalette);
		case 'EventPalette':
			return sourcePalette.specialReportAlt[300];
		case 'EventAltPalette':
			return sourcePalette.news[600];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return palette('--section-date');
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
			return palette('--article-section-title');
	}
};

const sectionTitleDark: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return sourcePalette.neutral[100];
		case 'LongRunningAltPalette':
			return 'inherit';
		case 'SombrePalette':
			return 'inherit';
		case 'SombreAltPalette':
			return sourcePalette.neutral[93];
		case 'InvestigationPalette':
			return sourcePalette.neutral[93];
		case 'BreakingPalette':
			return sourcePalette.neutral[100];
		case 'EventPalette':
			return sourcePalette.brand[800];
		case 'EventAltPalette':
			return sourcePalette.neutral[100];
		case 'SpecialReportAltPalette':
			return sourcePalette.specialReportAlt[700];
		case 'Branded':
			return palette('--article-section-title');
	}
};

const treatTextLight: ContainerFunction = () => 'inherit';
const treatTextDark: ContainerFunction = () => 'inherit';

const carouselDotLight: ContainerFunction = () => sourcePalette.brandAlt[400];
const carouselDotDark: ContainerFunction = () => sourcePalette.brandAlt[400];

const carouselActiveDotLight: ContainerFunction = () => sourcePalette.news[400];
const carouselActiveDotDark: ContainerFunction = () => sourcePalette.news[400];

const carouselArrow: ContainerFunction = () => sourcePalette.neutral[7];

const carouselArrowBackground: ContainerFunction = () =>
	sourcePalette.brandAlt[400];

const carouselArrowBackgroundHover: ContainerFunction = () =>
	sourcePalette.brandAlt[200];

const carouselChevronLight: ContainerFunction = (containerPalette) =>
	cardHeadlineLight(containerPalette);
const carouselChevronDark: ContainerFunction = (containerPalette) =>
	cardHeadlineDark(containerPalette);

const carouselChevronHoverLight: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineLight(containerPalette), 0.1);
const carouselChevronHoverDark: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineDark(containerPalette), 0.1);

const carouselChevronBorderLight: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineLight(containerPalette), 0.2);
const carouselChevronBorderDark: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineDark(containerPalette), 0.4);

const carouselChevronDisabledLight: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineLight(containerPalette), 0.2);
const carouselChevronDisabledDark: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineDark(containerPalette), 0.4);

const carouselChevronBorderDisabledLight: ContainerFunction = (
	containerPalette,
) => transparentColour(cardHeadlineLight(containerPalette), 0.2);
const carouselChevronBorderDisabledDark: ContainerFunction = (
	containerPalette,
) => transparentColour(cardHeadlineDark(containerPalette), 0.4);

const slideshowPaginationDotLight: ContainerFunction = (containerPalette) => {
	switch (containerPalette) {
		case 'BreakingPalette':
		case 'InvestigationPalette':
		case 'SombrePalette':
		case 'SombreAltPalette':
			return transparentColour(cardHeadlineLight(containerPalette), 0.4);
		default:
			return transparentColour(cardHeadlineLight(containerPalette), 0.2);
	}
};

const slideshowPaginationDotDark: ContainerFunction = (containerPalette) =>
	transparentColour(cardHeadlineDark(containerPalette), 0.4);

const slideshowPaginationDotActiveLight: ContainerFunction = (
	containerPalette,
) => cardHeadlineLight(containerPalette);
const slideshowPaginationDotActiveDark: ContainerFunction = (
	containerPalette,
) => cardHeadlineDark(containerPalette);

type ColourName = Parameters<typeof palette>[0];

type ContainerFunction = (containerPalette: DCRContainerPalette) => string;

const containerColours = {
	'--card-background': {
		light: cardBackgroundLight,
		dark: cardBackgroundDark,
	},
	'--card-headline': {
		light: cardHeadlineLight,
		dark: cardHeadlineDark,
	},
	'--card-footer-text': {
		light: cardTrailTextLight,
		dark: cardTrailTextDark,
	},
	'--card-kicker-text': {
		light: cardKickerTextLight,
		dark: cardKickerTextDark,
	},
	'--card-quote-icon': {
		light: cardQuoteIconLight,
		dark: cardQuoteIconDark,
	},
	'--card-media-background': {
		light: cardMediaBackgroundLight,
		dark: cardMediaBackgroundDark,
	},
	'--card-media-waveform': {
		light: cardMediaWaveformLight,
		dark: cardMediaWaveformDark,
	},
	'--card-sublinks-background': {
		light: cardSublinksBackgroundLight,
		dark: cardSublinksBackgroundDark,
	},
	'--card-trail-text': {
		light: cardTrailTextLight,
		dark: cardTrailTextDark,
	},
	'--front-container-background': {
		light: sectionBackgroundLight,
		dark: sectionBackgroundDark,
	},
	'--article-border': {
		light: articleBorderLight,
		dark: articleBorderDark,
	},
	'--article-section-title': {
		light: sectionTitleLight,
		dark: sectionTitleDark,
	},
	'--article-section-secondary-title': {
		light: sectionTitleLight,
		dark: sectionTitleDark,
	},
	'--section-date': {
		light: sectionDateLight,
		dark: sectionDateDark,
	},
	'--section-background': {
		light: sectionBackgroundLight,
		dark: sectionBackgroundDark,
	},
	'--section-background-left': {
		light: sectionBackgroundLeftLight,
		dark: sectionBackgroundLeftDark,
	},
	'--card-border-supporting': {
		light: cardBorderSupportingLight,
		dark: cardBorderSupportingDark,
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
	'--carousel-text': {
		light: () => palette('--article-section-title'),
		dark: () => palette('--article-section-title'),
	},
	'--carousel-dot': {
		light: carouselDotLight,
		dark: carouselDotDark,
	},
	'--carousel-active-dot': {
		light: carouselActiveDotLight,
		dark: carouselActiveDotDark,
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
	'--carousel-chevron': {
		light: carouselChevronLight,
		dark: carouselChevronDark,
	},
	'--carousel-chevron-border': {
		light: carouselChevronBorderLight,
		dark: carouselChevronBorderDark,
	},
	'--carousel-chevron-border-disabled': {
		light: carouselChevronBorderDisabledLight,
		dark: carouselChevronBorderDisabledDark,
	},
	'--carousel-chevron-disabled': {
		light: carouselChevronDisabledLight,
		dark: carouselChevronDisabledDark,
	},
	'--carousel-chevron-hover': {
		light: carouselChevronHoverLight,
		dark: carouselChevronHoverDark,
	},
	'--slideshow-pagination-dot': {
		light: slideshowPaginationDotLight,
		dark: slideshowPaginationDotDark,
	},
	'--slideshow-pagination-dot-active': {
		light: slideshowPaginationDotActiveLight,
		dark: slideshowPaginationDotActiveDark,
	},
	'--section-border': {
		light: sectionBorderLight,
		dark: sectionBorderDark,
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
