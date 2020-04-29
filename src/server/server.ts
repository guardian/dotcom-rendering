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
import fetch from 'node-fetch';

import { getConfigValue } from 'server/ssmConfig';
import { CapiError, capiEndpoint, getContent } from 'capi';
import Page from 'components/shared/page';
import { logger } from 'logger';
import { App, Stack, Stage } from './appIdentity';
import { getMappedAssetLocation } from './assets';
import { response } from './liveblogResponse';
import { mapiDecoder, capiDecoder, errorDecoder } from 'server/decoders';


// ----- Setup ----- //

const getAssetLocation: (assetName: string) => string = getMappedAssetLocation();
const defaultId =
    'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const port = 3040;


// ----- Functions ----- //

function getPrefetchHeader(resources: string[]): string {
    return resources.reduce((linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`, '');
}

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
        const key = await getConfigValue<string>("capi.key");
        const imageSalt = await getConfigValue<string>('apis.img.salt');
        const capiResponse = await fetch(capiEndpoint(articleId, key));
        const buffer = await capiResponse.buffer();
        
        if (capiResponse.status === 200) {
            const response = capiDecoder(buffer);

            if (response.content) {
                getContent(capiResponse.status, articleId, response.content).either(
                    error => {
                        if (error.status === CapiError.NotFound) {
                            logger.warn(error.message);
                            res.sendStatus(404);
                        } else {
                            logger.error(error.message);
                            res.sendStatus(500);
                        }
                    },
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
                    }
                )
            }
        } else {
            const response = errorDecoder(buffer);
            logger.error(`I received a ${capiResponse.status} code from CAPI with the message: ${response.message} for resource ${articleId}`);
            res.sendStatus(500);
        }
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
