import type { SignedIn } from './identity';
import {
	fetchPuzzleAccess,
	getPuzzleAccessView,
	PUZZLE_ACCESS_ENDPOINT,
	type PuzzleAccessCheckResult,
	type PuzzleReader,
} from './puzzleAccess';

const signedOut: PuzzleReader = { isSignedIn: false, hasAdFreeHint: false };
const signedInNoHint: PuzzleReader = { isSignedIn: true, hasAdFreeHint: false };
const signedInAdFree: PuzzleReader = { isSignedIn: true, hasAdFreeHint: true };

describe('getPuzzleAccessView', () => {
	describe('free puzzles', () => {
		it.each<[string, PuzzleReader | undefined]>([
			['an unknown reader', undefined],
			['a signed out reader', signedOut],
			['a signed in reader', signedInNoHint],
			['a signed in ad-free reader', signedInAdFree],
		])('shows the board immediately for %s', (_name, reader) => {
			expect(
				getPuzzleAccessView({
					requiresSubscription: false,
					reader,
					check: undefined,
				}),
			).toBe('board');
		});
	});

	describe('premium puzzles', () => {
		const view = (
			reader: PuzzleReader | undefined,
			check?: PuzzleAccessCheckResult,
		) =>
			getPuzzleAccessView({
				requiresSubscription: true,
				reader,
				check,
			});

		it('shows the placeholder until the reader is known', () => {
			expect(view(undefined)).toBe('placeholder');
		});

		it('shows the modal straight away to a signed out reader', () => {
			expect(view(signedOut)).toBe('modal');
		});

		it('ignores a check result for a signed out reader', () => {
			expect(view(signedOut, 'granted')).toBe('modal');
		});

		describe('signed in with the ad-free hint', () => {
			it('shows the board while the check is pending', () => {
				expect(view(signedInAdFree)).toBe('board');
			});
			it('keeps the board when access is granted', () => {
				expect(view(signedInAdFree, 'granted')).toBe('board');
			});
			it('swaps the board for the modal when access is denied', () => {
				expect(view(signedInAdFree, 'denied')).toBe('modal');
			});
			it('assumes access when the check fails', () => {
				expect(view(signedInAdFree, 'failed')).toBe('board');
			});
		});

		describe('signed in without the ad-free hint', () => {
			it('shows the placeholder while the check is pending', () => {
				expect(view(signedInNoHint)).toBe('placeholder');
			});
			it('shows the board when access is granted', () => {
				expect(view(signedInNoHint, 'granted')).toBe('board');
			});
			it('shows the modal when access is denied', () => {
				expect(view(signedInNoHint, 'denied')).toBe('modal');
			});
			it('blocks when the check fails', () => {
				expect(view(signedInNoHint, 'failed')).toBe('modal');
			});
		});
	});
});

