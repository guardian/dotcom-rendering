import { render, wait } from '@testing-library/react';
import { shouldHideSupportMessaging as shouldHideSupportMessaging_ } from '@root/src/web/lib/contributions';
import { ABProvider } from '@guardian/ab-react';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';

const shouldHideSupportMessaging: {
	[key: string]: any;
} = shouldHideSupportMessaging_;

jest.mock('@root/src/web/lib/contributions', () => ({
	shouldHideSupportMessaging: jest.fn(() => true),
}));

const contributionsServiceUrl =
	'https://contributions.code.dev-guardianapis.com';

const ophanRecord = () => {};

const AbProvider: React.FC = ({ children }) => {
	return (
		<ABProvider
			mvtMaxValue={1000000}
			mvtId={1234}
			pageIsSensitive={false}
			abTestSwitches={{}}
			arrayOfTestObjects={[]}
		>
			{children}
		</ABProvider>
	);
};

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
			<AbProvider>
				<ReaderRevenueLinks
					urls={urls}
					edition="US"
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeaderEnabled={false}
					pageViewId="page-view-id"
					contributionsServiceUrl={contributionsServiceUrl}
					ophanRecord={ophanRecord}
				/>
			</AbProvider>,
		);

		await wait(() => expect(getByText('Thank you')).toBeInTheDocument());
	});

	it('should render support message if shouldHideSupportMessaging() returns false', async () => {
		shouldHideSupportMessaging.mockReturnValue(false);

		const { getByText } = render(
			<AbProvider>
				<ReaderRevenueLinks
					urls={urls}
					edition={edition}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeaderEnabled={false}
					pageViewId="page-view-id"
					contributionsServiceUrl={contributionsServiceUrl}
					ophanRecord={ophanRecord}
				/>
				,
			</AbProvider>,
		);

		await wait(() =>
			expect(getByText('Support the Guardian')).toBeInTheDocument(),
		);
	});
});
