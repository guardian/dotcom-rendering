import { render } from '@testing-library/react';

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { CommentCount } from './CommentCount';

describe('CommentCount', () => {
	const standardNewsFormat = {
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};

	it('It should render counts as expected', () => {
		const { getByTestId } = render(
			<CommentCount commentCount={123} format={standardNewsFormat} />,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('123');
		expect(getByTestId('short-comment-count').innerHTML).toBe('123');
	});

	it('It should format big numbers', () => {
		const { getByTestId } = render(
			<CommentCount commentCount={92878} format={standardNewsFormat} />,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('92,878');
		expect(getByTestId('short-comment-count').innerHTML).toBe('93k');
	});

	it('It should render 0 when there are zero comments', () => {
		const { getByTestId } = render(
			<CommentCount commentCount={0} format={standardNewsFormat} />,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('0');
		expect(getByTestId('short-comment-count').innerHTML).toBe('0');
	});

	it('It should render an elipsis when the comment count is not defined', () => {
		const { getByTestId } = render(
			<CommentCount format={standardNewsFormat} />,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('…');
		expect(getByTestId('short-comment-count').innerHTML).toBe('…');
	});
});
