import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ArticleDeprecated } from '../types/article';
import { MatchHeaderFallback as MatchHeaderFallbackComponent } from './MatchHeaderFallback';

const footballArticle = {
	headline:
		'Australia 3-3 South Korea: Women’s Asian Cup 2026 – as it happened',
	sectionLabel: "Women's Asian Cup 2026",
	sectionUrl: 'football/womens-asian-cup-2026',
	guardianBaseURL: 'https://www.theguardian.com',
	webPublicationDate: '2026-03-08T11:46:24.000Z',
	tags: [
		{
			id: 'football/womens-asian-cup-2026',
			type: 'Keyword',
			title: "Women's Asian Cup 2026",
		},
	],
} as ArticleDeprecated;

const cricketArticle = {
	headline:
		'Australia v England: second Ashes Test, day two – as it happened',
	sectionLabel: 'Ashes 2025–2026',
	sectionUrl: 'sport/ashes',
	guardianBaseURL: 'https://www.theguardian.com',
	webPublicationDate: '2026-01-27T11:46:24.000Z',
	tags: [
		{
			id: 'sport/ashes',
			type: 'Keyword',
			title: 'Ashes 2025–2026',
		},
	],
} as ArticleDeprecated;

const meta = preview.meta({
	title: 'Components/Match Header Fallback',
	component: MatchHeaderFallbackComponent,
	args: {
		format: {
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
		},
		article: footballArticle,
	},
});

export const Football = meta.story();

export const Cricket = meta.story({
	args: {
		article: cricketArticle,
	},
});
