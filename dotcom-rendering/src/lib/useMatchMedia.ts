import { useEffect, useState, useSyncExternalStore } from 'react';

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
 * @param {string} query for use with `window.matchMedia`
 * @returns {boolean} whether the media query currently matches
 */
const useMatchMedia = (query: string): boolean => {
	const [mediaQuery, setMediaQuery] = useState(cachedQueries.get(query));

	useEffect(() => {
		if (mediaQuery) return;
		cachedQueries.set(query, window.matchMedia(query));
		setMediaQuery(cachedQueries.get(query));
	}, [mediaQuery, query]);

	/** @see https://react.dev/reference/react/useSyncExternalStore */
	return useSyncExternalStore(
		(callback) => {
			mediaQuery?.addEventListener('change', callback);

			return () => {
				mediaQuery?.removeEventListener('change', callback);
			};
		},
		() => !!mediaQuery?.matches,
		() => false, // we cannot have media queries on the server
	);
};

export { useMatchMedia };
