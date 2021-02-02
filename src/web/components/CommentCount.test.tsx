import React from 'react';
import { render } from '@testing-library/react';

import { Design, Display, Pillar } from '@guardian/types';

import { CommentCount } from './CommentCount';
import { decidePalette } from '../lib/decidePalette';

describe('CommentCount', () => {
	it('It should render null if comments are disabled', () => {
		const { container } = render(
			<CommentCount
				isCommentable={false}
				commentCount={123}
				palette={decidePalette({
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				})}
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
				palette={decidePalette({
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				})}
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
				palette={decidePalette({
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				})}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('92,878');
		expect(getByTestId('short-comment-count').innerHTML).toBe('93k');
	});

	it('It should still render zero even when there are no comments', () => {
		const { getByTestId } = render(
			<CommentCount
				isCommentable={true}
				commentCount={0}
				palette={decidePalette({
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				})}
				setIsExpanded={() => {}}
			/>,
		);

		expect(getByTestId('long-comment-count').innerHTML).toBe('0');
		expect(getByTestId('short-comment-count').innerHTML).toBe('0');
	});
});
