import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

import { ArticlePillar } from '@guardian/libs';
import { decideTheme } from '../lib/decideTheme';
import { decideFormat } from '../lib/decideFormat';

import { Page } from '../components/Page';

import { escapeData } from '../../lib/escapeData';
import { ASSET_ORIGIN, getScriptArrayFromFile } from '../../lib/assets';

import { makeWindowGuardian } from '../../model/window-guardian';
import { articleTemplate } from './articleTemplate';

interface Props {
	data: DCRServerDocumentData;
}

const generateScriptTags = (
	scripts: Array<{ src: string; legacy?: boolean } | false>,
) =>
	scripts.reduce<string[]>((scriptTags, script) => {
		if (script === false) return scriptTags;

		let attrs: string;
		switch (script.legacy) {
			case true:
				attrs = 'defer nomodule';
				break;
			case false:
				attrs = 'type="module"';
				break;
			default:
				attrs = 'defer';
				break;
		}

		return [
			...scriptTags,
			`<script ${attrs} src="${script.src}"></script>`,
		];
	}, []);

const decideTitle = (CAPI: CAPIType): string => {
	if (
		decideTheme(CAPI.format) === ArticlePillar.Opinion &&
		CAPI.author.byline
	) {
		return `${CAPI.headline} | ${CAPI.author.byline} | The Guardian`;
	}
	return `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;
};

export const document = ({ data }: Props): string => {
	const { CAPI, NAV, linkedData } = data;
	const title = decideTitle(CAPI);
	const key = 'dcr';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const format: ArticleFormat = decideFormat(CAPI.format);

	const html = renderToString(
		<CacheProvider value={cache}>
			<Page format={format} CAPI={CAPI} NAV={NAV} />
		</CacheProvider>,
	);

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	// We want to only insert script tags for the elements or main media elements on this page view
	// so we need to check what elements we have and use the mapping to the the chunk name
	const CAPIElements: CAPIElement[] = CAPI.blocks
		.map((block) => block.elements)
		.flat();

	/**
	 * Preload the following woff2 font files
	 * TODO: Identify critical fonts to preload
	 */
	const fontFiles = [
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2',
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2',
		// 'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2',
		// 'http://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2',
		'https://assets.guim.co.uk/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2',
	];

	const polyfillIO =
		'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,es2019,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,URLSearchParams,fetch,NodeList.prototype.forEach,navigator.sendBeacon,performance.now,Promise.allSettled&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1';

	const pageHasNonBootInteractiveElements = CAPIElements.some(
		(element) =>
			element._type ===
				'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
			element.scriptUrl !==
				'https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js', // We have rewritten this standard behaviour into Dotcom Rendering
	);

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const priorityScriptTags = generateScriptTags([
		{ src: polyfillIO },
		...getScriptArrayFromFile('bootCmp.js'),
		...getScriptArrayFromFile('ophan.js'),
		CAPI.config && { src: CAPI.config.commercialBundleUrl },
		...getScriptArrayFromFile('sentryLoader.js'),
		...getScriptArrayFromFile('dynamicImport.js'),
		pageHasNonBootInteractiveElements && {
			src: `${ASSET_ORIGIN}static/frontend/js/curl-with-js-and-domReady.js`,
		},
		...getScriptArrayFromFile('islands.js'),
	]);

	/**
	 * Low priority scripts. These scripts will be requested
	 * asynchronously after the main HTML has been parsed. Execution
	 * order is not guaranteed. It is even possible that these execute
	 * *before* the high priority scripts, although this is very
	 * unlikely.
	 */
	const lowPriorityScriptTags = generateScriptTags([
		...getScriptArrayFromFile('atomIframe.js'),
		...getScriptArrayFromFile('embedIframe.js'),
		...getScriptArrayFromFile('newsletterEmbedIframe.js'),
		...getScriptArrayFromFile('relativeTime.js'),
		...getScriptArrayFromFile('initDiscussion.js'),
	]);

	const gaChunk = getScriptArrayFromFile('ga.js');
	const modernScript = gaChunk.find((script) => script?.legacy === false);
	const legacyScript = gaChunk.find((script) => script?.legacy === true);
	const gaPath = {
		modern: modernScript?.src as string,
		legacy: legacyScript?.src as string,
	};

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(JSON.stringify(makeWindowGuardian(data)));

	const hasAmpInteractiveTag = CAPI.tags.some(
		(tag) => tag.id === 'tracking/platformfunctional/ampinteractive',
	);

	// Only include AMP link for interactives which have the 'ampinteractive' tag
	const ampLink =
		CAPI.format.design !== 'InteractiveDesign' || hasAmpInteractiveTag
			? `https://amp.theguardian.com/${data.CAPI.pageId}`
			: undefined;

	const { openGraphData } = CAPI;
	const { twitterData } = CAPI;
	const keywords =
		typeof CAPI.config.keywords === 'undefined' ||
		CAPI.config.keywords === 'Network Front'
			? ''
			: CAPI.config.keywords;

	return articleTemplate({
		linkedData,
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		fontFiles,
		title,
		description: CAPI.trailText,
		windowGuardian,
		gaPath,
		ampLink,
		openGraphData,
		twitterData,
		keywords,
		format,
	});
};
