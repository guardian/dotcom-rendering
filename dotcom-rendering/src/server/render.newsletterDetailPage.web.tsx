import { Pillar } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { NewsletterDetailPage } from '../components/NewsletterDetailPage';
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
import type { Config } from '../types/configContext';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	newsletterDetailPage: DCRNewsletterDetailPageType;
}

// TO DO - refactor duplicated code
// aside from the content passed to renderToStringWithEmotion and the prop type
// this method is the same as renderEditorialNewslettersPage
export const renderNewsletterDetailPage = ({
	newsletterDetailPage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = newsletterDetailPage.webTitle;
	const NAV = {
		...extractNAV(newsletterDetailPage.nav),
		selectedPillar: Pillar.Culture,
	};

	// The newsletters page is currently only supported on Web
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<NewsletterDetailPage
				newsletterDetailPage={newsletterDetailPage}
				NAV={NAV}
			/>
		</ConfigProvider>,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = newsletterDetailPage.config.switches;

	const build = getModulesBuild({
		switches: newsletterDetailPage.config.switches,
		tests: newsletterDetailPage.config.abTests,
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
			newsletterDetailPage.config.commercialBundleUrl,
	].map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const legacyScripts = [
		getPathFromManifest('web.legacy', 'frameworks.js'),
		getPathFromManifest('web.legacy', 'index.js'),
	].map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: newsletterDetailPage.editionId,
		stage: newsletterDetailPage.config.stage,
		frontendAssetsFullURL:
			newsletterDetailPage.config.frontendAssetsFullURL,
		revisionNumber: newsletterDetailPage.config.revisionNumber,
		sentryPublicApiKey: newsletterDetailPage.config.sentryPublicApiKey,
		sentryHost: newsletterDetailPage.config.sentryHost,
		keywordIds: '',
		dfpAccountId: newsletterDetailPage.config.dfpAccountId,
		adUnit: newsletterDetailPage.config.adUnit,
		ajaxUrl: newsletterDetailPage.config.ajaxUrl,
		googletagUrl: newsletterDetailPage.config.googletagUrl,
		switches: newsletterDetailPage.config.switches,
		abTests: newsletterDetailPage.config.abTests,
		brazeApiKey: newsletterDetailPage.config.brazeApiKey,
		googleRecaptchaSiteKey:
			newsletterDetailPage.config.googleRecaptchaSiteKey,
	});

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: newsletterDetailPage.description,
		guardian,
		keywords: '',
		offerHttp3,
		renderingTarget: 'Web',
		weAreHiring: !!newsletterDetailPage.config.switches.weAreHiring,
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
