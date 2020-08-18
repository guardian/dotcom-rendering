// ----- Imports ----- //

import 'source-map-support/register'; // activating the source map support

import path from 'path';
import express, {
    NextFunction,
    Request,
    Response as ExpressResponse,
} from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import fetch, { Response } from 'node-fetch';

import { render } from 'server/page';
import { getConfigValue } from 'server/ssmConfig';
import { capiEndpoint, isFeature, isReview, isAnalysis, articleMainImage } from 'capi';
import { logger } from 'logger';
import { App, Stack, Stage } from './appIdentity';
import { getMappedAssetLocation } from './assets';
import { mapiDecoder, capiDecoder, errorDecoder } from 'server/decoders';
import { Result, ok, err, either } from '@guardian/types/result';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import {
    newBlocksSince,
    updatedBlocksSince,
    recentBlocks,
    toSerialisable as serialiseLiveBlocks,
} from 'liveBlock';
import { JSDOM } from 'jsdom';
import JsonSerialisable from 'types/jsonSerialisable';
import { parseDate, Param } from 'server/paramParser';
import { Context } from 'types/parserContext';
import { toArray, pipe2 } from 'lib';
import { Option, map, withDefault, andThen, OptionKind } from '@guardian/types/option';
import { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import { Image } from '@guardian/apps-rendering-api-models/image';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { isAdvertisementFeature, isLive, isComment, isAudio, isVideo, isGallery } from 'item';
import { parseImage } from 'image';

// ----- Types ----- //

interface LiveUpdates {
    newBlocks: JsonSerialisable;
    updatedBlocks: JsonSerialisable;
}


// ----- Setup ----- //

const getAssetLocation: (assetName: string) => string = getMappedAssetLocation();
const defaultId =
    'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const port = 3040;
const docParser = JSDOM.fragment.bind(null);


// ----- Functions ----- //

function getPrefetchHeader(resources: string[]): string {
    return resources.reduce((linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`, '');
}

const capiRequest = (articleId: string) => (key: string): Promise<Response> =>
    fetch(capiEndpoint(articleId, key));

const parseRelatedItemType = (content: Content): RelatedItemType => {
    const { tags } = content;
    if (isFeature(content)) {
        return RelatedItemType.FEATURE
      } else if (isLive(tags)) {
        return RelatedItemType.LIVE
      } else if (isReview(content)) {
        return RelatedItemType.REVIEW
      } else if (isAnalysis(content)) {
        return RelatedItemType.ANALYSIS
      } else if (isComment(tags)) {
        return RelatedItemType.COMMENT
      } else if (isAudio(tags)) {
        return RelatedItemType.AUDIO
      } else if (isVideo(tags)) {
        return RelatedItemType.VIDEO
      } else if (isGallery(tags)) {
        return RelatedItemType.GALLERY
      } else if (isAdvertisementFeature(tags)) {
        return RelatedItemType.ADVERTISEMENT_FEATURE
      } else {
        return RelatedItemType.ARTICLE
      }
}

const parseHeaderImage = (content: Content, context: Context): Image | undefined => {
        const optionalImage = pipe2(
            articleMainImage(content),
            andThen(parseImage(context)),
            map(image => ({
                url: image.src,
                height: image.height,
                width: image.width,
            }),
        ));

        if (optionalImage.kind === OptionKind.Some) {
            return optionalImage.value;
        } else {
            return undefined;
        }
}

const parseRelatedContent = (relatedContent: Content[], context: Context): RelatedContent => {
    return {
        title: "Related Stories",
        relatedItems: relatedContent.map(content => {
            return {
                title: content.webTitle ?? "",
                lastModified: content.fields?.lastModified,
                headerImage: parseHeaderImage(content, context),
                link: `/${content.id}`,
                type: parseRelatedItemType(content),
                pillar: {
                    id: content.pillarId ?? "pillar/news",
                    name: content.pillarName ?? "news",
                    sectionIds: []
                },
                mediaDuration: "100",
                starRating: content.fields?.starRating?.toString() ?? undefined
            }
        }).slice(0, 4)
    }
}

const parseCapiResponse = (articleId: string, context: Context) =>
    async (capiResponse: Response): Promise<Result<number, [Content, RelatedContent]>> => {
    const buffer = await capiResponse.buffer();
        
    switch (capiResponse.status) {
        case 200: {
            const response = await capiDecoder(buffer);

            if (response.content === undefined) {
                logger.error(`CAPI returned a 200 for ${articleId}, but didn't give me any content`);
                return err(500);
            }

            if (response.relatedContent === undefined) {
                logger.error(`Unable to fetch related content for ${articleId}`);
                return err(500);
            }

            const relatedContent = parseRelatedContent(response.relatedContent, context)
            return ok([response.content, relatedContent]);
        }

        case 404:
            logger.warn(`CAPI says that it doesn't recognise this resource: ${articleId}`);

            return err(404);

        default: {
            const response = await errorDecoder(buffer);

            logger.error(`I received a ${status} code from CAPI with the message: ${response.message} for resource ${capiResponse.url}`);
            return err(500);
        }
    }
}

