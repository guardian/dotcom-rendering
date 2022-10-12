/**
 * @deprecated Use the `editorialPalette` module from `common-rendering` instead
 */
// ----- Imports ----- //

import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

// ----- Types ----- //

function themeFromString(theme: string | undefined): ArticlePillar {
	switch (theme) {
		case 'pillar/opinion':
			return ArticlePillar.Opinion;
		case 'pillar/sport':
			return ArticlePillar.Sport;
		case 'pillar/arts':
			return ArticlePillar.Culture;
		case 'pillar/lifestyle':
			return ArticlePillar.Lifestyle;
		case 'pillar/news':
		default:
			return ArticlePillar.News;
	}
}

function themeToPillarString(theme: ArticleTheme): string {
	switch (theme) {
		case ArticlePillar.Opinion:
			return 'opinion';
		case ArticlePillar.Sport:
			return 'sport';
		case ArticlePillar.Culture:
			return 'culture';
		case ArticlePillar.Lifestyle:
			return 'lifestyle';
		case ArticlePillar.News:
		default:
			return 'news';
	}
}

function themeToPillar(theme: ArticleTheme): ArticlePillar {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticleSpecial.Labs:
			return ArticlePillar.News;
		default:
			return theme;
	}
}
const stringToPillar = (pillar: string): ArticlePillar => {
	switch (pillar) {
		case 'news':
			return ArticlePillar.News;
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'culture':
			return ArticlePillar.Culture;
		case 'sport':
			return ArticlePillar.Sport;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		default:
			return ArticlePillar.News;
	}
};

// ----- Exports ----- //

export { themeFromString, themeToPillarString, themeToPillar, stringToPillar };
