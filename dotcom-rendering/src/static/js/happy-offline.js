window.addEventListener('DOMContentLoaded', (event) => {
	domreadyHandler();
});

const domreadyHandler = async (event) => {
	const cache = await caches.open('GU-HAPPY-OFFLINE-v1');

	const containers = document.querySelectorAll('section[data-link-name^=container-]');
	containers.forEach((container) => {
		const sectionName = container.getAttribute('data-component');
		const links = container.querySelectorAll('ul li a');

		const fixedUrls = Array.from(links).map((link) => {
			const fixedUrl = rewriteArticleUrl(link.href);
			link.setAttribute('href', fixedUrl);
			return fixedUrl;
		});

		cache.addAll(fixedUrls);
	});
}

const rewriteArticleUrl = (url) => {
	const path = url.match(/^http:\/\/(.*?)\/(.*)/)[2];
	const sourceUrl = `https://www.theguardian.com/${path}`
	return `/Article?url=${sourceUrl}`;
}
