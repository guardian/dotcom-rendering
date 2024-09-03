import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { ArticleMeta, shouldShowContributor } from './ArticleMeta.web';
import { ConfigProvider } from './ConfigContext';

jest.mock('../lib/bridgetApi', () => jest.fn());

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
});

describe('shouldShowContributor', () => {
	const standardFormat = {
		theme: Pillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};
	const standardComment = {
		...standardFormat,
		design: ArticleDesign.Comment,
	};
	const showcaseStandard = {
		...standardFormat,
		display: ArticleDisplay.Showcase,
	};
	const showcaseComment = {
		...showcaseStandard,
		design: ArticleDesign.Comment,
	};
	const numberedList = {
		...standardFormat,
		display: ArticleDisplay.NumberedList,
	};
	const immersive = {
		...standardFormat,
		display: ArticleDisplay.Immersive,
	};

	it('should return true if Standard display and Standard design', () => {
		expect(shouldShowContributor(standardFormat)).toBe(true);
	});

	it('should return false if Standard display and Comment design', () => {
		expect(shouldShowContributor(standardComment)).toBe(false);
	});

	it('should return true if Showcase display and Standard design', () => {
		expect(shouldShowContributor(showcaseStandard)).toBe(true);
	});

	it('should return false if Showcase display and Comment design', () => {
		expect(shouldShowContributor(showcaseComment)).toBe(false);
	});

	it('should return true if Numbered list display', () => {
		expect(shouldShowContributor(numberedList)).toBe(true);
	});

	it('should return false if Immersive display', () => {
		expect(shouldShowContributor(immersive)).toBe(false);
	});
});
