import React from 'react';
import { css } from '@emotion/core';

const ArticleContainerStyles = css`
    @font-face {
        font-family: "Guardian Egyptian Web";
        src: url('/public/fonts/egyptiantext-regular.otf');
    }

    @font-face {
        font-family: "Guardian Egyptian Web";
        font-weight: 500;
        src: url("/public/fonts/egyptiantext-medium.otf");
    }

    @font-face {
        font-family: "Guardian Egyptian Web";
        font-weight: bold;
        src: url("/public/fonts/egyptiantext-medium.otf");
    }

    @font-face {
        font-family: "Guardian Text Sans Web";
        src: url('/public/fonts/GuardianSansWeb-Regular.ttf');
    }

    @font-face {
        font-family: "Guardian Headline";
        font-weight: 200;
        src: url("/public/fonts/GHGuardianHeadline-Light.ttf");
    }

    @font-face {
        font-family: "Guardian Headline";
        font-weight: 400;
        src: url("/public/fonts/GHGuardianHeadline-Regular.ttf");
    }

    @font-face {
        font-family: "Guardian Headline";
        font-weight: 500;
        src: url("/public/fonts/GHGuardianHeadline-Medium.ttf");
    }

    @font-face {
        font-family: "Guardian Headline";
        font-weight: 700;
        src: url("/public/fonts/GHGuardianHeadline-Bold.ttf");
    }

    @font-face {
        font-family: "Guardian Icons";
        src: url('/public/fonts/icons.otf');
    }

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

function ArticleContainer(includesTweets: boolean): JSX.Element {
    const twitterScript = includesTweets
        ? <script src="https://platform.twitter.com/widgets.js"></script>
        : null
    return <html lang="en-US" css={ArticleContainerStyles}>
        <head>
            <title>Article</title>
            <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        </head>
        <body>
            <div id="root"></div>
            <script src="/assets/client.js"></script>
            { twitterScript }
        </body>
    </html>

}

export default ArticleContainer;
