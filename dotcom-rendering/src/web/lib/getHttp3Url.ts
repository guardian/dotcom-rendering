// Evaluating the performance of HTTP3 over HTTP2, this file can be removed once the experiment is concluded.
// See: https://github.com/guardian/dotcom-rendering/pull/5394
export const getHttp3Url = (url: string): string => {
	const urlObject = new URL(url);
	urlObject.searchParams.append('http', 'true');
	return urlObject.toString();
};
