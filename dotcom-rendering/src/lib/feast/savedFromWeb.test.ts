import {
	addFeastRecipeToSavedFromWebList,
	getFeastSavedFromTheWebRecipes,
	removeFeastRecipeFromSavedFromWebList,
} from './savedFromWeb';

describe('savedFromWeb', () => {
	const originalFetch = global.fetch;

	beforeEach(() => {
		global.fetch = jest.fn();
		jest.spyOn(console, 'error').mockImplementation(() => undefined);
		window.guardian = {
			config: { stage: 'CODE' },
		} as unknown as typeof window.guardian;
	});

	afterEach(() => {
		global.fetch = originalFetch;
		jest.restoreAllMocks();
	});

	describe('getFeastSavedFromTheWebRecipes', () => {
		it('calls the Feast API directly using the CODE host when not on PROD', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-a', 'token-a', [
				'recipe-1',
			]);

			const [url]: [string] = (global.fetch as jest.Mock).mock.calls[0];
			expect(
				url.startsWith(
					'https://recipes.code.dev-guardianapis.com/persist/v2/saved-from-web',
				),
			).toBe(true);
		});

		it('calls the Feast API directly using the PROD host on PROD', async () => {
			window.guardian = {
				config: { stage: 'PROD' },
			} as unknown as typeof window.guardian;
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => [],
			});

			await getFeastSavedFromTheWebRecipes('user-a2', 'token-a2', [
				'recipe-1',
			]);

			const [url]: [string] = (global.fetch as jest.Mock).mock.calls[0];
			expect(
				url.startsWith(
					'https://recipes.guardianapis.com/persist/v2/saved-from-web',
				),
			).toBe(true);
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
				'https://recipes.code.dev-guardianapis.com/persist/v2/saved-from-web?ids=recipe-a%2Crecipe-b',
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
		it('calls the Feast API directly with PUT', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({ ok: true });

			await addFeastRecipeToSavedFromWebList('token-j', 'recipe-1');

			const [url, requestInit]: [string, RequestInit | undefined] = (
				global.fetch as jest.Mock
			).mock.calls[0];
			expect(url).toBe(
				'https://recipes.code.dev-guardianapis.com/persist/v2/saved-from-web/recipe-1',
			);
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

	describe('removeFeastRecipeFromSavedFromWebList', () => {
		it('calls the Feast API directly with DELETE and a bearer token', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				status: 204,
			});

			const result = await removeFeastRecipeFromSavedFromWebList(
				'token-o',
				'recipe-1',
			);

			const [url, requestInit]: [string, RequestInit | undefined] = (
				global.fetch as jest.Mock
			).mock.calls[0];
			expect(url).toBe(
				'https://recipes.code.dev-guardianapis.com/persist/v2/saved-from-web/recipe-1',
			);
			expect(requestInit?.method).toBe('DELETE');
			const headers = (requestInit?.headers ?? {}) as Record<
				string,
				string
			>;
			expect(headers.Authorization).toBe('Bearer token-o');
			expect(result).toBe(true);
		});

		it('treats a 204 response for an already absent recipe as success', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: true,
				status: 204,
			});

			const result = await removeFeastRecipeFromSavedFromWebList(
				'token-p',
				'absent-recipe',
			);

			expect(result).toBe(true);
		});

		it('retries a 503 response with exponential backoff', async () => {
			(global.fetch as jest.Mock)
				.mockResolvedValueOnce({
					ok: false,
					status: 503,
					statusText: 'Unavailable',
				})
				.mockResolvedValueOnce({ ok: true, status: 204 });

			const result = await removeFeastRecipeFromSavedFromWebList(
				'token-q',
				'recipe-1',
			);

			expect(result).toBe(true);
			expect(global.fetch).toHaveBeenCalledTimes(2);
		});

		it('invalidates cached saved status after a successful removal', async () => {
			(global.fetch as jest.Mock)
				.mockResolvedValueOnce({
					ok: true,
					json: async () => [
						{ recipeId: 'recipe-1', lastModified: '2026-01-01' },
					],
				})
				.mockResolvedValueOnce({ ok: true, status: 204 })
				.mockResolvedValueOnce({ ok: true, json: async () => [] });

			await getFeastSavedFromTheWebRecipes('user-r', 'token-r', [
				'recipe-1',
			]);
			await removeFeastRecipeFromSavedFromWebList('token-r', 'recipe-1');
			const result = await getFeastSavedFromTheWebRecipes(
				'user-r',
				'token-r',
				['recipe-1'],
			);

			expect(result).toEqual(new Set());
			expect(global.fetch).toHaveBeenCalledTimes(3);
		});
	});
});
