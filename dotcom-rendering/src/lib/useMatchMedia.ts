import { useSyncExternalStore } from 'react';

/**
 * Stores constructed media queries by their query string, so they don't have
 * to be recreated on each render. Also allows multiple components to use the
 * same media query.
 */
const cachedQueries = new Map<string, MediaQueryList>();

/**
 * A custom hook to test the provided media query. Will return a `boolean`
 * signifying whether the media query currently matches, and will trigger a
 * re-render whenever the match status changes in either direction;
 * e.g. from `true` to `false`, or from `false` to `true`.
 *
 * @param query A media query string for use with `window.matchMedia`
 * @returns A `boolean` signifying whether the media query currently matches
 */
const useMatchMedia = (query: string): boolean => {
	const maybeQuery = cachedQueries.get(query);
	const mediaQuery = maybeQuery ?? window.matchMedia(query);

	if (maybeQuery === undefined) {
		cachedQueries.set(query, mediaQuery);
	}

	return useSyncExternalStore(
		(changed) => {
			mediaQuery.addEventListener('change', changed);

			return () => {
				mediaQuery.removeEventListener('change', changed);
			};
		},
		() => mediaQuery.matches,
	);
};

export { useMatchMedia };
