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
						blockFirstPublished: 1638279933000,
						title: 'title',
					},
				]}
			/>,
		);
		expect(container).toHaveTextContent('title');
	});

	it('It should not render events without a blockFirstPublished property', () => {
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
						blockFirstPublished: 1638279933000,
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
						blockFirstPublished: 1638279933000,
						title: 'title',
					},
					{
						...baseProperties,
						blockFirstPublished: 1638279933000,
					},
				]}
			/>,
		);
		expect(container).toHaveTextContent('title');
		expect(container.getElementsByTagName('time')).toHaveLength(1);
	});
});
