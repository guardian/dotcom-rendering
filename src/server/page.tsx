// ----- Imports ----- //

import React, { ReactElement, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { extractCritical } from 'emotion-server';
import { EmotionCritical } from 'create-emotion-server';
import { JSDOM } from 'jsdom';
import { Format, Design, Display } from '@guardian/types/Format';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { background } from '@guardian/src-foundations/palette';

import { getThirdPartyEmbeds, requiresInlineStyles, ThirdPartyEmbeds } from 'capi';
import { fromCapi, Item } from 'item';
import { Option, some, none, map } from '@guardian/types/option';
import { compose } from 'lib';
import Body from 'components/body';
import Scripts from 'components/scripts';
import { atomCss, atomScript } from 'components/atoms/interactiveAtom';
import { csp } from 'server/csp';
import { pageFonts } from 'styles';
import Meta from 'components/meta';


// ----- Types ----- //

interface Page {
    html: string;
    clientScript: Option<string>;
}


// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);


// ----- Functions ----- //

const scriptName = ({ design, display }: Format): Option<string> => {
    switch (design) {
        case Design.Live:
            return some('liveblog.js');
        case Design.Interactive:
            return display !== Display.Immersive ? some('article.js') : none;
        case Design.Comment:
        case Design.Feature:
        case Design.Analysis:
        case Design.Review:
        case Design.Article:
        case Design.Quiz:
            return some('article.js');
        case Design.Media:
            return some('media.js');
        default:
            return none;
    }
}

const shouldHideAds = (request: RenderingRequest): boolean =>
    request.content.fields?.shouldHideAdverts ?? false;

const styles = (format: Format): string => `
    ${pageFonts}

    body {
        background: ${format.design === Design.Media ? background.inverse : 'white'};
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        overflow-x: hidden;
        line-height: 1.5;
    }

    @media (prefers-color-scheme: dark) {
        body {
            background: transparent;
        }
    }
`;

function renderHead(
    item: Item,
    request: RenderingRequest,
    thirdPartyEmbeds: ThirdPartyEmbeds,
    itemStyles: string,
    emotionIds: string[],
    inlineStyles: boolean,
): string {
    const generalStyles = styles(item);
    const cspString = csp(
        item, {
            scripts: [ atomScript ],
            styles: [ generalStyles, itemStyles, atomCss ],
        }, thirdPartyEmbeds, inlineStyles);
    const meta = h(Meta, { title: request.content.webTitle, cspString});

    return `
        ${renderToString(meta)}
        <link rel="stylesheet" type="text/css" href="/fontSize.css">
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
        <script id="targeting-params" type="application/json">
            ${JSON.stringify(request.targetingParams)}
        </script>
    `;
}

const renderBody = (item: Item, request: RenderingRequest): EmotionCritical =>
    compose(extractCritical, renderToString)(
        <CacheProvider value={cache}>
            <Body item={item} shouldHideAds={shouldHideAds(request)} />
        </CacheProvider>
    );

const buildHtml = (head: string, body: string, scripts: ReactElement): string => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            ${head}
        </head>
        <body>
            ${body}
            ${renderToString(scripts)}
        </body>
    </html>
`;

function render(
    imageSalt: string,
    request: RenderingRequest,
    getAssetLocation: (assetName: string) => string,
): Page {
    const item = fromCapi({ docParser, salt: imageSalt })(request);
    const clientScript = map(getAssetLocation)(scriptName(item));
    const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);
    const body = renderBody(item, request);
    const inlineStyles = requiresInlineStyles();
    const head = renderHead(item, request, thirdPartyEmbeds, body.css, body.ids, inlineStyles);
    const scripts = <Scripts clientScript={clientScript} twitter={thirdPartyEmbeds.twitter} />;


    return { html: buildHtml(head, body.html, scripts), clientScript };
}


// ----- Export ----- //

export {
    render,
};
