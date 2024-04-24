/**
 *
 * Utility function to convert between FE and DCR container palettes
 */

import type { DCRContainerPalette, FEContainerPalette } from '../types/front';

export const decideContainerPalette = (
	palettes?: FEContainerPalette[],
	options?: { canBeBranded?: boolean },
): DCRContainerPalette | undefined => {
	if (palettes?.includes('EventPalette')) return 'EventPalette';
	if (palettes?.includes('SombreAltPalette')) return 'SombreAltPalette';
	if (palettes?.includes('EventAltPalette')) return 'EventAltPalette';
	if (palettes?.includes('InvestigationPalette')) {
		return 'InvestigationPalette';
	}
	if (palettes?.includes('LongRunningAltPalette')) {
		return 'LongRunningAltPalette';
	}
	if (palettes?.includes('LongRunningPalette')) return 'LongRunningPalette';
	if (palettes?.includes('SombrePalette')) return 'SombrePalette';
	if (palettes?.includes('BreakingPalette')) return 'BreakingPalette';
	if (palettes?.includes('SpecialReportAltPalette')) {
		return 'SpecialReportAltPalette';
	}
	if (palettes?.includes('Branded') && options?.canBeBranded) {
		return 'Branded';
	}
	if (palettes?.includes('Podcast')) return 'PodcastPalette';
	return undefined;
};
