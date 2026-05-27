import CleanCSS from 'clean-css';
import { FEFootballSubNav } from '../frontend/feEmbeds';
import { renderToStringWithEmotion } from '../lib/emotion';
import { rawFontsCss } from '../lib/fonts-css';
import { DirectoryPageNav } from '../components/DirectoryPageNav.island';

const template = (html: string, css: string): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	return `<style>${minifiedFontsCss}</style>${css}${html}`;
};

export const renderFootballSubNavEmbed = (
	subNavData: FEFootballSubNav,
): { html: string } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<DirectoryPageNav pageId={subNavData.pageId} renderingTarget="Web" />,
	);

	const pageHtml = template(html, extractedCss);
	return {
		html: pageHtml,
	};
};
