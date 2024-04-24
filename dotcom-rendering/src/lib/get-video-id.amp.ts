import { URL, URLSearchParams } from 'node:url';
import { isString } from '@guardian/libs';

export const getIdFromUrl = (
	urlString: string,
	tryInPath?: boolean,
	tryQueryParam?: string,
): string => {
	// Looks for ID in both formats if provided
	const url = new URL(urlString);

	const id = [
		tryQueryParam
			? new URLSearchParams(url.search).get(tryQueryParam)
			: undefined,
		tryInPath ? url.pathname.split('/').at(-1) : undefined,
	].find(isString);

	if (id !== undefined) return id;

	throw new Error(
		`getIdFromUrl: The URL ${urlString} did not contain an ID.`,
	);
};
