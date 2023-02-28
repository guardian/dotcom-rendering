import { resets } from '@guardian/source-foundations';
import { ASSET_ORIGIN } from '../../lib/assets';

export const pageTemplate = ({
	css,
	html,
	title = 'The Guardian',
	clientScripts,
}: {
	css: string;
	html: string;
	title?: string;
	clientScripts: string[];
}): string => {
	const favicon =
		process.env.NODE_ENV === 'production'
			? 'favicon-32x32.ico'
			: 'favicon-32x32-dev-yellow.ico';

	const staticPreconnectUrls = [`${ASSET_ORIGIN}`, `https://i.guim.co.uk`];
	const staticPrefetchUrls = [
		...staticPreconnectUrls,
		`https://interactive.guim.co.uk`,
	];
	const preconnectTags = staticPreconnectUrls.map(
		(src) => `<link rel="preconnect" href="${src}">`,
	);
	const prefetchTags = staticPrefetchUrls.map(
		(src) => `<link rel="dns-prefetch" href="${src}">`,
	);

	/**
	 * This workaround enables the reader to adjust interface scaling in the
	 * Android app. `fontSize.css` does not exist in this repository: the
	 * Android app intercepts requests for this file and provides the contents.
	 * @see https://github.com/guardian/android-news-app/blob/f7197b1c75c2bdafe1ea5e8dff547936c6a4df69/android-news-app/src/main/java/com/guardian/feature/renderedarticle/webview/FontSizeInterceptor.kt#L11
	 */
	const androidFontSizeWorkaround =
		'<link rel="stylesheet" type="text/css" href="/fontSize.css" />';

	return `<!doctype html>
		<html lang="en">
			<head>
				<title>${title}</title>

				<meta charset="utf-8">
				<meta name="description" content="${title}" />

                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">
                ${preconnectTags.join('\n')}
                ${prefetchTags.join('\n')}
				${androidFontSizeWorkaround}

                <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">

				<meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
				<meta name="twitter:dnt" content="on" />

				${clientScripts
					.map((scriptSrc) => `<script src="${scriptSrc}"></script>`)
					.join('\n')}
                <style>${resets.resetCSS}</style>
				${css}
			</head>
			<body>
				${html}
			</body>
		</html>
	`;
};
