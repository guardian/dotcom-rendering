import type { RequestHandler } from 'express';
import { decideTrail } from '../lib/decideTrail.ts';
import { enhanceCards } from '../model/enhanceCards.ts';
import { enhanceCollections } from '../model/enhanceCollections.ts';
import {
	extractTrendingTopics,
	extractTrendingTopicsFomFront,
} from '../model/extractTrendingTopics.ts';
import { groupTrailsByDates } from '../model/groupTrailsByDates.ts';
import { injectMpuIntoGroupedTrails } from '../model/injectMpuIntoGroupedTrails.ts';
import { getSpeedFromTrails } from '../model/slowOrFastByTrails.ts';
import {
	validateAsFrontType,
	validateAsTagFrontType,
} from '../model/validate.ts';
import { recordTypeAndPlatform } from '../server/lib/logging-store.ts';
import type { DCRFrontType, FEFrontType } from '../types/front.ts';
import type { DCRTagFrontType, FETagFrontType } from '../types/tagFront.ts';
import { renderFront, renderTagFront } from './render.front.web.tsx';

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
				data.config.isPaidContent,
			),
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		mostCommented: data.mostCommented
			? decideTrail(data.mostCommented)
			: undefined,
		mostShared: data.mostShared ? decideTrail(data.mostShared) : undefined,
		trendingTopics: extractTrendingTopicsFomFront(
			data.pressedPage.collections,
			data.pageId,
		),
		deeplyRead: data.deeplyRead?.map((trail) => decideTrail(trail)),
	};
};

const enhanceTagFront = (body: unknown): DCRTagFrontType => {
	const data: FETagFrontType = validateAsTagFrontType(body);

	const enhancedCards = enhanceCards(data.contents, {
		cardInTagFront: true,
		pageId: data.pageId,
	});
	const speed = getSpeedFromTrails(data.contents);

	const groupedTrails = groupTrailsByDates(
		enhancedCards,
		speed === 'slow' || data.forceDay,
	);

	return {
		...data,
		tags: data.tags.tags,
		groupedTrails: data.isAdFreeUser
			? groupedTrails
			: injectMpuIntoGroupedTrails(groupedTrails, speed),
		speed,
		// Pagination information comes from the first tag
		pagination:
			data.tags.tags[0]?.pagination &&
			data.tags.tags[0].pagination.lastPage > 1
				? {
						...data.tags.tags[0]?.pagination,
						sectionName: data.webTitle,
						pageId: data.pageId,
				  }
				: undefined,
		trendingTopics: extractTrendingTopics(data.contents, data.pageId),
		header: {
			title: data.webTitle,
			description: data.tags.tags[0]?.properties.bio,
			image: data.tags.tags[0]?.properties.bylineImageUrl,
		},
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

export const handleTagFront: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('tagFront');
	const tagFront = enhanceTagFront(body);
	const html = renderTagFront({
		tagFront,
	});
	res.status(200).send(html);
};

export const handleTagFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceTagFront(body));
};
