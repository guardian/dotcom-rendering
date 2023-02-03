import {
	generateScriptTags,
	getScriptsFromManifest,
	LEGACY_SCRIPT,
	MODERN_SCRIPT,
	VARIANT_SCRIPT,
} from '../../../lib/assets';
import { getHttp3Url } from '../../lib/getHttp3Url';

/**
 * The highest priority scripts.
 * These scripts have a considerable impact on site performance.
 * Only scripts critical to application execution may go in here.
 * Please talk to the dotcom platform team before adding more.
 * Scripts will be executed in the order they appear in this array
 */
export const getPriorityScriptTags = (
	offerHttp3: boolean,
	shouldServeVariantBundle: boolean,
): string[] => {
	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const priorityScriptTags = generateScriptTags(
		[
			polyfillIO,
			...getScriptArrayFromFile('bootCmp.js'),
			...getScriptArrayFromFile('ophan.js'),

			...getScriptArrayFromFile('sentryLoader.js'),
			...getScriptArrayFromFile('dynamicImport.js'),

			...getScriptArrayFromFile('islands.js'),
		].map((script) =>
			offerHttp3 && script ? getHttp3Url(script) : script,
		),
	);
	return priorityScriptTags;
};

export const getLowPriorityScriptTags = (
	offerHttp3: boolean,
	shouldServeVariantBundle: boolean,
): string[] => {
	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);

	const lowPriorityScriptTags = generateScriptTags(
		[
			...getScriptArrayFromFile('atomIframe.js'),
			...getScriptArrayFromFile('embedIframe.js'),
			...getScriptArrayFromFile('newsletterEmbedIframe.js'),
			...getScriptArrayFromFile('relativeTime.js'),
			...getScriptArrayFromFile('initDiscussion.js'),
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	return lowPriorityScriptTags;
};

export const getGaPath = (
	shouldServeVariantBundle: boolean,
): { modern: string; legacy: string } => {
	const getScriptArrayFromFile = getScriptsFromManifest(
		shouldServeVariantBundle,
	);
	const gaChunk = getScriptArrayFromFile('ga.js');
	const modernScript = gaChunk.find((script) => script.match(MODERN_SCRIPT));
	const legacyScript = gaChunk.find((script) => script.match(LEGACY_SCRIPT));
	const variantScript = gaChunk.find((script) =>
		script.match(VARIANT_SCRIPT),
	);
	const gaPath = {
		modern: (modernScript ?? variantScript) as string,
		legacy: legacyScript as string,
	};
	return gaPath;
};
