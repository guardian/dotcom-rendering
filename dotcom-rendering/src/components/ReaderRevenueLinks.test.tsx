import { jest } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import type { EditionId } from '../lib/edition';

jest.mock('@guardian/libs', () => ({
	log: jest.fn(),
	getCookie: jest.fn(),
	getLocale: async () => {
		return 'GB';
	},
}));

jest.unstable_mockModule('../../src/lib/contributions', async () => ({
	shouldHideSupportMessaging: jest.fn<() => boolean>(() => true),
	MODULES_VERSION: 'v3',
	getLastOneOffContributionDate: jest.fn(() => undefined),
	getPurchaseInfo: jest.fn(),
}));

const { shouldHideSupportMessaging } = (await import(
	'../lib/contributions'
)) as jest.Mocked<typeof import('../lib/contributions')>;

const { ReaderRevenueLinks } = await import('./ReaderRevenueLinks.importable');

const contributionsServiceUrl =
	'https://contributions.code.dev-guardianapis.com';

describe('ReaderRevenueLinks', () => {
	const urls = {
		contribute: 'https://www.theguardian.com/contribute',
		subscribe: 'https://www.theguardian.com/subscribe',
		support: 'https://www.theguardian.com/support',
	};
	const edition: EditionId = 'UK';

	it('should render thank you message if shouldHideSupportMessaging() returns true', async () => {
		shouldHideSupportMessaging.mockReturnValue(true);

		const { getByText } = render(
			<ReaderRevenueLinks
				urls={urls}
				editionId="US"
				dataLinkNamePrefix="nav2 : "
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>,
		);

		await waitFor(() => expect(getByText('Thank you')).toBeInTheDocument());
	});

	it('should render support message if shouldHideSupportMessaging() returns false', async () => {
		shouldHideSupportMessaging.mockReturnValue(false);

		const { getByText } = render(
			<ReaderRevenueLinks
				urls={urls}
				editionId={edition}
				dataLinkNamePrefix="nav2 : "
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>,
		);

		await waitFor(() =>
			expect(getByText('Support the Guardian')).toBeInTheDocument(),
		);
	});
});
