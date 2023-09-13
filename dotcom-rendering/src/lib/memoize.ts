/**
 * Cache the results of calling an expensive function
 */
export const memoize = <K, V>(f: (key: K) => V): ((key: K) => V) => {
	const cache: Map<K, V> = new Map();
	return (key: K): V => {
		const memoized = cache.get(key);
		if (memoized !== undefined) {
			return memoized;
		}
		const value = f(key);
		cache.set(key, value);
		return value;
	};
};
