import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';
import type { ManifestPath } from '../../lib/assets';
import { generateScriptTags, getScriptsFromManifest } from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { extractNAV } from '../../model/extract-nav';
import { makeWindowGuardian } from '../../model/window-guardian';
import type { DCRFrontType } from '../../types/front';
import { FrontPage } from '../components/FrontPage';
import { getHttp3Url } from '../lib/getHttp3Url';
import { pageTemplate } from './pageTemplate';

interface Props {
	front: DCRFrontType;
}

export const frontToHtml = ({ front }: Props): string => {
	const title = front.webTitle;
	const NAV = extractNAV(front.nav);
	const key = 'dcr';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const html = renderToString(
		<CacheProvider value={cache}>
			<FrontPage front={front} NAV={NAV} />
		</CacheProvider>,
	);

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = front.config.switches;

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const manifestPaths: ManifestPath[] =
		front.config.abTests.dcrJsBundleVariant === 'variant'
			? ['./manifest.variant.json', './manifest.legacy.json']
			: ['./manifest.modern.json', './manifest.legacy.json'];

	const getScripts = getScriptsFromManifest(manifestPaths);

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const priorityScriptTags = generateScriptTags(
		[
			polyfillIO,
			...getScripts('bootCmp.js'),
			...getScripts('ophan.js'),
			process.env.COMMERCIAL_BUNDLE_URL ??
				front.config.commercialBundleUrl,
			...getScripts('sentryLoader.js'),
			...getScripts('dynamicImport.js'),
			...getScripts('islands.js'),
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	/**
	 * Low priority scripts. These scripts will be requested
	 * asynchronously after the main HTML has been parsed. Execution
	 * order is not guaranteed. It is even possible that these execute
	 * *before* the high priority scripts, although this is very
	 * unlikely.
	 */
	const lowPriorityScriptTags = generateScriptTags(
		[
			...getScripts('atomIframe.js'),
			...getScripts('embedIframe.js'),
			...getScripts('newsletterEmbedIframe.js'),
			...getScripts('relativeTime.js'),
		].map((script) => (offerHttp3 ? getHttp3Url(script) : script)),
	);

	const gaChunk = getScripts('ga.js');
	const modernScript = gaChunk.find((script) => script.includes('.modern.'));
	const legacyScript = gaChunk.find((script) => script.includes('.legacy.'));
	const gaPath = {
		modern: modernScript as string,
		legacy: legacyScript as string,
	};

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
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
			}),
		),
	);

	const keywords = front.config.keywords ?? '';

	return pageTemplate({
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title,
		windowGuardian,
		gaPath,
		keywords,
		offerHttp3,
	});
};
