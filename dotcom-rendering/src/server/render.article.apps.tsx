import { ArticleDesign, isString } from '@guardian/libs';
import { ArticlePage } from '../components/ArticlePage';
import { ConfigProvider } from '../components/ConfigContext';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { createGuardian } from '../model/guardian';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import type { FEElement } from '../types/content';
import { htmlPageTemplate } from './htmlPageTemplate';

export const renderArticle = (
	article: Article,
): {
	prefetchScripts: string[];
	html: string;
} => {
	const { format, frontendData } = article;
	const renderingTarget = 'Apps';
	const config: Config = {
		renderingTarget,
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<ArticlePage
				format={format}
				article={frontendData}
				renderingTarget={renderingTarget}
			/>
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
			pageHasTweetElements || format.design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		config,
		onlyLightColourScheme:
			format.design === ArticleDesign.FullPageInteractive ||
			format.design === ArticleDesign.Interactive,
	});

	return {
		prefetchScripts: clientScripts,
		html: renderedPage,
	};
};
