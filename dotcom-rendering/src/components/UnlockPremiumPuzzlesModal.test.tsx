import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UnlockPremiumPuzzlesModal } from './UnlockPremiumPuzzlesModal';

const renderModal = (returnUrl?: string) =>
	render(
		<UnlockPremiumPuzzlesModal
			idUrl="https://profile.theguardian.com"
			returnUrl={returnUrl}
			returnToArchivePath="/puzzles-and-games/logic-puzzles/archive"
		/>,
	);

describe('UnlockPremiumPuzzlesModal', () => {
	it('sends the same return URL to Support and to Identity', () => {
		const returnUrl = 'https://www.theguardian.com/puzzles-and-games/x';
		renderModal(returnUrl);

		const subscribe = new URL(
			screen
				.getByRole('link', { name: 'Subscribe' })
				.getAttribute('href')!,
		);
		expect(subscribe.searchParams.get('returnUrl')).toBe(returnUrl);
		expect(subscribe.searchParams.get('returnTo')).toBeNull();

		const signIn = new URL(
			screen.getByRole('link', { name: 'sign in' }).getAttribute('href')!,
		);
		expect(signIn.searchParams.get('returnUrl')).toBe(returnUrl);
	});

	it('leaves the return URL out when the page is not served over https', () => {
		// The test environment is served from http://localhost
		renderModal();

		expect(
			screen
				.getByRole('link', { name: 'Subscribe' })
				.getAttribute('href'),
		).toBe('https://support.theguardian.com/?source=puzzles');
		expect(
			screen.getByRole('link', { name: 'sign in' }).getAttribute('href'),
		).toBe('https://profile.theguardian.com/signin');
	});

	it('tells a signed out reader that they are signed out', () => {
		renderModal();
		expect(
			screen.getByText(/You are currently signed out\./),
		).toBeInTheDocument();
		expect(
			screen.queryByText(/Your current account/),
		).not.toBeInTheDocument();
	});

	it('tells a signed in reader that their account has no access', () => {
		render(
			<UnlockPremiumPuzzlesModal
				idUrl="https://profile.theguardian.com"
				isSignedIn={true}
				returnToArchivePath="/puzzles-and-games/logic-puzzles/archive"
			/>,
		);
		expect(
			screen.getByText(/Your current account doesn't include/),
		).toBeInTheDocument();
		expect(
			screen.queryByText(/You are currently signed out/),
		).not.toBeInTheDocument();
	});
});
