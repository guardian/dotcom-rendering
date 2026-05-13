import { FootballMatchDay } from '../components/FootballMatchDay';
import { renderToStringWithEmotion } from '../lib/emotion';

const template = (html: string, css: string): string => {
	return `<!doctype html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
				${css}
			</head>
			<body>
				${html}
			</body>
		</html>`;
};

export const renderFootballMatchDayEmbed = (): { html: string } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<FootballMatchDay />,
	);

	const pageHtml = template(html, extractedCss);
	return {
		html: pageHtml,
	};
};
