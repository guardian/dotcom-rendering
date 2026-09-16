import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import {
	buildAmuseLabsUrl,
	buildWordiplyUrl,
	resolvePuzzleIframeUrl,
} from './puzzleIframeUrl';

describe('buildAmuseLabsUrl', () => {
	it('builds the base URL with set/embed/idx when signed out and dark mode off', () => {
		expect(
			buildAmuseLabsUrl(
				{ provider: 'amuselabs', set: 'guardian-sudoku-easy' },
				{ userId: null, darkMode: false },
			),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0',
		);
	});

	it('appends uid when signed in', () => {
		expect(
			buildAmuseLabsUrl(
				{ provider: 'amuselabs', set: 'guardian-sudoku-easy' },
				{ userId: 'user-123', darkMode: false },
			),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&uid=user-123&darkMode=0',
		);
	});

	it('omits uid entirely when signed out (not uid=null or empty)', () => {
		const url = buildAmuseLabsUrl(
			{ provider: 'amuselabs', set: 'guardian-sudoku-easy' },
			{ userId: null, darkMode: false },
		);
		expect(new URL(url).searchParams.has('uid')).toBe(false);
	});

	it('sends darkMode=1 as a plain literal query value when dark mode is on', () => {
		const url = buildAmuseLabsUrl(
			{ provider: 'amuselabs', set: 'guardian-sudoku-easy' },
			{ userId: null, darkMode: true },
		);
		expect(new URL(url).searchParams.get('darkMode')).toBe('1');
	});

	it('always includes darkMode, unlike uid which is conditional', () => {
		const url = buildAmuseLabsUrl(
			{ provider: 'amuselabs', set: 'guardian-sudoku-easy' },
			{ userId: null, darkMode: false },
		);
		expect(new URL(url).searchParams.has('darkMode')).toBe(true);
	});

	it('combines uid and darkMode when signed in with dark mode on', () => {
		expect(
			buildAmuseLabsUrl(
				{ provider: 'amuselabs', set: 'guardian-killer-sudoku-medium' },
				{ userId: 'user-123', darkMode: true },
			),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-killer-sudoku-medium&embed=1&idx=1&uid=user-123&darkMode=1',
		);
	});
});

describe('buildWordiplyUrl', () => {
	it('returns baseUrl unmodified regardless of context', () => {
		expect(
			buildWordiplyUrl(
				{ provider: 'wordiply', baseUrl: 'https://www.wordiply.com/' },
				{ userId: 'user-123', darkMode: true },
			),
		).toBe('https://www.wordiply.com/');
	});

	it('returns baseUrl unmodified when signed out with dark mode off', () => {
		expect(
			buildWordiplyUrl(
				{ provider: 'wordiply', baseUrl: 'https://www.wordiply.com/' },
				{ userId: null, darkMode: false },
			),
		).toBe('https://www.wordiply.com/');
	});
});

describe('resolvePuzzleIframeUrl', () => {
	// Each of these hardcodes and checks a single real registry entry's own,
	// complete, expected real URL independently for both a signed-in/
	// dark-mode-on and a signed-out/dark-mode-off combination, this is
	// deliberately what would have caught a provider-specific mistake early
	// (e.g. the original killer-sudoku bug), rather than testing the
	// dispatch mechanism in the abstract.
	it('resolves sudoku-easy (signed out, dark mode off)', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs['sudoku-easy']!, {
				userId: null,
				darkMode: false,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0',
		);
	});

	it('resolves sudoku-medium (signed in, dark mode on)', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs['sudoku-medium']!, {
				userId: 'user-123',
				darkMode: true,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-medium&embed=1&idx=1&uid=user-123&darkMode=1',
		);
	});

	it('resolves sudoku-hard (signed out, dark mode off)', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs['sudoku-hard']!, {
				userId: null,
				darkMode: false,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-hard&embed=1&idx=1&darkMode=0',
		);
	});

	it('resolves sudoku-killer to its exact, confirmed real-world URL (signed in, dark mode on)', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs['sudoku-killer']!, {
				userId: 'user-123',
				darkMode: true,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-killer-sudoku-medium&embed=1&idx=1&uid=user-123&darkMode=1',
		);
	});

	it('resolves word-wheel (signed out, dark mode off)', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs['word-wheel']!, {
				userId: null,
				darkMode: false,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-word-wheel&embed=1&idx=1&darkMode=0',
		);
	});

	it('resolves wordiply to its own explicit base URL regardless of context', () => {
		expect(
			resolvePuzzleIframeUrl(puzzleConfigs.wordiply!, {
				userId: 'user-123',
				darkMode: true,
			}),
		).toBe('https://www.wordiply.com/');
	});

	it('throws for an unrecognised provider (exhaustiveness fallback)', () => {
		expect(() =>
			resolvePuzzleIframeUrl(
				{
					...puzzleConfigs.wordiply!,
					iframe: { provider: 'not-a-real-provider' } as never,
				},
				{ userId: null, darkMode: false },
			),
		).toThrow();
	});
});
