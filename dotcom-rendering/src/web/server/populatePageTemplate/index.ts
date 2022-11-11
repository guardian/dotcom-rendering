import type { EmotionCache } from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../../scripts/webpack/bundles';
import type { BasePageModel } from '../../../model/pageModel';
import { extractExpeditedIslands } from '../extractIslands';
import { pageTemplate } from '../pageTemplate';
import { buildWindowGuardian } from './makeWindowGuardian';
import {
	getGaPath,
	getLowPriorityScriptTags,
	getPriorityScriptTags,
} from './scriptTags';

export const populatePageTemplate = (
	model: BasePageModel,
	html: string,
	cache: EmotionCache,
): string => {
	const {
		canonicalUrl,
		description,
		webTitle,
		config,
		openGraphData,
		twitterData,
	} = model;
	const { offerHttp3 = false } = config.switches;
	const shouldServeVariantBundle: boolean = [
		BUILD_VARIANT,
		config.abTests[dcrJavascriptBundle('Variant')] === 'variant',
	].every(Boolean);

	// eslint-disable-next-line @typescript-eslint/unbound-method -- because
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);
	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);
	const expeditedIslands = extractExpeditedIslands(html);

	const priorityScriptTags = getPriorityScriptTags(
		expeditedIslands,
		offerHttp3,
		shouldServeVariantBundle,
	);
	const lowPriorityScriptTags = getLowPriorityScriptTags(
		offerHttp3,
		shouldServeVariantBundle,
	);
	const gaPath = getGaPath(shouldServeVariantBundle);

	const windowGuardian = buildWindowGuardian(model);

	return pageTemplate({
		linkedData: {},
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title: webTitle,
		description,
		windowGuardian,
		gaPath,
		ampLink: undefined,
		openGraphData,
		twitterData,
		initTwitter: undefined,
		keywords: config.keywords ?? '',
		offerHttp3,
		canonicalUrl,
	});
};
