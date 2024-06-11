import type { RequestHandler } from 'express';
import { decideTagPageBranding, pickBrandingForEdition } from '../lib/branding';
import { decideTrail } from '../lib/decideTrail';
import { enhanceCards } from '../model/enhanceCards';
import { enhanceCollections } from '../model/enhanceCollections';
import {
	extractTrendingTopics,
	extractTrendingTopicsFomFront,
} from '../model/extractTrendingTopics';
import { groupTrailsByDates } from '../model/groupTrailsByDates';
import { getSpeedFromTrails } from '../model/slowOrFastByTrails';
import { validateAsFrontType, validateAsTagPageType } from '../model/validate';
import type { DCRFrontType, FEFrontType } from '../types/front';
import type { DCRTagPageType, FETagPageType } from '../types/tagPage';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFront, renderTagPage } from './render.front.web';

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
		canonicalUrl: data.canonicalUrl,
	};
};

const tagPageWebTitle = (tagPage: FETagPageType) => {
	const { pagination } = tagPage;
	if (pagination !== undefined && pagination.currentPage > 1) {
		return `${tagPage.webTitle} | Page ${pagination.currentPage} of ${pagination.lastPage} | The Guardian`;
	} else {
		return `${tagPage.webTitle} | The Guardian`;
	}
};

const enhanceTagPage = (body: unknown): DCRTagPageType => {
	const data: FETagPageType = validateAsTagPageType(body);

	const enhancedCards = enhanceCards(data.contents, {
		cardInTagPage: true,
		pageId: data.pageId,
		discussionApiUrl: data.config.discussionApiUrl,
		editionId: data.editionId,
	});
	const speed = getSpeedFromTrails(data.contents);

	const groupedTrails = groupTrailsByDates(
		enhancedCards,
		speed === 'slow' || data.forceDay,
	);

	const branding = data.commercialProperties[data.editionId].branding;

	const tagPageBranding = branding
		? decideTagPageBranding({
				branding,
		  })
		: undefined;

	return {
		...data,
		webTitle: tagPageWebTitle(data),
		tags: data.tags.tags,
		groupedTrails,
		speed,
		pagination:
			data.pagination && data.pagination.lastPage > 1
				? {
						...data.pagination,
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
		branding: tagPageBranding,
		canonicalUrl: data.canonicalUrl,
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

export const handleTagPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('tagPage');
	const tagPage = enhanceTagPage(body);
	const html = renderTagPage({
		tagPage,
	});
	res.status(200).send(html);
};

export const handleTagPageJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceTagPage(body));
};
