import { render } from '@testing-library/react';
import type { FilterOptions } from '../../lib/discussion';
import { getPages, Pagination } from './Pagination';

const DEFAULT_FILTERS: FilterOptions = {
	orderBy: 'newest',
	pageSize: 25,
	threads: 'collapsed',
};

describe('Pagination', () => {
	it('Render Ophan Data Components as expected', () => {
		const { asFragment } = render(
			<Pagination
				currentPage={2}
				setCurrentPage={() => {}}
				filters={DEFAULT_FILTERS}
				topLevelCommentCount={222} // 9 pages: 8.88 = 222 / 25
			/>,
		);

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 2"]',
			).length,
		).toBe(1); // The number is still a button

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 1"]',
			).length,
		).toBe(2); // Both the number and the back button

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 3"]',
			).length,
		).toBe(2); // Both the number and the forward button

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 5"]',
			).length,
		).toBe(0); // Page five should be hidden

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 9"]',
			).length,
		).toBe(1); // Page nine should be the last number

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="Pagination view page 10"]',
			).length,
		).toBe(0); // Page 10 doesn't exist
	});

	it.each([
		[1, 1, [1]],
		[1, 2, [1, 2]],
		[1, 6, [1, 2, 3, 4, 5, 6]],
		[2, 6, [1, 2, 3, 4, 5, 6]],
		[3, 6, [1, 2, 3, 4, 5, 6]],
		[4, 6, [1, 2, 3, 4, 5, 6]],
		[5, 6, [1, 2, 3, 4, 5, 6]],
		[6, 6, [1, 2, 3, 4, 5, 6]],
		[1, 7, [1, 2, 3, 4, '…', 7]],
		[2, 7, [1, 2, 3, 4, '…', 7]],
		[3, 7, [1, 2, 3, 4, '…', 7]],
		[4, 7, [1, '…', 3, 4, 5, '…', 7]],
		[5, 7, [1, '…', 4, 5, 6, 7]],
		[6, 7, [1, '…', 4, 5, 6, 7]],
		[7, 7, [1, '…', 4, 5, 6, 7]],
		[1, 99, [1, 2, 3, 4, '…', 99]],
		[3, 99, [1, 2, 3, 4, '…', 99]],
		[42, 99, [1, '…', 41, 42, 43, '…', 99]],
		[97, 99, [1, '…', 96, 97, 98, 99]],
		[99, 99, [1, '…', 96, 97, 98, 99]],
	])(
		'gets the right number of pages for %s in %s',
		(currentPage, totalPages, expected) => {
			expect(getPages(currentPage, totalPages)).toEqual(expected);
		},
	);
});
