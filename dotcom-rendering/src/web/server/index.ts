import type express from 'express';
import { extractNAV } from '@root/src/model/extract-nav';
import { document } from '@root/src/web/server/document';
import { enhanceBlocks } from '@root/src/model/enhanceBlocks';
import { enhanceStandfirst } from '@root/src/model/enhanceStandfirst';
import { validateAsCAPIType } from '@root/src/model/validate';
import { extract as extractGA } from '@root/src/model/extract-ga';
import { Article as ExampleArticle } from '@root/fixtures/generated/articles/Article';
import { blocksToHtml } from './blocksToHtml';

export const renderArticle = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const data = validateAsCAPIType(body);
		const CAPI = {
			...data,
			blocks: enhanceBlocks(data.blocks, data.format),
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
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
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
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
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
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
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
		});

		res.status(200).send(html);
	} catch (e) {
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
	}
};
