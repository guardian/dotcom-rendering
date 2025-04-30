const { json } = require('body-parser');

/** @type {(_: [string, unknown]) => _ is [string, string]} */
const isStringTuple = (_) => typeof _[1] === 'string';

/**
 * Get DCR content from a `theguardian.com` URL.
 * Takes in optional `X-Gu-*` headers to send.
 *
 * @param {URL} url
 * @param {import('http').IncomingHttpHeaders} _headers
 */
async function getContentFromURL(url, _headers) {
	console.log('getContentFromURL 1', url, _headers);
	// searchParams will only work for the first set of query params because 'url' is already a query param itself
	const searchparams = url.searchParams.toString();

	console.log('getContentFromURL 2 ', searchparams);

	// Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
	const jsonUrl = `${url.origin}${url.pathname}.json?dcr=true&${searchparams}`;

	console.log('getContentFromURL 3 ', jsonUrl);

	// Explicitly pass through GU headers - this enables us to override properties such as region in CI
	/** @type {HeadersInit} */
	const headers = Object.fromEntries(
		Object.entries(_headers)
			.filter(
				([key]) =>
					key.toLowerCase() === 'cookie' ||
					key.toLowerCase().startsWith('x-gu-'),
			)
			.filter(isStringTuple),
	);

	// pick all the keys from the JSON except `html`

	const { html, ...config } = await fetch(jsonUrl, { headers })
		.then((response) => response.json())
		.catch((error) => {
			if (error?.type === 'invalid-json') {
				throw new Error(
					'Did not receive JSON response - are you sure this URL supports .json?dcr requests?',
				);
			}
			console.log('getContentFromURL 4 ', error);
			throw error;
		});

	console.log('getContentFromURL 5 ', !!html, !!config);

	return config;
}

exports.default = getContentFromURL;

/**
 * @param {string} requestUrl
 * @returns {URL | undefined} the parsed URL, or false if there’s no fully qualified path
 */
const parseURL = (requestUrl) => {
	try {
		return new URL(
			decodeURIComponent(requestUrl.split('/').slice(2).join('/')),
		);
	} catch (error) {
		console.log('parseURL 1', error);
		return undefined;
	}
};

exports.parseURL = parseURL;

/** @type {import('webpack-dev-server').ExpressRequestHandler} */
exports.getContentFromURLMiddleware = async (req, res, next) => {
	console.log('getContentFromURLMiddleware 1');
	const sourceURL = parseURL(req.originalUrl);
	console.log('getContentFromURLMiddleware 2', sourceURL);

	if (sourceURL) {
		if (
			req.path.startsWith('/AMP') &&
			sourceURL.hostname === 'www.theguardian.com'
		) {
			res.redirect(
				req.path.replace('www.theguardian.com', 'amp.theguardian.com'),
			);
		}

		try {
			req.body = await getContentFromURL(sourceURL, req.headers);
		} catch (error) {
			console.log('getContentFromURLMiddleware 4', error);
			console.error(error);
			next(error);
		}
	}
	next();
};
