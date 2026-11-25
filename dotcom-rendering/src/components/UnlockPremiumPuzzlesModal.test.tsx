import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UnlockPremiumPuzzlesModal } from './UnlockPremiumPuzzlesModal';

const renderModal = (returnUrl?: string, intcmp?: string) =>
	render(
		<UnlockPremiumPuzzlesModal
			idUrl="https://profile.theguardian.com"
			returnUrl={returnUrl}
			intcmp={intcmp}
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

	it('sends the campaign code to Support, and not to Identity', () => {
		renderModal(undefined, 'puzzles_sudoku-easy');

		const subscribe = new URL(
			screen
				.getByRole('link', { name: 'Subscribe' })
				.getAttribute('href')!,
		);
		expect(subscribe.searchParams.get('source')).toBe('puzzles');
		expect(subscribe.searchParams.get('INTCMP')).toBe(
			'puzzles_sudoku-easy',
		);
		expect(
			screen.getByRole('link', { name: 'sign in' }).getAttribute('href'),
		).not.toContain('INTCMP');
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
	describe('scroll shadow', () => {
		const allRules = () =>
			Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText);

		it('draws the shadow on the scrolling body, hidden by a cover that moves with the content', () => {
			renderModal();
			const bodyRule = allRules().find((rule) =>
				rule.includes('background-attachment: local,scroll'),
			);

			expect(bodyRule).toBeDefined();
			expect(bodyRule).toContain('overflow-y: auto');
		});

		it('no longer keeps a permanent shadow on the footer', () => {
			renderModal();

			expect(
				allRules().some((rule) =>
					rule.includes(
						'box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 8px',
					),
				),
			).toBe(false);
		});
	});

	describe('hero image', () => {
		it('is hidden on small screens only while the modal is a sticky bottom sheet', () => {
			renderModal();
			const rules = Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText);
			const hideRule = rules.find(
				(rule) =>
					rule.includes('data-flow-with-page') &&
					rule.includes('display: none'),
			);

			expect(hideRule).toBeDefined();
			// Only in the small screen layout, and not when the modal flows with the page
			expect(hideRule).toContain('max-width');
			expect(hideRule).toMatch(
				/:not\(\[data-flow-with-page=["']true["']\]\)/,
			);
		});

		it('is still rendered, so it can be shown when the modal flows with the page', () => {
			const { container } = renderModal();
			expect(container.querySelector('img')).toBeInTheDocument();
		});
	});

	describe('colours', () => {
		const renderedCss = () =>
			Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText)
				.join('\n');

		it('uses the light colours by default', () => {
			renderModal();
			const css = renderedCss();

			expect(css).toContain('--unlock-modal-background: #FFFFFF');
			expect(css).toContain('--unlock-modal-title: #052962');
			expect(css).toContain('--unlock-modal-tick: #0077B6');
		});

		it('uses the dark colours from the design when dark mode is available', () => {
			render(
				<UnlockPremiumPuzzlesModal
					idUrl="https://profile.theguardian.com"
					darkModeAvailable={true}
					returnToArchivePath="/puzzles-and-games/logic-puzzles/archive"
				/>,
			);
			const css = renderedCss();

			expect(css).toContain('prefers-color-scheme: dark');
			expect(css).toContain('--unlock-modal-background: #333333');
			expect(css).toContain('--unlock-modal-title: #F6F6F6');
			expect(css).toContain('--unlock-modal-text: #F6F6F6');
			expect(css).toContain('--unlock-modal-tick: #C1D8FC');
			expect(css).toContain('--unlock-modal-link: #C1D8FC');
		});
	});
});
