import { isUndefined } from '@guardian/libs';
import type { RequestHandler } from 'express';
import type { FEFront } from '../frontend/feFront';
import type { FETagPage } from '../frontend/feTagPage';
import { decideTagPageBranding, pickBrandingForEdition } from '../lib/branding';
import { decideTrail } from '../lib/decideTrail';
import { createPersonalisedCollection } from '../model/createCollection';
import { enhanceCards } from '../model/enhanceCards';
import { enhanceCollections } from '../model/enhanceCollections';
import {
	extractTrendingTopics,
	extractTrendingTopicsFomFront,
} from '../model/extractTrendingTopics';
import { groupTrailsByDates } from '../model/groupTrailsByDates';
import { getSpeedFromTrails } from '../model/slowOrFastByTrails';
import { validateAsFEFront, validateAsFETagPage } from '../model/validate';
import type { Front } from '../types/front';
import type { FETagType } from '../types/tag';
import type { TagPage } from '../types/tagPage';
import { makePrefetchHeader } from './lib/header';
import { renderFront, renderTagPage } from './render.front.web';

const enhanceFront = (body: unknown): Front => {
	const data: FEFront = validateAsFEFront(body);

	const serverTime = Date.now();

	const isInPersonalisedContainerTest =
		data.config.serverSideABTests[
			`fronts-and-curation-personalised-container`
		];

	const personalisedContainer = isInPersonalisedContainerTest
		? createPersonalisedCollection(
				data.pressedPage.collections,
				data.config.discussionApiUrl,
				data.editionId,
		  )
		: undefined;

	const collections = enhanceCollections({
		collections: data.pressedPage.collections,
		editionId: data.editionId,
		pageId: data.pageId,
		onPageDescription: data.pressedPage.frontProperties.onPageDescription,
		isOnPaidContentFront: data.config.isPaidContent,
		discussionApiUrl: data.config.discussionApiUrl,
		frontBranding: pickBrandingForEdition(
			data.pressedPage.frontProperties.commercial.editionBrandings,
			data.editionId,
		),
	});

	const personalisedContainerPosition =
		data.pressedPage.collections.findIndex(
			(c) => c.displayName === 'News',
		) + 1;

	const combinedCollections = personalisedContainer
		? [
				...collections.slice(0, personalisedContainerPosition),
				personalisedContainer,
				...collections.slice(personalisedContainerPosition),
		  ]
		: collections;

	return {
		...data,
		webTitle: `${
			data.pressedPage.seoData.title ?? data.pressedPage.seoData.webTitle
		} | The Guardian`,
		pressedPage: {
			...data.pressedPage,
			collections: combinedCollections,
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		trendingTopics: extractTrendingTopicsFomFront(
			data.pressedPage.collections,
			data.pageId,
		),
		deeplyRead: data.deeplyRead?.map((trail) => decideTrail(trail)),
		canonicalUrl: data.canonicalUrl,
		serverTime,
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

export const getPaId = (tag: FETagType): string | undefined => {
	const { references } = tag.properties;

	if (!references) return undefined;

	const footballTeamRef = references.find(
		(ref) => ref.type === 'pa-football-team',
	);
	if (!footballTeamRef) return undefined;

	return footballTeamRef.id.split('/').slice(1).join('/');
};

const headerImage = (tags: FETagType[]): TagPage['header']['image'] => {
	const firstTag = tags[0];

	if (firstTag === undefined) {
		return undefined;
	}

	if (firstTag.properties.bylineImageUrl !== undefined) {
		return {
			kind: 'byline',
			url: firstTag.properties.bylineImageUrl,
		};
	}

	const teamId = getPaId(firstTag);

	if (teamId !== undefined) {
		return {
			kind: 'footballCrest',
			teamId,
		};
	}

	return undefined;
};

const enhanceTagPage = (body: unknown): TagPage => {
	const data: FETagPage = validateAsFETagPage(body);

	const branding = data.commercialProperties[data.editionId].branding;

	const tagPageBranding = branding
		? decideTagPageBranding({
				branding,
		  })
		: undefined;

	const enhancedCards = enhanceCards(data.contents, {
		cardInTagPage: true,
		pageId: data.pageId,
		discussionApiUrl: data.config.discussionApiUrl,
		editionId: data.editionId,
		stripBranding: !!tagPageBranding,
	});

	const speed = getSpeedFromTrails(data.contents);

	const groupedTrails = groupTrailsByDates(
		enhancedCards,
		data.editionId,
		speed === 'slow' || data.forceDay,
	);

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
			image: headerImage(data.tags.tags),
		},
		branding: tagPageBranding,
		canonicalUrl: data.canonicalUrl,
		storylinesContent: data.storylinesContent ?? undefined,
	};
};

export const handleFront: RequestHandler = ({ body }, res) => {
	const front = enhanceFront(body);
	const { html, prefetchScripts } = renderFront({
		front,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleTagPage: RequestHandler = ({ body }, res) => {
	const tagPage = enhanceTagPage(body);
	const { html, prefetchScripts } = renderTagPage({
		tagPage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
