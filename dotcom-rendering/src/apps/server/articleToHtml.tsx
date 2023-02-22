import { generateScriptTags, getScriptsFromManifest } from '../../lib/assets';
import { FEArticleType } from '../../types/frontend';
import { renderToStringWithEmotion } from '../../web/lib/emotion';
import { pageTemplate } from './pageTemplate';

export const articleToHtml = (article: FEArticleType): string => {
	const { html, extractedCss } = renderToStringWithEmotion(<></>);

	const getScriptArrayFromFile = getScriptsFromManifest({
		platform: 'apps',
	});
	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const scriptTags = generateScriptTags([
		polyfillIO,
		...getScriptArrayFromFile('index.js'),
	]);

	return pageTemplate({
		css: extractedCss,
		html,
		title: article.webTitle,
		scriptTags,
	});
};
