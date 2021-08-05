import { render } from '@testing-library/react';

import { useApi as useApi_ } from '@root/src/web/lib/useApi';

import { linkAndDescription } from './Onwards.mocks';
import { OnwardsLayout } from './OnwardsLayout';

const response = { data: linkAndDescription };
const useApi: { [key: string]: any } = useApi_;

jest.mock('@root/src/web/lib/useApi', () => ({
	useApi: jest.fn(),
}));

describe('OnwardsLayout', () => {
	beforeEach(() => {
		useApi.mockReset();
	});
	it('Render Ophan Data Components as expected', () => {
		useApi.mockReturnValue(response);

		const { asFragment } = render(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<OnwardsLayout {...linkAndDescription} />,
		);

		// Renders data-component
		expect(
			asFragment().querySelectorAll(
				'[data-component="more-on-this-story"]',
			).length,
		).toBe(1);

		expect(
			asFragment().querySelectorAll(
				'[data-link-name="more-on-this-story"]',
			).length,
		).toBe(1);

		expect(
			asFragment().querySelectorAll('[data-link-name="article"]').length,
		).toBe(8);
	});
});
