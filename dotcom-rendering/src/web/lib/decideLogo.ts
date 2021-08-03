import { Design, Special, Pillar } from '@guardian/types';

const shouldUseLogoForDarkBackground = (format: Format): boolean => {
	if (format.theme === Special.SpecialReport) return true;
	switch (format.design) {
		case Design.Media:
			return true;
		case Design.LiveBlog:
			switch (format.theme) {
				case Special.Labs:
					return false;
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Opinion:
				case Pillar.Lifestyle:
				case Pillar.Culture:
				default:
					return true;
			}
		default:
			return false;
	}
};

export const decideLogo = (
	format: Format,
	branding: Branding,
): BrandingLogo => {
	return shouldUseLogoForDarkBackground(format) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
