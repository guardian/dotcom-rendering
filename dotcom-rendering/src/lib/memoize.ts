/**
 * Cache the results of calling a function with string keys
 */
export const memoize = <T>(f: (key: string) => T): ((key: string) => T) => {
	const cache: {
		[key: string]: T;
	} = {};
	return (key: string): T => {
		const memoized = cache[key];
		if (memoized !== undefined) {
			return memoized;
		}
		const v = f(key);
		cache[key] = v;
		return v;
	};
};
