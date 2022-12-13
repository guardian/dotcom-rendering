import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { isRecipe } from '../../model/enhance-recipes';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import { validateAsCAPIType } from '../../model/validate';
import type { FEArticleType } from '../../types/frontend';
import { articleToHtml } from './articleToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

const enhanceCAPIType = (body: unknown): FEArticleType => {
	const data = validateAsCAPIType(body);

	const enhancedBlocks = enhanceBlocks(data.blocks, data.format, {
		promotedNewsletter: data.promotedNewsletter,
		isRecipe: isRecipe(data.tags),
	});

	const CAPIArticle: FEArticleType = {
		...data,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.config.switches.tableOfContents
			? enhanceTableOfContents(data.format, enhancedBlocks)
			: undefined,
	};
	return CAPIArticle;
};

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

export const handleArticle: RequestHandler = ({ body }, res) => {
	try {
		const article = enhanceCAPIType(body);
		const resp = articleToHtml({
			article,
		});

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleArticleJson: RequestHandler = ({ body }, res) => {
	try {
		const CAPIArticle = enhanceCAPIType(body);
		const resp = {
			data: {
				CAPIArticle,
			},
		};

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handlePerfTest: RequestHandler = (req, res, next) => {
	req.body = ExampleArticle;
	handleArticle(req, res, next);
};

export const handleInteractive: RequestHandler = ({ body }, res) => {
	try {
		const article = enhanceCAPIType(body);
		const resp = articleToHtml({
			article,
		});

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

// We might need this for liveblogs
// export const handleBlocks: RequestHandler = ({ body }, res) => {
// 	try {
// 		const {
// 			blocks,
// 			format,
// 			host,
// 			pageId,
// 			webTitle,
// 			ajaxUrl,
// 			isAdFreeUser,
// 			isSensitive,
// 			videoDuration,
// 			edition,
// 			section,
// 			sharedAdTargeting,
// 			adUnit,
// 			switches,
// 			keywordIds,
// 		} =
// 			// The content if body is not checked
// 			body as BlocksRequest;

// 		const enhancedBlocks = enhanceBlocks(blocks, format);
// 		const html = blocksToHtml({
// 			blocks: enhancedBlocks,
// 			format,
// 			host,
// 			pageId,
// 			webTitle,
// 			ajaxUrl,
// 			isAdFreeUser,
// 			isSensitive,
// 			videoDuration,
// 			edition,
// 			section,
// 			sharedAdTargeting,
// 			adUnit,
// 			switches,
// 			keywordIds,
// 		});

// 		res.status(200).send(html);
// 	} catch (e) {
// 		res.status(500).send(`<pre>${getStack(e)}</pre>`);
// 	}
// };
