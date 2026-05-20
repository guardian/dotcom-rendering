import CleanCSS from 'clean-css';
import { FootballMatchDay } from '../components/FootballMatchDay';
import { renderToStringWithEmotion } from '../lib/emotion';
import { rawFontsCss } from '../lib/fonts-css';
import type { MatchDayData } from './handler.footballMatchDayEmbed';

const template = (html: string, css: string): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	return `<style>${minifiedFontsCss}</style>${css}${html}`;
};

export const renderFootballMatchDayEmbed = (
	matchDay: MatchDayData,
): { html: string } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<FootballMatchDay
			matches={matchDay.matchesList}
			guardianBaseUrl={matchDay.guardianBaseURL}
			edition={matchDay.editionId}
		/>,
	);

	const pageHtml = template(html, extractedCss);
	return {
		html: pageHtml,
	};
};
