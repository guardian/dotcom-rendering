// ----- Imports ----- //

import React, { ReactNode, ReactElement } from 'react';
import { css } from '@emotion/core';

import Standard from 'components/standard/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Immersive from 'components/immersive/article';

import { IContent as Content } from 'mapiThriftModels/Content';
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
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new None, "/public/fonts/GuardianTextEgyptian-Reg.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new Some("italic"), "/public/fonts/GuardianTextEgyptian-RegItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new None, "/public/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new Some("italic"), "/public/fonts/GuardianTextEgyptian-BoldItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new None, "/public/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new Some("italic"), "/public/fonts/GuardianTextEgyptian-BoldItalic.ttf")}

    ${fontFace("Guardian Text Sans Web", new Some(400), new None, "/public/fonts/GuardianTextSans-Regular.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(400), new Some("italic"), "/public/fonts/GuardianTextSans-RegularItalic.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new None, "/public/fonts/GuardianTextSans-Bold.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new Some("italic"), "/public/fonts/GuardianTextSans-BoldItalic.ttf")}

    ${fontFace("Guardian Headline", new Some(300), new None, "/public/fonts/GHGuardianHeadline-Light.ttf")}
    ${fontFace("Guardian Headline", new Some(300), new Some("italic"), "/public/fonts/GHGuardianHeadline-LightItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(400), new None, "/public/fonts/GHGuardianHeadline-Regular.ttf")}
    ${fontFace("Guardian Headline", new Some(400), new Some("italic"), "/public/fonts/GHGuardianHeadline-RegularItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(500), new None,  "/public/fonts/GHGuardianHeadline-Medium.ttf")}
    ${fontFace("Guardian Headline", new Some(500), new Some("italic"),  "/public/fonts/GHGuardianHeadline-MediumItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(600), new None,  "/public/fonts/GHGuardianHeadline-Semibold.ttf")}
    ${fontFace("Guardian Headline", new Some(600), new Some("italic"),  "/public/fonts/GHGuardianHeadline-SemiboldItalic.ttf")}
    ${fontFace("Guardian Headline", new Some(700), new None, "/public/fonts/GHGuardianHeadline-Bold.ttf")}
    ${fontFace("Guardian Headline", new Some(700), new Some("italic"), "/public/fonts/GHGuardianHeadline-BoldItalic.ttf")}

    ${fontFace("Guardian Icons", new None, new None, "/public/fonts/icons.otf")}

    font-size: 62.5%;
    background: white;

    body {
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
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
    
    const articleScript = '/assets/article.js';
    const liveblogScript = '/assets/liveblog.js';

    switch (article.layout) {
        case Layout.Opinion:
            const opinionBody = partition(article.body).oks;
            const opinionContent =
                insertAdPlaceholders(renderAll(imageSalt)(article.pillar, opinionBody));

            return (
                <WithScript src={articleScript}>
                    <Opinion imageSalt={imageSalt} article={article}>
                        {opinionContent}
                    </Opinion>
                </WithScript>
            );
        case Layout.Immersive:
            const immersiveBody = partition(article.body).oks;
            const immersiveContent =
                insertAdPlaceholders(renderAll(imageSalt)(article.pillar, immersiveBody));

            return (
                <WithScript src={articleScript}>
                    <Immersive imageSalt={imageSalt} article={article}>
                        {immersiveContent}
                    </Immersive>
                </WithScript>
            );
        case Layout.Standard:
        case Layout.Feature:
        case Layout.Analysis:
        case Layout.Review:
            const body = partition(article.body).oks;
            const content = insertAdPlaceholders(renderAll(imageSalt)(article.pillar, body));

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
                    <LiveblogArticle article={article} imageSalt={imageSalt} />
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
        <html lang="en" css={PageStyles}>
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
