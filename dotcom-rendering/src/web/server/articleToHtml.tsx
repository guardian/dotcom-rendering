import { ArticleDesign, ArticlePillar, isString } from '@guardian/libs';
import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../scripts/webpack/bundles';
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
import type { FEElement } from '../../types/content';
import type { FEArticleType } from '../../types/frontend';
import type { TagType } from '../../types/tag';
import { ArticlePage } from '../components/ArticlePage';
import { decideFormat } from '../lib/decideFormat';
import { decideTheme } from '../lib/decideTheme';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
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
	const linkedData = article.linkedData;

	const format: ArticleFormat = decideFormat(article.format);

	const { html, extractedCss } = renderToStringWithEmotion(
		<ArticlePage format={format} article={article} NAV={NAV} />,
	);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const elements: FEElement[] = article.blocks
		.map((block) => block.elements)
		.flat();

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = article.config.switches;

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const pageHasNonBootInteractiveElements = elements.some(
		(element) =>
			element._type ===
				'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
			element.scriptUrl !==
				'https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js', // We have rewritten this standard behaviour into Dotcom Rendering
	);

	const pageHasTweetElements = elements.some(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.TweetBlockElement',
	);

	const shouldServeVariantBundle: boolean = [
		BUILD_VARIANT,
		article.config.abTests[dcrJavascriptBundle('Variant')] === 'variant',
	].every(Boolean);

	/**
	 * This function returns an array of files found in the manifests
	 * defined by `manifestPaths`.
	 *
	 * @see getScriptsFromManifest
	 */
	const getScriptArrayFromFile = getScriptsFromManifest({
		platform: 'web',
		shouldServeVariantBundle,
	});

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const scriptTags = generateScriptTags(
		[
			polyfillIO,
			...getScriptArrayFromFile('frameworks.js'),
			...getScriptArrayFromFile('index.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				article.config.commercialBundleUrl,
			pageHasNonBootInteractiveElements &&
				`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
		]
			.filter(isString)
			.map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

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
				// Until we understand exactly what config we need to make available client-side,
				// add everything we haven't explicitly typed as unknown config
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
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: article.trailText,
		windowGuardian,
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
		renderingTarget: 'Web',
	});
};
