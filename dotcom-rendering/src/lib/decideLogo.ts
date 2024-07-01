import { ArticleDesign } from '@guardian/libs';
import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';

const shouldUseLogoForDarkBackground = (
	format: ArticleFormat,
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

		// Special palettes which act more like standard containers
		case 'MediaPalette':
		case 'PodcastPalette':
		case undefined: {
			switch (format.design) {
				case ArticleDesign.Gallery:
				case ArticleDesign.Audio:
				case ArticleDesign.Video:
					return true;
				default:
					return false;
			}
		}
	}
};

export const decideLogo = (
	format: ArticleFormat,
	branding: Branding,
	containerPalette?: DCRContainerPalette,
): Branding['logo'] => {
	return shouldUseLogoForDarkBackground(format, containerPalette) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
