import { render } from '@testing-library/react';
import type { FilterOptions } from '../../lib/discussion';
import { Pagination } from './Pagination';

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
});
