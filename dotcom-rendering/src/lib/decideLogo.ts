import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { hasDarkBackground } from './cardHelpers';

export const decideBrandingLogo = (
	branding: Branding,
	containerPalette?: DCRContainerPalette,
): Branding['logo'] => {
	return hasDarkBackground(containerPalette) && branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
