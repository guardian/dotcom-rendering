/**
 * Type representing an array with at least one element
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Type guard for determining whether an array has at least one element
 */
export const isNonEmptyArray = <T>(items: T[]): items is NonEmptyArray<T> =>
	items.length > 0;
