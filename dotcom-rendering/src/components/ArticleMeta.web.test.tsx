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
