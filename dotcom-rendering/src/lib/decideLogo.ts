import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { containerPaletteHasDarkBackground } from './cardHelpers';

export const decideBrandingLogo = (
	branding: Branding,
	containerPalette?: DCRContainerPalette,
): Branding['logo'] => {
	return containerPaletteHasDarkBackground(containerPalette) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
