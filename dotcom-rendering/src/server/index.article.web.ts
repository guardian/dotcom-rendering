import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import { enhanceArticleType } from '../lib/article';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { recordTypeAndPlatform } from '../server/lib/logging-store';
import type { FEBlocksRequest } from '../types/frontend';
import { makePrefetchHeader } from './lib/header';
import {
	renderBlocks,
	renderHtml,
	renderKeyEvents,
} from './render.article.web';

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
