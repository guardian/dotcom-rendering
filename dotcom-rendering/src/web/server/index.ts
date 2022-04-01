import type express from 'express';
import Markov from 'markov-strings';
import { readFileSync } from 'fs';
import { Article as ExampleArticle } from '../../../fixtures/generated/articles/Article';
import { extractNAV } from '../../model/extract-nav';
import { document } from './document';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { validateAsCAPIType } from '../../model/validate';
import { extract as extractGA } from '../../model/extract-ga';
import { blocksToHtml } from './blocksToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';
import { frontToHtml } from './frontToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

const enhanceCAPIType = (body: Record<string, unknown>): CAPIType => {
	const data = validateAsCAPIType(body);
	const CAPI: CAPIType = {
		...data,
		blocks: enhanceBlocks(data.blocks, data.format),
		pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
	};
	return CAPI;
};

export const renderArticle = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const markov = new Markov({ stateSize: 1 });

		const array = readFileSync('articles.txt')
			.toString()
			.replace(/\r\n/g, '\n')
			.split('\n');

		markov.addData(array);

		const CAPI = enhanceCAPIType(body);

		CAPI.blocks[0].elements.forEach((block) => {
			if (
				block._type ===
				'model.dotcomrendering.pageElements.TextBlockElement'
			) {
				block.html = `<p>${
					markov.generate({
						maxTries: 100,
					}).string
				}</p>`;
			}
		});

		const resp = document({
			data: {
				CAPI,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
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
		const CAPI = enhanceCAPIType(body);
		const resp = {
			data: {
				CAPI,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
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
		const CAPI = enhanceCAPIType(body);
		const resp = document({
			data: {
				CAPI,
				site: 'frontend',
				page: 'Interactive',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
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

export const renderFront = (
	{ body, query }: express.Request,
	res: express.Response,
): void => {
	try {
		const html = frontToHtml({
			query,
			body,
		});
		res.status(200).send(html);
	} catch (e) {
		const message = e instanceof Error ? e.stack : 'Unknown Error';
		res.status(500).send(`<pre>${message}</pre>`);
	}
};
