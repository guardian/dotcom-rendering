export const editions = ['UK', 'US', 'INT', 'AU', 'EUR'] as const;
export type EditionId = typeof editions[number];

export type Edition = {
	id: EditionId;
	displayName: string;
	locale: string;
};

/**
 * Determine if a string is one of the permitted edition strings
 *
 * @param s The string to test
 */
export function isEditionId(s: string): s is EditionId {
	return editions.includes(s as EditionId);
}
