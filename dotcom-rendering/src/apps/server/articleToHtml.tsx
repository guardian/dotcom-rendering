import { getScriptsFromManifest } from '../../lib/assets';
import { FEArticleType } from '../../types/frontend';
import { renderToStringWithEmotion } from '../../web/lib/emotion';
import { pageTemplate } from './pageTemplate';

export const articleToHtml = (
	article: FEArticleType,
): {
	clientScripts: string[];
	html: string;
} => {
	const { html, extractedCss } = renderToStringWithEmotion(<></>);

	const getScriptArrayFromFile = getScriptsFromManifest({
		platform: 'apps',
	});

	const clientScripts = getScriptArrayFromFile('index.js');
	const renderedPage = pageTemplate({
		css: extractedCss,
		html,
		title: article.webTitle,
		clientScripts,
	});
	return {
		clientScripts,
		html: renderedPage,
	};
};
