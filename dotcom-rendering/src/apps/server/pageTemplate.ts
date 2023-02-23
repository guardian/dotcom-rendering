import { resets } from '@guardian/source-foundations';

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
	const androidFontSizeStylesheetPath = '/fontSize.css';
	return `<!doctype html>
		<html lang="en">
			<head>
				<title>${title}</title>

				<meta charset="utf-8">
				<meta name="description" content="${title}" />

                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">
				<link rel="stylesheet" type="text/css" href="${androidFontSizeStylesheetPath}" />

                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

				<meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
				<meta name="twitter:dnt" content="on" />

				${clientScripts.map((scriptSrc) => `<script src="${scriptSrc}"></script>`).join('\n')}
                <style>${resets.resetCSS}</style>
				${css}
			</head>
			<body>
				${html}
			</body>
		</html>
	`;
};
