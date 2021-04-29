// ----- Imports ----- //

import 'source-map-support/register'; // activating the source map support
import path from 'path';
import type { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Option, Result } from '@guardian/types';
import { either, err, map, ok, OptionKind, withDefault } from '@guardian/types';
import bodyParser from 'body-parser';
import { capiEndpoint } from 'capi';
import compression from 'compression';
import type {
	Response as ExpressResponse,
	NextFunction,
	Request,
} from 'express';
import express from 'express';
import { MainMediaKind } from 'headerMedia';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { pipe2, toArray } from 'lib';
import { logger } from 'logger';
import type { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { parseRelatedContent } from 'relatedContent';
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

const getAssetLocation: (
	assetName: string,
) => string = getMappedAssetLocation();
const defaultId =
	'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const port = 3040;
type CapiReturn = Promise<Result<number, [Content, RelatedContent]>>;

// ----- Functions ----- //

function getPrefetchHeader(resources: string[]): string {
	return resources.reduce(
		(linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`,
		'',
	);
}

const capiRequest = (articleId: string) => (key: string): Promise<Response> =>
	fetch(capiEndpoint(articleId, key));

const parseCapiResponse = (articleId: string) => async (
	capiResponse: Response,
): CapiReturn => {
	const buffer = await capiResponse.buffer();

	switch (capiResponse.status) {
		case 200: {
			const response = await capiDecoder(buffer);

			if (response.content === undefined) {
				logger.error(
					`CAPI returned a 200 for ${articleId}, but didn't give me any content`,
				);
				return err(500);
			}

			if (response.relatedContent === undefined) {
				logger.error(
					`Unable to fetch related content for ${articleId}`,
				);
				return err(500);
			}

			const relatedContent = parseRelatedContent(response.relatedContent);
			return ok([response.content, relatedContent]);
		}

		case 404:
			logger.warn(
				`CAPI says that it doesn't recognise this resource: ${articleId}`,
			);

			return err(404);

		default: {
			const response = await errorDecoder(buffer);

			logger.error(
				`I received a ${status} code from CAPI with the message: ${response.message} for resource ${capiResponse.url}`,
			);
			return err(500);
		}
	}
};

const askCapiFor = (articleId: string): CapiReturn =>
	getConfigValue('capi.key').then((key) => {
		if (key === undefined) {
			logger.error('Could not get CAPI key');

			return err(500);
		}

		return capiRequest(articleId)(key).then(parseCapiResponse(articleId));
	});

function resourceList(script: Option<string>): string[] {
	const emptyList: string[] = [];
	return pipe2(script, map(toArray), withDefault(emptyList));
}

async function serveArticle(
	request: RenderingRequest,
	res: ExpressResponse,
	isEditions = false,
): Promise<void> {
	const imageSalt = await getConfigValue('apis.img.salt');

	if (imageSalt === undefined) {
		throw new Error('Could not get image salt');
	}

	const renderer = isEditions ? renderEditions : render;
	const { html, clientScript } = renderer(
		imageSalt,
		request,
		getAssetLocation,
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
	const item = fromCapi({ docParser, salt: imageSalt })(renderingRequest);

	const image =
		item.mainMedia.kind === OptionKind.Some &&
		item.mainMedia.value.kind === MainMediaKind.Image
			? {
					image: item.mainMedia.value.image.src,
			  }
			: {};

	const response = { pillar: renderingRequest.content.pillarName, ...image };

	res.status(200).json(response);
}

async function serveArticlePost(
	req: Request,
	res: ExpressResponse,
	next: NextFunction,
): Promise<void> {
	try {
		const renderingRequest = await mapiDecoder(req.body);
		const richLinkDetails = req.query.richlink === '';
		const isEditions = req.query.editions === '';

		if (richLinkDetails) {
			void serveRichLinkDetails(renderingRequest, res);
		} else {
			void serveArticle(renderingRequest, res, isEditions);
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
		const renderingRequest: RenderingRequest = {
			content,
		};
		void serveArticle(renderingRequest, res, true);
	} catch (e) {
		logger.error('This error occurred', e);
		next(e);
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

		either(
			(errorStatus: number) => {
				res.sendStatus(errorStatus);
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
					footballContent,
				};

				const richLinkDetails = req.query.richlink === '';

				if (richLinkDetails) {
					void serveRichLinkDetails(mockedRenderingRequest, res);
				} else {
					void serveArticle(mockedRenderingRequest, res, isEditions);
				}
			},
		)(capiContent);
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

app.use(bodyParser.raw({ limit: '50mb' }));
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

app.get('/rendered-items/*', bodyParser.raw(), serveArticleGet);
app.get('/*', bodyParser.raw(), serveArticleGet);

app.post('/article', bodyParser.raw(), serveArticlePost);

app.post('/editions-article', bodyParser.raw(), serveEditionsArticlePost);

app.listen(port, () => {
	if (process.env.NODE_ENV === 'production') {
		logger.info(`Server listening on port ${port}!`);
	} else {
		logger.info(`Webpack dev server is listening on port 8080`);
	}
});
