// ----- Imports ----- //

import React, { ReactNode, FC, ReactElement } from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider, css } from '@emotion/core';
import { JSDOM } from 'jsdom';
import { Format, Design, Display } from '@guardian/types/Format';

import Standard from 'components/standard/article';
import AdvertisementFeature from 'components/advertisementFeature/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Media from 'components/media/article';
import Interactive from 'components/interactive/article';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { includesTweets } from 'capi';
import { renderAll, renderAllWithoutStyles } from 'renderer';
import { partition } from 'types/result';
import { getAdPlaceholderInserter } from 'ads';
import { fromCapi, Item } from 'item';
import { ElementKind, BodyElement } from 'bodyElement';
import { pageFonts } from 'styles';
import { Option, some, none, map, withDefault } from 'types/option';
import { compose, pipe2 } from 'lib';
import { csp } from 'server/csp';
import { remSpace } from '@guardian/src-foundations';


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
            return some('article.js');
        case Design.Media:
            return some('media.js');
        default:
            return none;
    }
}

const renderWithAds =
    (shouldHide: boolean) =>
    (format: Format, elements: BodyElement[]): ReactNode[] =>
    getAdPlaceholderInserter(shouldHide)(renderAll(format, elements));


// ----- Components ----- //

interface BodyProps {
    item: Item;
    shouldHideAds: boolean;
}

const Body: FC<BodyProps> = ({ item, shouldHideAds }: BodyProps) => {
    if (item.design === Design.Live) {
        return <LiveblogArticle item={item} />;
    }

    const body = partition(item.body).oks;
    const render = renderWithAds(shouldHideAds);

    if (item.design === Design.Interactive && item.display === Display.Immersive) {
        return <Interactive>{renderAllWithoutStyles(item, body)}</Interactive>;
    }

    if (item.design === Design.Comment) {
        return <Opinion item={item}>{render(item, body)}</Opinion>;
    }

    if (item.design === Design.Media) {
        return (
            <Media item={item}>
                {render(item, body.filter(elem => elem.kind === ElementKind.Image))}
            </Media>
        );
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article ||
        item.design === Design.Interactive
    ) {
        return <Standard item={item}>{render(item, body)}</Standard>;
    }

    if (item.design === Design.AdvertisementFeature) {
        return <AdvertisementFeature item={item}>{render(item, body)}</AdvertisementFeature>;
    }

    return <p css={css`padding: 0 ${remSpace[2]}`}>Content format not implemented yet</p>;
}

interface ClientJsProps {
    src: Option<string>;
}

const ClientJs: FC<ClientJsProps> = ({ src }: ClientJsProps) =>
    pipe2(src, map(s => <script src={s}></script>), withDefault<ReactElement | null>(null));

interface ScriptsProps {
    clientScript: Option<string>;
    twitter: boolean;
}

const Scripts: FC<ScriptsProps> = ({ clientScript, twitter }: ScriptsProps) =>
    <>
        <ClientJs src={clientScript} />
        { twitter ? <script src="https://platform.twitter.com/widgets.js"></script> : null }
    </>

interface HeadProps {
    webTitle: string;
}

const Head: FC<HeadProps> = ({ webTitle }: HeadProps) =>
    <>
        <title>{webTitle}</title>
        <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <link rel="stylesheet" href="native://fontSize.css" />
    </>


// ----- Page ----- //

interface Page {
    html: string;
    clientScript: Option<string>;
}

const styles = `
    ${pageFonts}

    body {
        background: white;
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        overflow-x: hidden;
        line-height: 1.5;
    }
`;

function page(
    imageSalt: string,
    renderingRequest: RenderingRequest,
    getAssetLocation: (assetName: string) => string,
): Page {
    const item = fromCapi({ docParser, salt: imageSalt })(renderingRequest.content);
    const shouldHideAds = renderingRequest.content.fields?.shouldHideAdverts ?? false;
    const hasTwitter = includesTweets(renderingRequest.content);
    const clientScript = map(getAssetLocation)(scriptName(item));
    const { html: body, css, ids } = compose(extractCritical, renderToString)(
        <CacheProvider value={cache}>
            <Body item={item} shouldHideAds={shouldHideAds} />
        </CacheProvider>
    );
    const cspString = csp(item, { scripts: [], styles: [styles, css] }, hasTwitter);
    const html = `
        <html lang="en">
            <head>
                ${renderToString(<Head webTitle={renderingRequest.content.webTitle} />)}
                <meta
                    http-equiv="Content-Security-Policy"
                    content="${cspString}"
                />
                <style>${styles}</style>
                <style data-emotion-css="${ids.join(' ')}">${css}</style>
                <script id="targeting-params" type="application/json">
                    ${JSON.stringify(renderingRequest.targetingParams)}
                </script>
            </head>
            <body>
                ${body}
                ${renderToString(<Scripts clientScript={clientScript} twitter={hasTwitter} />)}
            </body>
        </html>
    `;

    return { html, clientScript };
}


// ----- Export ----- //

export {
    page,
};
