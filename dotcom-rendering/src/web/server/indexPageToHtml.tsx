import { isString } from '@guardian/libs';
import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../scripts/webpack/bundles';
import { generateScriptTags, getScriptsFromManifest } from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { extractNAV } from '../../model/extract-nav';
import { makeWindowGuardian } from '../../model/window-guardian';
import type { DCRIndexPageType } from '../../types/indexPage';
import { IndexPagePage } from '../components/IndexPagePage';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
import { pageTemplate } from './pageTemplate';

interface Props {
	indexPage: DCRIndexPageType;
}

export const indexPageToHtml = ({ indexPage }: Props): string => {
	const title = indexPage.webTitle;
	const NAV = extractNAV(indexPage.nav);

	const { html, extractedCss } = renderToStringWithEmotion(
		<IndexPagePage indexPage={indexPage} NAV={NAV} />,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = indexPage.config.switches;

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const shouldServeVariantBundle: boolean = [
		BUILD_VARIANT,
		indexPage.config.abTests[dcrJavascriptBundle('Variant')] === 'variant',
	].every(Boolean);

	/**
	 * This function returns an array of files found in the manifests
	 * defined by `manifestPaths`.
	 *
	 * @see getScriptsFromManifest
	 */
	const getScriptArrayFromFile = getScriptsFromManifest({
		platform: 'web',
		shouldServeVariantBundle,
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
			...getScriptArrayFromFile('frameworks.js'),
			...getScriptArrayFromFile('index.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				indexPage.config.commercialBundleUrl,
		]
			.filter(isString)
			.map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
				editionId: indexPage.editionId,
				stage: indexPage.config.stage,
				frontendAssetsFullURL: indexPage.config.frontendAssetsFullURL,
				revisionNumber: indexPage.config.revisionNumber,
				sentryPublicApiKey: indexPage.config.sentryPublicApiKey,
				sentryHost: indexPage.config.sentryHost,
				keywordIds: indexPage.config.keywordIds,
				dfpAccountId: indexPage.config.dfpAccountId,
				adUnit: indexPage.config.adUnit,
				ajaxUrl: indexPage.config.ajaxUrl,
				googletagUrl: indexPage.config.googletagUrl,
				switches: indexPage.config.switches,
				abTests: indexPage.config.abTests,
				brazeApiKey: indexPage.config.brazeApiKey,
				// Until we understand exactly what config we need to make available client-side,
				// add everything we haven't explicitly typed as unknown config
				unknownConfig: indexPage.config,
			}),
		),
	);

	const keywords = indexPage.config.keywords;

	return pageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: 'TODO',
		windowGuardian,
		keywords,
		offerHttp3,
		renderingTarget: 'Web',
		borkFCP: indexPage.config.abTests.borkFcpVariant === 'variant',
		borkFID: indexPage.config.abTests.borkFidVariant === 'variant',
	});
};
