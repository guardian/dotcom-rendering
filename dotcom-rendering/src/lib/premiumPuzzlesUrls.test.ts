import {
	buildPremiumPuzzlesSubscribeUrl,
	getPathFromUrl,
	getPremiumPuzzlesSignInUrl,
	getSupportBaseUrl,
	isSafeInternalPath,
} from './premiumPuzzlesUrls';

describe('getSupportBaseUrl', () => {
	it.each([
		['https://profile.thegulocal.com', 'https://support.thegulocal.com'],
		[
			'https://profile.code.dev-theguardian.com',
			'https://support.code.dev-theguardian.com',
		],
		['https://profile.theguardian.com', 'https://support.theguardian.com'],
	])('derives the Support origin from %s', (idUrl, expected) => {
		expect(getSupportBaseUrl(idUrl)).toBe(expected);
	});

	it('falls back to production when idUrl is missing', () => {
		expect(getSupportBaseUrl(undefined)).toBe(
			'https://support.theguardian.com',
		);
	});

	it('falls back to production when idUrl does not start with profile.', () => {
		expect(getSupportBaseUrl('https://example.com')).toBe(
			'https://support.theguardian.com',
		);
	});

	it('falls back to production when idUrl is not a valid URL', () => {
		expect(getSupportBaseUrl('not a url')).toBe(
			'https://support.theguardian.com',
		);
	});
});

describe('isSafeInternalPath', () => {
	it.each([
		'/',
		'/puzzles-and-games',
		'/puzzles-and-games/logic-puzzles/archive',
	])('accepts %s', (path) => {
		expect(isSafeInternalPath(path)).toBe(true);
	});

	it.each([
		'',
		'puzzles-and-games',
		'//evil.com',
		'https://evil.com',
		'/\\evil.com',
	])('rejects %p', (path) => {
		expect(isSafeInternalPath(path)).toBe(false);
	});
});

describe('getPathFromUrl', () => {
	it('returns the pathname of an absolute URL', () => {
		expect(
			getPathFromUrl(
				'https://www.theguardian.com/sudoku/easy?x=1',
				'/fallback',
			),
		).toBe('/sudoku/easy');
	});

	it('collapses repeated leading slashes, so the path stays a same-site path', () => {
		const path = getPathFromUrl(
			'http://localhost:9000//puzzles-and-games/logic-puzzles/sudoku-easy/2026-10-30',
			'/fallback',
		);
		expect(path).toBe(
			'/puzzles-and-games/logic-puzzles/sudoku-easy/2026-10-30',
		);
		expect(isSafeInternalPath(path)).toBe(true);
	});

	it('returns the fallback for an invalid URL', () => {
		expect(getPathFromUrl('not a url', '/fallback')).toBe('/fallback');
	});
});

describe('buildPremiumPuzzlesSubscribeUrl', () => {
	it('builds the Support URL with source and returnTo', () => {
		expect(
			buildPremiumPuzzlesSubscribeUrl({
				idUrl: 'https://profile.thegulocal.com',
				returnFromSubscribeToPath: '/puzzles-and-games',
			}),
		).toBe(
			'https://support.thegulocal.com/?source=puzzles&returnTo=%2Fpuzzles-and-games',
		);
	});

	it('encodes special characters in the return path', () => {
		const url = new URL(
			buildPremiumPuzzlesSubscribeUrl({
				idUrl: 'https://profile.theguardian.com',
				returnFromSubscribeToPath: '/a/b?x=1&y=2',
			}),
		);
		expect(url.searchParams.get('returnTo')).toBe('/a/b?x=1&y=2');
		expect(url.searchParams.get('source')).toBe('puzzles');
	});

	it('omits returnTo when the path is not a safe internal path', () => {
		expect(
			buildPremiumPuzzlesSubscribeUrl({
				idUrl: 'https://profile.theguardian.com',
				returnFromSubscribeToPath: '//evil.com',
			}),
		).toBe('https://support.theguardian.com/?source=puzzles');
	});

	it('falls back to production when idUrl is missing', () => {
		expect(
			buildPremiumPuzzlesSubscribeUrl({
				returnFromSubscribeToPath: '/puzzles-and-games',
			}),
		).toBe(
			'https://support.theguardian.com/?source=puzzles&returnTo=%2Fpuzzles-and-games',
		);
	});
});

describe('getPremiumPuzzlesSignInUrl', () => {
	it('uses the current environment idUrl', () => {
		expect(
			getPremiumPuzzlesSignInUrl('https://profile.thegulocal.com'),
		).toBe('https://profile.thegulocal.com/signin');
	});

	it('falls back to production', () => {
		expect(getPremiumPuzzlesSignInUrl(undefined)).toBe(
			'https://profile.theguardian.com/signin',
		);
	});
});
