// ----- Imports ----- //

import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/core';

import ArticleComponent from 'components/news/article';
import LiveblogArticle from 'components/liveblog/liveblogArticle';
import OpinionArticle from 'components/opinion/opinionArticle';
import ImmersiveArticle from 'components/immersive/immersiveArticle';

import { Pillar, pillarFromString } from 'pillar';
import { Content } from 'capiThriftModels';
import { includesTweets } from 'capi';
import { fontFace } from 'styles';
import { None, Some } from 'types/option';
import { renderAll, parseAll } from 'block';
import { JSDOM } from 'jsdom';
import { partition } from 'types/result';
import { insertAdPlaceholders } from 'ads';
import { Article, fromCapi } from 'article';


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

interface ArticleProps {
    imageSalt: string;
    capi: Content;
    article: Article;
    children: ReactNode[];
}

function getArticleSubtype(capi: Content): FunctionComponent<ArticleProps> {
    if (pillarFromString(capi.pillarId) === Pillar.opinion) {
        return OpinionArticle;
    } else if (capi.fields.displayHint === 'immersive') {
        return ImmersiveArticle;
    }
  
    return ArticleComponent;
  }

function ArticleBody({ capi, imageSalt }: BodyProps): React.ReactElement {
    const article = fromCapi(capi);

    switch (capi.type) {
        case 'article':
            const parsedBlocks = parseAll(JSDOM.fragment)(capi.blocks.body[0].elements);
            const body = partition(parsedBlocks).oks;
            const Component = getArticleSubtype(capi);

            return <>
                <Component capi={capi} imageSalt={imageSalt} article={article}>
                    {insertAdPlaceholders(renderAll(imageSalt)(article.pillar, body))}
                </Component>
                <script src="/assets/article.js"></script>
            </>;
        case 'liveblog':
            return <>
                <LiveblogArticle capi={capi} article={article} imageSalt={imageSalt} />
                <script src="/assets/liveblog.js"></script>
            </>;
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
        <html lang="en-US" css={PageStyles}>
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
