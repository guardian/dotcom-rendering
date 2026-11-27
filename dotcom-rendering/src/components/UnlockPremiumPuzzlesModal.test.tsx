import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { paletteDeclarations } from '../paletteDeclarations';
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
	describe('spacing above the footer', () => {
		const allRules = () =>
			Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText);

		it('has no bottom padding on the scrolling body, so the footer alone sets the gap', () => {
			renderModal();
			const bodyRule = allRules().find((rule) =>
				rule.includes('overflow-y: auto'),
			);

			expect(bodyRule).toContain('padding: 16px 16px 0');
		});

		it('has no space after the last benefit on small screens only', () => {
			renderModal();
			const rules = allRules();

			const smallScreen = rules.find(
				(rule) =>
					rule.startsWith('@media') &&
					/li:last-child\s*\{[^}]*margin-bottom: 0/.test(rule),
			);
			expect(smallScreen).toBeDefined();

			// Larger screens keep the list's own bottom margins, since the
			// footer has no top padding there
			const largeScreen = rules.find(
				(rule) =>
					!rule.startsWith('@media') &&
					rule.includes('list-style: none') &&
					rule.includes('margin: 0 0 8px'),
			);
			expect(largeScreen).toBeDefined();
		});
	});

	describe('scroll shadow', () => {
		const allRules = () =>
			Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText);

		afterEach(() => {
			jest.restoreAllMocks();
		});

		const mockBody = ({
			clientHeight,
			scrollHeight,
			scrollTop = 0,
		}: {
			clientHeight: number;
			scrollHeight: number;
			scrollTop?: number;
		}) => {
			const heights = { clientHeight, scrollHeight, scrollTop };
			for (const [property, value] of Object.entries(heights)) {
				jest.spyOn(
					HTMLElement.prototype,
					property as keyof typeof heights,
					'get',
				).mockReturnValue(value);
			}
		};

		const getBody = (container: HTMLElement) =>
			container.querySelector('[data-more-below]');

		it('shows the footer shadow only while there is more below', () => {
			renderModal();
			const rules = allRules();

			const shadowRule = rules.find(
				(rule) =>
					rule.includes('data-more-below') &&
					rule.includes('box-shadow'),
			);
			expect(shadowRule).toBeDefined();
			expect(shadowRule).toContain("[data-more-below='true']");

			// And never as a permanent shadow
			expect(
				rules.some(
					(rule) =>
						!rule.includes('data-more-below') &&
						rule.includes(
							'box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 8px',
						),
				),
			).toBe(false);
		});

		it('fades the shadow in and out, unless the reader prefers reduced motion', () => {
			renderModal();
			const rules = allRules().join('\n');

			expect(rules).toContain('transition: box-shadow 0.25s ease');
			expect(rules).toMatch(
				/prefers-reduced-motion:\s*reduce[^{]*\{[^}]*transition: none/,
			);
		});

		it('has nothing below when the content fits', () => {
			mockBody({ clientHeight: 365, scrollHeight: 365 });
			const { container } = renderModal();

			expect(getBody(container)).toHaveAttribute(
				'data-more-below',
				'false',
			);
		});

		it('has more below when the content is taller, even by a few pixels', () => {
			mockBody({ clientHeight: 396, scrollHeight: 404 });
			const { container } = renderModal();

			expect(getBody(container)).toHaveAttribute(
				'data-more-below',
				'true',
			);
		});

		it('has nothing below once the reader scrolls to the end', () => {
			mockBody({ clientHeight: 396, scrollHeight: 404 });
			const { container } = renderModal();
			const body = getBody(container)!;
			expect(body).toHaveAttribute('data-more-below', 'true');

			mockBody({ clientHeight: 396, scrollHeight: 404, scrollTop: 8 });
			fireEvent.scroll(body);

			expect(body).toHaveAttribute('data-more-below', 'false');
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

		it('closes the gap under the line only while the hero is hidden', () => {
			renderModal();
			const rules = Array.from(document.styleSheets)
				.flatMap((sheet) => Array.from(sheet.cssRules))
				.map((rule) => rule.cssText);
			const onlyInStickySheet = (rule: string) =>
				rule.startsWith('@media') &&
				/:not\(\[data-flow-with-page=["']true["']\]\)/.test(rule);

			// The line is closer to the title: 12px instead of 16px
			expect(
				rules.find(
					(rule) =>
						onlyInStickySheet(rule) &&
						rule.includes('margin-bottom: 12px'),
				),
			).toBeDefined();
			// And the title adds no top margin of its own
			expect(
				rules.find(
					(rule) =>
						onlyInStickySheet(rule) &&
						rule.includes('margin-top: 0'),
				),
			).toBeDefined();
			// Everywhere else the line and the title keep their usual 16px
			expect(
				rules.find(
					(rule) =>
						!rule.startsWith('@media') &&
						rule.includes('border-top: 1px solid') &&
						rule.includes('margin-bottom: 16px'),
				),
			).toBeDefined();
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

		it('takes its colours from the app palette', () => {
			renderModal();
			const css = renderedCss();

			expect(css).toContain('var(--unlock-modal-background)');
			expect(css).toContain('var(--unlock-modal-title)');
			expect(css).toContain('var(--unlock-modal-tick)');
		});

		it.each([
			['--unlock-modal-background', '#FFFFFF', '#333333'],
			['--unlock-modal-title', '#052962', '#F6F6F6'],
			['--unlock-modal-text', '#000000', '#F6F6F6'],
			['--unlock-modal-tick', '#0077B6', '#C1D8FC'],
			['--unlock-modal-link', '#0077B6', '#C1D8FC'],
		])(
			'declares %s with the colours from the design',
			(name, light, dark) => {
				const format = {
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Crossword,
					theme: Pillar.News,
				};

				expect(paletteDeclarations(format, 'light')).toContain(
					`${name}: ${light};`,
				);
				expect(paletteDeclarations(format, 'dark')).toContain(
					`${name}: ${dark};`,
				);
			},
		);

		it('styles the archive button hover when dark mode is available', () => {
			render(
				<UnlockPremiumPuzzlesModal
					idUrl="https://profile.theguardian.com"
					darkModeAvailable={true}
					returnToArchivePath="/puzzles-and-games/logic-puzzles/archive"
				/>,
			);
			const css = renderedCss();

			expect(css).toContain('prefers-color-scheme: dark');
			expect(css).toContain(
				'var(--unlock-modal-archive-button-hover-dark)',
			);
		});
	});
});
