import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { decideNavTheme } from './decideNavTheme';

export const decideLineEffect = (
	design: ArticleDesign,
	pillar: ArticleTheme,
): LineEffectType => {
	if (pillar === ArticlePillar.Sport) {
		return 'dotted';
	}

	switch (design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Recipe:
			return 'squiggly';
		default:
			return 'straight';
	}
};

export const decideLineCount = (design?: ArticleDesign): 8 | 4 => {
	if (design === ArticleDesign.Comment) {
		return 8;
	}
	return 4;
};

export const decideLineColour = (
	design?: ArticleDesign,
): string | undefined => {
	if (design === ArticleDesign.LiveBlog) {
		return 'rgba(255, 255, 255, 0.4)';
	}
	return undefined;
};

export const getCurrentPillar = (CAPI: CAPIType): ArticleTheme => {
	const currentPillar =
		(CAPI.nav.currentPillarTitle &&
			(CAPI.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		CAPI.pillar;
	return decideNavTheme(currentPillar);
};
