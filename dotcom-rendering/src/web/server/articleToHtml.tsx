import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { isAmpSupported } from '../../amp/components/Elements';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getScriptsFromManifest,
} from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { extractGA } from '../../model/extract-ga';
import { extractNAV } from '../../model/extract-nav';
import { makeWindowGuardian } from '../../model/window-guardian';
import type { CAPIElement } from '../../types/content';
import type { FEArticleType } from '../../types/frontend';
import type { TagType } from '../../types/tag';
import { ArticlePage } from '../components/ArticlePage';
import { decideFormat } from '../lib/decideFormat';
import { decideTheme } from '../lib/decideTheme';
import { getHttp3Url } from '../lib/getHttp3Url';
import { extractExpeditedIslands } from './extractIslands';
import { pageTemplate } from './pageTemplate';
import { recipeSchema } from './temporaryRecipeStructuredData';

interface Props {
	article: FEArticleType;
}

const decideTitle = (article: FEArticleType): string => {
	if (
		decideTheme(article.format) === ArticlePillar.Opinion &&
		article.byline
	) {
		return `${article.headline} | ${article.byline} | The Guardian`;
	}
	return `${article.headline} | ${article.sectionLabel} | The Guardian`;
};

export const articleToHtml = ({ article }: Props): string => {
	const NAV = extractNAV(article.nav);
	const title = decideTitle(article);
	const key = 'dcr';
	const cache = createCache({ key });
	const linkedData = article.linkedData;

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const format: ArticleFormat = decideFormat(article.format);

	const html = renderToString(
		<CacheProvider value={cache}>
			<ArticlePage format={format} CAPIArticle={article} NAV={NAV} />,
		</CacheProvider>,
	);

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	// Expedited islands scripts are added to the document head as 'high priority'
	const expeditedIslands = extractExpeditedIslands(html);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const CAPIElements: CAPIElement[] = article.blocks
		.map((block) => block.elements)
		.flat();

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = article.config.switches;

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const pageHasNonBootInteractiveElements = CAPIElements.some(
		(element) =>
			element._type ===
				'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
			element.scriptUrl !==
				'https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js', // We have rewritten this standard behaviour into Dotcom Rendering
	);

	const pageHasTweetElements = CAPIElements.some(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.TweetBlockElement',
	);

	const isDev = process.env.NODE_ENV !== 'production';

	const getScript = getScriptsFromManifest(false, isDev);

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const priorityScriptTags = generateScriptTags(
		[
			polyfillIO,
			getScript('bootCmp.js'),
			getScript('ophan.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				article.config.commercialBundleUrl,
			getScript('sentryLoader.js'),
			getScript('dynamicImport.js'),
			pageHasNonBootInteractiveElements &&
				`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
			getScript('islands.js'),
			...expeditedIslands.flatMap((name) => getScript(`${name}.js`)),
		].map((script) =>
			offerHttp3 && script ? getHttp3Url(script) : script,
		),
	);

	/**
	 * Low priority scripts. These scripts will be requested
	 * asynchronously after the main HTML has been parsed. Execution
	 * order is not guaranteed. It is even possible that these execute
	 * *before* the high priority scripts, although this is very
	 * unlikely.
	 */
	const lowPriorityScriptTags = generateScriptTags(
		[
			getScript('atomIframe.js'),
			getScript('embedIframe.js'),
			getScript('newsletterEmbedIframe.js'),
			getScript('relativeTime.js'),
			getScript('initDiscussion.js'),
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	const gaChunk = getScript('ga.js');
	const gaPath = {
		modern: gaChunk,
		legacy: gaChunk,
	};

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
				editionId: article.editionId,
				stage: article.config.stage,
				frontendAssetsFullURL: article.config.frontendAssetsFullURL,
				revisionNumber: article.config.revisionNumber,
				sentryPublicApiKey: article.config.sentryPublicApiKey,
				sentryHost: article.config.sentryHost,
				keywordIds: article.config.keywordIds,
				dfpAccountId: article.config.dfpAccountId,
				adUnit: article.config.adUnit,
				ajaxUrl: article.config.ajaxUrl,
				googletagUrl: article.config.googletagUrl,
				switches: article.config.switches,
				abTests: article.config.abTests,
				brazeApiKey: article.config.brazeApiKey,
				isPaidContent: article.pageType.isPaidContent,
				contentType: article.contentType,
				shouldHideReaderRevenue: article.shouldHideReaderRevenue,
				GAData: extractGA({
					webTitle: article.webTitle,
					format: article.format,
					sectionName: article.sectionName,
					contentType: article.contentType,
					tags: article.tags,
					pageId: article.pageId,
					editionId: article.editionId,
					beaconURL: article.beaconURL,
				}),
				unknownConfig: article.config,
			}),
		),
	);

	const getAmpLink = (tags: TagType[]) => {
		if (
			!isAmpSupported({
				format: article.format,
				tags,
				elements: article.blocks.flatMap((block) => block.elements),
				switches: article.config.switches,
				main: article.main,
			})
		) {
			return undefined;
		}

		return `https://amp.theguardian.com/${article.pageId}`;
	};

	// Only include AMP link for interactives which have the 'ampinteractive' tag
	const ampLink = getAmpLink(article.tags);

	const { openGraphData } = article;
	const { twitterData } = article;
	const keywords =
		typeof article.config.keywords === 'undefined' ||
		article.config.keywords === 'Network Front'
			? ''
			: article.config.keywords;

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

	const { webURL, canonicalUrl } = article;

	const recipeMarkup =
		webURL in recipeSchema ? recipeSchema[webURL] : undefined;

	return pageTemplate({
		linkedData,
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title,
		description: article.trailText,
		windowGuardian,
		gaPath,
		ampLink,
		openGraphData,
		twitterData,
		keywords,
		initTwitter:
			pageHasTweetElements || format.design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		recipeMarkup,
		offerHttp3,
		canonicalUrl,
	});
};
