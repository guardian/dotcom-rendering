import { act, render, screen, waitFor } from '@testing-library/react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import { useMatchMedia } from '../lib/useMatchMedia';
import {
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

describe('buildPuzzleIframeSrc', () => {
	it('appends the context as a JSON query param when the src has none', () => {
		const context: PuzzleContext = {
			userId: null,
			darkMode: false,
			puzzleDate: null,
		};
		expect(
			buildPuzzleIframeSrc('https://example.com/puzzle', context),
		).toBe(`https://example.com/puzzle?${contextParam(context)}`);
	});

	it('preserves existing query params when appending the context', () => {
		const context: PuzzleContext = {
			userId: 'abc123',
			darkMode: true,
			puzzleDate: '2026-09-15',
		};
		expect(
			buildPuzzleIframeSrc(
				'https://example.com/puzzle?set=guardian-sudoku-easy&embed=1',
				context,
			),
		).toBe(
			`https://example.com/puzzle?set=guardian-sudoku-easy&embed=1&${contextParam(context)}&uid=abc123`,
		);
	});

	it('always includes the context, even when signed out and dark mode is off', () => {
		const context: PuzzleContext = {
			userId: null,
			darkMode: false,
			puzzleDate: null,
		};
		expect(
			buildPuzzleIframeSrc('https://example.com/puzzle', context),
		).toContain('guardian-puzzle-context=');
	});

	it('returns the src unchanged if it cannot be parsed as an absolute URL', () => {
		expect(
			buildPuzzleIframeSrc('not-a-url', {
				userId: null,
				darkMode: false,
				puzzleDate: null,
			}),
		).toBe('not-a-url');
	});

	it('appends uid alongside guardian-puzzle-context when the reader is signed in', () => {
		const context: PuzzleContext = {
			userId: 'user-123',
			darkMode: false,
			puzzleDate: null,
		};
		const src = buildPuzzleIframeSrc('https://example.com/puzzle', context);
		const url = new URL(src);

		expect(url.searchParams.get('uid')).toBe('user-123');
		expect(url.searchParams.has('guardian-puzzle-context')).toBe(true);
	});

	it('omits uid entirely when the reader is signed out (not uid=null or empty)', () => {
		const context: PuzzleContext = {
			userId: null,
			darkMode: false,
			puzzleDate: null,
		};
		const src = buildPuzzleIframeSrc('https://example.com/puzzle', context);
		const url = new URL(src);

		expect(url.searchParams.has('uid')).toBe(false);
		expect(url.searchParams.has('guardian-puzzle-context')).toBe(true);
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

	it('renders userId: null and darkMode: false while signed out with dark mode unavailable', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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
				src="https://example.com/puzzle"
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

	it('includes uid alongside guardian-puzzle-context once signed in', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));

		render(
			<PuzzleIframe
				src="https://example.com/puzzle"
				title="Puzzle"
				darkModeAvailable={false}
				puzzleDate={null}
			/>,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		await waitFor(() => expect(getUidFromSrc(iframe.src)).toBe('user-123'));
		expect(
			new URL(iframe.src).searchParams.has('guardian-puzzle-context'),
		).toBe(true);
	});

	it('omits uid entirely while signed out (not uid=null or empty)', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe
				src="https://example.com/puzzle"
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
		expect(
			new URL(iframe.src).searchParams.has('guardian-puzzle-context'),
		).toBe(true);
	});

	it('removes uid again if the reader signs back out', async () => {
		mockedGetAuthStatus.mockResolvedValueOnce(signedIn('user-123'));

		render(
			<PuzzleIframe
				src="https://example.com/puzzle"
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
});
