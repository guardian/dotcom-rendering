import { render } from '@testing-library/react';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ArticleMeta } from './ArticleMeta.web';
import { ConfigProvider } from './ConfigContext';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	useMatchMedia: jest.fn(() => true),
}));
describe('ArticleMeta', () => {
	const renderFilterArticle = (
		tags: Array<{ id: string; type: 'Series'; title: string }>,
		firstPublicationDate: string | undefined,
	) =>
		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<ArticleMeta
					format={{
						theme: Pillar.Lifestyle,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					pageId="thefilter/2026/oct/08/a-filter-story"
					webTitle="A Filter article"
					tags={tags}
					primaryDateline="Thu 8 Oct 2026 15.36 BST"
					secondaryDateline="First published on Thu 8 Oct 2025 10.00 BST"
					firstPublicationDate={firstPublicationDate}
					webPublicationDate="2026-10-08T14:36:00Z"
					isCommentable={false}
					discussionApiUrl=""
					shortUrlId=""
				/>
			</ConfigProvider>,
		);

	it('labels a republished Filter article and preserves its time datetime', () => {
		const { container } = renderFilterArticle(
			[
				{
					id: 'thefilter/series/the-filter',
					type: 'Series',
					title: 'The Filter',
				},
			],
			'2025-10-08T09:00:00Z',
		);

		expect(container.querySelector('time')).toHaveTextContent(
			'Updated Thu 8 Oct 2026 15.36 BST',
		);
		expect(container.querySelector('time')?.getAttribute('datetime')).toBe(
			'2026-10-08T14:36:00Z',
		);
	});

	it('does not label a Filter article with matching publication dates', () => {
		const { container } = renderFilterArticle(
			[
				{
					id: 'thefilter/series/the-filter',
					type: 'Series',
					title: 'The Filter',
				},
			],
			'2026-10-08T14:36:00Z',
		);

		expect(
			container.querySelector('[data-gu-name="dateline"]'),
		).toHaveTextContent('Thu 8 Oct 2026 15.36 BST');
		expect(
			container.querySelector('[data-gu-name="dateline"]'),
		).not.toHaveTextContent('Updated');
	});

	it('does not label a republished non-Filter article', () => {
		const { container } = renderFilterArticle(
			[
				{
					id: 'technology/series/technology',
					type: 'Series',
					title: 'Technology',
				},
			],
			'2025-10-08T09:00:00Z',
		);

		expect(
			container.querySelector('[data-gu-name="dateline"]'),
		).toHaveTextContent('Thu 8 Oct 2026 15.36 BST');
		expect(
			container.querySelector('[data-gu-name="dateline"]'),
		).not.toHaveTextContent('Updated');
	});

	it('It should contain legacy class names to support customised styling in interactives', () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: ArticleDesign.Interactive,
			display: ArticleDisplay.Immersive,
		};

		const { container } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<ArticleMeta
					format={format}
					pageId="1234"
					webTitle="A title"
					byline="Observer writers"
					tags={[
						{
							id: 'lifeandstyle/series/observer-design',
							type: 'Series',
							title: 'Observer Design',
						},
					]}
					primaryDateline="primary date line"
					secondaryDateline="secondary date line"
					isCommentable={false}
					discussionApiUrl=""
					shortUrlId=""
				/>
			</ConfigProvider>,
		);

		expect(
			container.querySelector(
				`.${interactiveLegacyClasses.metaContainer}`,
			),
		).not.toBeNull();
		expect(
			container.querySelector(`.${interactiveLegacyClasses.shareIcons}`),
		).not.toBeNull();
	});

	it("It should not contain legacy class names for articles that aren't interactives", () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		};

		const { container } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<ArticleMeta
					format={format}
					pageId="1234"
					webTitle="A title"
					byline="Observer writers"
					tags={[
						{
							id: 'lifeandstyle/series/observer-design',
							type: 'Series',
							title: 'Observer Design',
						},
					]}
					primaryDateline="primary date line"
					secondaryDateline="secondary date line"
					isCommentable={false}
					discussionApiUrl=""
					shortUrlId=""
				/>
			</ConfigProvider>,
		);

		expect(
			container.querySelector(
				`.${interactiveLegacyClasses.metaContainer}`,
			),
		).toBeNull();
		expect(
			container.querySelector(`.${interactiveLegacyClasses.shareIcons}`),
		).toBeNull();
	});
});
