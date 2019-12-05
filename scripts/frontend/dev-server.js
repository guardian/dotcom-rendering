const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const urljoin = require('url-join');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { siteName, root } = require('./config');

function buildUrl(req) {
    const DEFAULT_URL =
        'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software';
    const url = new URL(req.query.url || DEFAULT_URL);
    // searchParams will only work for the first set of query params because 'url' is already a query param itself
    const searchparams = url.searchParams && url.searchParams.toString();
    // Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
    return `${url.origin}${url.pathname}.json?dcr=true&${searchparams}`;
}

function ampifyUrl(url) {
    // Take a url and make it work for AMP
    return url.replace('www', 'amp');
}

const go = async () => {
    const webpackConfig = await require('../webpack/frontend');
    const compiler = await webpack(webpackConfig);

    const app = express();

    app.use(
        `/static/${siteName}`,
        express.static(path.join(root, 'src', 'static')),
    );

    app.use(
        webpackDevMiddleware(compiler, {
            serverSideRender: true,
            logLevel: 'silent',
            publicPath: '/assets/javascript/',
            ignored: [/node_modules([\\]+|\/)+(?!@guardian)/],
        }),
    );

    app.use(
        webpackHotMiddleware(
            compiler.compilers.find(config => config.name === 'browser'),
            {
                // https://www.npmjs.com/package/friendly-errors-webpack-plugin#turn-off-errors
                // tslint:disable-next-line:no-empty
                log: () => {},
            },
        ),
    );

    app.get('/onwards', async (req, res, next) => {
        const firstPopularTag = (pageTags, isPaidContent) => {
            // This function looks for the first tag in pageTags, that also exists in our whitelist
            if (!pageTags) {
                // If there are no page tags we will never find a match so
                return false;
            }
            // This list is a direct copy from https://github.com/guardian/frontend/blob/6da0b3d8bfd58e8e20f80fc738b070fb23ed154e/static/src/javascripts/projects/common/modules/onward/related.js#L27
            // If you change this list then you should also update ^
            // order matters here (first match wins)
            const whitelistedTags = [
                // sport tags
                'sport/cricket',
                'sport/rugby-union',
                'sport/rugbyleague',
                'sport/formulaone',
                'sport/tennis',
                'sport/cycling',
                'sport/motorsports',
                'sport/golf',
                'sport/horse-racing',
                'sport/boxing',
                'sport/us-sport',
                'sport/australia-sport',

                // football tags
                'football/championsleague',
                'football/premierleague',
                'football/championship',
                'football/europeanfootball',
                'football/world-cup-2014',

                // football team tags
                'football/manchester-united',
                'football/chelsea',
                'football/arsenal',
                'football/manchestercity',
                'football/tottenham-hotspur',
                'football/liverpool',
            ];

            const isInWhitelist = tag => whitelistedTags.includes(tag);

            // For paid content we just return the first tag, otherwise we
            // filter for the first tag in the whitelist
            return isPaidContent ? pageTags[0] : pageTags.find(isInWhitelist);
        };

        try {
            if (!req.query.url) {
                res.status(400).send(
                    "url query param is required but it wasn't supplied here",
                );
            }

            // Call CAPI to get the config data for this article
            const url = new URL(req.query.url);
            const {
                hasRelated,
                hasStoryPackage,
                isAdFreeUser,
                config: {
                    pageId,
                    isPaidContent,
                    ajaxUrl,
                    showRelatedContent,
                    keywordIds,
                    contentType,
                },
            } = await fetch(
                // Reconstruct the passed url adding .json?dcr which we need to force dcr to return json
                urljoin(url.origin, `${url.pathname}.json?dcr=true`),
            ).then(article => article.json());

            let onwards = [];
            if (hasStoryPackage) {
                // Always fetch the story package is it exists
                const storyPackage = await fetch(
                    urljoin(
                        ajaxUrl,
                        'story-package',
                        `${url.pathname}.json?dcr=true`,
                    ),
                ).then(result => result.json());

                onwards.push({
                    ...storyPackage,
                    layout: 'relatedContent',
                });
            } else if (isAdFreeUser && isPaidContent) {
                // Don't show any related content (other than story packages) for
                // adfree users when the content is paid for
            } else if (showRelatedContent && hasRelated) {
                // Related content can be a collection of articles based on
                // two things, 1: A popular tag, or 2: A generic text match
                const pageTags = keywordIds.split(',');
                const popularTag = firstPopularTag(pageTags, isPaidContent);

                let relatedUrl;
                if (popularTag) {
                    // Use popular in tag endpoint
                    relatedUrl = `/popular-in-tag/${popularTag}.json`;
                } else {
                    // Default to generic related endpoint
                    relatedUrl = `/related/${pageId}.json`;
                }
                relatedUrl += '?dcr=true';

                // --- Tag excludes --- //
                let tagsToExclude = [];
                // Exclude ad features from non-ad feature content
                if (!isPaidContent) {
                    tagsToExclude.push('tone/advertisement-features');
                }
                // We don't want to show professional network content on videos or interactives
                if (
                    contentType.toLowerCase() === 'video' ||
                    contentType.toLowerCase() === 'interactive'
                ) {
                    tagsToExclude.push(
                        'guardian-professional/guardian-professional',
                    );
                }

                // Add any exclude tags to the url
                if (tagsToExclude.length > 0) {
                    const queryParams = tagsToExclude.map(
                        tag => `exclude-tag=${tag}`,
                    );
                    relatedUrl += `&${queryParams.join('&')}`;
                }

                const relatedContent = await fetch(
                    urljoin(ajaxUrl, relatedUrl),
                ).then(result => result.json());

                onwards.push({
                    ...relatedContent,
                    layout: 'relatedContent',
                });
            }

            res.status(200).send(onwards);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            console.error(error);
        }
    });

    app.get(
        '/Article',
        async (req, res, next) => {
            try {
                const url = buildUrl(req);
                const { html, ...config } = await fetch(url).then(article =>
                    article.json(),
                );

                req.body = config;
                next();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/tslint/config
                console.error(error);
            }
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
        }),
    );

    app.get(
        '/AMPArticle',
        async (req, res, next) => {
            try {
                const url = buildUrl(req);
                const { html, ...config } = await fetch(ampifyUrl(url)).then(
                    article => article.json(),
                );
                req.body = config;
                next();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/tslint/config
                console.error(error);
            }
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
            serverRendererOptions: { amp: true },
        }),
    );

    app.get('/', function(req, res) {
        res.sendFile(
            path.join(root, 'scripts', 'frontend', 'landing', 'index.html'),
        );
    });

    app.get('*', (req, res) => {
        res.redirect('/');
    });

    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });

    app.listen(3030);
};

go();
