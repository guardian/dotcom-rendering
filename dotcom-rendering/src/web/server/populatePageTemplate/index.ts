import type { EmotionCache } from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../../scripts/webpack/bundles';
import type { DCRNewslettersPageType } from '../../../types/newslettersPage';
import { pageTemplate } from '../pageTemplate';
import { buildWindowGuardian } from './makeWindowGuardian';
import { getScriptTags } from './scriptTags';

export const populatePageTemplate = (
	model: DCRNewslettersPageType,
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

	// eslint-disable-next-line @typescript-eslint/unbound-method -- function does not need binding
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);
	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);

	const scriptTags = getScriptTags(
		offerHttp3,
		shouldServeVariantBundle,
		config.commercialBundleUrl,
		false,
	);

	const windowGuardian = buildWindowGuardian(model);

	return pageTemplate({
		linkedData: {},
		scriptTags,
		css: extractedCss,
		html,
		title: webTitle,
		description,
		windowGuardian,
		ampLink: undefined,
		openGraphData,
		twitterData,
		initTwitter: undefined,
		keywords: config.keywords ?? '',
		offerHttp3,
		canonicalUrl,
	});
};
