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

	it('reserves space without showing either message while authentication is pending', () => {
		jest.mocked(useIsSignedIn).mockReturnValue('Pending');

		render(<PuzzlesArchiveDescription idUrl={idUrl} />);

		expect(
			testingScreen.queryByRole('link', {
				name: 'Sign in or create an account',
			}),
		).not.toBeInTheDocument();
		const placeholder = testingScreen.getByText(
			'Use the calendar to track your puzzle progress from our archive.',
		);
		expect(placeholder).not.toBeVisible();
		expect(placeholder).toHaveAttribute('aria-hidden', 'true');
	});

	it.each([true, false])(
		'shows the appropriate message when authentication resolves to %s',
		(isSignedIn) => {
			jest.mocked(useIsSignedIn).mockReturnValue('Pending');
			const { rerender } = render(
				<PuzzlesArchiveDescription idUrl={idUrl} />,
			);

			jest.mocked(useIsSignedIn).mockReturnValue(isSignedIn);
			rerender(<PuzzlesArchiveDescription idUrl={idUrl} />);

			if (isSignedIn) {
				expect(
					testingScreen.getByText(
						'Use the calendar to track your puzzle progress from our archive.',
					),
				).toBeVisible();
				expect(
					testingScreen.queryByRole('link'),
				).not.toBeInTheDocument();
			} else {
				expect(
					testingScreen.getByRole('link', {
						name: 'Sign in or create an account',
					}),
				).toBeVisible();
				expect(
					testingScreen.queryByText(
						'Use the calendar to track your puzzle progress from our archive.',
					),
				).not.toBeInTheDocument();
			}
		},
	);
});
