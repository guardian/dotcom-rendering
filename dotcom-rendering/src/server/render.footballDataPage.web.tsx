import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { FootballDataPage } from '../components/FootballDataPage';
import type { FEFootballDataPage } from '../feFootballDataPage';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

const decideDescription = (canonicalUrl: string | undefined) => {
	const fromTheGuardian =
		'from the Guardian, the world&#x27;s leading liberal voice';

	if (canonicalUrl?.includes('live')) {
		return `Live football scores ${fromTheGuardian}`;
	}

	if (canonicalUrl?.includes('results')) {
		return `Latest football results ${fromTheGuardian}`;
	}

	if (canonicalUrl?.includes('fixtures')) {
		return `Football fixtures ${fromTheGuardian}`;
	}

	return;
};

const decideTitle = (canonicalUrl: string | undefined) => {
	if (canonicalUrl?.includes('live')) {
		return 'Live matches | Football | The Guardian';
	}

	if (canonicalUrl?.includes('results')) {
		return 'All results | Football | The Guardian';
	}

	if (canonicalUrl?.includes('fixtures')) {
		return 'All fixtures | Football | The Guardian';
	}

	return;
};

export const renderFootballDataPage = (footballData: FEFootballDataPage) => {
	const config: Config = {
		renderingTarget: 'Web',
		darkModeAvailable:
			footballData.config.abTests.darkModeWebVariant === 'variant',
		assetOrigin: ASSET_ORIGIN,
		editionId: footballData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<FootballDataPage footballData={footballData} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: footballData.config.switches,
		tests: footballData.config.abTests,
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
			footballData.config.commercialBundleUrl,
	].filter(isString);
	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	];
	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title: decideTitle(footballData.canonicalUrl),
		description: decideDescription(footballData.canonicalUrl),
		canonicalUrl: footballData.canonicalUrl,
		guardian: createGuardian({
			editionId: footballData.editionId,
			stage: footballData.config.stage,
			frontendAssetsFullURL: footballData.config.frontendAssetsFullURL,
			revisionNumber: footballData.config.revisionNumber,
			sentryPublicApiKey: footballData.config.sentryPublicApiKey,
			sentryHost: footballData.config.sentryHost,
			keywordIds: '', // TODO: we need to make this field optional in createGuardian
			dfpAccountId: footballData.config.dfpAccountId,
			adUnit: footballData.config.adUnit,
			ajaxUrl: footballData.config.ajaxUrl,
			googletagUrl: footballData.config.googletagUrl,
			switches: footballData.config.switches,
			abTests: footballData.config.abTests,
			brazeApiKey: footballData.config.brazeApiKey,
			isPaidContent: footballData.config.isPaidContent,
			contentType: footballData.config.contentType,
			googleRecaptchaSiteKey: footballData.config.googleRecaptchaSiteKey,
		}),
		keywords: '', // TODO: we need to make this field optional in createGuardian
		renderingTarget: 'Web',
		weAreHiring: !!footballData.config.switches.weAreHiring,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
