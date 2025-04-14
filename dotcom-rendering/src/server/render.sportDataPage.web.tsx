import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { SportDataPageComponent } from '../components/SportDataPageComponent';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian } from '../model/guardian';
import type {
	CricketMatchPage,
	FootballDataPage,
	SportDataPage,
	SportPageKind,
} from '../sportDataPage';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

const fromTheGuardian =
	'from the Guardian, the world&#x27;s leading liberal voice';

const decideDescription = (kind: SportPageKind) => {
	switch (kind) {
		case 'FootballLiveScores':
			return `Live football scores ${fromTheGuardian}`;
		case 'FootballResults':
			return `Latest football results ${fromTheGuardian}`;
		case 'FootballFixtures':
			return `Football fixtures ${fromTheGuardian}`;
		case 'FootballTables':
			return `Football tables ${fromTheGuardian}`;
		case 'CricketMatch':
			return `Cricket scores ${fromTheGuardian}`;
	}
};

const decideTitle = (sportPage: SportDataPage) => {
	switch (sportPage.kind) {
		case 'FootballLiveScores':
		case 'FootballResults':
		case 'FootballFixtures':
		case 'FootballTables':
			return decideFootballTitle(sportPage);
		case 'CricketMatch':
			return decideCricketTitle(sportPage);
	}
};

const decideFootballTitle = (sportPage: FootballDataPage) => {
	const { config, kind, regions } = sportPage;
	const pagePath = config.pageId.startsWith('/')
		? config.pageId.slice(1)
		: config.pageId;

	const footballTitle = '| Football | The Guardian';
	const competitionName = regions
		.flatMap((region) => region.competitions) // Flatten all competitions into a single array
		.find((competition) => competition.url === `/${pagePath}`)?.name;

	switch (kind) {
		case 'FootballLiveScores':
			return `${
				competitionName ? `Today's ${competitionName} ` : 'Live '
			}matches ${footballTitle}`;
		case 'FootballResults':
			return `${
				competitionName ? `${competitionName} ` : 'All '
			}results ${footballTitle}`;
		case 'FootballFixtures':
			return `${
				competitionName ? `${competitionName} ` : 'All '
			}fixtures ${footballTitle}`;
		case 'FootballTables':
			return `${
				competitionName ? `${competitionName} table` : 'All tables'
			} ${footballTitle}`;
	}
};

const decideCricketTitle = (sportPage: CricketMatchPage) => {
	return `${sportPage.match.competitionName}, ${sportPage.match.venueName} | Cricket | The Guardian`;
};

export const renderSportPage = (sportData: SportDataPage) => {
	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable:
			sportData.config.abTests.darkModeWebVariant === 'variant',
		assetOrigin: ASSET_ORIGIN,
		editionId: sportData.editionId,
	};

	const title = decideTitle(sportData);
	const description = decideDescription(sportData.kind);

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<SportDataPageComponent sportData={sportData} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: sportData.config.switches,
		tests: sportData.config.abTests,
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
			sportData.config.commercialBundleUrl,
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
		title,
		description,
		canonicalUrl: sportData.canonicalUrl,
		guardian: createGuardian({
			editionId: sportData.editionId,
			stage: sportData.config.stage,
			frontendAssetsFullURL: sportData.config.frontendAssetsFullURL,
			revisionNumber: sportData.config.revisionNumber,
			sentryPublicApiKey: sportData.config.sentryPublicApiKey,
			sentryHost: sportData.config.sentryHost,
			dfpAccountId: sportData.config.dfpAccountId,
			adUnit: sportData.config.adUnit,
			ajaxUrl: sportData.config.ajaxUrl,
			googletagUrl: sportData.config.googletagUrl,
			switches: sportData.config.switches,
			abTests: sportData.config.abTests,
			brazeApiKey: sportData.config.brazeApiKey,
			isPaidContent: sportData.config.isPaidContent,
			contentType: sportData.config.contentType,
			googleRecaptchaSiteKey: sportData.config.googleRecaptchaSiteKey,
			unknownConfig: sportData.config,
		}),
		section: '',
		renderingTarget,
		weAreHiring: !!sportData.config.switches.weAreHiring,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
