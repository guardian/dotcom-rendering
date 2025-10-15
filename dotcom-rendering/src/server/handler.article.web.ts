import type { RequestHandler } from 'express';
import { type IssuePathItem, safeParse } from 'valibot';
import { type FEArticle, FEArticleSchema } from '../frontend/feArticle';
import { decideFormat } from '../lib/articleFormat';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { validateAsBlock, validateAsFEArticle } from '../model/validate';
import { enhanceArticleType } from '../types/article';
import type { FEBlocksRequest } from '../types/frontend';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderBlocks, renderHtml } from './render.article.web';

const valibotParseFailure = (
	errorString: string[],
	entry: [number, IssuePathItem],
) => {
	const test = entry[1].key as string;
	const type = entry[1].type;

	errorString.push(
		`entry ${entry[0]} with key ${test.toString()} with type ${type}`,
	);
};

export const handleArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');
	// const frontendData1 = validateAsFEArticle(body);
	const result = safeParse(FEArticleSchema, body);
	if (result.success) {
		const frontendData: FEArticle = result.output;
		const article = enhanceArticleType(frontendData, 'Web');
		const { html, prefetchScripts } = renderHtml({
			article,
		});

		res.status(200)
			.set('Link', makePrefetchHeader(prefetchScripts))
			.send(html);
	} else {
		const errorMessages: string[] = [];
		console.error('Validation errors:');
		for (const issue of result.issues) {
			if (issue.path) {
				for (const entry of issue.path.entries()) {
					valibotParseFailure(errorMessages, entry);
				}
			}

			console.log(errorMessages);
		}

		const errorMsg = errorMessages.join('\n');

		throw new TypeError(`Validation failed ${errorMsg}`);
	}
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
