import { isString } from '@guardian/libs';
import { ArticlePage } from '../components/ArticlePage';
import { ConfigProvider } from '../components/ConfigContext';
import { LiveBlogRenderer } from '../components/LiveBlogRenderer';
import {
	ArticleDesign,
	type ArticleFormat,
	decideFormat,
} from '../lib/articleFormat';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { isEditionId } from '../lib/edition';
import { renderToStringWithEmotion } from '../lib/emotion';
import { createGuardian } from '../model/guardian';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import type { FEElement } from '../types/content';
import type { FEBlocksRequest } from '../types/frontend';
import { htmlPageTemplate } from './htmlPageTemplate';

export const renderArticle = (
	article: Article,
): {
	prefetchScripts: string[];
	html: string;
} => {
	const { design, frontendData } = article;
	const renderingTarget = 'Apps';
	const config: Config = {
		renderingTarget,
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<ArticlePage article={article} renderingTarget={renderingTarget} />
		</ConfigProvider>,
	);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const elements: FEElement[] = frontendData.blocks
		.map((block) => block.elements)
		.flat();
	const pageHasTweetElements = elements.some(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.TweetBlockElement',
	);
	const pageHasNonBootInteractiveElements = elements.some(
		(element) =>
			element._type ===
				'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
			element.scriptUrl !==
				'https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js', // We have rewritten this standard behaviour into Dotcom Rendering
	);

	const clientScripts = [
		getPathFromManifest('client.apps', 'index.js'),
		pageHasNonBootInteractiveElements &&
			`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
	].filter(isString);
	const scriptTags = generateScriptTags([...clientScripts]);

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

	const guardian = createGuardian({
		editionId: frontendData.editionId,
		stage: frontendData.config.stage,
		frontendAssetsFullURL: frontendData.config.frontendAssetsFullURL,
		revisionNumber: frontendData.config.revisionNumber,
		sentryPublicApiKey: frontendData.config.sentryPublicApiKey,
		sentryHost: frontendData.config.sentryHost,
		keywordIds: frontendData.config.keywordIds,
		dfpAccountId: frontendData.config.dfpAccountId,
		adUnit: frontendData.config.adUnit,
		ajaxUrl: frontendData.config.ajaxUrl,
		googletagUrl: frontendData.config.googletagUrl,
		switches: frontendData.config.switches,
		abTests: frontendData.config.abTests,
		isPaidContent: frontendData.pageType.isPaidContent,
		contentType: frontendData.contentType,
		googleRecaptchaSiteKey: frontendData.config.googleRecaptchaSiteKey,
		unknownConfig: frontendData.config,
	});

	const renderedPage = htmlPageTemplate({
		css: extractedCss,
		html,
		title: frontendData.webTitle,
		scriptTags,
		guardian,
		renderingTarget: 'Apps',
		weAreHiring: !!frontendData.config.switches.weAreHiring,
		canonicalUrl: frontendData.canonicalUrl,
		initTwitter:
			pageHasTweetElements || design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		config,
		onlyLightColourScheme:
			design === ArticleDesign.FullPageInteractive ||
			design === ArticleDesign.Interactive,
	});

	return {
		prefetchScripts: clientScripts,
		html: renderedPage,
	};
};

/**
 * renderAppsBlocks is used by the /AppsBlocks endpoint as part of keeping liveblogs live
 * It takes an array of json blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const renderAppsBlocks = ({
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

	const editionId = isEditionId(edition) ? edition : 'UK';

	const config: Config = {
		renderingTarget: 'Apps',
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN,
		editionId,
	};

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
				onFirstPage={false}
				keyEvents={[]}
				filterKeyEvents={false}
			/>
		</ConfigProvider>,
	);

	return `${extractedCss}${html}`;
};
