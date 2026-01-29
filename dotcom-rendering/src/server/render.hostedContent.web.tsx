import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { HostedContentPage } from '../components/HostedContentPage';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian } from '../model/guardian';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

type Props = {
	hostedContent: Article;
};

export const renderHtml = ({ hostedContent }: Props) => {
	const { frontendData } = hostedContent;

	const title = `Advertiser content hosted by the Guardian: ${frontendData.webTitle} | The Guardian`;

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
			<HostedContentPage
				hostedContent={hostedContent}
				renderingTarget={renderingTarget}
			/>
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
	].filter(isString);

	const scriptTags = generateScriptTags(prefetchScripts);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
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
		serverSideABTests: frontendData.config.serverSideABTests,
		brazeApiKey: frontendData.config.brazeApiKey,
		isPaidContent: frontendData.pageType.isPaidContent,
		contentType: frontendData.contentType,
		shouldHideReaderRevenue: true,
		googleRecaptchaSiteKey: frontendData.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: frontendData.config,
	});

	/**
	 * @todo Create a separate hosted content page template
	 */
	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: frontendData.standfirst,
		guardian,
		canonicalUrl: '',
		renderingTarget: 'Web',
		// @ts-expect-error no config data
		config: {},
		weAreHiring: false,
	});

	return { html: pageHtml, prefetchScripts };
};
