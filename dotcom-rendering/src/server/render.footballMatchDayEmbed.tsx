import CleanCSS from 'clean-css';
import { FootballMatchDay } from '../components/FootballMatchDay';
import type { FootballMatches } from '../footballMatches';
import type { EditionId } from '../lib/edition';
import { renderToStringWithEmotion } from '../lib/emotion';
import { rawFontsCss } from '../lib/fonts-css';

const template = (html: string, css: string): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	return `<!doctype html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
				<style>${minifiedFontsCss}</style>
				<style>body{margin:0;}</style>
				${css}
			</head>
			<body>
				${html}
			</body>
		</html>`;
};

export const renderFootballMatchDayEmbed = (
	matches: FootballMatches,
	guardianBaseUrl: string,
	edition: EditionId,
): { html: string } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<FootballMatchDay
			matches={matches}
			guardianBaseUrl={guardianBaseUrl}
			edition={edition}
		/>,
	);

	const pageHtml = template(html, extractedCss);
	return {
		html: pageHtml,
	};
};