describe('fetchPuzzleAccess', () => {
	const authStatus = {
		kind: 'SignedIn',
		accessToken: { accessToken: 'token' },
		idToken: {},
	} as unknown as SignedIn;

	const originalFetch = global.fetch;

	afterEach(() => {
		global.fetch = originalFetch;
		jest.useRealTimers();
	});

	const mockFetch = (impl: () => Promise<unknown>) => {
		const fn = jest.fn(impl);
		global.fetch = fn as unknown as typeof fetch;
		return fn;
	};

	const jsonResponse = (body: unknown, ok = true) =>
		Promise.resolve({ ok, json: () => Promise.resolve(body) });

	it('calls the access endpoint with the puzzle id, its date and the reader token', async () => {
		const fn = mockFetch(() => jsonResponse({ hasAccess: true }));

		await fetchPuzzleAccess({
			baseUrl: 'https://ajax.example.com',
			puzzleId: 'guardian-sudoku-easy-20261002',
			puzzleDate: '2026-10-02',
			authStatus,
		});

		const [url, init] = fn.mock.calls[0] as unknown as [URL, RequestInit];
		expect(url.toString()).toBe(
			`https://ajax.example.com${PUZZLE_ACCESS_ENDPOINT}/guardian-sudoku-easy-20261002/2026-10-02`,
		);
		expect(init.headers).toMatchObject({
			Authorization: 'Bearer token',
		});
	});

	it('sends the puzzle id and the date as path parameters, never as a query string', async () => {
		const fn = mockFetch(() => jsonResponse({ hasAccess: true }));

		await fetchPuzzleAccess({
			baseUrl: 'https://ajax.example.com',
			puzzleId: 'guardian-sudoku-easy-20261002',
			puzzleDate: '2026-10-02',
			authStatus,
		});

		const [url] = fn.mock.calls[0] as unknown as [URL];
		expect(url.search).toBe('');
	});

	it('keeps an id with unusual characters inside a single path segment', async () => {
		const fn = mockFetch(() => jsonResponse({ hasAccess: true }));

		await fetchPuzzleAccess({
			baseUrl: 'https://ajax.example.com',
			puzzleId: 'a/b?c=d',
			puzzleDate: '2026-10-02',
			authStatus,
		});

		const [url] = fn.mock.calls[0] as unknown as [URL];
		expect(url.pathname).toBe(
			`${PUZZLE_ACCESS_ENDPOINT}/a%2Fb%3Fc%3Dd/2026-10-02`,
		);
		expect(url.search).toBe('');
	});

	it('resolves granted', async () => {
		mockFetch(() => jsonResponse({ hasAccess: true }));
		await expect(
			fetchPuzzleAccess({
				baseUrl: 'https://ajax.example.com',
				puzzleId: 'id',
				puzzleDate: '2026-11-01',
				authStatus,
			}),
		).resolves.toBe('granted');
	});

	it('resolves denied', async () => {
		mockFetch(() => jsonResponse({ hasAccess: false }));
		await expect(
			fetchPuzzleAccess({
				baseUrl: 'https://ajax.example.com',
				puzzleId: 'id',
				puzzleDate: '2026-11-01',
				authStatus,
			}),
		).resolves.toBe('denied');
	});

	it.each([
		['a non-2xx status', () => jsonResponse({ hasAccess: true }, false)],
		['an invalid body', () => jsonResponse({ nope: true })],
		['a network error', () => Promise.reject(new Error('offline'))],
	])('resolves failed on %s', async (_name, impl) => {
		mockFetch(impl);
		await expect(
			fetchPuzzleAccess({
				baseUrl: 'https://ajax.example.com',
				puzzleId: 'id',
				puzzleDate: '2026-11-01',
				authStatus,
			}),
		).resolves.toBe('failed');
	});

	it('resolves failed, without calling the backend, when there is no puzzle id', async () => {
		const fn = mockFetch(() => jsonResponse({ hasAccess: true }));
		await expect(
			fetchPuzzleAccess({
				baseUrl: 'https://ajax.example.com',
				puzzleId: undefined,
				puzzleDate: '2026-11-01',
				authStatus,
			}),
		).resolves.toBe('failed');
		expect(fn).not.toHaveBeenCalled();
	});

	it.each([
		['missing', undefined],
		['null', null],
		['empty', ''],
	])(
		'resolves failed, without calling the backend, when the puzzle date is %s',
		async (_name, puzzleDate) => {
			const fn = mockFetch(() => jsonResponse({ hasAccess: true }));
			await expect(
				fetchPuzzleAccess({
					baseUrl: 'https://ajax.example.com',
					puzzleId: 'guardian-sudoku-easy-20261101',
					puzzleDate,
					authStatus,
				}),
			).resolves.toBe('failed');
			expect(fn).not.toHaveBeenCalled();
		},
	);

	it('resolves failed when the backend is too slow', async () => {
		jest.useFakeTimers();
		global.fetch = jest.fn(
			(_url: unknown, init?: RequestInit) =>
				new Promise((_resolve, reject) => {
					init?.signal?.addEventListener('abort', () =>
						reject(new Error('aborted')),
					);
				}),
		) as unknown as typeof fetch;

		const result = fetchPuzzleAccess({
			baseUrl: 'https://ajax.example.com',
			puzzleId: 'id',
			puzzleDate: '2026-11-01',
			authStatus,
			timeoutMs: 1000,
		});
		jest.advanceTimersByTime(1000);

		await expect(result).resolves.toBe('failed');
	});
});
