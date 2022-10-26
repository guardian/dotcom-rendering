import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { BUILD_VARIANT } from '../../../scripts/webpack/bundles';
import { isAmpSupported } from '../../amp/components/Elements';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getScriptsFromManifest,
	LEGACY_SCRIPT,
	MODERN_SCRIPT,
	VARIANT_SCRIPT,
} from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { extractGA } from '../../model/extract-ga';
import { extractNAV } from '../../model/extract-nav';
import { makeWindowGuardian } from '../../model/window-guardian';
import type { CAPIArticleType } from '../../types/frontend';
import { ArticlePage } from '../components/ArticlePage';
import { decideFormat } from '../lib/decideFormat';
import { decideTheme } from '../lib/decideTheme';
import { getHttp3Url } from '../lib/getHttp3Url';
import { extractExpeditedIslands } from './extractIslands';
import { pageTemplate } from './pageTemplate';
import { recipeSchema } from './temporaryRecipeStructuredData';

interface Props {
	article: CAPIArticleType;
}

const decideTitle = (CAPIArticle: CAPIArticleType): string => {
	if (
		decideTheme(CAPIArticle.format) === ArticlePillar.Opinion &&
		CAPIArticle.byline
	) {
		return `${CAPIArticle.headline} | ${CAPIArticle.byline} | The Guardian`;
	}
	return `${CAPIArticle.headline} | ${CAPIArticle.sectionLabel} | The Guardian`;
};

export const articleToHtml = ({ article: CAPIArticle }: Props): string => {
	const NAV = extractNAV(CAPIArticle.nav);
	const title = decideTitle(CAPIArticle);
	const key = 'dcr';
	const cache = createCache({ key });
	const linkedData = CAPIArticle.linkedData;

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const format: ArticleFormat = decideFormat(CAPIArticle.format);

	const html = renderToString(
		<CacheProvider value={cache}>
			<ArticlePage format={format} CAPIArticle={CAPIArticle} NAV={NAV} />
		</CacheProvider>,
	);

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	// Expedited islands scripts are added to the document head as 'high priority'
	const expeditedIslands = extractExpeditedIslands(html);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const CAPIElements: CAPIElement[] = CAPIArticle.blocks
		.map((block) => block.elements)
		.flat();

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = CAPIArticle.config.switches;

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

	const shouldServeVariantBundle: boolean = [
		BUILD_VARIANT,
		CAPIArticle.config.abTests.dcrJsBundleVariant === 'variant',
	].every(Boolean);

	/**
	 * This function returns an array of files found in the manifests
	 * defined by `manifestPaths`.
	 *
	 * @see getScriptsFromManifest
	 */
	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);

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
			...getScriptArrayFromFile('bootCmp.js'),
			...getScriptArrayFromFile('ophan.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				CAPIArticle.config.commercialBundleUrl,
			...getScriptArrayFromFile('sentryLoader.js'),
			...getScriptArrayFromFile('dynamicImport.js'),
			pageHasNonBootInteractiveElements &&
				`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
			...getScriptArrayFromFile('islands.js'),
			...expeditedIslands.flatMap((name) =>
				getScriptArrayFromFile(`${name}.js`),
			),
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
			...getScriptArrayFromFile('atomIframe.js'),
			...getScriptArrayFromFile('embedIframe.js'),
			...getScriptArrayFromFile('newsletterEmbedIframe.js'),
			...getScriptArrayFromFile('relativeTime.js'),
			...getScriptArrayFromFile('initDiscussion.js'),
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	const gaChunk = getScriptArrayFromFile('ga.js');
	const modernScript = gaChunk.find((script) => script.match(MODERN_SCRIPT));
	const legacyScript = gaChunk.find((script) => script.match(LEGACY_SCRIPT));
	const variantScript = gaChunk.find((script) =>
		script.match(VARIANT_SCRIPT),
	);
	const gaPath = {
		modern: (modernScript ?? variantScript) as string,
		legacy: legacyScript as string,
	};

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
				editionId: CAPIArticle.editionId,
				stage: CAPIArticle.config.stage,
				frontendAssetsFullURL: CAPIArticle.config.frontendAssetsFullURL,
				revisionNumber: CAPIArticle.config.revisionNumber,
				sentryPublicApiKey: CAPIArticle.config.sentryPublicApiKey,
				sentryHost: CAPIArticle.config.sentryHost,
				keywordIds: CAPIArticle.config.keywordIds,
				dfpAccountId: CAPIArticle.config.dfpAccountId,
				adUnit: CAPIArticle.config.adUnit,
				ajaxUrl: CAPIArticle.config.ajaxUrl,
				googletagUrl: CAPIArticle.config.googletagUrl,
				switches: CAPIArticle.config.switches,
				abTests: CAPIArticle.config.abTests,
				brazeApiKey: CAPIArticle.config.brazeApiKey,
				isPaidContent: CAPIArticle.pageType.isPaidContent,
				contentType: CAPIArticle.contentType,
				shouldHideReaderRevenue: CAPIArticle.shouldHideReaderRevenue,
				GAData: extractGA({
					webTitle: CAPIArticle.webTitle,
					format: CAPIArticle.format,
					sectionName: CAPIArticle.sectionName,
					contentType: CAPIArticle.contentType,
					tags: CAPIArticle.tags,
					pageId: CAPIArticle.pageId,
					editionId: CAPIArticle.editionId,
					beaconURL: CAPIArticle.beaconURL,
				}),
				unknownConfig: CAPIArticle.config,
			}),
		),
	);

	const getAmpLink = (tags: TagType[]) => {
		if (
			!isAmpSupported(
				CAPIArticle.format,
				tags,
				CAPIArticle.blocks.flatMap((block) => block.elements),
				CAPIArticle.config.switches,
				CAPIArticle.main,
			)
		) {
			return undefined;
		}

		return `https://amp.theguardian.com/${CAPIArticle.pageId}`;
	};

	// Only include AMP link for interactives which have the 'ampinteractive' tag
	const ampLink = getAmpLink(CAPIArticle.tags);

	const { openGraphData } = CAPIArticle;
	const { twitterData } = CAPIArticle;
	const keywords =
		typeof CAPIArticle.config.keywords === 'undefined' ||
		CAPIArticle.config.keywords === 'Network Front'
			? ''
			: CAPIArticle.config.keywords;

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

	const { webURL, canonicalUrl } = CAPIArticle;

	const recipeMarkup =
		webURL in recipeSchema ? recipeSchema[webURL] : undefined;

	return pageTemplate({
		linkedData,
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title,
		description: CAPIArticle.trailText,
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
