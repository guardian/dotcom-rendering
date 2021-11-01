import { parse, URLSearchParams } from 'url';

export const getIdFromUrl = (
	urlString: string,
	regexFormat: string,
	tryInPath?: boolean,
	tryQueryParam?: string,
) => {
	const logErr = (actual: string, message: string) => {
		throw new Error(
			`validate getIdFromURL error: The URL ${urlString} returned ${actual}. ${message}`,
		);
	};

	const url = parse(urlString);

	// Looks for ID in both formats if provided
	const ids: string[] = [
		tryQueryParam && url.query && new URLSearchParams(url.query).get(tryQueryParam),
		tryInPath && url.pathname && url.pathname.split('/').pop(),
	].filter((tryId): tryId is string => !!tryId)

	if (!ids.length) logErr(
		'an undefined ID',
		'Could not get ID from pathname or searchParams.',
	);

	// Allows for a matching ID to be selected from either (or both) formats
	const id = ids.find((tryId) => new RegExp(regexFormat).test(tryId))

	if (!id) {
		return logErr(
			id || ids.join(', '),
			`Value(s) didn't match regexFormat ${regexFormat}`,
		);
	}

	return id;
};
