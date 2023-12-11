// ----- Imports ----- //

import path from 'path';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import type { Option } from '../../vendor/@guardian/types/index';
import {
	fromNullable,
	map,
	none,
	OptionKind,
	some,
	withDefault,
} from '../../vendor/@guardian/types/index';
import {
	capiEndpoint,
	getMockCampaigns,
	getMockPromotedNewsletter,
} from 'capi';
import compression from 'compression';
import type {
	Response as ExpressResponse,
	NextFunction,
	Request,
} from 'express';
import express from 'express';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { pipe, resultToNullable, toArray } from 'lib';
import { logger } from 'logger';
import { MainMediaKind } from 'mainMedia';
import type { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { parseRelatedContent } from 'relatedContent';
import { Result } from 'result';
import {
	capiContentDecoder,
	capiDecoder,
	errorDecoder,
	mapiDecoder,
} from 'server/decoders';
import { render as renderEditions } from 'server/editionsPage';
import { render } from 'server/page';
import { getConfigValue } from 'server/ssmConfig';
import { App, Stack, Stage } from './appIdentity';
import { getMappedAssetLocation } from './assets';
import { getFootballContent } from './footballContent';

// ----- Setup ----- //

const getAssetLocation: (assetName: string) => string =
	getMappedAssetLocation();
const defaultId =
	'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const port = 3040;
type CapiReturn = Promise<Result<number, [Content, RelatedContent]>>;

// ----- Functions ----- //

function themeFromUnknown(a: unknown): Option<ArticleTheme> {
	switch (a) {
		case '0':
			return some(ArticlePillar.News);
		case '1':
			return some(ArticlePillar.Opinion);
		case '2':
			return some(ArticlePillar.Sport);
		case '3':
			return some(ArticlePillar.Culture);
		case '4':
			return some(ArticlePillar.Lifestyle);
		case '5':
			return some(ArticleSpecial.SpecialReport);
		case '6':
			return some(ArticleSpecial.Labs);
		default:
			return none;
	}
}

function getPrefetchHeader(resources: string[]): string {
	return resources.reduce(
		(linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`,
		'',
	);
}

const capiRequest =
	(articleId: string) =>
	(key: string): Promise<Response> =>
		fetch(capiEndpoint(articleId, key));

const parseCapiResponse =
	(articleId: string) =>
	async (capiResponse: Response): CapiReturn => {
		const buffer = await capiResponse.buffer();

		switch (capiResponse.status) {
			case 200: {
				const response = await capiDecoder(buffer);

				if (response.content === undefined) {
					logger.error(
						`CAPI returned a 200 for ${articleId}, but didn't give me any content`,
					);
					return Result.err(500);
				}

				if (response.relatedContent === undefined) {
					logger.error(
						`Unable to fetch related content for ${articleId}`,
					);
					return Result.err(500);
				}

				const relatedContent = parseRelatedContent(
					response.relatedContent,
				);
				return Result.ok([response.content, relatedContent]);
			}

			case 404:
				logger.warn(
					`CAPI says that it doesn't recognise this resource: ${articleId}`,
				);

				return Result.err(404);

			default: {
				const response = await errorDecoder(buffer);

				logger.error(
					`I received a ${status} code from CAPI with the message: ${response.message} for resource ${capiResponse.url}`,
				);
				return Result.err(500);
			}
		}
	};

const askCapiFor = (articleId: string): CapiReturn =>
	getConfigValue('capi.key').then((key) => {
		if (key === undefined) {
			logger.error('Could not get CAPI key');

			return Result.err(500);
		}

		return capiRequest(articleId)(key).then(parseCapiResponse(articleId));
	});

function resourceList(script: Option<string>): string[] {
	const emptyList: string[] = [];
	return pipe(script, map(toArray), withDefault(emptyList));
}

function serveArticleSwitch(
	renderingRequest: RenderingRequest,
	res: ExpressResponse,
	isEditions: boolean,
	themeOverride: Option<ArticleTheme>,
	page: Option<string>,
): Promise<void> {
	if (isEditions) {
		return serveEditionsArticle(renderingRequest, res, themeOverride);
	}
	return serveArticle(renderingRequest, res, page);
}

async function serveArticle(
	request: RenderingRequest,
	res: ExpressResponse,
	page: Option<string>,
): Promise<void> {
	const imageSalt = await getConfigValue('apis.img.salt');

	if (imageSalt === undefined) {
		throw new Error('Could not get image salt');
	}

	const { html, clientScript } = render(
		imageSalt,
		request,
		getAssetLocation,
		page,
	);

	res.set('Link', getPrefetchHeader(resourceList(clientScript)));
	res.write(html);
	res.end();
}

async function serveEditionsArticle(
	request: RenderingRequest,
	res: ExpressResponse,
	themeOverride: Option<ArticleTheme>,
): Promise<void> {
	const imageSalt = await getConfigValue('apis.img.salt');

	if (imageSalt === undefined) {
		throw new Error('Could not get image salt');
	}

	const { html, clientScript } = renderEditions(
		imageSalt,
		request,
		res,
		getAssetLocation,
		themeOverride,
	);

	res.set('Link', getPrefetchHeader(resourceList(clientScript)));
	res.write(html);
	res.end();
}

async function serveRichLinkDetails(
	renderingRequest: RenderingRequest,
	res: ExpressResponse,
): Promise<void> {
	const imageSalt = await getConfigValue('apis.img.salt');

	if (imageSalt === undefined) {
		throw new Error('Could not get image salt');
	}

	const docParser = JSDOM.fragment.bind(null);
	const item = fromCapi({ docParser, salt: imageSalt })(
		renderingRequest,
		none,
	);

	const image =
		item.mainMedia.kind === OptionKind.Some &&
		item.mainMedia.value.kind === MainMediaKind.Image
			? {
					image: item.mainMedia.value.image.src,
			  }
			: {};

	// We need this for legacy reasons where Culture pillar used be Arts
	// We use this pillar sometimes for styling reasons like the rich link
	const pillar = renderingRequest.content.pillarName?.replace(
		'Arts',
		'Culture',
	);

	const response = { pillar, ...image };

	res.status(200).json(response);
}