const askCapiFor = (articleId: string, context: Context): Promise<Result<number, [Content, RelatedContent]>> =>
    getConfigValue<string>('capi.key')
        .then(capiRequest(articleId))
        .then(parseCapiResponse(articleId, context));

function resourceList(script: Option<string>): string[] {
    const emptyList: string[] = [];

    return pipe2(script, map(toArray), withDefault(emptyList));
}

async function serveArticlePost(
    { body }: Request,
    res: ExpressResponse,
    next: NextFunction,
): Promise<void> {
    try {
        const renderingRequest = await mapiDecoder(body);
        const imageSalt = await getConfigValue<string>('apis.img.salt');

        const { html, clientScript } = render(imageSalt, renderingRequest, getAssetLocation);
        res.set('Link', getPrefetchHeader(resourceList(clientScript)));
        res.write('<!DOCTYPE html>');
        res.write(html);
        res.end();
    } catch (e) {
        logger.error(`This error occurred`, e);
        next(e);
    }
}

async function serveArticle(req: Request, res: ExpressResponse): Promise<void> {
    try {
        const articleId = req.params[0] || defaultId;
        const imageSalt = await getConfigValue<string>('apis.img.salt');
        const context = { salt: imageSalt, docParser };
        const capiContent = await askCapiFor(articleId, context);

        either(
            (errorStatus: number) => { res.sendStatus(errorStatus) },
            ([content, relatedContent]: [Content, RelatedContent]) => {
                const mockedRenderingRequest: RenderingRequest = {
                    content,
                    targetingParams: {
                        "co": "Jane Smith",
                        "k": "potato,tomato,avocado"
                    },
                    commentCount: 30,
                    relatedContent
                };
                const { html, clientScript } = render(
                    imageSalt,
                    mockedRenderingRequest,
                    getAssetLocation
                );

                res.set('Link', getPrefetchHeader(resourceList(clientScript)));
                res.write('<!DOCTYPE html>');
                res.write('<meta charset="UTF-8" />');
                res.write(html);
                res.end();
            },
        )(capiContent);
    } catch (e) {
        logger.error(`This error occurred`, e);
        res.sendStatus(500);
    }
}

const liveBlockUpdates = (since: Date, content: Content, context: Context): LiveUpdates => ({
    newBlocks: serialiseLiveBlocks(newBlocksSince(since)(content)(context)),
    updatedBlocks: serialiseLiveBlocks(updatedBlocksSince(since)(content)(context)),
});

const recentLiveBlocks = (content: Content, context: Context): LiveUpdates => ({
    newBlocks: serialiseLiveBlocks(recentBlocks(7)(content)(context)),
    updatedBlocks: [],
});

async function liveBlocks(req: Request, res: ExpressResponse): Promise<void> {
    try {
        const articleId = req.params.articleId || defaultId;
        const imageSalt = await getConfigValue<string>('apis.img.salt');
        const context = { salt: imageSalt, docParser };
        const since = parseDate(req.query.since);

        if (since.kind === Param.Invalid) {
            logger.warn(`I couldn't get liveblog updates for: ${articleId}, I didn't understand this timestamp: ${since}`);
            return res.sendStatus(400).end();
        }

        const capiContent = await askCapiFor(articleId, context);

        either(
            (errorStatus: number) => { res.sendStatus(errorStatus) },
            ([content, relatedContent]: [Content, RelatedContent]) => {
                if (content.type !== ContentType.LIVEBLOG) {
                    logger.warn(`I was asked to provide updates on something that wasn't a liveblog: ${articleId}`);
                    res.sendStatus(400);
                } else if (since.kind === Param.None) {
                    res.status(200).json(recentLiveBlocks(content, context));
                } else {
                    res.status(200).json(liveBlockUpdates(since.value, content, context));
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

if (process.env.NODE_ENV === "production") {
    logger.info("Node is running in production mode");
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
        logger.info(`HTTP ${request.method} ${request.path} returned ${response.statusCode} in ${duration}ms`);
    });

    next();
});

app.get('/:articleId(*)/live-blocks', liveBlocks);

app.get('/healthcheck', (_req, res) => res.send("Ok"));

app.get('/favicon.ico', (_, res) => res.status(404).end());

app.get('/*', bodyParser.raw(), serveArticle);

app.post('/article', bodyParser.raw(), serveArticlePost);

app.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
        logger.info(`Server listening on port ${port}!`);
    } else {
        logger.info(`Webpack dev server is listening on port 8080`);
    }
});
