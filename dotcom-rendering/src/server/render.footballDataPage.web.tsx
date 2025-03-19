import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { FootballDataPage } from '../components/FootballDataPage';
import type { FootballMatchListPage, Region } from '../footballDataPage';
import type { FootballMatchKind } from '../footballMatches';
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

const fromTheGuardian =
	'from the Guardian, the world&#x27;s leading liberal voice';

const decideDescription = (kind: FootballMatchKind) => {
	switch (kind) {
		case 'Live':
			return `Live football scores ${fromTheGuardian}`;
		case 'Result':
			return `Latest football results ${fromTheGuardian}`;
		case 'Fixture':
			return `Football fixtures ${fromTheGuardian}`;
	}
};

const decideTitle = (
	kind: FootballMatchKind,
	pageId: string,
	regions: Region[],
) => {
	const pagePath = pageId.startsWith('/') ? pageId.slice(1) : pageId;
	const competitionName = regions
		.flatMap((region) => region.competitions) // Flatten all competitions into a single array
		.find((competition) => competition.url === `/${pagePath}`)?.name;

	const footballTitle = '| Football | The Guardian';

	switch (kind) {
		case 'Live':
			return `${
				competitionName ? `Today's ${competitionName} ` : 'Live '
			}matches ${footballTitle}`;
		case 'Result':
			return `${
				competitionName ? `${competitionName} ` : 'All '
			}results ${footballTitle}`;
		case 'Fixture':
			return `${
				competitionName ? `${competitionName} ` : 'All '
			}fixtures ${footballTitle}`;
	}
};

export const renderFootballDataPage = (footballData: FootballMatchListPage) => {
	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
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
		title: decideTitle(
			footballData.kind,
			footballData.config.pageId,
			footballData.regions,
		),
		description: decideDescription(footballData.kind),
		canonicalUrl: footballData.canonicalUrl,
		guardian: createGuardian({
			editionId: footballData.editionId,
			stage: footballData.config.stage,
			frontendAssetsFullURL: footballData.config.frontendAssetsFullURL,
			revisionNumber: footballData.config.revisionNumber,
			sentryPublicApiKey: footballData.config.sentryPublicApiKey,
			sentryHost: footballData.config.sentryHost,
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
			unknownConfig: footballData.config,
		}),
		section: '',
		renderingTarget,
		weAreHiring: !!footballData.config.switches.weAreHiring,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
