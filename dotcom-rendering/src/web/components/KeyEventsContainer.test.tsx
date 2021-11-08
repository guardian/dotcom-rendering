import { render } from '@testing-library/react';
import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';

import { KeyEventsContainer } from './KeyEventsContainer';

const baseProperties = {
	id: '123',
	elements: [],
	primaryDateLine: '',
	secondaryDateLine: '',
};

describe('KeyEventsContainer', () => {
	it('It should render KeyEventsContainer as expected', () => {
		const { container } = render(
			<KeyEventsContainer
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublishedDisplay:
							'blockFirstPublishedDisplay',
						title: 'title',
					},
				]}
			/>,
		);
		expect(container).toHaveTextContent('title');
	});

	it('It should not render events without a blockFirstPublishedDisplay property', () => {
		const { container } = render(
			<KeyEventsContainer
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublishedDisplay:
							'blockFirstPublishedDisplay',
						title: 'title',
					},
					{ ...baseProperties, title: 'should not exist' },
				]}
			/>,
		);
		expect(container).toHaveTextContent('title');
		expect(container).not.toHaveTextContent('should not exist');
	});

	it('It should not render events without a title property', () => {
		const { container } = render(
			<KeyEventsContainer
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublishedDisplay: 'should exist',
						title: 'title',
					},
					{
						...baseProperties,
						blockFirstPublishedDisplay: 'should not exist',
					},
				]}
			/>,
		);
		expect(container).toHaveTextContent('title');
		expect(container).not.toHaveTextContent('should not exist');
	});
});
