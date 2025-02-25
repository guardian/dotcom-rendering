import { isUndefined } from '@guardian/libs';
import type { RequestHandler } from 'express';
import type { FETagPage } from '../frontend/feTagPage';
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
import { validateAsFETagPage, validateAsFrontType } from '../model/validate';
import type { DCRFrontType, FEFrontType } from '../types/front';
import type { FETagType } from '../types/tag';
import type { TagPage } from '../types/tagPage';
import { makePrefetchHeader } from './lib/header';
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

const tagPageWebTitle = (tagPage: FETagPage) => {
	const { pagination } = tagPage;
	if (!isUndefined(pagination) && pagination.currentPage > 1) {
		return `${tagPage.webTitle} | Page ${pagination.currentPage} of ${pagination.lastPage} | The Guardian`;
	} else {
		return `${tagPage.webTitle} | The Guardian`;
	}
};

export const getBadgeUrl = (tag: FETagType): string | undefined => {
	const { references } = tag.properties;

	if (!references) return undefined;

	const footballTeamRef = references.find(
		(ref) => ref.type === 'pa-football-team',
	);
	if (!footballTeamRef) return undefined;

	const teamId = footballTeamRef.id.split('/').slice(1).join('/');
	return `https://sport.guim.co.uk/football/crests/120/${teamId}.png`;
};

const enhanceTagPage = (body: unknown): TagPage => {
	const data: FETagPage = validateAsFETagPage(body);

	const enhancedCards = enhanceCards(data.contents, {
		cardInTagPage: true,
		pageId: data.pageId,
		discussionApiUrl: data.config.discussionApiUrl,
		editionId: data.editionId,
	});
	const speed = getSpeedFromTrails(data.contents);

	const groupedTrails = groupTrailsByDates(
		enhancedCards,
		data.editionId,
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
			image:
				data.tags.tags[0]?.properties.bylineImageUrl ??
				(data.tags.tags[0]
					? getBadgeUrl(data.tags.tags[0])
					: undefined),
		},
		branding: tagPageBranding,
		canonicalUrl: data.canonicalUrl,
	};
};

export const handleFront: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('front');
	const front = enhanceFront(body);
	const { html, prefetchScripts } = renderFront({
		front,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceFront(body));
};

export const handleTagPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('tagPage');
	const tagPage = enhanceTagPage(body);
	const { html, prefetchScripts } = renderTagPage({
		tagPage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleTagPageJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceTagPage(body));
};
