import type express from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCollections } from '../../model/enhanceCollections';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import { validateAsCAPIType, validateAsFrontType } from '../../model/validate';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import type { CAPIArticleType } from '../../types/frontend';
import { articleToHtml } from './articleToHtml';
import { blocksToHtml } from './blocksToHtml';
import { frontToHtml } from './frontToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

const enhanceCAPIType = (body: unknown): CAPIArticleType => {
	const data = validateAsCAPIType(body);

	const enhancedBlocks = enhanceBlocks(
		data.blocks,
		data.format,
		data.promotedNewsletter,
	);

	const CAPIArticle: CAPIArticleType = {
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
		pressedPage: {
			...data.pressedPage,
			collections: enhanceCollections(
				data.pressedPage.collections,
				data.editionId,
				data.pageId,
			),
		},
	};
};

export const renderArticle = (
	{ body }: express.Request,
	res: express.Response,
): void => {
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

export const renderArticleJson = (
	{ body }: express.Request,
	res: express.Response,
): void => {
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

export const renderPerfTest = (
	req: express.Request,
	res: express.Response,
): void => {
	req.body = ExampleArticle;
	renderArticle(req, res);
};

export const renderInteractive = (
	{ body }: express.Request,
	res: express.Response,
): void => {
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

export const renderBlocks = (
	{ body }: { body: BlocksRequest },
	res: express.Response,
): void => {
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
		} = body;

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

export const renderKeyEvents = (
	{ body }: { body: KeyEventsRequest },
	res: express.Response,
): void => {
	try {
		const { keyEvents, format, filterKeyEvents } = body;

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

export const renderFront = (
	{ body }: express.Request,
	res: express.Response,
): void => {
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

export const renderFrontJson = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	res.json(enhanceFront(body));
};
