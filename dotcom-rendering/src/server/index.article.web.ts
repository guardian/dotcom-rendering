import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import { addImageIDs } from '../model/addImageIDs';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { addLightboxData } from '../model/enhance-images';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import { recordTypeAndPlatform } from '../server/lib/logging-store';
import type { FEArticleBadgeType } from '../types/badge';
import type { DCRArticle, FEBlocksRequest } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { makePrefetchHeader } from './lib/header';
import {
	renderBlocks,
	renderHtml,
	renderKeyEvents,
} from './render.article.web';

const enhancePinnedPost = (
	format: FEFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
) => {
	return block ? enhanceBlocks([block], format, renderingTarget)[0] : block;
};

const enhanceBadge = (badge?: FEArticleBadgeType) =>
	badge
		? {
				...badge,
				enhanced: {
					href: `/${badge.seriesTag}`,
					imageSrc: badge.imageUrl,
				},
		  }
		: undefined;

export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): DCRArticle => {
	const validated = validateAsArticleType(body);
	// addImageIDs needs to take account of both main media elements
	// and block elements, so it needs to be executed here
	const { mainMediaElements, blocks } = addImageIDs(validated);
	const data = {
		...validated,
		mainMediaElements,
		blocks,
	};

	const enhancedBlocks = enhanceBlocks(
		data.blocks,
		data.format,
		renderingTarget,
		{
			promotedNewsletter: data.promotedNewsletter,
		},
	);
	const enhancedMainMedia = addLightboxData(data.mainMediaElements);
	return {
		...data,
		mainMediaElements: enhancedMainMedia,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(
			data.format,
			renderingTarget,
			data.pinnedPost,
		),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.showTableOfContents
			? enhanceTableOfContents(data.format, enhancedBlocks)
			: undefined,
		/**
		 * This function needs to run at a higher level to most other enhancers
		 * because it needs both mainMediaElements and blocks in scope
		 */
		imagesForLightbox: buildLightboxImages(
			data.format,
			enhancedBlocks,
			enhancedMainMedia,
		),
		badge: enhanceBadge(data.badge),
	};
};

export const handleArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');
	const article = enhanceArticleType(body, 'Web');
	const { html, prefetchScripts } = renderHtml({
		article,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleArticleJson: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'json');
	const article = enhanceArticleType(body, 'Web');
	const resp = {
		data: {
			// TODO: We should rename this to 'article' or 'FEArticle', but first we need to investigate
			// where/if this is used.
			CAPIArticle: article,
		},
	};

	res.status(200).send(resp);
};

export const handleArticlePerfTest: RequestHandler = (req, res, next) => {
	req.body = ExampleArticle;
	handleArticle(req, res, next);
};

export const handleInteractive: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('interactive', 'web');
	const article = enhanceArticleType(body, 'Web');
	const { html, prefetchScripts } = renderHtml({
		article,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleBlocks: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('blocks');
	const {
		blocks,
		format,
		host,
		pageId,
		webTitle,
		ajaxUrl,
		isAdFreeUser,
		isSensitive,
		videoDuration,
		edition,
		section,
		sharedAdTargeting,
		adUnit,
		switches,
		keywordIds,
	} =
		// The content if body is not checked
		body as FEBlocksRequest;

	const enhancedBlocks = enhanceBlocks(blocks, format, 'Web');
	const html = renderBlocks({
		blocks: enhancedBlocks,
		format,
		host,
		pageId,
		webTitle,
		ajaxUrl,
		isAdFreeUser,
		isSensitive,
		videoDuration,
		edition,
		section,
		sharedAdTargeting,
		adUnit,
		switches,
		keywordIds,
	});

	res.status(200).send(html);
};

export const handleKeyEvents: RequestHandler = ({ body }, res) => {
	// TODO: This endpoint is unused - we should consider removing it, talk to Olly 24/05/2023

	recordTypeAndPlatform('keyEvents');
	const { keyEvents, format, filterKeyEvents } =
		// The content if body is not checked
		body as FEKeyEventsRequest;

	const html = renderKeyEvents({
		keyEvents,
		format,
		filterKeyEvents,
	});

	res.status(200).send(html);
};
