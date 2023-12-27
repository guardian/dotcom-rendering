import { parse, URLSearchParams } from 'node:url';
import { isString } from '@guardian/libs';

export const getIdFromUrl = (
	urlString: string,
	regexFormat: string,
	tryInPath?: boolean,
	tryQueryParam?: string,
): string => {
	const logErr = (actual: string, message: string) => {
		throw new Error(
			`validate getIdFromURL error: The URL ${urlString} returned ${actual}. ${message}`,
		);
	};

	// Looks for ID in both formats if provided
	const url = parse(urlString);

	const ids = [
		tryQueryParam
			? new URLSearchParams(url.query ?? '').get(tryQueryParam)
			: undefined,
		tryInPath ? (url.pathname ?? '').split('/').at(-1) : undefined,
	]
		.filter(isString)
		.map((id) => id.slice(0, 11));

	if (!ids.length)
		logErr(
			'an undefined ID',
			'Could not get ID from pathname or searchParams.',
		);

	// Allows for a matching ID to be selected from either (or both) formats
	const id = ids.find((tryId) => new RegExp(regexFormat).test(tryId));

	if (!id) {
		return logErr(
			id ?? ids.join(', '),
			`Value(s) didn't match regexFormat ${regexFormat}`,
		);
	}

	return id;
};
