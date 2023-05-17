import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { enhanceBlocks } from '../../model/enhanceBlocks';
import { enhanceCards } from '../../model/enhanceCards';
import { enhanceCollections } from '../../model/enhanceCollections';
import { enhanceCommercialProperties } from '../../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../../model/enhanceTableOfContents';
import {
	extractTrendingTopics,
	extractTrendingTopicsFomFront,
} from '../../model/extractTrendingTopics';
import { groupTrailsByDate } from '../../model/groupTrailsByDates';
import { getSpeedFromTrails } from '../../model/slowOrFastByTrails';
import {
	validateAsAllEditorialNewslettersPageType,
	validateAsArticleType,
	validateAsFrontType,
	validateAsIndexPageType,
} from '../../model/validate';
import { recordTypeAndPlatform } from '../../server/lib/logging-store';
import type { DCRFrontType, FEFrontType } from '../../types/front';
import type { FEArticleType } from '../../types/frontend';
import type { DCRIndexPageType, FEIndexPageType } from '../../types/indexPage';
import type { DCRNewslettersPageType } from '../../types/newslettersPage';
import { decideTrail } from '../lib/decideTrail';
import { allEditorialNewslettersPageToHtml } from './allEditorialNewslettersPageToHtml';
import { articleToHtml } from './articleToHtml';
import { blocksToHtml } from './blocksToHtml';
import { frontToHtml } from './frontToHtml';
import { indexPageToHtml } from './indexPageToHtml';
import { keyEventsToHtml } from './keyEventsToHtml';

function enhancePinnedPost(format: FEFormat, block?: Block) {
	return block ? enhanceBlocks([block], format)[0] : block;
}

export const enhanceArticleType = (body: unknown): FEArticleType => {
	const data = validateAsArticleType(body);

	const enhancedBlocks = enhanceBlocks(data.blocks, data.format, {
		promotedNewsletter: data.promotedNewsletter,
	});
	return {
		...data,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(data.format, data.pinnedPost),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.showTableOfContents
			? enhanceTableOfContents(data.format, enhancedBlocks)
			: undefined,
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
				data.pressedPage.frontProperties.onPageDescription,
			),
		},
		mostViewed: data.mostViewed.map((trail) => decideTrail(trail)),
		mostCommented: data.mostCommented
			? decideTrail(data.mostCommented)
			: undefined,
		mostShared: data.mostShared ? decideTrail(data.mostShared) : undefined,
		trendingTopics: extractTrendingTopicsFomFront(
			data.pressedPage.collections,
		),
	};
};

const enhanceIndexPage = (body: unknown): DCRIndexPageType => {
	const data: FEIndexPageType = validateAsIndexPageType(body);

	const enhancedCards = enhanceCards(data.contents);
	return {
		...data,
		tags: data.tags.tags,
		groupedTrails: groupTrailsByDate(enhancedCards),
		trendingTopics: extractTrendingTopics(data.contents),
		speed: getSpeedFromTrails(data.contents),
	};
};

export const handleArticle: RequestHandler = ({ body }, res) => {
	try {
		recordTypeAndPlatform('article', 'web');
		const article = enhanceArticleType(body);
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
		recordTypeAndPlatform('article', 'json');
		const article = enhanceArticleType(body);
		const resp = {
			data: {
				// TODO: We should rename this to 'article' or 'FEArticle', but first we need to investigate
				// where/if this is used.
				CAPIArticle: article,
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
		recordTypeAndPlatform('interactive', 'web');
		const article = enhanceArticleType(body);
		const resp = articleToHtml({
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
	recordTypeAndPlatform('keyEvents');
	try {
		const { keyEvents, format, filterKeyEvents } =
			// The content if body is not checked
			body as FEKeyEventsRequest;

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
	recordTypeAndPlatform('front');
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

export const handleIndexPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('indexPAge');
	try {
		const indexPage = enhanceIndexPage(body);
		const html = indexPageToHtml({
			indexPage,
		});
		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};

export const handleIndexPageJson: RequestHandler = ({ body }, res) => {
	res.json(enhanceIndexPage(body));
};

const enhanceAllEditorialNewslettersPage = (
	body: unknown,
): DCRNewslettersPageType => {
	const newsletterData = validateAsAllEditorialNewslettersPageType(body);
	return {
		...newsletterData,
	};
};

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	try {
		const newslettersPage = enhanceAllEditorialNewslettersPage(body);
		const html = allEditorialNewslettersPageToHtml({ newslettersPage });
		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};
