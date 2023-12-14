import '@testing-library/jest-dom/extend-expect';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockRESTCalls } from '../../lib/mockRESTCalls';
import { Comments } from './Comments';

mockRESTCalls();

describe('App', () => {
	it('should not render the comment form if user is logged out', async () => {
		render(
			<Comments
				shortUrl="p/39f5z"
				baseUrl="https://discussion.theguardian.com/discussion-api"
				isClosedForComments={false}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={false}
				onPermalinkClick={() => {}}
				apiKey=""
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.queryAllByText('jamesgorrie').length).toBeGreaterThan(0);
		expect(screen.queryByPlaceholderText('Join the discussion')).toBeNull();
	});
});
