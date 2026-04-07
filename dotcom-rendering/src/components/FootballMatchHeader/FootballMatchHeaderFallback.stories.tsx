import preview from '../../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import type { ArticleDeprecated } from '../../types/article';
import { FootballMatchHeaderFallback as FootballMatchHeaderFallbackComponent } from './FootballMatchHeaderFallback';

const article = {
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

const meta = preview.meta({
	title: 'Components/Football Match Header Fallback',
	component: FootballMatchHeaderFallbackComponent,
	args: {
		format: {
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
		},
		article,
	},
});

export const FootballMatchHeaderFallback = meta.story();
