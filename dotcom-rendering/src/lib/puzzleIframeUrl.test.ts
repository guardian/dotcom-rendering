import type { AmuseLabsIframeConfig } from '../model/puzzles/puzzleConfigs';
import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import {
	buildAmuseLabsUrl,
	buildWordiplyUrl,
	resolvePuzzleIframeUrl,
} from './puzzleIframeUrl';

const easyConfig = puzzleConfigs['sudoku-easy']!
	.iframe as AmuseLabsIframeConfig;
const killerConfig = puzzleConfigs['sudoku-killer']!
	.iframe as AmuseLabsIframeConfig;

describe('buildAmuseLabsUrl', () => {
	it('builds the base URL with set/embed/idx when signed out and dark mode off', () => {
		expect(
			buildAmuseLabsUrl(easyConfig, { userId: null, darkMode: false }),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0',
		);
	});

	it('appends uid when signed in', () => {
		expect(
			buildAmuseLabsUrl(easyConfig, {
				userId: 'user-123',
				darkMode: false,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&uid=user-123&darkMode=0',
		);
	});

	it('omits uid entirely when signed out (not uid=null or empty)', () => {
		const url = buildAmuseLabsUrl(easyConfig, {
			userId: null,
			darkMode: false,
		});
		expect(new URL(url).searchParams.has('uid')).toBe(false);
	});

	it('sends darkMode=1 as a plain literal query value when dark mode is on', () => {
		const url = buildAmuseLabsUrl(easyConfig, {
			userId: null,
			darkMode: true,
		});
		expect(new URL(url).searchParams.get('darkMode')).toBe('1');
	});

	it('always includes darkMode, unlike uid which is conditional', () => {
		const url = buildAmuseLabsUrl(easyConfig, {
			userId: null,
			darkMode: false,
		});
		expect(new URL(url).searchParams.has('darkMode')).toBe(true);
	});

	it('combines uid and darkMode when signed in with dark mode on', () => {
		expect(
			buildAmuseLabsUrl(killerConfig, {
				userId: 'user-123',
				darkMode: true,
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/date-picker?set=guardian-killer-sudoku-medium&embed=1&idx=1&uid=user-123&darkMode=1',
		);
	});
});

describe('buildAmuseLabsUrl with a puzzleDate', () => {
	it('loads the dated puzzle from the player by id, without idx', () => {
		expect(
			buildAmuseLabsUrl(easyConfig, {
				userId: null,
				darkMode: false,
				puzzleDate: '2026-10-04',
			}),
		).toBe(
			'https://tg.amuselabs.com/guardian/sudoku?id=guardian-sudoku-easy-20261004&set=guardian-sudoku-easy&embed=1&darkMode=0',
		);
	});

	it('gives different URLs for different dates', () => {
		const urlFor = (puzzleDate: string) =>
			buildAmuseLabsUrl(easyConfig, {
				userId: null,
				darkMode: false,
				puzzleDate,
			});
		expect(urlFor('2026-10-04')).not.toBe(urlFor('2026-10-31'));
	});

	it('uses the killer id prefix, which differs from its set', () => {
		const url = new URL(
			buildAmuseLabsUrl(killerConfig, {
				userId: 'user-123',
				darkMode: true,
				puzzleDate: '2026-10-04',
			}),
		);
		expect(url.pathname).toBe('/guardian/sudoku');
		expect(url.searchParams.get('id')).toBe(
			'guardian-ksudoku-medium-20261004',
		);
		expect(url.searchParams.get('set')).toBe(
			'guardian-killer-sudoku-medium',
		);
		expect(url.searchParams.get('uid')).toBe('user-123');
		expect(url.searchParams.get('darkMode')).toBe('1');
		expect(url.searchParams.has('idx')).toBe(false);
	});

	it('uses the wordf player and id prefix for word wheel', () => {
		const url = new URL(
			resolvePuzzleIframeUrl(puzzleConfigs['word-wheel']!, {
				userId: null,
				darkMode: false,
				puzzleDate: '2026-10-04',
			}),
		);
		expect(url.pathname).toBe('/guardian/wordf');
		expect(url.searchParams.get('id')).toBe('guardian-wordwheel-20261004');
	});

	it.each([null, undefined, '', 'not-a-date', '2026-10-4', '20261004'])(
		'falls back to the latest puzzle (idx=1) for puzzleDate %p',
		(puzzleDate) => {
			expect(
				buildAmuseLabsUrl(easyConfig, {
					userId: null,
					darkMode: false,
					puzzleDate,
				}),
			).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0',
			);
		},
	);
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
