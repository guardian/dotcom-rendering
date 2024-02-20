import { isString, Pillar } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { FrontPage } from '../components/FrontPage';
import { TagPage } from '../components/TagPage';
import {
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { themeToPillar } from '../lib/themeToPillar';
import type { NavType } from '../model/extract-nav';
import { extractNAV } from '../model/extract-nav';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { DCRFrontType } from '../types/front';
import type { DCRTagPageType } from '../types/tagPage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	front: DCRFrontType;
}

/**
 * Enhances the NAV object with the selected pillar colour
 */
const enhanceNav = (NAV: NavType): NavType => {
	const { currentNavLink } = NAV;

	// Is the `currentNavLink` a pillar?
	const pillarFromCurrentLink = (() => {
		switch (currentNavLink) {
			// The pillar name is "arts" in CAPI, but "culture" everywhere else
			case 'Arts':
			case 'Culture':
				return Pillar.Culture;
			case 'Opinion':
				return Pillar.Opinion;
			case 'News':
				return Pillar.News;
			case 'Sport':
				return Pillar.Sport;
			case 'Lifestyle':
				return Pillar.Lifestyle;
			default:
				return undefined;
		}
	})();

	// Is the `currentNavLink` in one of the children of the pillar?
	const themeFromSubNav = NAV.pillars.find((pillar) => {
		// Annoyingly "Football" appears in "News" and "Sport" pillars, so we exclude this case in "News"
		// As "Football" is always "Sport". You can see the corresponding `frontend` code here:
		// https://github.com/guardian/frontend/blob/main/common/app/navigation/Navigation.scala#L141-L143
		if (pillar.pillar === Pillar.News && currentNavLink === 'Football') {
			return false;
		}

		return pillar.children?.some((child) => {
			return child.title === currentNavLink;
		});
	})?.pillar;

	const pillarFromSubNav = themeToPillar(themeFromSubNav);

	const selectedPillar = pillarFromCurrentLink ?? pillarFromSubNav;

	return {
		...NAV,
		selectedPillar,
	};
};

export const renderFront = ({
	front,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = front.webTitle;
	const NAV = extractNAV(front.nav);
	const enhancedNAV = enhanceNav(NAV);

	// Fronts are not supported in Apps
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<FrontPage front={front} NAV={enhancedNAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: front.config.switches,
		tests: front.config.abTests,
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
		process.env.COMMERCIAL_BUNDLE_URL ?? front.config.commercialBundleUrl,
	].filter(isString);
	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	];
	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: front.editionId,
		stage: front.config.stage,
		frontendAssetsFullURL: front.config.frontendAssetsFullURL,
		revisionNumber: front.config.revisionNumber,
		sentryPublicApiKey: front.config.sentryPublicApiKey,
		sentryHost: front.config.sentryHost,
		keywordIds: front.config.keywordIds,
		dfpAccountId: front.config.dfpAccountId,
		adUnit: front.config.adUnit,
		ajaxUrl: front.config.ajaxUrl,
		googletagUrl: front.config.googletagUrl,
		switches: front.config.switches,
		abTests: front.config.abTests,
		brazeApiKey: front.config.brazeApiKey,
		googleRecaptchaSiteKey: front.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: front.config,
	});

	const keywords = front.config.keywords;

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: front.pressedPage.seoData.description,
		guardian,
		keywords,
		renderingTarget: 'Web',
		hasPageSkin: front.config.hasPageSkin,
		weAreHiring: !!front.config.switches.weAreHiring,
	});

	return {
		html: pageHtml,
		prefetchScripts,
	};
};

export const renderTagPage = ({
	tagPage,
}: {
	tagPage: DCRTagPageType;
}): { html: string; prefetchScripts: string[] } => {
	const title = tagPage.webTitle;
	const NAV = extractNAV(tagPage.nav);
	const enhancedNAV = enhanceNav(NAV);

	// Fronts are not supported in Apps
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<TagPage tagPage={tagPage} NAV={enhancedNAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: tagPage.config.switches,
		tests: tagPage.config.abTests,
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
		process.env.COMMERCIAL_BUNDLE_URL ?? tagPage.config.commercialBundleUrl,
	].filter(isString);
	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	];
	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: tagPage.editionId,
		stage: tagPage.config.stage,
		frontendAssetsFullURL: tagPage.config.frontendAssetsFullURL,
		revisionNumber: tagPage.config.revisionNumber,
		sentryPublicApiKey: tagPage.config.sentryPublicApiKey,
		sentryHost: tagPage.config.sentryHost,
		keywordIds: tagPage.config.keywordIds,
		dfpAccountId: tagPage.config.dfpAccountId,
		adUnit: tagPage.config.adUnit,
		ajaxUrl: tagPage.config.ajaxUrl,
		googletagUrl: tagPage.config.googletagUrl,
		switches: tagPage.config.switches,
		abTests: tagPage.config.abTests,
		brazeApiKey: tagPage.config.brazeApiKey,
		googleRecaptchaSiteKey: tagPage.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: tagPage.config,
	});

	const keywords = tagPage.config.keywords;

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: tagPage.header.description,
		guardian,
		keywords,
		renderingTarget: 'Web',
		weAreHiring: !!tagPage.config.switches.weAreHiring,
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
