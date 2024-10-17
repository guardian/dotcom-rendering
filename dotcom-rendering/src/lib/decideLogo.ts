import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import type { ArticleFormat } from './articleFormat';
import { cardHasDarkBackground } from './cardHelpers';

export const decideCardLogo = (
	branding: Branding,
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): Branding['logo'] => {
	return cardHasDarkBackground(format, containerPalette) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
