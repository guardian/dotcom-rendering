import {
	addFeastRecipeToSavedFromWebList,
	getFeastSavedFromTheWebRecipes,
} from './savedFromWeb';

/**
 * Regression tests guarding the architectural decision behind this module:
 * the Feast API's `/v2/saved-from-web` endpoints do NOT support a browser
 * calling them cross-origin. CORS preflight (`OPTIONS`) requests to that
 * endpoint were confirmed (2026-07-28) to return `403` in both PROD and
 * CODE, with no `access-control-allow-methods` header — unlike `/search`,
 * which returns a full, successful CORS preflight response. Browsers treat
 * a non-2xx preflight response as a failed preflight regardless of any
 * other CORS headers present, so a direct browser → Feast API call for
 * these endpoints will always fail with a CORS error.
 *
 * This means every request made by this module MUST go to our own relative,
 * same-origin proxy path, never to a `guardianapis.com` origin directly. If
 * that ever changes, it will very likely reintroduce the CORS failure this
 * suite is designed to catch.
 */
describe('savedFromWeb', () => {
	const originalFetch = global.fetch;

	beforeEach(() => {
		global.fetch = jest.fn();
		jest.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		global.fetch = originalFetch;
		jest.restoreAllMocks();
	});

	describe('getFeastSavedFromTheWebRecipes', () => {
		it('calls the relative same-origin proxy, never the Feast API directly', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-a', 'token-a', [
				'recipe-1',
			]);

			const [url]: [string] = (global.fetch as jest.Mock).mock.calls[0];
			expect(url.startsWith('/api/feast-saved-recipes')).toBe(true);
			expect(url).not.toContain('guardianapis.com');
		});

		it('sends the ids as a deduped, sorted, comma-separated query param', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-b', 'token-b', [
				'recipe-b',
				'recipe-a',
				'recipe-b',
			]);

			const [url]: [string] = (global.fetch as jest.Mock).mock.calls[0];
			expect(url).toBe(
				'/api/feast-saved-recipes?ids=recipe-a%2Crecipe-b',
			);
		});

		it('sends the Authorization bearer header', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-c', 'token-c', [
				'recipe-1',
			]);

			const [, requestInit]: [string, RequestInit | undefined] = (
				global.fetch as jest.Mock
			).mock.calls[0];
			const headers = (requestInit?.headers ?? {}) as Record<
				string,
				string
			>;
			expect(headers.Authorization).toBe('Bearer token-c');
		});

		it('returns the recipe ids present in the response', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [
					{ recipeId: 'recipe-1', lastModified: '2026-01-01' },
				],
			});

			const result = await getFeastSavedFromTheWebRecipes(
				'user-d',
				'token-d',
				['recipe-1', 'recipe-2'],
			);

			expect(result).toEqual(new Set(['recipe-1']));
		});

		it('returns an empty set when the response is not ok', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: false,
				status: 500,
				statusText: 'Internal Server Error',
			});

			const result = await getFeastSavedFromTheWebRecipes(
				'user-e',
				'token-e',
				['recipe-1'],
			);

			expect(result).toEqual(new Set());
		});

		it('returns an empty set and does not throw when fetch rejects', async () => {
			(global.fetch as jest.Mock).mockRejectedValue(
				new Error('network error'),
			);

			const result = await getFeastSavedFromTheWebRecipes(
				'user-f',
				'token-f',
				['recipe-1'],
			);

			expect(result).toEqual(new Set());
		});

		it('returns an empty set immediately, without fetching, for an empty recipeIds array', async () => {
			const result = await getFeastSavedFromTheWebRecipes(
				'user-g',
				'token-g',
				[],
			);

			expect(result).toEqual(new Set());
			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('truncates to the max allowed ids (5)', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-h', 'token-h', [
				'r1',
				'r2',
				'r3',
				'r4',
				'r5',
				'r6',
			]);

			const [url]: [string] = (global.fetch as jest.Mock).mock.calls[0];
			const idsParam = new URL(url, 'http://localhost').searchParams.get(
				'ids',
			);
			expect(idsParam?.split(',')).toHaveLength(5);
		});

		it('caches concurrent calls for the same user and ids, making only one request', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await Promise.all([
				getFeastSavedFromTheWebRecipes('user-i', 'token-i', [
					'recipe-1',
				]),
				getFeastSavedFromTheWebRecipes('user-i', 'token-i', [
					'recipe-1',
				]),
			]);

			expect(global.fetch).toHaveBeenCalledTimes(1);
		});
	});

	describe('addFeastRecipeToSavedFromWebList', () => {
		it('calls the relative same-origin proxy with PUT, never the Feast API directly', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({ ok: true });

			await addFeastRecipeToSavedFromWebList('token-j', 'recipe-1');

			const [url, requestInit]: [string, RequestInit | undefined] = (
				global.fetch as jest.Mock
			).mock.calls[0];
			expect(url).toBe('/api/feast-saved-recipes/recipe-1');
			expect(url).not.toContain('guardianapis.com');
			expect(requestInit?.method).toBe('PUT');
		});

		it('sends the Authorization bearer header', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({ ok: true });

			await addFeastRecipeToSavedFromWebList('token-k', 'recipe-1');

			const [, requestInit]: [string, RequestInit | undefined] = (
				global.fetch as jest.Mock
			).mock.calls[0];
			const headers = (requestInit?.headers ?? {}) as Record<
				string,
				string
			>;
			expect(headers.Authorization).toBe('Bearer token-k');
		});

		it('returns true when the response is ok', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({ ok: true });

			const result = await addFeastRecipeToSavedFromWebList(
				'token-l',
				'recipe-1',
			);

			expect(result).toBe(true);
		});

		it('returns false when the response is not ok', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: false,
				status: 400,
				statusText: 'Bad Request',
			});

			const result = await addFeastRecipeToSavedFromWebList(
				'token-m',
				'recipe-1',
			);

			expect(result).toBe(false);
		});

		it('returns false and does not throw when fetch rejects', async () => {
			(global.fetch as jest.Mock).mockRejectedValue(
				new Error('network error'),
			);

			const result = await addFeastRecipeToSavedFromWebList(
				'token-n',
				'recipe-1',
			);

			expect(result).toBe(false);
		});
	});
});
