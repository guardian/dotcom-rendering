import type express from 'express';
import { decideContainerPalette } from 'src/model/decideContainerPalette';
import { enhanceCards } from 'src/model/enhanceCards';
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
import { showMoreToHtml } from './showMoreToHtml';

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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
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
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
	}
};

export const renderFrontJson = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	res.json(enhanceFront(body));
};

/**
 * Handler for the `ShowMore/` endpoint. Receives a set of
 * cards and a collection config, renders it, and send the resulting
 * html back to Frontend in the format: `{ html: <the html string> }`
 */
export const renderShowMore = (
	{ body }: { body: ShowMoreRequest },
	res: express.Response,
): void => {
	try {
		const { cards, config } = body;

		const dcrContainerPalette = decideContainerPalette(
			config.metadata?.map((meta) => meta.type),
		);
		const dcrTrails = enhanceCards(cards, dcrContainerPalette);

		const html = showMoreToHtml({
			cards: dcrTrails,
			containerPalette: dcrContainerPalette,
		});

		res.status(200).send({ html });
	} catch (e) {
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send({ html: `<pre>${message}</pre>` });
	}
};
