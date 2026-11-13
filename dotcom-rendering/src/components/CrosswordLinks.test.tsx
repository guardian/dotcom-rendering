import { render, screen } from '@testing-library/react';
import { quickCrossword } from '../../fixtures/manual/editionsCrossword';
import { CrosswordLinks } from './CrosswordLinks';

describe('crossword PDF tracking', () => {
	it.each([false, true])(
		'tracks the same PDF request in the V1 %s layout',
		(isPuzzlesHubV1) => {
			render(
				<CrosswordLinks
					crossword={{
						...quickCrossword,
						pdf: 'https://example.com/puzzle.pdf',
					}}
					isPuzzlesHubV1={isPuzzlesHubV1}
				/>,
			);
			const link = screen.getByRole('link', {
				name: isPuzzlesHubV1 ? 'Print version' : 'PDF version',
			});
			expect(link).toHaveAttribute(
				'data-link-name',
				'puzzles | pdf-open | slug-cryptic | date-2024-11-03 | provider-guardian-crossword',
			);
		},
	);
});
