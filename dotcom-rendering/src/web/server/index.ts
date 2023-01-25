import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCollections } from '../../model/enhanceCollections';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import { validateAsCAPIType, validateAsFrontType } from '../../model/validate';
import type { DCRArticleType } from '../../types/article';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import type { FEArticleType } from '../../types/frontend';
import { decideTrail } from '../lib/decideTrail';
import { articleToHtml } from './articleToHtml';
import { blocksToHtml } from './blocksToHtml';
import { frontToHtml } from './frontToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

const parseArticleData = (body: unknown): DCRArticleType => {
	const frontendData = validateAsCAPIType(body);

	const enhancedBlocks = enhanceBlocks(
		frontendData.blocks,
		frontendData.format,
		{
			promotedNewsletter: frontendData.promotedNewsletter,
		},
	);

	const enhancedFrontendData: FEArticleType = {
		...frontendData,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(
			frontendData.format,
			frontendData.pinnedPost,
		),
		standfirst: enhanceStandfirst(frontendData.standfirst),
		commercialProperties: enhanceCommercialProperties(
			frontendData.commercialProperties,
		),
		tableOfContents: frontendData.showTableOfContents
			? enhanceTableOfContents(frontendData.format, enhancedBlocks)
			: undefined,
	};

	return {
		frontendData: enhancedFrontendData,
		/* Frontend provided data */
		contributionsServiceUrl: frontendData.contributionsServiceUrl,
		pageFooter: frontendData.pageFooter,
		linkedData: frontendData.linkedData,
		/* 'Parsed' CAPI data */
		webUrl: frontendData.capiContent.webUrl,
	};
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
		const article = parseArticleData(body);
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
		const CAPIArticle = parseArticleData(body);
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
		const article = parseArticleData(body);
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
