import { render } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
	describe('newer and newest', () => {
		it('does not render the newer/newest controls when the props are undefined', () => {
			const { queryAllByText, queryByText } = render(
				<Pagination
					currentPage={2}
					totalPages={3}
					renderingTarget="Web"
				/>,
			);

			expect(queryAllByText('Newest').length).toBe(0);
			expect(queryByText('Previous')).toBeNull();
		});

		it('renders the newer/newest controls when the props are empty strings', () => {
			const { queryAllByText, queryByText } = render(
				<Pagination
					currentPage={2}
					totalPages={3}
					newest=""
					newer=""
					renderingTarget="Web"
				/>,
			);

			expect(queryAllByText('Newest').length).toBeGreaterThan(0);
			expect(queryByText('Previous')).not.toBeNull();
		});

		it('does not add an empty query string when there are no params to render', () => {
			const { getAllByRole } = render(
				<Pagination
					currentPage={2}
					totalPages={3}
					newest=""
					newer=""
					renderingTarget="Web"
				/>,
			);

			expect(
				getAllByRole('link').map((a) => (a as HTMLAnchorElement).href),
			).toEqual([
				'http://localhost/#maincontent',
				'http://localhost/#maincontent',
				'http://localhost/#liveblog-navigation',
			]);
		});
	});

	describe('older and oldest', () => {
		it('does not render the older/oldest controls when the props are undefined', () => {
			const { queryAllByText, queryByText } = render(
				<Pagination
					currentPage={2}
					totalPages={3}
					renderingTarget="Web"
				/>,
			);

			expect(queryAllByText('Oldest').length).toBe(0);
			expect(queryByText('Next')).toBeNull();
		});

		it('renders the older/oldest controls when the props are empty strings', () => {
			const { queryAllByText, queryByText } = render(
				<Pagination
					currentPage={2}
					totalPages={3}
					oldest="?page=with:block-6a2b00d18f0881a067713ae5"
					older="?page=with:block-6a2b00d18f0881a067713ae5"
					renderingTarget="Web"
				/>,
			);

			expect(queryAllByText('Oldest').length).toBeGreaterThan(0);
			expect(queryByText('Next')).not.toBeNull();
		});
	});
});
