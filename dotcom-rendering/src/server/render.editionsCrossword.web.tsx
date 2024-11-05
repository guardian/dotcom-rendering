import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import { isAmpSupported } from '../components/Elements.amp';
import { ArticleDesign, Pillar } from '../lib/articleFormat';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian as createWindowGuardian } from '../model/guardian';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import type { FEElement } from '../types/content';
import type { TagType } from '../types/tag';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	article: Article;
}

const decideTitle = ({ format, frontendData }: Article): string => {
	if (format.theme === Pillar.Opinion && frontendData.byline) {
		return `${frontendData.headline} | ${frontendData.byline} | The Guardian`;
	}
	return `${frontendData.headline} | ${frontendData.sectionLabel} | The Guardian`;
};

export const renderCrosswordHtml = ({
	article,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { format, frontendData } = article;

	const title = decideTitle(article);
	const linkedData = frontendData.linkedData;

	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable:
			frontendData.config.abTests.darkModeWebVariant === 'variant',
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<EditionsCrosswordPage article={article} />
		</ConfigProvider>,
	);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const elements: FEElement[] = frontendData.blocks
		.map((block) => block.elements)
		.flat();

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
		tests: frontendData.config.abTests,
		switches: frontendData.config.switches,
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
		process.env.COMMERCIAL_BUNDLE_URL ??
			frontendData.config.commercialBundleUrl,
		pageHasNonBootInteractiveElements &&
			`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
	].filter(isString);
	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	];

	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const guardian = createWindowGuardian({
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
		brazeApiKey: frontendData.config.brazeApiKey,
		isPaidContent: frontendData.pageType.isPaidContent,
		contentType: frontendData.contentType,
		shouldHideReaderRevenue: frontendData.shouldHideReaderRevenue,
		googleRecaptchaSiteKey: frontendData.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: frontendData.config,
	});

	const getAmpLink = (tags: TagType[]) => {
		if (
			format.design === ArticleDesign.Interactive ||
			format.design === ArticleDesign.FullPageInteractive
		) {
			return undefined;
		}

		if (
			!isAmpSupported({
				format,
				tags,
				elements: frontendData.blocks.flatMap(
					(block) => block.elements,
				),
				switches: frontendData.config.switches,
				main: frontendData.main,
			})
		) {
			return undefined;
		}

		return `https://amp.theguardian.com/${frontendData.pageId}`;
	};

	// Only include AMP link for interactives which have the 'ampinteractive' tag
	const ampLink = getAmpLink(frontendData.tags);

	const { openGraphData, twitterData } = frontendData;
	const keywords =
		typeof frontendData.config.keywords === 'undefined' ||
		frontendData.config.keywords === 'Network Front'
			? ''
			: frontendData.config.keywords;

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

	const { canonicalUrl } = frontendData;

	const pageHtml = htmlPageTemplate({
		linkedData,
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: frontendData.trailText,
		guardian,
		ampLink,
		openGraphData,
		twitterData,
		keywords,
		initTwitter:
			pageHasTweetElements || format.design === ArticleDesign.LiveBlog
				? initTwitter
				: undefined,
		canonicalUrl,
		renderingTarget: 'Web',
		weAreHiring: !!frontendData.config.switches.weAreHiring,
		config,
		hasLiveBlogTopAd: !!frontendData.config.hasLiveBlogTopAd,
		hasSurveyAd: !!frontendData.config.hasSurveyAd,
		onlyLightColourScheme:
			format.design === ArticleDesign.FullPageInteractive ||
			format.design === ArticleDesign.Interactive,
	});

	return { html: pageHtml, prefetchScripts };
};
