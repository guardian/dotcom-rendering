/**
 * Temporary fix
 * =============
 *
 * Find the master URL for an image if has already been signed upstream.
 *
 * DCR can handle generating a signed image URL with `generateImageURL`,
 * so this method extracts source URLS from fully signed ones. _e.g.:_
 *
 * - from
 *   `https://i.guim.co.uk/img/media/c56c6217f8fa306d89320cc7915161203b5017b1/0_166_5000_3002/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=0d205d08639b4ad6e1b86758ab451abb`
 * 	 to
 *   `https://media.guim.co.uk/img/media/c56c6217f8fa306d89320cc7915161203b5017b1/0_166_5000_3002/master/5000.jpg`
 *
 * - from
 *   `https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3`
 *   to
 *   `https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png`
 *
 * @deprecated Favour updating image paths sent from frontend to sources
 */
export const getSourceImageUrl = (source: string): string => {
	const url = new URL(source);

	const buckets = ['/img/media/', '/img/static/', '/img/uploads/'] as const;
	const prefix = buckets.find((bucket) => url.pathname.startsWith(bucket));

	if (url.hostname === 'i.guim.co.uk' && prefix) {
		const path = url.pathname.replace(prefix, '');
		switch (prefix) {
			case '/img/media/':
				return `https://media.guim.co.uk/${path}`;
			case '/img/static/':
				return `https://static.guim.co.uk/${path}`;
			case '/img/uploads/':
				return `https://uploads.guim.co.uk/${path}`;
		}
	}

	return source;
};
