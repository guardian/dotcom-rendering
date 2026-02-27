import CleanCSS from 'clean-css';
import { FeastThrasher } from '../components/marketing/thrashers/FeastThrasher';
import { renderToStringWithEmotion } from '../lib/emotion';
import { rawFontsCss } from '../lib/fonts-css';

type ThrasherName = 'feast';
export const isThrasher = (name?: string): name is ThrasherName =>
	name === 'feast';

// Minimal html page for the thrasher component
// Note: intentionally omitting <!doctype html> — the doctype triggers standards
// mode in WebKit, which causes the iOS app's WKWebView to measure the content
// height slightly larger than the container, creating unwanted vertical scroll.
// Existing thrashers from the interactives repo also omit the doctype.
const thrasherTemplate = (html: string, css: string): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	return `
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
		<>{name === 'feast' && <FeastThrasher renderingTarget={'Apps'} />}</>,
	);

	const pageHtml = thrasherTemplate(html, extractedCss);
	return {
		// No scripts required currently
		html: pageHtml,
	};
};
