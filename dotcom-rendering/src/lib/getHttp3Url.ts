// Evaluating the performance of HTTP3 over HTTP2, this file can be removed once the experiment is concluded.
// See: https://github.com/guardian/dotcom-rendering/pull/5394
export const getHttp3Url = (url: string): string => {
	try {
		const urlObject = new URL(url);
		urlObject.searchParams.append('http3', 'true');
		return urlObject.toString();
	} catch (e) {
		// if we are given an invalid url, `new URL()` will throw a
		// `TypeError` exception. In which case we can't safely apply
		// the http3 param anyway so just return it unchanged.
		if (e instanceof TypeError) {
			return url;
		} else {
			throw e;
		}
	}
};
