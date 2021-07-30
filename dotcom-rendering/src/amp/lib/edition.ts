/**
 * Determine if a string is one of the permitted edition strings
 *
 * @param s The string to test
 */
export function isEdition(s: string): s is Edition {
	return ['UK', 'US', 'INT', 'AU'].includes(s);
}
