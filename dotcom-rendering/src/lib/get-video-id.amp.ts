import { URL, URLSearchParams } from 'node:url';
import { isString } from '@guardian/libs';

export const getIdFromUrl = (
	urlString: string,
	tryInPath?: boolean,
	tryQueryParam?: string,
): string | undefined => {
	if (!URL.canParse(urlString)) return undefined;

	// Looks for ID in both formats if provided
	const url = new URL(urlString);

	return [
		tryQueryParam
			? new URLSearchParams(url.search).get(tryQueryParam)
			: undefined,
		tryInPath ? url.pathname.split('/').at(-1) : undefined,
	].find(isString);
};
