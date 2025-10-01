import type { DCRContainerPalette } from '../types/front';
import { ArticleDesign, type ArticleFormat } from './articleFormat';

export const isMediaCard = (format: ArticleFormat): boolean => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video: {
			return true;
		}
		default: {
			return false;
		}
	}
};

/**
 * Determines whether the application of a container palette override
 * results in a dark background for the container and cards inside it
 *
 * This is primarily used to decide whether to force usage of the logo
 * for dark mode when it would otherwise be configured as light mode
 */
export const hasDarkBackground = (
	containerPalette?: DCRContainerPalette,
): boolean => {
	switch (containerPalette) {
		// Special palettes with dark background colours on containers
		case 'BreakingPalette':
		case 'SombrePalette':
		case 'InvestigationPalette':
		case 'SombreAltPalette':
			return true;

		// Special palettes with light background colours on containers
		case 'Branded':
		case 'EventAltPalette':
		case 'EventPalette':
		case 'LongRunningAltPalette':
		case 'LongRunningPalette':
		case 'SpecialReportAltPalette':
			return false;

		// If no containerPalette provided, card is in a standard container
		case undefined: {
			return false;
		}
	}
};
