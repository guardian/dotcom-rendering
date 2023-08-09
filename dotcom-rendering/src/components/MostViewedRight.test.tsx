import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { mockTab1 } from './MostViewed.mocks';

const response = { data: mockTab1, loading: false };

jest.unstable_mockModule('../../src/lib/useApi', () => ({
	useApi: jest.fn<typeof import('../lib/useApi').useApi>(),
}));

const { useApi } = (await import('../lib/useApi')) as jest.MockedObject<
	typeof import('../lib/useApi')
>;

const { MostViewedRight } = await import('./MostViewedRight');

describe('MostViewedList', () => {
	beforeEach(() => {
		useApi.mockReset();
	});
	it('should call the api and render the response as expected', () => {
		useApi.mockReturnValue(response);

		const { asFragment, getAllByText } = render(<MostViewedRight />);

		// Calls api once only
		expect(useApi).toHaveBeenCalledTimes(1);

		// Renders no more than 5 items
		expect(getAllByText(/LINKTEXT/).length).toBe(5);

		// Prefixes live articles correctly
		expect(getAllByText(/Live/).length).toBe(3);

		// Renders appropriate number of age warnins
		expect(getAllByText(/This article is more than/).length).toBe(2);

		// Renders data-component
		expect(
			asFragment().querySelectorAll('[data-component="geo-most-popular"]')
				.length,
		).toBe(1);

		// Renders Trail data-link-names
		expect(
			asFragment().querySelectorAll('[data-link-name*="trail"]').length,
		).toBe(5); // Total stories in Related (*= selector contains)

		expect(
			asFragment().querySelectorAll('[data-link-name="trail | 1"]')
				.length,
		).toBe(1); // 1 indexed so should start at 1

		expect(
			asFragment().querySelectorAll('[data-link-name="trail | 0"]')
				.length,
		).toBe(0); // 1 indexed so should start at 1
	});

	it('should implement a limit on the number of items', () => {
		useApi.mockReturnValue(response);

		const { getAllByText } = render(<MostViewedRight limitItems={3} />);

		// Calls api once only
		expect(useApi).toHaveBeenCalledTimes(1);

		// Renders no more than 3 items
		expect(getAllByText(/LINKTEXT/).length).toBe(3);

		// Prefixes live articles correctly
		expect(getAllByText(/Live/).length).toBe(2);

		// Renders appropriate number of age warnins
		expect(getAllByText(/This article is more than/).length).toBe(1);
	});

	it('should show a byline when this property is set to true', async () => {
		useApi.mockReturnValue(response);

		const { getByText } = render(<MostViewedRight />);

		expect(
			getByText('Jennifer Rankin and Daniel Boffey'),
		).toBeInTheDocument();
	});
});
