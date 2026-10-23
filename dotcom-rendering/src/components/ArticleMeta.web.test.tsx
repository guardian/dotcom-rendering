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

	describe('dateline', () => {
		const webPublicationDate = '2026-01-02T03:04:05.000Z';

		const renderWithTags = (
			tags: Array<{ id: string; type: string; title: string }>,
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
						pageId="1234"
						webTitle="A title"
						byline="Observer writers"
						tags={tags}
						primaryDateline="primary date line"
						secondaryDateline="secondary date line"
						webPublicationDate={webPublicationDate}
						isCommentable={false}
						discussionApiUrl=""
						shortUrlId=""
					/>
				</ConfigProvider>,
			).container;

		it('renders a time element with the raw publication date and no secondary dateline for a Filter series tag', () => {
			const container = renderWithTags([
				{
					id: 'thefilter/series/the-filter',
					type: 'Series',
					title: 'The Filter',
				},
			]);

			const time = container.querySelector('time');
			expect(time?.getAttribute('datetime')).toBe(webPublicationDate);
			expect(time?.textContent).toBe('primary date line');
			expect(container.textContent).not.toContain('secondary date line');
		});

		it('renders the standard Dateline for a non-Filter tag', () => {
			const container = renderWithTags([
				{
					id: 'lifeandstyle/series/observer-design',
					type: 'Series',
					title: 'Observer Design',
				},
			]);

			expect(container.querySelector('time')).toBeNull();
			expect(container.textContent).toContain('primary date line');
			expect(container.textContent).toContain('secondary date line');
		});
	});
});
