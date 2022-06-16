import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { isString } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { getScriptFromFile } from '../../lib/assets';
import { escapeData } from '../../lib/escapeData';
import { makeFrontWindowGuardian } from '../../model/window-guardian';
import { FrontPage } from '../components/FrontPage';
import { frontTemplate } from './frontTemplate';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

const generateScriptTags = (scripts: Array<string | false>) =>
	scripts
		.filter(isString)
		.map((script) => `<script type="module" src="${script}"></script>`);

export const frontToHtml = ({ front, NAV }: Props): string => {
	const title = front.webTitle;
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

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const priorityScriptTags = generateScriptTags([
		polyfillIO,
		getScriptFromFile('bootCmp.js'),
		getScriptFromFile('ophan.js'),
		front.config.commercialBundleUrl,
		getScriptFromFile('sentryLoader.js'),
		getScriptFromFile('dynamicImport.js'),
		getScriptFromFile('islands.js'),
	]);

	/**
	 * Low priority scripts. These scripts will be requested
	 * asynchronously after the main HTML has been parsed. Execution
	 * order is not guaranteed. It is even possible that these execute
	 * *before* the high priority scripts, although this is very
	 * unlikely.
	 */
	const lowPriorityScriptTags = generateScriptTags([
		getScriptFromFile('atomIframe.js'),
		getScriptFromFile('embedIframe.js'),
		getScriptFromFile('newsletterEmbedIframe.js'),
		getScriptFromFile('relativeTime.js'),
	]);

	const gaPath = getScriptFromFile('ga.js');

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(makeFrontWindowGuardian(front)),
	);

	const keywords = front.config.keywords ?? '';

	return frontTemplate({
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		fontFiles,
		title,
		windowGuardian,
		gaPath,
		keywords,
	});
};
