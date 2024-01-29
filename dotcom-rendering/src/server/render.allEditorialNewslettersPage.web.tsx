import { AllEditorialNewslettersPage } from '../components/AllEditorialNewslettersPage';
import { ConfigProvider } from '../components/ConfigContext';
import {
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { extractNAV } from '../model/extract-nav';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	newslettersPage: DCRNewslettersPageType;
}

export const renderEditorialNewslettersPage = ({
	newslettersPage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = newslettersPage.webTitle;
	const NAV = extractNAV(newslettersPage.nav);

	// The newsletters page is currently only supported on Web
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<AllEditorialNewslettersPage
				newslettersPage={newslettersPage}
				NAV={NAV}
			/>
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: newslettersPage.config.switches,
		tests: newslettersPage.config.abTests,
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
			newslettersPage.config.commercialBundleUrl,
	];

	const legacyScripts = [
		getPathFromManifest('client.web.legacy', 'frameworks.js'),
		getPathFromManifest('client.web.legacy', 'index.js'),
	];

	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: newslettersPage.editionId,
		stage: newslettersPage.config.stage,
		frontendAssetsFullURL: newslettersPage.config.frontendAssetsFullURL,
		revisionNumber: newslettersPage.config.revisionNumber,
		sentryPublicApiKey: newslettersPage.config.sentryPublicApiKey,
		sentryHost: newslettersPage.config.sentryHost,
		keywordIds: '',
		dfpAccountId: newslettersPage.config.dfpAccountId,
		adUnit: newslettersPage.config.adUnit,
		ajaxUrl: newslettersPage.config.ajaxUrl,
		googletagUrl: newslettersPage.config.googletagUrl,
		switches: newslettersPage.config.switches,
		abTests: newslettersPage.config.abTests,
		brazeApiKey: newslettersPage.config.brazeApiKey,
		googleRecaptchaSiteKey: newslettersPage.config.googleRecaptchaSiteKey,
	});

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: newslettersPage.description,
		guardian,
		keywords: '',
		renderingTarget: 'Web',
		weAreHiring: !!newslettersPage.config.switches.weAreHiring,
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
