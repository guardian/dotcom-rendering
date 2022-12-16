import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { Platform } from '../../types/platform';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { ArticleMeta } from './ArticleMeta';

describe('ArticleMeta', () => {
	it('It should contain legacy class names to support customised styling in interactives', () => {
		const format = {
			theme: ArticlePillar.Lifestyle,
			design: ArticleDesign.Interactive,
			display: ArticleDisplay.Immersive,
		};

		const { container } = render(
			<ArticleMeta
				platform={Platform.Web}
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
				ajaxUrl=""
				showShareCount={true}
			/>,
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
			theme: ArticlePillar.Lifestyle,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		};

		const { container } = render(
			<ArticleMeta
				platform={Platform.Web}
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
				ajaxUrl=""
				showShareCount={true}
			/>,
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
