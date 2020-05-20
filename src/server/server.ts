// ----- Imports ----- //

import path from 'path';
import express, {
    NextFunction,
    Request,
    Response as ExpressResponse,
} from 'express';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import fetch, { Response } from 'node-fetch';

import Page from 'components/shared/page';
import { getConfigValue } from 'server/ssmConfig';
import { capiEndpoint } from 'capi';
import { logger } from 'logger';
import { App, Stack, Stage } from './appIdentity';
import { getMappedAssetLocation } from './assets';
import { response } from './liveblogResponse';
import { mapiDecoder, capiDecoder, errorDecoder } from 'server/decoders';
import { Result, Ok, Err } from 'types/result';
import { IContent as Content } from 'mapiThriftModels/Content';


// ----- Setup ----- //

const getAssetLocation: (assetName: string) => string = getMappedAssetLocation();
const defaultId =
    'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const port = 3040;


// ----- Functions ----- //

function getPrefetchHeader(resources: string[]): string {
    return resources.reduce((linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`, '');
}

const capiRequest = (articleId: string) => (key: string): Promise<Response> =>
    fetch(capiEndpoint(articleId, key));

const parseCapiResponse = (articleId: string) =>
    async (capiResponse: Response): Promise<Result<number, Content>> => {
    const buffer = await capiResponse.buffer();
        
    switch (capiResponse.status) {
        case 200: {
            const response = capiDecoder(buffer);

            if (response.content === undefined) {
                logger.error(`CAPI returned a 200 for ${articleId}, but didn't give me any content`);
                return new Err(500);
            }

            return new Ok(response.content);
        }

        case 404:
            logger.warn(`CAPI says that it doesn't recognise this resource: ${articleId}`);

            return new Err(404);

        default: {
            const response = errorDecoder(buffer);

            logger.error(`I received a ${status} code from CAPI with the message: ${response.message} for resource ${capiResponse.url}`);
            return new Err(500);
        }
    }
}

const askCapiFor = (articleId: string): Promise<Result<number, Content>> =>
    getConfigValue<string>('capi.key')
        .then(capiRequest(articleId))
        .then(parseCapiResponse(articleId));

async function serveArticlePost(
    { body }: Request,
    res: ExpressResponse,
    next: NextFunction,
): Promise<void> {
    try {
        const content = mapiDecoder(body);
        const imageSalt = await getConfigValue<string>('apis.img.salt');

        const { resources, element } = Page({ content, imageSalt, getAssetLocation });
        const html = renderToString(element);
        res.set('Link', getPrefetchHeader(resources));
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
        // mock liveblog content from mapi
        if (req.query.date || req.query.filter) {
            res.json(response);
        }
        const articleId = req.params[ 0 ] || defaultId;
        const imageSalt = await getConfigValue<string>('apis.img.salt');
        const capiContent = await askCapiFor(articleId);

        capiContent.either(
            errorStatus => { res.sendStatus(errorStatus) },
            content => {
                const {
                    resources,
                    element,
                    hydrationProps,
                } = Page({ content, imageSalt, getAssetLocation });
                res.set('Link', getPrefetchHeader(resources));
                res.write('<!DOCTYPE html>');
                res.write('<meta charset="UTF-8" />');
                res.write(`<script id="hydrationProps" type="application/json">${JSON.stringify(hydrationProps)}</script>`);
                res.write(renderToString(element));
                res.end();
            },
        )
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
