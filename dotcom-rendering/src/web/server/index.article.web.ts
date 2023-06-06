import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import { validateAsArticleType } from '../../model/validate';
import { recordTypeAndPlatform } from '../../server/lib/logging-store';
import type { DCRArticleType } from '../../types/article';
import type { FEArticleBadgeType } from '../../types/badge';
import type { FEArticleType, FEArticleType } from '../../types/frontend';
import {
	renderBlocks,
	renderHtml,
	renderKeyEvents,
} from './render.article.web';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

const enhancePinnedPost = (format: FEFormat, block?: Block) => {
	return block ? enhanceBlocks([block], format)[0] : block;
};

const enhanceBadge = (badge?: FEArticleBadgeType) =>
	badge
		? {
				...badge,
				enhanced: {
					href: `/${badge.seriesTag}`,
					imageSrc: badge.imageUrl,
				},
		  }
		: undefined;

const parseArticleData = (body: unknown): DCRArticleType => {
	const frontendData = validateAsArticleType(body);

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
		badge: enhanceBadge(frontendData.badge),
		tableOfContents: frontendData.showTableOfContents
			? enhanceTableOfContents(frontendData.format, enhancedBlocks)
			: undefined,
	};

	return {
		frontendData: enhancedFrontendData,
		/* Frontend provided data */
		contributionsServiceUrl: frontendData.contributionsServiceUrl,
		pageFooter: frontendData.pageFooter,
		nav: frontendData.nav,
		linkedData: frontendData.linkedData,
		config: frontendData.config,
		isAdFreeUser: frontendData.isAdFreeUser,
		slotMachineFlags: frontendData.slotMachineFlags,
		commercialProperties: frontendData.commercialProperties,
		editionId: frontendData.editionId,
		/* 'Parsed' CAPI data */
		webUrl: frontendData.capiContent.webUrl,
	};
};

export const handleArticle: RequestHandler = ({ body }, res) => {
	try {
		recordTypeAndPlatform('article', 'web');
		const article = parseArticleData(body);
		const resp = renderHtml({
			article,
		});

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleArticleJson: RequestHandler = ({ body }, res) => {
	try {
		recordTypeAndPlatform('article', 'json');
		const CAPIArticle = parseArticleData(body);
		const resp = {
			data: {
				// TODO: We should rename this to 'article' or 'FEArticle', but first we need to investigate
				// where/if this is used.
				CAPIArticle,
			},
		};

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleArticlePerfTest: RequestHandler = (req, res, next) => {
	req.body = ExampleArticle;
	handleArticle(req, res, next);
};

export const handleInteractive: RequestHandler = ({ body }, res) => {
	try {
		recordTypeAndPlatform('interactive', 'web');
		const article = parseArticleData(body);
		const resp = renderHtml({
			article,
		});

		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleBlocks: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('blocks');
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
			body as FEBlocksRequest;

		const enhancedBlocks = enhanceBlocks(blocks, format);
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
			keywordIds,
		});

		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleKeyEvents: RequestHandler = ({ body }, res) => {
	// TODO: This endpoint is unused - we should consider removing it, talk to Olly 24/05/2023

	recordTypeAndPlatform('keyEvents');
	try {
		const { keyEvents, format, filterKeyEvents } =
			// The content if body is not checked
			body as FEKeyEventsRequest;

		const html = renderKeyEvents({
			keyEvents,
			format,
			filterKeyEvents,
		});

		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};
