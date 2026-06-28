import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { ShellPage } from '../components/ShellPage';
import type { FEShell } from '../frontend/feShell';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import type { NavType } from '../model/extract-nav';
import { extractNAV } from '../model/extract-nav';
import { createGuardian as createWindowGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { FENavType } from '../types/frontend';
import { htmlPageTemplate } from './htmlPageTemplate';

// TODO: PoC!

const parseNav = (nav: FENavType): NavType => {
	return {
		...extractNAV(nav),
		selectedPillar: undefined,
	};
};

export const renderShell = (
	frontendData: FEShell,
): { html: string; prefetchScripts: string[] } => {
	const NAV = parseNav(frontendData.nav);

	const title = 'Shell Page';

	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable: false,
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<ShellPage
				feShell={frontendData}
				nav={NAV}
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
		process.env.COMMERCIAL_BUNDLE_URL ??
			frontendData.config.commercialBundleUrl,
	].filter(isString);

	const scriptTags = generateScriptTags(prefetchScripts);

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
		serverSideABTests: frontendData.config.serverSideABTests,
		brazeApiKey: frontendData.config.brazeApiKey,
		googleRecaptchaSiteKey: frontendData.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: frontendData.config,
	});

	const section = frontendData.config.section;

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: 'Shell page',
		guardian,
		section,
		canonicalUrl: frontendData.canonicalUrl,
		renderingTarget: 'Web',
		weAreHiring: !!frontendData.config.switches.weAreHiring,
		config,
		hasLiveBlogTopAd: !!frontendData.config.hasLiveBlogTopAd,
		hasSurveyAd: !!frontendData.config.hasSurveyAd,
	});

	return { html: pageHtml, prefetchScripts };
};
