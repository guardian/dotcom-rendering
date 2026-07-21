import { makeMemoizedFunction } from '../memoize';

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
 * Builds a single string key combining the access token and the requested
 * recipe ids (deduped and sorted, so equivalent id sets in a different
 * order still hit the same cache entry), for use with `makeMemoizedFunction`
 * (which caches by a single primitive key, not by array/object reference).
 */
const buildCacheKey = (accessToken: string, recipeIds: string[]): string => {
	const sortedIds = Array.from(new Set(recipeIds)).sort();
	return `${accessToken}|${sortedIds.join(',')}`;
};

type SavedFromWebItem = { recipeId: string; lastModified: string };

/**
 * Checks which of the given recipe ids are already saved to the reader's
 * "Saved from web" list. The underlying `GET /api/saved-from-web?ids=...`
 * request returns only the ids that are saved, so an id absent from the
 * response is simply not saved (not an error).
 *
 * Memoized by (access token + sorted recipe ids): performs only one network
 * request per unique combination, no matter how many `FeastContextualNudge`
 * islands call it independently as they hydrate (each is deferred
 * `until: 'visible'` and hydrates at its own time). As long as every nudge
 * on a page is passed the same full list of recipe ids (see
 * `ArticleRenderer`), they'll all share the one in-flight/resolved request.
 */
const fetchSavedFromWebRecipes = makeMemoizedFunction(
	async (cacheKey: string): Promise<Set<string>> => {
		const [accessToken = '', idsParam = ''] = cacheKey.split('|');
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
	},
);

/**
 * Checks which of the given recipe ids are already saved to the reader's
 * "Saved from web" list. See `fetchSavedFromWebRecipes` for the memoization
 * behaviour that keeps this to one network request per page.
 * @param accessToken The reader's Okta access token
 * @param recipeIds The recipe ids to check (capped at `MaxSavedFromWebIdsPerRequest` on the Feast API; longer lists are truncated)
 */
export const getFeastSavedFromTheWebRecipes = (
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

	return fetchSavedFromWebRecipes(
		buildCacheKey(accessToken, cappedRecipeIds),
	);
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
