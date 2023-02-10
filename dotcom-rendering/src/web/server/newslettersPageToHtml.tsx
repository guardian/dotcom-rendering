import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../scripts/webpack/bundles';
import { generateScriptTags, getScriptsFromManifest } from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { extractNAV } from '../../model/extract-nav';
import { makeWindowGuardian } from '../../model/window-guardian';
import type { DCRNewslettersPageType } from '../../types/newslettersPage';
import { NewslettersPage } from '../components/NewslettersPage';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
import { pageTemplate } from './pageTemplate';

interface Props {
	newslettersPage: DCRNewslettersPageType;
}

export const newsletterPageToHtml = ({ newslettersPage }: Props): string => {
	const title = newslettersPage.webTitle;
	const NAV = extractNAV(newslettersPage.nav);

	const { html, extractedCss } = renderToStringWithEmotion(
		<NewslettersPage newslettersPage={newslettersPage} NAV={NAV} />,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = newslettersPage.config.switches;

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const shouldServeVariantBundle: boolean = [
		BUILD_VARIANT,
		newslettersPage.config.abTests[dcrJavascriptBundle('Variant')] ===
			'variant',
	].every(Boolean);

	/**
	 * This function returns an array of files found in the manifests
	 * defined by `manifestPaths`.
	 *
	 * @see getScriptsFromManifest
	 */
	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);

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
			...getScriptArrayFromFile('frameworks.js'),
			...getScriptArrayFromFile('index.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				newslettersPage.config.commercialBundleUrl,
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
				editionId: newslettersPage.editionId,
				stage: newslettersPage.config.stage,
				frontendAssetsFullURL:
					newslettersPage.config.frontendAssetsFullURL,
				revisionNumber: newslettersPage.config.revisionNumber,
				sentryPublicApiKey: newslettersPage.config.sentryPublicApiKey,
				sentryHost: newslettersPage.config.sentryHost,
				keywordIds: '', // TODO: Check for implications of having this be just a string
				dfpAccountId: newslettersPage.config.dfpAccountId,
				adUnit: newslettersPage.config.adUnit,
				ajaxUrl: newslettersPage.config.ajaxUrl,
				googletagUrl: newslettersPage.config.googletagUrl,
				switches: newslettersPage.config.switches,
				abTests: newslettersPage.config.abTests,
				brazeApiKey: newslettersPage.config.brazeApiKey,
			}),
		),
	);

	return pageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: newslettersPage.description,
		windowGuardian,
		keywords: '',
		offerHttp3,
	});
};
