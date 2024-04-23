import { parse, URLSearchParams } from 'node:url';
import { isString } from '@guardian/libs';

export const getIdFromUrl = (
	urlString: string,
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

	if (ids.length && ids[0]) return ids[0];
	else
		return logErr(
			'an undefined ID',
			'Could not get ID from pathname or searchParams.',
		);
};
