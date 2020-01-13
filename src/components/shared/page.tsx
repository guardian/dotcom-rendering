// ----- Imports ----- //

import React, { ReactNode, ReactElement } from 'react';
import { css } from '@emotion/core';

import Standard from 'components/standard/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Immersive from 'components/immersive/article';

import { Content } from 'capiThriftModels';
import { includesTweets } from 'capi';
import { fontFace } from 'styles';
import { None, Some } from 'types/option';
import { renderAll } from 'renderer';
import { JSDOM } from 'jsdom';
import { partition } from 'types/result';
import { insertAdPlaceholders } from 'ads';
import { fromCapi, Layout } from 'article';


// ----- Components ----- //

const PageStyles = css`
    ${fontFace("Guardian Egyptian Web", new None, "/public/fonts/egyptiantext-regular.otf")}
    ${fontFace("Guardian Egyptian Web", new Some(500), "/public/fonts/egyptiantext-medium.otf")}
    ${fontFace("Guardian Egyptian Web", new Some("bold"), "/public/fonts/egyptiantext-medium.otf")}
    ${fontFace("Guardian Text Sans Web", new None, "/public/fonts/GuardianSansWeb-Regular.ttf")}
    ${fontFace("Guardian Headline", new Some(200), "/public/fonts/GHGuardianHeadline-Light.ttf")}
    ${fontFace("Guardian Headline", new Some(400), "/public/fonts/GHGuardianHeadline-Regular.ttf")}
    ${fontFace("Guardian Headline", new Some(500), "/public/fonts/GHGuardianHeadline-Medium.ttf")}
    ${fontFace("Guardian Headline", new Some(700), "/public/fonts/GHGuardianHeadline-Bold.ttf")}
    ${fontFace("Guardian Icons", new None, "/public/fonts/icons.otf")}

    font-size: 62.5%;
    background: white;

    body {
        margin: 0;
        font-family: 'Guardian Egyptian Web';
        font-size: 1.6em;
        line-height: 1.5em;
        overflow-x: hidden;
    }

    figure.element-embed {
        margin: 2em 0
    }

    .js-email-sub__iframe {
        width: 100%;
    }

    .js-email-sub__iframe + figcaption {
        margin-top: -8px;
    }

    video,
    .element-atom iframe,
    .element-audio iframe {
        width: 100%;
    }
`;

interface BodyProps {
    imageSalt: string;
    capi: Content;
}

const WithScript = (props: { src: string; children: ReactNode }): ReactElement =>
    <>
        {props.children}
        <script src={props.src}></script>
    </>

function ArticleBody({ capi, imageSalt }: BodyProps): React.ReactElement {
    const article = fromCapi(JSDOM.fragment)(capi);
    const body = partition(article.blocks).oks;
    const content = insertAdPlaceholders(renderAll(imageSalt)(article.pillar, body));
    const articleScript = '/assets/article.js';
    const liveblogScript = '/assets/liveblog.js';

    switch (article.layout) {
        case Layout.Opinion:
            return (
                <WithScript src={articleScript}>
                    <Opinion capi={capi} imageSalt={imageSalt} article={article}>
                        {content}
                    </Opinion>
                </WithScript>
            );
        case Layout.Immersive:
            return (
                <WithScript src={articleScript}>
                    <Immersive capi={capi} imageSalt={imageSalt} article={article}>
                        {content}
                    </Immersive>
                </WithScript>
            );
        case Layout.Standard:
        case Layout.Feature:
        case Layout.Analysis:
        case Layout.Review:
            return (
                <WithScript src={articleScript}>
                    <Standard imageSalt={imageSalt} article={article}>
                        {content}
                    </Standard>
                </WithScript>
            );
        case Layout.Liveblog:
            return (
                <WithScript src={liveblogScript}>
                    <LiveblogArticle capi={capi} article={article} imageSalt={imageSalt} />
                </WithScript>
            );
        default:
            return <p>{capi.type} not implemented yet</p>;
    }
}

interface Props {
    content: Content;
    imageSalt: string;
}

function Page({ content, imageSalt }: Props): JSX.Element {
    const twitterScript = includesTweets(content)
        ? <script src="https://platform.twitter.com/widgets.js"></script>
        : null

    return (
        <html lang="en-GB" css={PageStyles}>
            <head>
                <title>{content.id}</title>
                <meta charSet="UTF-8" />
                <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
            </head>
            <body>
                <ArticleBody imageSalt={imageSalt} capi={content} />
                { twitterScript }
            </body>
        </html>
    );
}


// ----- Export ----- //

export default Page;
