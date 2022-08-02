import type express from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCollections } from '../../model/enhanceCollections';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { extract as extractGA } from '../../model/extract-ga';
import { extractNAV } from '../../model/extract-nav';
import { validateAsCAPIType, validateAsFrontType } from '../../model/validate';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import { articleToHtml } from './articleToHtml';
import { blocksToHtml } from './blocksToHtml';
import { frontToHtml } from './frontToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';
import { onwardsToHtml } from './onwardsToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

const enhanceCAPIType = (body: unknown): CAPIArticleType => {
	const data = validateAsCAPIType(body);
	const CAPIArticle: CAPIArticleType = {
		...data,
		blocks: enhanceBlocks(data.blocks, data.format),
		pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
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
			collections: enhanceCollections(data.pressedPage.collections),
		},
	};
};

export const renderArticle = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const CAPIArticle = enhanceCAPIType(body);
		const resp = articleToHtml({
			data: {
				CAPIArticle,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPIArticle.nav),
				GA: extractGA(CAPIArticle),
				linkedData: CAPIArticle.linkedData,
			},
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
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPIArticle.nav),
				GA: extractGA(CAPIArticle),
				linkedData: CAPIArticle.linkedData,
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
		const CAPIArticle = enhanceCAPIType(body);
		const resp = articleToHtml({
			data: {
				CAPIArticle,
				site: 'frontend',
				page: 'Interactive',
				NAV: extractNAV(CAPIArticle.nav),
				GA: extractGA(CAPIArticle),
				linkedData: CAPIArticle.linkedData,
			},
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

export const renderOnwards = (
	{ body }: { body: CAPIOnwardsType },
	res: express.Response,
): void => {
	try {
		const {
			heading,
			description,
			url,
			ophanComponentName,
			trails,
			format,
			isCuratedContent,
		} = body;

		const html = onwardsToHtml({
			heading,
			description,
			url,
			ophanComponentName,
			trails,
			format,
			isCuratedContent,
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
			NAV: extractNAV(front.nav),
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
