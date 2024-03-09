import type { RequestHandler } from 'express';
import { pickBrandingForEdition } from '../lib/branding';
import { decideTrail } from '../lib/decideTrail';
import { enhanceCollections } from '../model/enhanceCollections';
import { extractTrendingTopicsFomFront } from '../model/extractTrendingTopics';
import { validateAsFrontType } from '../model/validate';
import type { DCRFrontType, FEFrontType } from '../types/front';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderSummaryPage } from './render.summaryPage.web';

const enhanceFront = (body: unknown): DCRFrontType => {
	const data: FEFrontType = validateAsFrontType(body);

	return {
		...data,
		webTitle: `${
			data.pressedPage.seoData.title ?? data.pressedPage.seoData.webTitle
		} | The Guardian`,
		pressedPage: {
			...data.pressedPage,
			collections: enhanceCollections({
				collections: data.pressedPage.collections,
				editionId: data.editionId,
				pageId: data.pageId,
				onPageDescription:
					data.pressedPage.frontProperties.onPageDescription,
				isOnPaidContentFront: data.config.isPaidContent,
				discussionApiUrl: data.config.discussionApiUrl,
				frontBranding: pickBrandingForEdition(
					data.pressedPage.frontProperties.commercial
						.editionBrandings,
					data.editionId,
				),
			}),
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		trendingTopics: extractTrendingTopicsFomFront(
			data.pressedPage.collections,
			data.pageId,
		),
		deeplyRead: data.deeplyRead?.map((trail) => decideTrail(trail)),
	};
};

export const handleSummaryPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('front');
	const front = enhanceFront(body);
	const { html, prefetchScripts } = renderSummaryPage({
		front,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
