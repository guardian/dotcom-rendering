import type express from 'express';
import { Article as ExampleArticle } from '../../../fixtures/generated/articles/Article';
import { extractNAV } from '../../model/extract-nav';
import { document } from './document';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { validateAsCAPIType } from '../../model/validate';
import { extract as extractGA } from '../../model/extract-ga';
import { blocksToHtml } from './blocksToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';

function enhancePinnedPost(format: CAPIFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

export const renderArticle = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const data = validateAsCAPIType(body);
		const CAPI = {
			...data,
			blocks: enhanceBlocks(data.blocks, data.format),
			pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
			standfirst: enhanceStandfirst(data.standfirst),
		};
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
		const data = validateAsCAPIType(body);
		const CAPI = {
			...body,
			blocks: enhanceBlocks(data.blocks, data.format),
			pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
			standfirst: enhanceStandfirst(data.standfirst),
		} as CAPIType;
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
		const data = validateAsCAPIType(body);
		const CAPI = {
			...body,
			blocks: enhanceBlocks(data.blocks, data.format),
			pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
			standfirst: enhanceStandfirst(data.standfirst),
		} as CAPIType;

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
