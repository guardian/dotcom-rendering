import CleanCSS from 'clean-css';
import { FeastThrasher } from '../components/marketing/thrashers/FeastThrasher';
import { renderToStringWithEmotion } from '../lib/emotion';
import { rawFontsCss } from '../lib/fonts-css';

export type ThrasherName = 'Feast';
export const isThrasher = (name?: string): name is ThrasherName =>
	name === 'Feast';

// Minimal html page for the thrasher component
export const thrasherTemplate = (html: string, css: string): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	return `<!doctype html>
        <html lang="en">
            <head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
                <style class="webfont">${minifiedFontsCss}</style>
                ${css}
			</head>
			<body>
                ${html}
            </body>
        </html>`;
};

export const renderThrasher = (name: ThrasherName): { html: string } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<div>{name === 'Feast' && <FeastThrasher />}</div>,
	);

	// We currently don't send any of the data required for page config or window.guardian setup from frontend
	// const pageHtml = htmlPageTemplate({
	// 	scriptTags: [],
	// 	css: extractedCss,
	// 	html,
	// 	// @ts-expect-error no config data
	// 	guardian: {},
	// 	renderingTarget: 'Apps',
	// 	// @ts-expect-error no config data
	// 	config: {},
	// 	weAreHiring: false,
	// });
	const pageHtml = thrasherTemplate(html, extractedCss);
	return {
		// No scripts required currently
		html: pageHtml,
	};
};
