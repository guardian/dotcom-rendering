import {
	buildPremiumPuzzlesSubscribeUrl,
	getCurrentPageUrl,
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

describe('getCurrentPageUrl', () => {
	const at = (origin: string, pathname: string) => ({
		protocol: new URL(origin).protocol,
		origin,
		pathname,
	});

	it('returns the origin and the path', () => {
		expect(
			getCurrentPageUrl(
				at('https://www.theguardian.com', '/sudoku/easy/2026-11-01'),
			),
		).toBe('https://www.theguardian.com/sudoku/easy/2026-11-01');
	});

	it('keeps the environment origin', () => {
		expect(
			getCurrentPageUrl(
				at('https://m.code.dev-theguardian.com', '/puzzles-and-games'),
			),
		).toBe('https://m.code.dev-theguardian.com/puzzles-and-games');
	});

	it('collapses repeated leading slashes', () => {
		expect(
			getCurrentPageUrl(
				at('https://r.thegulocal.com', '//puzzles-and-games/x'),
			),
		).toBe('https://r.thegulocal.com/puzzles-and-games/x');
	});

	it('returns undefined when the page is not served over https', () => {
		expect(
			getCurrentPageUrl(
				at('http://localhost:9000', '/puzzles-and-games'),
			),
		).toBeUndefined();
	});
});

describe('buildPremiumPuzzlesSubscribeUrl', () => {
	it('builds the Support URL with source and an encoded https returnUrl', () => {
		const link = buildPremiumPuzzlesSubscribeUrl({
			idUrl: 'https://profile.theguardian.com',
			returnUrl: 'https://www.theguardian.com/puzzles-and-games',
		});
		expect(link).toBe(
			'https://support.theguardian.com/?source=puzzles&returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fpuzzles-and-games',
		);
		expect(link).not.toContain('returnTo');
		expect(new URL(link).searchParams.get('returnUrl')).toBe(
			'https://www.theguardian.com/puzzles-and-games',
		);
	});

	it('only sends source when there is no return URL', () => {
		expect(
			buildPremiumPuzzlesSubscribeUrl({
				idUrl: 'https://profile.theguardian.com',
			}),
		).toBe('https://support.theguardian.com/?source=puzzles');
	});

	it('uses the Support origin of the current environment', () => {
		expect(
			buildPremiumPuzzlesSubscribeUrl({
				idUrl: 'https://profile.thegulocal.com',
				returnUrl: 'https://r.thegulocal.com/puzzles-and-games',
			}),
		).toBe(
			'https://support.thegulocal.com/?source=puzzles&returnUrl=https%3A%2F%2Fr.thegulocal.com%2Fpuzzles-and-games',
		);
	});

	it('falls back to production when idUrl is missing', () => {
		expect(buildPremiumPuzzlesSubscribeUrl({})).toBe(
			'https://support.theguardian.com/?source=puzzles',
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

	it('adds an encoded returnUrl', () => {
		expect(
			getPremiumPuzzlesSignInUrl(
				'https://profile.theguardian.com',
				'https://www.theguardian.com/puzzles-and-games',
			),
		).toBe(
			'https://profile.theguardian.com/signin?returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fpuzzles-and-games',
		);
	});
});
