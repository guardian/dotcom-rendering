/**
 * Formats script paths as a Link header
 * @see https://datatracker.ietf.org/doc/html/rfc5988#section-5.5
 * @param scriptPaths - the script paths to include in the Link header
 */
export const makePrefetchHeader = (scriptPaths: string[]): string =>
	scriptPaths.reduce(
		(acc, scriptPath) => acc + `<${scriptPath}>; rel=prefetch,`,
		'',
	);
