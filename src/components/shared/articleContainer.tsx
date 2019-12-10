import React from 'react';
import { css } from '@emotion/core';
import { Content } from 'capiThriftModels';
import { includesTweets } from 'capi';
import { fontFace } from 'styles';
import { None, Some } from 'types/option';

const ArticleContainerStyles = css`
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

    figure {
        margin: 1em 0;
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

function ArticleContainer(content: Content, article: JSX.Element): JSX.Element {
    const twitterScript = includesTweets(content)
        ? <script src="https://platform.twitter.com/widgets.js"></script>
        : null

    return <html lang="en-US" css={ArticleContainerStyles}>
        <head>
            <title>{content.id}</title>
            <meta charSet="UTF-8" />
            <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        </head>
        <body>
            { article }
            <script src="/assets/client.js"></script>
            { twitterScript }
        </body>
    </html>

}

export default ArticleContainer;
