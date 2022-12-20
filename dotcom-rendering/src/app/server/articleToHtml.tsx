import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import {
	generateScriptTags,
	getAppScript,
} from '../../lib/assets';
// import { makeWindowGuardian } from '../../model/window-guardian';
import type { CAPIElement } from '../../types/content';
import type { FEArticleType } from '../../types/frontend';
import { decideFormat } from '../../web/lib/decideFormat';
import { decideTheme } from '../../web/lib/decideTheme';
import { getHttp3Url } from '../../web/lib/getHttp3Url';
import { ArticlePage } from '../components/ArticlePage';
import { pageTemplate } from './pageTemplate';

interface Props {
	article: FEArticleType;
}

const decideTitle = (article: FEArticleType): string => {
	if (
		decideTheme(article.format) === ArticlePillar.Opinion &&
		article.byline
	) {
		return `${article.headline} | ${article.byline}`;
	}
	return `${article.headline} | ${article.sectionLabel}`;
};

export const articleToHtml = ({ article }: Props): string => {
	const title = decideTitle(article);
	const key = 'ar';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const format: ArticleFormat = decideFormat(article.format);

	const html = renderToString(
		<CacheProvider value={cache}>
			<ArticlePage format={format} CAPIArticle={article} />
		</CacheProvider>,
	);

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const CAPIElements: CAPIElement[] = article.blocks
		.map((block) => block.elements)
		.flat();

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = article.config.switches;

	// const pageHasNonBootInteractiveElements = CAPIElements.some(
	// 	(element) =>
	// 		element._type ===
	// 			'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
	// 		element.scriptUrl !==
	// 			'https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js', // We have rewritten this standard behaviour into Dotcom Rendering
	// );

	const pageHasTweetElements = CAPIElements.some(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.TweetBlockElement',
	);

	// const shouldServeVariantBundle: boolean = [
	// 	BUILD_VARIANT,
	// 	article.config.abTests[dcrJavascriptBundle('Variant')] === 'variant',
	// ].every(Boolean);

	/**
	 * This function returns an array of files found in the manifests
	 * defined by `manifestPaths`.
	 *
	 * @see getScriptsFromManifest
	 */
	// const getScriptArrayFromFile = getScriptsFromManifest(
	// 	shouldServeVariantBundle,
	// );

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const priorityScriptTags = generateScriptTags(
		[getAppScript()].map((script) =>
			offerHttp3 && script ? getHttp3Url(script) : script,
		),
	);

	const lowPriorityScriptTags: string[] = [];

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	// const windowGuardian = escapeData(
	// 	JSON.stringify(
	// 		makeWindowGuardian({
	// 			editionId: article.editionId,
	// 			stage: article.config.stage,
	// 			frontendAssetsFullURL: article.config.frontendAssetsFullURL,
	// 			revisionNumber: article.config.revisionNumber,
	// 			sentryPublicApiKey: article.config.sentryPublicApiKey,
	// 			sentryHost: article.config.sentryHost,
	// 			keywordIds: article.config.keywordIds,
	// 			dfpAccountId: article.config.dfpAccountId,
	// 			adUnit: article.config.adUnit,
	// 			ajaxUrl: article.config.ajaxUrl,
	// 			googletagUrl: article.config.googletagUrl,
	// 			switches: article.config.switches,
	// 			abTests: article.config.abTests,
	// 			brazeApiKey: article.config.brazeApiKey,
	// 			isPaidContent: article.pageType.isPaidContent,
	// 			contentType: article.contentType,
	// 			shouldHideReaderRevenue: article.shouldHideReaderRevenue,
	// 			GAData: extractGA({
	// 				webTitle: article.webTitle,
	// 				format: article.format,
	// 				sectionName: article.sectionName,
	// 				contentType: article.contentType,
	// 				tags: article.tags,
	// 				pageId: article.pageId,
	// 				editionId: article.editionId,
	// 				beaconURL: article.beaconURL,
	// 			}),
	// 			unknownConfig: article.config,
	// 		}),
	// 	),
	// );

	const initTwitter = `
<script>
// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
window.twttr = (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],
	t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);

	t._e = [];
	t.ready = function(f) {
	t._e.push(f);
	};

	return t;
}(document, "script", "twitter-wjs"));
</script>`;

	return pageTemplate({
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title,
		description: article.trailText,
		// windowGuardian,
		initTwitter:
			pageHasTweetElements || format.design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		offerHttp3,
	});
};
