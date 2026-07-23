/**
 * DCR's own server-side proxy for the Feast API's "Saved from web"
 * endpoints (see `handler.savedFromWeb.ts`). The browser never talks to the
 * Feast API directly: DCR's Node server forwards the reader's bearer token
 * straight through, which sidesteps needing Feast API-side CORS
 * configuration for browser origins.
 */
const SAVED_FROM_WEB_PROXY_PATH = '/api/saved-from-web';

/**
 * Upper bound on how many recipe ids can be requested in one call. Mirrors
 * the Feast API's own `MaxSavedFromWebIdsPerRequest` limit (currently 5,
 * which also happens to match DCR's own `MAX_NUDGES` cap on how many
 * FeastContextualNudge placements can appear on a single article).
 */
const MAX_SAVED_FROM_WEB_IDS_PER_REQUEST = 5;

/**
 * In-flight/resolved request cache, keyed by `userId:sortedRecipeIds`.
 *
 * Deliberately keyed by the reader's user id, not their access token: the
 * token is only ever used transiently to make the one underlying fetch and
 * is not retained here, which keeps it out of any long-lived module-level
 * state. This is module-level state that resets on every full page
 * load — DCR has no SPA navigation, so a page refresh always starts with an
 * empty cache, same as `stalePlacements` in `BrazeBannersSystem.tsx`.
 */
const savedFromWebCache = new Map<string, Promise<Set<string>>>();

type SavedFromWebItem = { recipeId: string; lastModified: string };

/**
 * Performs (and caches) the underlying request for a given cache key. The
 * cache entry is written synchronously, before the fetch resolves, so
 * concurrent callers in the same tick share the one in-flight promise
 * rather than each triggering their own request.
 */
const fetchSavedFromWebRecipes = (
	cacheKey: string,
	accessToken: string,
	idsParam: string,
): Promise<Set<string>> => {
	const cached = savedFromWebCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	const promise = (async (): Promise<Set<string>> => {
		try {
			const response = await fetch(
				`${SAVED_FROM_WEB_PROXY_PATH}?ids=${encodeURIComponent(idsParam)}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'X-GU-IS-OAUTH': 'true',
					},
				},
			);

			if (!response.ok) {
				console.error(
					'[getFeastSavedFromTheWebRecipes] Failed to fetch saved recipes:',
					response.status,
					response.statusText,
				);
				return new Set();
			}

			const data: unknown = await response.json();
			if (!Array.isArray(data)) {
				console.error(
					'[getFeastSavedFromTheWebRecipes] Unexpected response shape:',
					data,
				);
				return new Set();
			}

			return new Set(
				(data as SavedFromWebItem[])
					.filter((item) => typeof item.recipeId === 'string')
					.map((item) => item.recipeId),
			);
		} catch (error) {
			console.error(
				'[getFeastSavedFromTheWebRecipes] Error fetching saved recipes:',
				error,
			);
			return new Set();
		}
	})();

	savedFromWebCache.set(cacheKey, promise);
	return promise;
};

/**
 * Checks which of the given recipe ids are already saved to the reader's
 * "Saved from web" list. See `fetchSavedFromWebRecipes` for the caching
 * behaviour that keeps this to one network request per page.
 * @param userId The reader's user id (`idToken.claims.sub`), used only as the cache key
 * @param accessToken The reader's Okta access token, used only to make the request
 * @param recipeIds The recipe ids to check (capped at `MaxSavedFromWebIdsPerRequest` on the Feast API; longer lists are truncated)
 */
export const getFeastSavedFromTheWebRecipes = (
	userId: string,
	accessToken: string,
	recipeIds: string[],
): Promise<Set<string>> => {
	if (recipeIds.length === 0) {
		return Promise.resolve(new Set());
	}

	const cappedRecipeIds =
		recipeIds.length > MAX_SAVED_FROM_WEB_IDS_PER_REQUEST
			? recipeIds.slice(0, MAX_SAVED_FROM_WEB_IDS_PER_REQUEST)
			: recipeIds;

	if (cappedRecipeIds.length !== recipeIds.length) {
		console.error(
			`[getFeastSavedFromTheWebRecipes] Too many recipe ids requested (${recipeIds.length}), truncating to ${MAX_SAVED_FROM_WEB_IDS_PER_REQUEST}`,
		);
	}

	const idsParam = Array.from(new Set(cappedRecipeIds)).sort().join(',');
	const cacheKey = `${userId}:${idsParam}`;

	return fetchSavedFromWebRecipes(cacheKey, accessToken, idsParam);
};

/**
 * Adds a recipe to the reader's "Saved from web" list, creating the list on
 * first use. Idempotent: adding the same recipe id twice has no extra
 * effect.
 *
 * Not memoized: each call is a distinct write, not an idempotent read to
 * dedupe.
 */
export const addFeastRecipeToSavedFromWebList = async (
	accessToken: string,
	recipeId: string,
): Promise<boolean> => {
	try {
		const response = await fetch(
			`${SAVED_FROM_WEB_PROXY_PATH}/${encodeURIComponent(recipeId)}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'X-GU-IS-OAUTH': 'true',
				},
			},
		);

		if (!response.ok) {
			console.error(
				'[addFeastRecipeToSavedFromWebList] Failed to save recipe:',
				response.status,
				response.statusText,
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(
			'[addFeastRecipeToSavedFromWebList] Error saving recipe:',
			error,
		);
		return false;
	}
};
