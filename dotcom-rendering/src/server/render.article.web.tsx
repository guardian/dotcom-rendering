import { ArticleDesign, isString, Pillar } from '@guardian/libs';
import { ArticlePage } from '../components/ArticlePage';
import { ConfigProvider } from '../components/ConfigContext';
import { isAmpSupported } from '../components/Elements.amp';
import { LiveBlogRenderer } from '../components/LiveBlogRenderer';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { decideFormat } from '../lib/decideFormat';
import { decideTheme } from '../lib/decideTheme';
import { isEditionId } from '../lib/edition';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { polyfillIO } from '../lib/polyfill.io';
import { extractGA } from '../model/extract-ga';
import { extractNAV } from '../model/extract-nav';
import { createGuardian as createWindowGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { FEElement } from '../types/content';
import type { DCRArticle, FEBlocksRequest } from '../types/frontend';
import type { TagType } from '../types/tag';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	article: DCRArticle;
}

const decideTitle = (article: DCRArticle): string => {
	if (decideTheme(article.format) === Pillar.Opinion && article.byline) {
		return `${article.headline} | ${article.byline} | The Guardian`;
	}
	return `${article.headline} | ${article.sectionLabel} | The Guardian`;
};

export const renderHtml = ({
	article,
}: Props): { html: string; prefetchScripts: string[] } => {
	const NAV = {
		...extractNAV(article.nav),
		selectedPillar: getCurrentPillar(article),
	};

	const title = decideTitle(article);
	const linkedData = article.linkedData;

	const format: ArticleFormat = decideFormat(article.format);

	const renderingTarget = 'Web';
	const config: Config = { renderingTarget, darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<ArticlePage
				format={format}
				article={article}
				NAV={NAV}
				renderingTarget={renderingTarget}
			/>
		</ConfigProvider>,
	);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const elements: FEElement[] = article.blocks
		.map((block) => block.elements)
		.flat();

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = article.config.switches;

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

	const build = getModulesBuild({
		tests: article.config.abTests,
		switches: article.config.switches,
	});

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ?? article.config.commercialBundleUrl,
		pageHasNonBootInteractiveElements &&
			`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
	]
		.filter(isString)
		.map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	].map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const guardian = createWindowGuardian({
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
		googleRecaptchaSiteKey: article.config.googleRecaptchaSiteKey,
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
		hasInlineMerchandise: article.config.hasInlineMerchandise,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: article.config,
	});

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

	const { canonicalUrl } = article;

	const pageHtml = htmlPageTemplate({
		linkedData,
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: article.trailText,
		guardian,
		ampLink,
		openGraphData,
		twitterData,
		keywords,
		initTwitter:
			pageHasTweetElements || format.design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		offerHttp3,
		canonicalUrl,
		renderingTarget: 'Web',
		weAreHiring: !!article.config.switches.weAreHiring,
	});

	return { html: pageHtml, prefetchScripts };
};

/**
 * blocksToHtml is used by the /Blocks endpoint as part of keeping liveblogs live
 * It takes an array of json blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const renderBlocks = ({
	blocks,
	format: FEFormat,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	section,
	switches,
	keywordIds,
	abTests = {},
	edition,
}: FEBlocksRequest): string => {
	const format: ArticleFormat = decideFormat(FEFormat);

	// Only currently supported for Web
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const editionId = isEditionId(edition) ? edition : 'UK';

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<LiveBlogRenderer
				blocks={blocks}
				format={format}
				host={host}
				pageId={pageId}
				webTitle={webTitle}
				ajaxUrl={ajaxUrl}
				isSensitive={isSensitive}
				isAdFreeUser={isAdFreeUser}
				abTests={abTests}
				switches={switches}
				isLiveUpdate={true}
				sectionId={section}
				// The props below are never used because isLiveUpdate is true but, typescript...
				shouldHideReaderRevenue={false}
				tags={[]}
				isPaidContent={false}
				contributionsServiceUrl=""
				keywordIds={keywordIds}
				editionId={editionId}
			/>
		</ConfigProvider>,
	);

	return `${extractedCss}${html}`;
};
