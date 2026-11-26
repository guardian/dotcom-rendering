import { getCookie } from '@guardian/libs';
import { getABTestParticipations } from './abTesting';

jest.mock('@guardian/libs', () => ({
	getCookie: jest.fn(),
}));

const mockGetCookie = jest.mocked(getCookie);

describe('getABTestParticipations', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		window.guardian.config.serverSideABTests = {
			'growth-auxia-banner': 'variant',
			'server-side-test': 'control',
		};
		mockGetCookie.mockReturnValue('client-side-test:variant');
	});

	it('keeps the existing client and server test assignments intact', () => {
		expect(getABTestParticipations()).toEqual({
			'client-side-test': 'variant',
			'growth-auxia-banner': 'variant',
			'server-side-test': 'control',
		});
	});
});
