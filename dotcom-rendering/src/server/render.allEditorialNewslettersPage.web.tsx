import { AllEditorialNewslettersPage } from '../components/AllEditorialNewslettersPage';
import {
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
import { polyfillIO } from '../lib/polyfill.io';
import { extractNAV } from '../model/extract-nav';
import { createGuardian } from '../model/guardian';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	newslettersPage: DCRNewslettersPageType;
}

export const renderEditorialNewslettersPage = ({
	newslettersPage,
}: Props): string => {
	const title = newslettersPage.webTitle;
	const NAV = extractNAV(newslettersPage.nav);

	const { html, extractedCss } = renderToStringWithEmotion(
		<AllEditorialNewslettersPage
			newslettersPage={newslettersPage}
			NAV={NAV}
		/>,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = newslettersPage.config.switches;

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
	const scriptTags = generateScriptTags(
		[
			polyfillIO,
			getPathFromManifest(build, 'frameworks.js'),
			getPathFromManifest(build, 'index.js'),
			getPathFromManifest('legacy', 'frameworks.js'),
			getPathFromManifest('legacy', 'index.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				newslettersPage.config.commercialBundleUrl,
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

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

	return htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: newslettersPage.description,
		guardian,
		keywords: '',
		offerHttp3,
		renderingTarget: 'Web',
		weAreHiring: !!newslettersPage.config.switches.weAreHiring,
	});
};
