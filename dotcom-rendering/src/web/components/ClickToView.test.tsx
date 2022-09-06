import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { ClickToView } from './ClickToView';

describe('ClickToView', () => {
	it('It should render the third party content if it is not tracking', () => {
		const { getByTestId } = render(
			<ClickToView
				isTracking={false}
				source="A Third Party"
				sourceDomain="athirdparty.com"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			>
				<div data-testid="third-party-content" />
			</ClickToView>,
		);

		expect(getByTestId('third-party-content')).toBeInTheDocument();
	});

	it('It should render a provider specific overlay if a source is present', () => {
		const { getByText } = render(
			<ClickToView
				isTracking={true}
				source="A Third Party"
				sourceDomain="athirdparty.com"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(getByText('Allow A Third Party content?')).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content provided by A Third Party',
				{ exact: false },
			),
		).toBeInTheDocument();
	});
	it('It should render a generic overlay if a source is not present', () => {
		const { getByText } = render(
			<ClickToView
				isTracking={true}
				sourceDomain="athirdparty.com"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(
			getByText('Allow content provided by a third party?'),
		).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content hosted on athirdparty.com',
				{ exact: false },
			),
		).toBeInTheDocument();
	});
	it('It should render a overlay if its a liveblog', () => {
		const { queryByTestId } = render(
			<ClickToView
				isTracking={true}
				sourceDomain="athirdparty.com"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticlePillar.News,
				}}
			>
				<div data-testid="third-party-content" />
			</ClickToView>,
		);

		expect(queryByTestId('third-party-content')).not.toBeInTheDocument();
	});
});
