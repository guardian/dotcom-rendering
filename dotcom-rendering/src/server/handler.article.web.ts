import type { RequestHandler } from 'express';
import { decideFormat } from '../lib/articleFormat';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { validateAsBlock, validateAsFEArticle } from '../model/validate';
import { enhanceArticleType } from '../types/article';
import type { FEBlocksRequest } from '../types/frontend';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderBlocks, renderHtml } from './render.article.web';

export const handleArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');

	const frontendData = validateAsFEArticle(body);
	const article = enhanceArticleType(frontendData, 'Web');
	const { html, prefetchScripts } = renderHtml({
		article,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleArticleJson: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'json');

	const frontendData = validateAsFEArticle(body);
	const article = enhanceArticleType(frontendData, 'Web');
	const resp = {
		data: {
			// TODO: We should rename this to 'article' or 'FEArticle', but first we need to investigate
			// where/if this is used.
			CAPIArticle: article,
		},
	};

	res.status(200).send(resp);
};

export const handleInteractive: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('interactive', 'web');

	const frontendData = validateAsFEArticle(body);
	const article = enhanceArticleType(frontendData, 'Web');
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
		abTests,
		switches,
		keywordIds,
		shouldHideAds,
	} =
		// The content if body is not checked
		body as FEBlocksRequest;
	for (const block of blocks) validateAsBlock(block);

	const enhancedBlocks = enhanceBlocks(blocks, decideFormat(format), {
		renderingTarget: 'Web',
		promotedNewsletter: undefined,
		imagesForLightbox: [],
		hasAffiliateLinksDisclaimer: false,
		shouldHideAds,
	});
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
		abTests,
		keywordIds,
		shouldHideAds,
	});

	res.status(200).send(html);
};
