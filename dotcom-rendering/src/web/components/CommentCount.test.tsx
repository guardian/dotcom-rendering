import { render } from '@testing-library/react';

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { CommentCount } from './CommentCount';
import { decidePalette } from '../lib/decidePalette';

describe('CommentCount', () => {
	const format = {
		theme: ArticlePillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	};
	it('It should render null if comments are disabled', () => {
		const { container } = render(
			<CommentCount
				isCommentable={false}
				commentCount={123}
				palette={decidePalette(format)}
				format={format}
				setIsExpanded={() => {}}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('It should render counts as expected', () => {
		const { getByTestId } = render(
			<CommentCount
				isCommentable={true}
				commentCount={123}
				palette={decidePalette(format)}
				format={format}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('123');
		expect(getByTestId('short-comment-count').innerHTML).toBe('123');
	});

	it('It should format big numbers', () => {
		const { getByTestId } = render(
			<CommentCount
				isCommentable={true}
				commentCount={92878}
				palette={decidePalette(format)}
				format={format}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('92,878');
		expect(getByTestId('short-comment-count').innerHTML).toBe('93k');
	});

	it('It should render 0 when there are zero comments', () => {
		const { getByTestId } = render(
			<CommentCount
				isCommentable={true}
				commentCount={0}
				palette={decidePalette(format)}
				format={format}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('0');
		expect(getByTestId('short-comment-count').innerHTML).toBe('0');
	});

	it('It should render an elipsis when the comment count is not defined', () => {
		const { getByTestId } = render(
			<CommentCount
				isCommentable={true}
				palette={decidePalette(format)}
				format={format}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('…');
		expect(getByTestId('short-comment-count').innerHTML).toBe('…');
	});
});
