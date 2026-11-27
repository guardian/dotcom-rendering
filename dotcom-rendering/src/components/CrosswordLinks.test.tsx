import { render, screen } from '@testing-library/react';
import { quickCrossword } from '../../fixtures/manual/editionsCrossword';
import { CrosswordLinks } from './CrosswordLinks';

describe('crossword PDF tracking', () => {
	it('tracks the PDF request from the print version link', () => {
		render(
			<CrosswordLinks
				crossword={{
					...quickCrossword,
					pdf: 'https://example.com/puzzle.pdf',
				}}
			/>,
		);
		expect(
			screen.getByRole('link', { name: 'Print version' }),
		).toHaveAttribute(
			'data-link-name',
			'puzzles | pdf-open | slug-cryptic | date-2024-11-03 | provider-guardian-crossword',
		);
	});
});
