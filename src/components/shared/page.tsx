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
import { getAdPlaceholderInserter } from 'ads';
import { fromCapi, Design, Display } from 'item';
import { ElementType, IBlock as Block, IBlockElement as BlockElement } from 'mapiThriftModels';
import { sign } from 'components/image';


// ----- Components ----- //

const PageStyles = css`
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new None, "/assets/fonts/GuardianTextEgyptian-Reg.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(400), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-RegItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new None, "/assets/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some(700), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new None, "/assets/fonts/GuardianTextEgyptian-Bold.ttf")}
    ${fontFace("Guardian Text Egyptian Web", new Some("bold"), new Some("italic"), "/assets/fonts/GuardianTextEgyptian-BoldItalic.ttf")}

    ${fontFace("Guardian Text Sans Web", new Some(400), new None, "/assets/fonts/GuardianTextSans-Regular.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(400), new Some("italic"), "/assets/fonts/GuardianTextSans-RegularItalic.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new None, "/assets/fonts/GuardianTextSans-Bold.ttf")}
    ${fontFace("Guardian Text Sans Web", new Some(700), new Some("italic"), "/assets/fonts/GuardianTextSans-BoldItalic.ttf")}

    ${fontFace("GH Guardian Headline", new Some(300), new None, "/assets/fonts/GHGuardianHeadline-Light.ttf")}
    ${fontFace("GH Guardian Headline", new Some(300), new Some("italic"), "/assets/fonts/GHGuardianHeadline-LightItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(400), new None, "/assets/fonts/GHGuardianHeadline-Regular.ttf")}
    ${fontFace("GH Guardian Headline", new Some(400), new Some("italic"), "/assets/fonts/GHGuardianHeadline-RegularItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(500), new None,  "/assets/fonts/GHGuardianHeadline-Medium.ttf")}
    ${fontFace("GH Guardian Headline", new Some(500), new Some("italic"),  "/assets/fonts/GHGuardianHeadline-MediumItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(600), new None,  "/assets/fonts/GHGuardianHeadline-Semibold.ttf")}
    ${fontFace("GH Guardian Headline", new Some(600), new Some("italic"),  "/assets/fonts/GHGuardianHeadline-SemiboldItalic.ttf")}
    ${fontFace("GH Guardian Headline", new Some(700), new None, "/assets/fonts/GHGuardianHeadline-Bold.ttf")}
    ${fontFace("GH Guardian Headline", new Some(700), new Some("italic"), "/assets/fonts/GHGuardianHeadline-BoldItalic.ttf")}

    ${fontFace("Guardian Icons", new None, new None, "/assets/fonts/icons.otf")}

    background: white;

    body {
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
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
    getAssetLocation: (assetName: string) => string;
}

interface ElementWithResources {
    element: React.ReactElement;
    resources: string[];
    hydrationProps: {};
}

export interface ImageMappings {
    [key: string]: string;
}

const getImageMappings = (imageSalt: string, capi: Content): ImageMappings => {
    const blocks: Block[] = [capi.blocks?.main, capi.blocks?.body].flat()
    return blocks
        ?.flatMap(block => block?.elements
            .filter((element: BlockElement) => element.type === ElementType.IMAGE)
            .flatMap((element: BlockElement) => {
                return element.assets.map(asset => {
                    if (asset.file) {
                        const url = new URL(asset.file);
                        return { [url.pathname]: sign(imageSalt, url.pathname) }
                    }
                })
            }))
            .reduce((a, b) => ({...a, ...b}), {}) ?? {};
}

const WithScript = (props: { src: string; children: ReactNode }): ReactElement =>
    <>
        {props.children}
        <script src={props.src}></script>
    </>

function ArticleBody({ capi, imageSalt, getAssetLocation }: BodyProps): ElementWithResources {

    const insertAdPlaceholders = getAdPlaceholderInserter(capi.fields?.shouldHideAdverts ?? false);

    const item = fromCapi(JSDOM.fragment)(capi);
    const imageMappings = getImageMappings(imageSalt, capi);

    const articleScript = getAssetLocation('article.js');
    const liveblogScript = getAssetLocation('liveblog.js');

    if (item.design === Design.Comment) {
        const commentBody = partition(item.body).oks;
        const commentContent =
            insertAdPlaceholders(renderAll(imageMappings)(item.pillar, commentBody));

        return { element: (
            <WithScript src={articleScript}>
                <Opinion imageMappings={imageMappings} item={item}>
                    {commentContent}
                </Opinion>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (item.design === Design.Live) {
        return { element: (
            <WithScript src={liveblogScript}>
                <LiveblogArticle item={item} imageMappings={imageMappings} />
            </WithScript>
        ), resources: [liveblogScript], hydrationProps: { ...capi, imageMappings } };
    }

    if (item.display === Display.Immersive) {
        const immersiveBody = partition(item.body).oks;
        const immersiveContent =
            insertAdPlaceholders(renderAll(imageMappings)(item.pillar, immersiveBody));

        return { element: (
            <WithScript src={articleScript}>
                <Immersive imageMappings={imageMappings} item={item}>
                    {immersiveContent}
                </Immersive>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article
    ) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(imageMappings)(item.pillar, body));

        return { element: (
            <WithScript src={articleScript}>
                <Standard imageMappings={imageMappings} item={item}>
                    {content}
                </Standard>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    const element = <p>Content format not implemented yet</p>
    return { element, resources: [], hydrationProps: {} };
}

interface Props {
    content: Content;
    imageSalt: string;
    getAssetLocation: (assetName: string) => string;
}

function Page({ content, imageSalt, getAssetLocation }: Props): ElementWithResources {
    const twitterScript = includesTweets(content)
        ? <script src="https://platform.twitter.com/widgets.js"></script>
        : null

    const {
        element,
        resources,
        hydrationProps
    } = ArticleBody({ imageSalt, capi: content, getAssetLocation })

    return { element: (
        <html lang="en" css={PageStyles}>
            <head>
                <title>{content.id}</title>
                <meta charSet="UTF-8" />
                <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
            </head>
            <body>
                { element }
                { twitterScript }
            </body>
        </html>
    ), resources, hydrationProps };
}


// ----- Export ----- //

export default Page;
