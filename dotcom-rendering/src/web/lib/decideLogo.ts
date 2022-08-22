import { ArticleDesign, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import type { Branding } from '../../types/branding';

const shouldUseLogoForDarkBackground = (format: ArticleFormat): boolean => {
	if (format.theme === ArticleSpecial.SpecialReport) return true;
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
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
): Branding['logo'] => {
	return shouldUseLogoForDarkBackground(format) &&
		branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};
