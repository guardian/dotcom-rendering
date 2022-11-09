import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import type { Request } from 'express';
import { extractExpeditedIslands } from '../extractIslands';
import { pageTemplate } from '../pageTemplate';
import { getStandAloneContent } from './contents';
import {
	getGaPath,
	getLowPriorityScriptTags,
	getPriorityScriptTags,
} from './scriptTags';

export const buildStandAlonePage = (req: Request): string | undefined => {
	const query = req.query as Record<string, string | undefined>;
	const { page: pageName } = query;

	// TO DO - parsing a model and view type object from req
	// maybe use middleware to provide default static data on the dev server
	// copy pattern from  getContentFromURLMiddleware?
	// for live, will need to parse posted data sent by frontend out of req.body

	const key = 'dcr';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method -- because
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const html = pageName
		? getStandAloneContent(pageName, req, cache)
		: undefined;

	if (!html) {
		return undefined;
	}

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);
	const expeditedIslands = extractExpeditedIslands(html);

	const offerHttp3 = false;

	const priorityScriptTags = getPriorityScriptTags(
		expeditedIslands,
		offerHttp3,
		false,
	);
	const lowPriorityScriptTags = getLowPriorityScriptTags(offerHttp3, false);
	const gaPath = getGaPath(false);

	return pageTemplate({
		linkedData: {},
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title: pageName,
		description: 'page description for page',
		windowGuardian: '',
		gaPath,
		ampLink: undefined,
		openGraphData: undefined,
		twitterData: undefined,
		keywords: '',
		initTwitter: undefined,
		offerHttp3,
		canonicalUrl: undefined,
	});
};
