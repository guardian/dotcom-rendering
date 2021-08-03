import { parse, URLSearchParams } from 'url';

export const getIdFromUrl = (
	urlString: string,
	regexFormat: string,
	inPath?: boolean,
	queryParam?: string,
) => {
	const logErr = (actual: string, message: string) => {
		throw new Error(
			`validate getIdFromURL error: The URL ${urlString} returned ${actual}. ${message}`,
		);
	};

	const url = parse(urlString);

	const id =
		(inPath && url.pathname && url.pathname.split('/').pop()) ||
		(queryParam &&
			url.query &&
			new URLSearchParams(url.query).get(queryParam)) ||
		logErr(
			'an undefined ID',
			'Could not get ID from pathname or searchParams.',
		);

	if (!new RegExp(regexFormat).test(id)) {
		return logErr(
			id,
			`Popped value didn't match regexFormat ${regexFormat}`,
		);
	}

	return id;
};
