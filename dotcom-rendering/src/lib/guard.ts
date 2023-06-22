/** A method to create type-guard for string unions */
export const guard =
	<T extends readonly string[]>(array: T) =>
	(value: string): value is (typeof array)[number] =>
		array.includes(value);

export type Guard<T> = T extends readonly string[] ? T[number] : never;
