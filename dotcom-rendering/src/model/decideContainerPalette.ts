/**
 * Utility function to extract container palette information from the frontend container metadata field
 */
import type { DCRContainerPalette, FEContainerMetadata } from '../types/front';

export const decideContainerPalette = (
	metadata?: FEContainerMetadata[],
	options?: { canBeBranded?: boolean },
): DCRContainerPalette | undefined => {
	if (metadata?.includes('EventPalette')) return 'EventPalette';
	if (metadata?.includes('SombreAltPalette')) return 'SombreAltPalette';
	if (metadata?.includes('EventAltPalette')) return 'EventAltPalette';
	if (metadata?.includes('InvestigationPalette')) {
		return 'InvestigationPalette';
	}
	if (metadata?.includes('LongRunningAltPalette')) {
		return 'LongRunningAltPalette';
	}
	if (metadata?.includes('LongRunningPalette')) return 'LongRunningPalette';
	if (metadata?.includes('SombrePalette')) return 'SombrePalette';
	if (metadata?.includes('BreakingPalette')) return 'BreakingPalette';
	if (metadata?.includes('SpecialReportAltPalette')) {
		return 'SpecialReportAltPalette';
	}
	if (metadata?.includes('Branded') && options?.canBeBranded) {
		return 'Branded';
	}
	if (metadata?.includes('Podcast')) return 'PodcastPalette';
	return undefined;
};
