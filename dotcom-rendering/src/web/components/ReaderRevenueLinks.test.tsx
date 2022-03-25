import { render, wait } from '@testing-library/react';
import { shouldHideSupportMessaging as shouldHideSupportMessaging_ } from '../lib/contributions';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

const shouldHideSupportMessaging: {
	[key: string]: any;
} = shouldHideSupportMessaging_;

jest.mock('../lib/contributions', () => ({
	shouldHideSupportMessaging: jest.fn(() => true),
}));
jest.mock('@guardian/libs', () => ({
	getLocale: async () => {
		return 'GB';
	},
}));

const contributionsServiceUrl =
	'https://contributions.code.dev-guardianapis.com';

describe('ReaderRevenueLinks', () => {
	const urls = {
		contribute: 'https://www.theguardian.com/contribute',
		subscribe: 'https://www.theguardian.com/subscribe',
		support: 'https://www.theguardian.com/support',
	};
	const edition: Edition = 'UK';

	it('should render thank you message if shouldHideSupportMessaging() returns true', async () => {
		shouldHideSupportMessaging.mockReturnValue(true);

		const { getByText } = render(
			<ReaderRevenueLinks
				urls={urls}
				edition="US"
				dataLinkNamePrefix="nav2 : "
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>,
		);

		await wait(() => expect(getByText('Thank you')).toBeInTheDocument());
	});

	it('should render support message if shouldHideSupportMessaging() returns false', async () => {
		shouldHideSupportMessaging.mockReturnValue(false);

		const { getByText } = render(
			<ReaderRevenueLinks
				urls={urls}
				edition={edition}
				dataLinkNamePrefix="nav2 : "
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>,
		);

		await wait(() =>
			expect(getByText('Support the Guardian')).toBeInTheDocument(),
		);
	});
});
