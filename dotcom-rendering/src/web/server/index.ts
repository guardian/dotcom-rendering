import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { isRecipe } from '../../model/enhance-recipes';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCollections } from '../../model/enhanceCollections';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import type { NewslettersPageModel } from '../../model/pageModel';
import { validateAsCAPIType, validateAsFrontType } from '../../model/validate';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import type { FEArticleType } from '../../types/frontend';
import { decideTrail } from '../lib/decideTrail';
import { articleToHtml } from './articleToHtml';
import { blocksToHtml } from './blocksToHtml';
import { frontToHtml } from './frontToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';
import { newslettersToHtml } from './newslettersToHtml';

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

const enhanceFront = (body: unknown): DCRFrontType => {
	const data: FEFrontType = validateAsFrontType(body);
	return {
		...data,
		webTitle: `${
			data.pressedPage.seoData.title ?? data.pressedPage.seoData.webTitle
		} | The Guardian`,
		pressedPage: {
			...data.pressedPage,
			collections: enhanceCollections(
				data.pressedPage.collections,
				data.editionId,
				data.pageId,
			),
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		mostCommented: data.mostCommented
			? decideTrail(data.mostCommented)
			: undefined,
		mostShared: data.mostShared ? decideTrail(data.mostShared) : undefined,
	};
};

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

export const handleBlocks: RequestHandler = ({ body }, res) => {
	try {
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
			body as BlocksRequest;

		const enhancedBlocks = enhanceBlocks(blocks, format);
		const html = blocksToHtml({
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
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleKeyEvents: RequestHandler = ({ body }, res) => {
	try {
		const { keyEvents, format, filterKeyEvents } =
			// The content if body is not checked
			body as KeyEventsRequest;

		const html = keyEventsToHtml({
			keyEvents,
			format,
			filterKeyEvents,
		});

		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleFront: RequestHandler = ({ body }, res) => {
	try {
		const front = enhanceFront(body);
		const html = frontToHtml({
			front,
		});
		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleFrontJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceFront(body));
};

export const handleNewslettersPage: RequestHandler = ({ body }, res) => {
	try {
		// TO DO - data validation function
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- in progress
		const model = body.model as NewslettersPageModel;
		const content = newslettersToHtml(model);
		res.status(200).send(content);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};
