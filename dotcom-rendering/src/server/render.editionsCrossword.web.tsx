import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import { ArticleDesign } from '../lib/articleFormat';
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
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	article: Article;
}

export const renderCrosswordHtml = ({
	article,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { format, frontendData } = article;

	const title = `${frontendData.headline} | ${frontendData.sectionLabel} | The Guardian`;
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

	const { openGraphData } = frontendData;
	const keywords =
		typeof frontendData.config.keywords === 'undefined' ||
		frontendData.config.keywords === 'Network Front'
			? ''
			: frontendData.config.keywords;

	const { canonicalUrl } = frontendData;

	const pageHtml = htmlPageTemplate({
		linkedData,
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: frontendData.trailText,
		guardian,
		openGraphData,
		keywords,
		canonicalUrl,
		renderingTarget: 'Web',
		weAreHiring: !!frontendData.config.switches.weAreHiring,
		config,
		onlyLightColourScheme:
			format.design === ArticleDesign.FullPageInteractive ||
			format.design === ArticleDesign.Interactive,
	});

	return { html: pageHtml, prefetchScripts };
};
