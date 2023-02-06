import {
	ASSET_ORIGIN,
	generateScriptTags,
	getScriptsFromManifest,
} from '../../../lib/assets';
import { getHttp3Url } from '../../lib/getHttp3Url';

/**
 * The highest priority scripts.
 * These scripts have a considerable impact on site performance.
 * Only scripts critical to application execution may go in here.
 * Please talk to the dotcom platform team before adding more.
 * Scripts will be executed in the order they appear in this array
 */
export const getScriptTags = (
	offerHttp3: boolean,
	shouldServeVariantBundle: boolean,
	commercialBundleUrl: string,
	pageHasNonBootInteractiveElements: boolean,
): string[] => {
	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);

	return generateScriptTags(
		[
			polyfillIO,
			...getScriptArrayFromFile('frameworks.js'),
			...getScriptArrayFromFile('index.js'),
			process.env.COMMERCIAL_BUNDLE_URL ?? commercialBundleUrl,
			pageHasNonBootInteractiveElements &&
				`${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
		].map((script) =>
			offerHttp3 && script ? getHttp3Url(script) : script,
		),
	);
};
