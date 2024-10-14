import '@testing-library/jest-dom';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { resetLastFetchCall } from '../../lib/mockRESTCalls';
import { mockFetch } from '../../lib/mockRESTCallsInJest';
import { ok } from '../../lib/result';
import { ConfigProvider } from '../ConfigContext';
import { Discussion } from '../Discussion';

describe('App', () => {
	let originalFetch: typeof fetch;

	beforeAll(() => {
		originalFetch = fetch;
	});

	beforeEach(() => {
		mockFetch(); // Initialize the mock before each test
		resetLastFetchCall();
	});

	afterAll(() => {
		global.fetch = originalFetch; // Restore the original fetch after tests
	});

	it('should not render the comment form if user is logged out', async () => {
		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<Discussion
					user={undefined}
					discussionApiUrl="https://discussion.theguardian.com/discussion-api"
					shortUrlId="p/39f5z"
					discussionD2Uid="testD2Header"
					discussionApiClientHeader="testClientHeader"
					enableDiscussionSwitch={true}
					idApiUrl="https://idapi.theguardian.com"
					reportAbuseUnauthenticated={() => Promise.resolve(ok(true))}
				/>
			</ConfigProvider>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.queryAllByText('jamesgorrie').length).toBeGreaterThan(0);
		expect(screen.queryByPlaceholderText('Join the discussion')).toBeNull();
	});
});
