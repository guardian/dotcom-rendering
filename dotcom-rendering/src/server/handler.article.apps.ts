import type { RequestHandler } from 'express';
import { decideFormat } from '../lib/articleFormat';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { validateAsBlock, validateAsFEArticle } from '../model/validate';
import { enhanceArticleType } from '../types/article';
import type { FEBlocksRequest } from '../types/frontend';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderAppsBlocks, renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');

	const frontendData = validateAsFEArticle(body);
	const article = enhanceArticleType(frontendData, 'Apps');
	const { html, prefetchScripts } = renderArticle(article);

	// The Android app will cache these assets to enable offline reading
	res.set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleAppsInteractive: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('interactive', 'app');

	const frontendData = validateAsFEArticle(body);
	const article = enhanceArticleType(frontendData, 'Apps');
	const { html, prefetchScripts } = renderArticle(article);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleAppsBlocks: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('blocks', 'app');
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
		abTests,
		switches,
		keywordIds,
		shouldHideAds,
	} =
		// The content if body is not checked
		body as FEBlocksRequest;
	for (const block of blocks) validateAsBlock(block);

	const enhancedBlocks = enhanceBlocks(blocks, decideFormat(format), {
		renderingTarget: 'Apps',
		promotedNewsletter: undefined,
		imagesForLightbox: [],
		hasAffiliateLinksDisclaimer: false,
	});
	const html = renderAppsBlocks({
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
		abTests,
		keywordIds,
		shouldHideAds,
	});

	res.status(200).send(html);
};
