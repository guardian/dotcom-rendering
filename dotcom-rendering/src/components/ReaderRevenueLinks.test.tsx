import { render, waitFor } from '@testing-library/react';
import { shouldHideSupportMessaging as shouldHideSupportMessaging_ } from '../lib/contributions';
import type { EditionId } from '../lib/edition';
import { ConfigProvider } from './ConfigContext';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

const shouldHideSupportMessaging: {
	[key: string]: any;
} = shouldHideSupportMessaging_;

// @swc/jest does not seem to handle dynamic import of ophan.ng.js
// We get a “define is not defined” in Jest, but it seems to work in browsers
jest.mock('../client/ophan/ophan', () => ({
	getOphan: () => Promise.resolve({ record: () => jest.fn() }),
	sendOphanComponentEvent: jest.fn(),
}));

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
	const edition: EditionId = 'UK';

	it('should render thank you message if shouldHideSupportMessaging() returns true', async () => {
		shouldHideSupportMessaging.mockReturnValue(true);

		const { getByText } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<ReaderRevenueLinks
					urls={urls}
					editionId="US"
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeader={false}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</ConfigProvider>,
		);

		await waitFor(() => expect(getByText('Thank you')).toBeInTheDocument());
	});

	it('should render support message if shouldHideSupportMessaging() returns false', async () => {
		shouldHideSupportMessaging.mockReturnValue(false);

		const { getByText } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<ReaderRevenueLinks
					urls={urls}
					editionId={edition}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeader={false}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</ConfigProvider>,
		);

		await waitFor(() =>
			expect(getByText('Support the Guardian')).toBeInTheDocument(),
		);
	});
});
