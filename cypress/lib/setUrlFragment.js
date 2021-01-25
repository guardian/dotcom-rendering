const setUrlFragment = (urlString, fragments) => {
	const url = new URL(urlString);

	const newFragments = Object.entries(fragments)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	url.hash = (url.hash ? `${url.hash}&` : '') + newFragments;

	return url;
};

export { setUrlFragment };
