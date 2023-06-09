import type { RequestHandler } from 'express';
import { enhanceCollections } from '../../model/enhanceCollections';
import { extractTrendingTopics } from '../../model/extractTrendingTopics';
import { validateAsFrontType } from '../../model/validate';
import { recordTypeAndPlatform } from '../../server/lib/logging-store';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import { decideTrail } from '../lib/decideTrail';
import { renderFront } from './render.front.web';

const enhanceFront = (body: unknown): DCRFrontType => {
	const data: FEFrontType = validateAsFrontType(body);

	return {
		...data,
		webTitle: `${
			data.pressedPage.seoData.title ?? data.pressedPage.seoData.webTitle
		} | The Guardian`,
		pressedPage: {
			...data.pressedPage,
			collections: enhanceCollections(
				data.pressedPage.collections,
				data.editionId,
				data.pageId,
				data.pressedPage.frontProperties.onPageDescription,
			),
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		mostCommented: data.mostCommented
			? decideTrail(data.mostCommented)
			: undefined,
		mostShared: data.mostShared ? decideTrail(data.mostShared) : undefined,
		trendingTopics: extractTrendingTopics(data.pressedPage.collections),
	};
};

export const handleFront: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('front');
	const front = enhanceFront(body);
	const html = renderFront({
		front,
	});
	res.status(200).send(html);
};

export const handleFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceFront(body));
};
