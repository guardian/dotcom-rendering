import type { RequestHandler } from 'express';
import { pickBrandingForEdition } from '../lib/branding';
import { decideTrail } from '../lib/decideTrail';
import { enhanceCards } from '../model/enhanceCards';
import { enhanceCollections } from '../model/enhanceCollections';
import {
	extractTrendingTopics,
	extractTrendingTopicsFomFront,
} from '../model/extractTrendingTopics';
import { groupTrailsByDates } from '../model/groupTrailsByDates';
import { getSpeedFromTrails } from '../model/slowOrFastByTrails';
import { validateAsFrontType, validateAsTagFrontType } from '../model/validate';
import type { DCRFrontType, FEFrontType } from '../types/front';
import type { DCRTagFrontType, FETagFrontType } from '../types/tagFront';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFront, renderTagFront } from './render.front.web';

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

const tagFrontWebTitle = (tagFront: FETagFrontType) => {
	const pagination = tagFront.tags.tags[0]?.pagination;
	if (pagination !== undefined && pagination.currentPage > 1) {
		return `${tagFront.webTitle} | Page ${pagination.currentPage} of ${pagination.lastPage} | The Guardian`;
	} else {
		return `${tagFront.webTitle} | The Guardian`;
	}
};

const enhanceTagFront = (body: unknown): DCRTagFrontType => {
	const data: FETagFrontType = validateAsTagFrontType(body);

	const enhancedCards = enhanceCards(data.contents, {
		cardInTagFront: true,
		pageId: data.pageId,
		discussionApiUrl: data.config.discussionApiUrl,
	});
	const speed = getSpeedFromTrails(data.contents);

	const groupedTrails = groupTrailsByDates(
		enhancedCards,
		speed === 'slow' || data.forceDay,
	);

	return {
		...data,
		webTitle: tagFrontWebTitle(data),
		tags: data.tags.tags,
		groupedTrails,
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
			description:
				data.tags.tags[0]?.properties.bio ??
				data.tags.tags[0]?.properties.description,
			image: data.tags.tags[0]?.properties.bylineImageUrl,
		},
	};
};

export const handleFront: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('front');
	const front = enhanceFront(body);
	console.log(
		'*** front',
		JSON.stringify(front.pressedPage.collections[0]?.curated?.[0]?.image),
	);
	const { html, prefetchScripts } = renderFront({
		front,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceFront(body));
};

export const handleTagFront: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('tagFront');
	const tagFront = enhanceTagFront(body);
	const { html, prefetchScripts } = renderTagFront({
		tagFront,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleTagFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceTagFront(body));
};
