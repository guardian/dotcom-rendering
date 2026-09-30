import { render, screen as testingScreen } from '@testing-library/react';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { PuzzlesArchiveDescription } from './PuzzlesArchiveDescription.island';

jest.mock('../lib/useAuthStatus', () => ({
	useIsSignedIn: jest.fn(),
}));

const idUrl = 'https://profile.theguardian.com';

describe('PuzzlesArchiveDescription', () => {
	it('shows the calendar message to a signed-in reader', () => {
		jest.mocked(useIsSignedIn).mockReturnValue(true);

		render(<PuzzlesArchiveDescription idUrl={idUrl} />);

		expect(
			testingScreen.getByText(
				'Use the calendar to track your puzzle progress from our archive.',
			),
		).toBeInTheDocument();
	});

	it('shows the header sign-in destination to a signed-out reader', () => {
		jest.mocked(useIsSignedIn).mockReturnValue(false);

		render(<PuzzlesArchiveDescription idUrl={idUrl} />);

		expect(
			testingScreen.getByRole('link', {
				name: 'Sign in or create an account',
			}),
		).toHaveAttribute(
			'href',
			expect.stringMatching(
				/^https:\/\/profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&/,
			),
		);
		expect(
			testingScreen.getByText(/to keep track of your progress/),
		).toBeInTheDocument();
	});
});
