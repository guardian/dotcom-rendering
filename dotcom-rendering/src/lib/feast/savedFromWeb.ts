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
 * Fetches the reader's full "Saved from web" recipe id list.
 *
 * Memoized by access token: performs only one network request per page
 * load, no matter how many `FeastContextualNudge` islands call it
 * independently as they hydrate (each is deferred `until: 'visible'` and
 * hydrates at its own time, so there is no single moment where "the page"
 * loads). This mirrors how `useAuthStatus` is called independently by many
 * islands elsewhere in DCR, relying on caching rather than a single
 * page-level coordination point.
 */
export const getFeastSavedFromTheWebRecipes = makeMemoizedFunction(
	async (accessToken: string): Promise<Set<string>> => {
		try {
			const response = await fetch(SAVED_FROM_WEB_PROXY_PATH, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'X-GU-IS-OAUTH': 'true',
				},
			});

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
				data.filter((id): id is string => typeof id === 'string'),
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
