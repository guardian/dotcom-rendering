import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground } from './cardHelpers';

export const decideCardLogo = (
	branding: Branding,
	containerPalette?: DCRContainerPalette,
): Branding['logo'] => {
	return cardHasDarkBackground(containerPalette) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
