/**
 * TODO
 */
export type NonEmpty<T> = [T, ...T[]];

/**
 * TODO
 */
export const isNonEmpty = <T>(items: T[]): items is NonEmpty<T> =>
	items.length > 0;
