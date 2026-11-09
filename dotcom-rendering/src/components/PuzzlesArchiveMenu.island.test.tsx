import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { PuzzleItem } from '../types/puzzlesPage';
import { PuzzlesArchiveMenu } from './PuzzlesArchiveMenu.island';

const easy: PuzzleItem = {
	id: 'archive-sudoku-easy',
	title: 'Easy sudoku',
	type: 'sudoku',
	set: 'easy',
	cardVariant: 'archive',
	slug: 'logic-puzzles/sudoku-easy',
	variant: 'archive-page',
};
const quick: PuzzleItem = {
	...easy,
	id: 'archive-quick',
	title: 'Quick crossword',
	type: 'crossword',
	set: 'quick',
	slug: undefined,
	variant: undefined,
	url: 'https://www.theguardian.com/crosswords/series/quick',
};

describe('PuzzlesArchiveMenu tracking', () => {
	it('attributes valid destinations and their displayed positions without tracking menu opening', () => {
		render(
			<PuzzlesArchiveMenu
				archives={[
					{
						...easy,
						id: 'invalid',
						slug: undefined,
						url: '/invalid',
					},
					easy,
					quick,
				]}
			/>,
		);
		const summary = screen.getByText('Puzzle archives').closest('summary');
		expect(summary).not.toHaveAttribute('data-link-name');
		expect(summary?.closest('[data-component]')).toBeNull();
		fireEvent.click(summary!);

		const links = screen.getAllByRole('link');
		expect(
			links.map((link) => link.getAttribute('data-link-name')),
		).toEqual([
			'archive | select | item-archive-sudoku-easy | position-@1',
			'archive | select | item-archive-quick | position-@2',
		]);
		for (const link of links) {
			expect(link.closest('[data-component]')).toHaveAttribute(
				'data-component',
				'puzzles-archive-menu',
			);
		}
		expect(links[0]).toHaveAttribute(
			'href',
			'/puzzles-and-games/logic-puzzles/sudoku-easy/archive',
		);
		expect(links[0]).not.toHaveAttribute('target');
		expect(links[1]).toHaveAttribute('href', quick.url);
		expect(links[1]).toHaveAttribute('target', '_blank');
		expect(links[1]).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('uses the supplied section context and recalculates reordered positions', () => {
		const { rerender } = render(
			<PuzzlesArchiveMenu
				archives={[easy, quick]}
				ophanComponentName="puzzles-archive-menu:logic-puzzles:sudoku"
			/>,
		);
		fireEvent.click(screen.getByText('Puzzle archives'));
		expect(
			screen.getByRole('link', { name: 'Quick crossword' }),
		).toHaveAttribute(
			'data-link-name',
			'archive | select | item-archive-quick | position-@2',
		);
		rerender(
			<PuzzlesArchiveMenu
				archives={[quick]}
				ophanComponentName="puzzles-archive-menu:logic-puzzles:sudoku"
			/>,
		);
		const link = screen.getByRole('link', { name: 'Quick crossword' });
		expect(link).toHaveAttribute(
			'data-link-name',
			'archive | select | item-archive-quick | position-@1',
		);
		expect(link.closest('[data-component]')).toHaveAttribute(
			'data-component',
			'puzzles-archive-menu:logic-puzzles:sudoku',
		);
	});

	it('renders no tracking markup when there are no valid archives', () => {
		const { container } = render(
			<PuzzlesArchiveMenu archives={[{ ...easy, slug: undefined }]} />,
		);
		expect(container).toBeEmptyDOMElement();
	});
});
