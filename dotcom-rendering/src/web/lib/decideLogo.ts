import { ArticleDesign, ArticleSpecial, ArticlePillar } from '@guardian/libs';

const shouldUseLogoForDarkBackground = (format: ArticleFormat): boolean => {
	if (format.theme === ArticleSpecial.SpecialReport) return true;
	switch (format.design) {
		case ArticleDesign.Media:
			return true;
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return false;
				case ArticlePillar.News:
				case ArticlePillar.Sport:
				case ArticlePillar.Opinion:
				case ArticlePillar.Lifestyle:
				case ArticlePillar.Culture:
				default:
					return true;
			}
		default:
			return false;
	}
};

export const decideLogo = (
	format: ArticleFormat,
	branding: Branding,
): BrandingLogo => {
	return shouldUseLogoForDarkBackground(format) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
