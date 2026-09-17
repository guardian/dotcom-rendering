import { act, render, screen, waitFor } from '@testing-library/react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import { useMatchMedia } from '../lib/useMatchMedia';
import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import {
	buildFrameStyles,
	buildPuzzleIframeSrc,
	type PuzzleContext,
	PuzzleIframe,
} from './PuzzleIframe.island';

jest.mock('../lib/identity', () => ({
	getAuthStatus: jest.fn(),
	subscribeToAuthStateChange: jest.fn(),
}));

jest.mock('../lib/useMatchMedia', () => ({
	useMatchMedia: jest.fn(() => false),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);
const mockedSubscribeToAuthStateChange = jest.mocked(
	subscribeToAuthStateChange,
);
const mockedUseMatchMedia = jest.mocked(useMatchMedia);

const signedIn = (legacyIdentityId: string) => ({
	kind: 'SignedIn' as const,
	accessToken: {} as never,
	idToken: {
		claims: { legacy_identity_id: legacyIdentityId },
	} as never,
});

const signedOut = () => ({ kind: 'SignedOut' as const });

const contextParam = (context: PuzzleContext) =>
	`guardian-puzzle-context=${encodeURIComponent(JSON.stringify(context))}`;

const sudokuEasyConfig = puzzleConfigs['sudoku-easy']!;
const wordiplyConfig = puzzleConfigs.wordiply!;

describe('buildPuzzleIframeSrc', () => {
	it('resolves the provider URL then appends guardian-puzzle-context on top', () => {
		const context: PuzzleContext = {
			userId: null,
			darkMode: false,
			puzzleDate: null,
		};
		expect(buildPuzzleIframeSrc(sudokuEasyConfig, context)).toBe(
			`https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0&${contextParam(context)}`,
		);
	});

	it('preserves the provider-resolved uid/darkMode params when appending guardian-puzzle-context', () => {
		const context: PuzzleContext = {
			userId: 'abc123',
			darkMode: true,
			puzzleDate: '2026-09-15',
		};
		const src = buildPuzzleIframeSrc(sudokuEasyConfig, context);
		const url = new URL(src);

		expect(url.searchParams.get('uid')).toBe('abc123');
		expect(url.searchParams.get('darkMode')).toBe('1');
		expect(url.searchParams.get('guardian-puzzle-context')).toBe(
			JSON.stringify(context),
		);
	});

	it('always includes guardian-puzzle-context, even when signed out and dark mode is off', () => {
		const context: PuzzleContext = {
			userId: null,
			darkMode: false,
			puzzleDate: null,
		};
		expect(buildPuzzleIframeSrc(sudokuEasyConfig, context)).toContain(
			'guardian-puzzle-context=',
		);
	});

	it('applies guardian-puzzle-context uniformly to a non-AmuseLabs provider too (wordiply)', () => {
		const context: PuzzleContext = {
			userId: 'abc123',
			darkMode: true,
			puzzleDate: null,
		};
		const src = buildPuzzleIframeSrc(wordiplyConfig, context);
		const url = new URL(src);

		expect(url.origin + url.pathname).toBe('https://www.wordiply.com/');
		expect(url.searchParams.get('guardian-puzzle-context')).toBe(
			JSON.stringify(context),
		);
		// Wordiply has no confirmed uid/darkMode query param support, so
		// neither is provider-added, only DCR's own generic context blob is.
		expect(url.searchParams.has('uid')).toBe(false);
		expect(url.searchParams.has('darkMode')).toBe(false);
	});
});

describe('buildFrameStyles', () => {
	// Per-slug min-height overrides, hardcoded in PUZZLE_MIN_HEIGHTS - see
	// the doc comment above buildFrameStyles and docs/puzzle-page.md. This
	// only asserts the CSS text is present, not real browser layout/
	// rendering (jsdom does not evaluate media queries), there is no
	// existing convention in this codebase for deeper breakpoint-driven
	// CSS testing.
	it('uses the hardcoded default min-height for a known slug', () => {
		expect(buildFrameStyles('sudoku-easy').styles).toContain(
			'min-height:700px;',
		);
	});

	it('increases min-height between the tablet and desktop breakpoints for a known slug', () => {
		expect(buildFrameStyles('sudoku-easy').styles).toMatch(
			/max-width:\s*979\.9px/,
		);
		expect(buildFrameStyles('sudoku-easy').styles).toContain(
			'min-height:850px;',
		);
	});

	it('increases min-height further below the tablet breakpoint for a known slug', () => {
		expect(buildFrameStyles('sudoku-easy').styles).toMatch(
			/max-width:\s*739\.9px/,
		);
		expect(buildFrameStyles('sudoku-easy').styles).toContain(
			'min-height:1000px;',
		);
	});

	it('falls back to the default min-heights for an unrecognised slug', () => {
		expect(buildFrameStyles('unknown-slug').styles).toContain(
			'min-height:500px;',
		);
		expect(buildFrameStyles('unknown-slug').styles).toContain(
			'min-height:700px;',
		);
		expect(buildFrameStyles('unknown-slug').styles).toContain(
			'min-height:900px;',
		);
	});

	it('includes a visible border around the iframe', () => {
		expect(buildFrameStyles('sudoku-easy').styles).toMatch(
			/border:1px solid var\(--article-border\);/,
		);
	});
});

describe('PuzzleIframe', () => {
	let unsubscribe: jest.Mock;

	beforeEach(() => {
		jest.resetAllMocks();
		unsubscribe = jest.fn();
		mockedSubscribeToAuthStateChange.mockReturnValue(unsubscribe);
		mockedUseMatchMedia.mockReturnValue(false);
	});

	const getContextFromSrc = (src: string): PuzzleContext => {
		const url = new URL(src);
		return JSON.parse(
			url.searchParams.get('guardian-puzzle-context') ?? '{}',
		) as PuzzleContext;
	};

	const getUidFromSrc = (src: string): string | null =>
		new URL(src).searchParams.get('uid');

	const getDarkModeParamFromSrc = (src: string): string | null =>
		new URL(src).searchParams.get('darkMode');

	it('renders userId: null and darkMode: false while signed out with dark mode unavailable', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src)).toEqual({
				userId: null,
				darkMode: false,
				puzzleDate: null,
			}),
		);
	});

	it('includes the userId in the context once signed in', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src)).toEqual({
				userId: 'user-123',
				darkMode: false,
				puzzleDate: null,
			}),
		);
	});

	it('does not check prefers-color-scheme at all when darkModeAvailable is false', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());
		mockedUseMatchMedia.mockReturnValue(true);

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).darkMode).toBe(false),
		);
	});

	it('reports darkMode: true only when darkModeAvailable AND the OS/browser prefers dark', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());
		mockedUseMatchMedia.mockReturnValue(true);

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).darkMode).toBe(true),
		);
	});

	it('reacts to the OS/browser colour-scheme preference changing while mounted', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());
		mockedUseMatchMedia.mockReturnValue(false);

		const { rerender } = render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).darkMode).toBe(false),
		);

		// Simulate useMatchMedia reacting to a live prefers-color-scheme
		// change (it is itself reactive via useSyncExternalStore) by
		// updating its mocked return value and re-rendering, mirroring how
		// a real OS theme switch would cause useMatchMedia to return a new
		// value and this component to re-render.
		mockedUseMatchMedia.mockReturnValue(true);
		rerender(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).darkMode).toBe(true),
		);
	});

	it('posts the puzzle context to the iframe once loaded', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));
		mockedUseMatchMedia.mockReturnValue(true);

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		const postMessage = jest.fn();
		Object.defineProperty(iframe, 'contentWindow', {
			value: { postMessage },
			configurable: true,
		});

		await act(async () => {
			iframe.dispatchEvent(new Event('load'));
		});

		expect(postMessage).toHaveBeenCalledWith(
			{
				type: 'guardian-puzzle-context',
				context: {
					userId: 'user-123',
					darkMode: true,
					puzzleDate: null,
				},
			},
			'*',
		);
	});

	it('subscribes to auth state changes and updates the context if the user signs out', async () => {
		mockedGetAuthStatus.mockResolvedValueOnce(signedIn('user-123'));

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).userId).toBe('user-123'),
		);

		expect(mockedSubscribeToAuthStateChange).toHaveBeenCalledTimes(1);
		const onAuthStateChange =
			mockedSubscribeToAuthStateChange.mock.calls[0]![0];

		mockedGetAuthStatus.mockResolvedValueOnce(signedOut());
		await act(async () => {
			onAuthStateChange();
		});

		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).userId).toBe(null),
		);
	});

	it('unsubscribes from auth state changes on unmount', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		const { unmount } = render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		await screen.findByTitle('Puzzle');
		unmount();

		expect(unsubscribe).toHaveBeenCalledTimes(1);
	});

	it('includes puzzleDate in the context when provided', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate="2026-09-15"
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).puzzleDate).toBe('2026-09-15'),
		);
	});

	it('reports puzzleDate: null in the context when not provided', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).puzzleDate).toBeNull(),
		);
	});

	it('includes uid and darkMode=1 (AmuseLabs-specific) alongside guardian-puzzle-context once signed in with dark mode on', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));
		mockedUseMatchMedia.mockReturnValue(true);

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() => expect(getUidFromSrc(iframe.src)).toBe('user-123'));
		expect(getDarkModeParamFromSrc(iframe.src)).toBe('1');
		expect(
			new URL(iframe.src).searchParams.has('guardian-puzzle-context'),
		).toBe(true);
	});

	it('omits uid entirely while signed out, but still sends darkMode=0 (AmuseLabs-specific)', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(getContextFromSrc(iframe.src).userId).toBeNull(),
		);
		expect(new URL(iframe.src).searchParams.has('uid')).toBe(false);
		expect(getDarkModeParamFromSrc(iframe.src)).toBe('0');
		expect(
			new URL(iframe.src).searchParams.has('guardian-puzzle-context'),
		).toBe(true);
	});

	it('removes uid again if the reader signs back out', async () => {
		mockedGetAuthStatus.mockResolvedValueOnce(signedIn('user-123'));

		render(
			<PuzzleIframe
				puzzleConfig={sudokuEasyConfig}
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() => expect(getUidFromSrc(iframe.src)).toBe('user-123'));

		const onAuthStateChange =
			mockedSubscribeToAuthStateChange.mock.calls[0]![0];
		mockedGetAuthStatus.mockResolvedValueOnce(signedOut());
		await act(async () => {
			onAuthStateChange();
		});

		await waitFor(() => expect(getUidFromSrc(iframe.src)).toBeNull());
	});

	it('does not add uid/darkMode query params for a non-AmuseLabs provider (wordiply)', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));
		mockedUseMatchMedia.mockReturnValue(true);

		render(
			<PuzzleIframe
				puzzleConfig={wordiplyConfig}
				title="Puzzle"
				darkModeAvailable={true}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() =>
			expect(
				new URL(iframe.src).searchParams.has('guardian-puzzle-context'),
			).toBe(true),
		);
		expect(new URL(iframe.src).searchParams.has('uid')).toBe(false);
		expect(new URL(iframe.src).searchParams.has('darkMode')).toBe(false);
		expect(iframe.src.startsWith('https://www.wordiply.com/')).toBe(true);
	});
});