export const getPageId = (query: qs.ParsedQs): Option<string> => {
	if (typeof query.page === 'string') {
		return fromNullable(query.page.split('with:block-')[1]);
	}
	return none;
};

async function serveArticlePost(
	req: Request,
	res: ExpressResponse,
	next: NextFunction,
): Promise<void> {
	try {
		const renderingRequest = await mapiDecoder(req.body);
		const richLinkDetails = req.query.richlink === '';
		const isEditions = req.query.editions === '';

		const themeOverride = themeFromUnknown(req.query.theme);

		if (richLinkDetails) {
			await serveRichLinkDetails(renderingRequest, res);
		} else {
			const page: Option<string> = getPageId(req.query);
			await serveArticleSwitch(
				renderingRequest,
				res,
				isEditions,
				themeOverride,
				page,
			);
		}
	} catch (e) {
		logger.error(`This error occurred`, e);
		next(e);
	}
}

async function serveEditionsArticlePost(
	req: Request,
	res: ExpressResponse,
	next: NextFunction,
): Promise<void> {
	try {
		// The "req.body" should contain a 'Content' object which fetched by the
		// Edition backend from the capi
		const content = await capiContentDecoder(req.body);
		const footballContent = await getFootballContent(content);
		const renderingRequest: RenderingRequest = {
			content,
			footballContent: resultToNullable(footballContent),
		};
		const themeOverride = themeFromUnknown(req.query.theme);

		await serveEditionsArticle(renderingRequest, res, themeOverride);
	} catch (e) {
		logger.error('This error occurred', e);
		next(e);
	}
}

function editionFromString(editionString: string): Edition {
	switch (editionString) {
		case 'us':
			return Edition.US;
		case 'au':
			return Edition.AU;
		case 'international':
			return Edition.INTERNATIONAL;
		case 'europe':
			return Edition.EUROPE;
		case 'uk':
		default:
			return Edition.UK;
	}
}

async function serveArticleGet(
	req: Request,
	res: ExpressResponse,
): Promise<void> {
	try {
		const articleId = req.params[0] || defaultId;
		const isEditions = req.query.editions === '';
		const capiContent = await askCapiFor(articleId);
		const edition = editionFromString(req.params.edition);

		await capiContent.either(
			(errorStatus: number) => {
				res.sendStatus(errorStatus);
				return Promise.resolve();
			},
			async ([content, relatedContent]: [Content, RelatedContent]) => {
				const footballContent = await getFootballContent(content);

				const mockedRenderingRequest: RenderingRequest = {
					content,
					targetingParams: {
						co: 'Jane Smith',
						k: 'potato,tomato,avocado',
					},
					commentCount: 30,
					relatedContent,
					footballContent: resultToNullable(footballContent),
					edition,
					promotedNewsletter: getMockPromotedNewsletter(content),
					campaigns: getMockCampaigns(content),
				};

				const richLinkDetails = req.query.richlink === '';
				const themeOverride = themeFromUnknown(req.query.theme);

				if (richLinkDetails) {
					await serveRichLinkDetails(mockedRenderingRequest, res);
				} else {
					const page: Option<string> = getPageId(req.query);
					await serveArticleSwitch(
						mockedRenderingRequest,
						res,
						isEditions,
						themeOverride,
						page,
					);
				}
			},
		);
	} catch (e) {
		logger.error(`This error occurred`, e);
		res.sendStatus(500);
	}
}

// ----- App ----- //

logger.info(`Starting ${App} in ${Stage} for the stack ${Stack}`);

if (process.env.NODE_ENV === 'production') {
	logger.info('Node is running in production mode');
}

const app = express();

app.use(express.raw({ limit: '50mb' }));
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));
app.use(compression());

app.all('*', (request, response, next) => {
	const start = Date.now();

	response.once('finish', () => {
		const duration = Date.now() - start;
		logger.info(
			`HTTP ${request.method} ${request.path} returned ${response.statusCode} in ${duration}ms`,
		);
	});

	next();
});

app.get('/healthcheck', (_req, res) => res.send('Ok'));

app.get('/favicon.ico', (_, res) => res.status(404).end());
app.get('/fontSize.css', (_, res) => res.status(404).end());

/**
To enable testing in the mobile device emulators,
this route handler adds compatability with DCR's route for apps articles.
The DCR route follows the pattern:
/AppsArticle/https://www.theguardian.com/cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked
*/
app.get(
	'/AppsArticle/*',
	express.raw(),
	(req, res, next) => {
		const contentWebUrl = req.params[0];
		const articleId = new URL(contentWebUrl).pathname;
		req.params = {
			0: articleId,
		};

		next();
	},
	serveArticleGet,
);

app.get(
	'/:edition(uk|us|au|europe|international)?/rendered-items/*',
	express.raw(),
	serveArticleGet,
);
app.get(
	'/:edition(uk|us|au|europe|international)?/*',
	express.raw(),
	serveArticleGet,
);

app.post('/article', express.raw(), serveArticlePost);

app.post('/editions-article', express.raw(), serveEditionsArticlePost);

app.listen(port, () => {
	if (process.env.NODE_ENV === 'production') {
		logger.info(`Server listening on port ${port}!`);
	} else {
		logger.info(`Webpack dev server is listening on port 3030`);
	}
});
