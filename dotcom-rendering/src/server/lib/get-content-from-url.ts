import type { IncomingHttpHeaders } from 'node:http';
import { isObject } from '@guardian/libs';
import type { Handler } from 'express';

const isStringTuple = (_: [string, unknown]): _ is [string, string] =>
	typeof _[1] === 'string';

/**
 * Get DCR content from a `theguardian.com` URL.
 * Takes in optional `X-Gu-*` headers to send.
 */
async function getContentFromURL(
	url: URL,
	_headers: IncomingHttpHeaders,
): Promise<unknown> {
	// searchParams will only work for the first set of query params because 'url' is already a query param itself
	const searchparams = url.searchParams.toString();

	// Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
	const jsonUrl = `${url.origin}${url.pathname}.json?dcr=true&${searchparams}`;

	// Explicitly pass through GU headers - this enables us to override properties such as region in CI
	const headers: HeadersInit = Object.fromEntries(
		Object.entries(_headers)
			.filter(
				([key]) =>
					key.toLowerCase() === 'cookie' ||
					key.toLowerCase().startsWith('x-gu-'),
			)
			.filter(isStringTuple),
	);

	// pick all the keys from the JSON except `html`
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- we don't want `html` in the config
	const { html, ...config } = await fetch(jsonUrl, { headers })
		.then((response) => response.json())
		.catch((error) => {
			if (isObject(error) && error.type === 'invalid-json') {
				throw new Error(
					'Did not receive JSON response - are you sure this URL supports .json?dcr requests?',
				);
			}
			throw error;
		});

	return config;
}

/**
 * @returns the parsed URL, or `undefined` if there’s no fully qualified path
 */
export const parseURL = (requestUrl: string): URL | undefined => {
	try {
		return new URL(
			decodeURIComponent(requestUrl.split('/').slice(2).join('/')),
		);
	} catch (error) {
		return undefined;
	}
};

export const getContentFromURLMiddleware: Handler = async (req, res, next) => {
	if (req.path === '/EditionsCrossword') {
		try {
			const url = new URL(
				'https://www.theguardian.com/crosswords/digital-edition',
			);
			const content = await getContentFromURL(url, req.headers);
			req.body = content;
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
	} else {
		const sourceURL = parseURL(req.originalUrl);
		if (sourceURL) {
			if (
				req.path.startsWith('/AMP') &&
				sourceURL.hostname === 'www.theguardian.com'
			) {
				res.redirect(
					req.path.replace(
						'www.theguardian.com',
						'amp.theguardian.com',
					),
				);
			}

			try {
				req.body = await getContentFromURL(sourceURL, req.headers);
			} catch (error) {
				console.error(error);
				next(error);
			}
		}
		next();
	}
};
