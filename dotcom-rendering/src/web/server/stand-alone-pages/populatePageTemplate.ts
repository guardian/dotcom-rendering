import type { EmotionCache } from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import type { BasePageModel } from '../../../model/pageModel';
import { extractExpeditedIslands } from '../extractIslands';
import { pageTemplate } from '../pageTemplate';
import { buildWindowGuardian } from '../stand-alone-pages/makeWindowGuardian';
import {
	getGaPath,
	getLowPriorityScriptTags,
	getPriorityScriptTags,
} from '../stand-alone-pages/scriptTags';

export const populatePageTemplate = (
	model: BasePageModel,
	html: string,
	cache: EmotionCache,
): string => {
	const { offerHttp3 = false } = model.config.switches;
	const { canonicalUrl, description, webTitle } = model;

	// eslint-disable-next-line @typescript-eslint/unbound-method -- because
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);
	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);
	const expeditedIslands = extractExpeditedIslands(html);

	const priorityScriptTags = getPriorityScriptTags(
		expeditedIslands,
		offerHttp3,
		false,
	);
	const lowPriorityScriptTags = getLowPriorityScriptTags(offerHttp3, false);
	const gaPath = getGaPath(false);

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
		openGraphData: undefined,
		twitterData: undefined,
		initTwitter: undefined,
		keywords: model.config.keywords ?? '',
		offerHttp3,
		canonicalUrl,
	});
};
