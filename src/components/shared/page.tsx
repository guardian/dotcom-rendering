// ----- Imports ----- //

import React, { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/core';
import Standard from 'components/standard/article';
import AdvertisementFeature from 'components/advertisementFeature/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Media from 'components/media/article';
import { IContent as Content } from 'mapiThriftModels/Content';
import { includesTweets } from 'capi';
import { renderAll, renderAllWithoutStyles } from 'renderer';
import { JSDOM } from 'jsdom';
import { partition } from 'types/result';
import { getAdPlaceholderInserter } from 'ads';
import { fromCapi, getFormat } from 'item';
import { ElementKind } from 'bodyElement';
import { IBlock as Block } from 'mapiThriftModels';
import { Design, Display } from 'format';
import Interactive from 'components/interactive/article';
import { pageFonts } from 'styles';


// ----- Components ----- //

export const PageStyles = css`
    ${pageFonts}
    background: white;

    body {
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        overflow-x: hidden;
        line-height: 1.5;
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

const filterBlocks = (block: Block): Block => {
    const { createdBy, lastModifiedBy, ...blocks } = block;
    return blocks;
};

const liveblogProps = (capi: Content): Content => {
    const { id, type, webTitle, webUrl, apiUrl, fields, tags, references, isHosted, blocks } = capi;
    return {
        id, type, webTitle, webUrl, apiUrl, fields, references, isHosted,
        tags: tags.map(({ type, webTitle, webUrl, id, references, apiUrl }) =>
            ({ type, webTitle, webUrl, id, references, apiUrl })),
        blocks: {
            totalBodyBlocks: blocks?.totalBodyBlocks,
            main: blocks?.main ? filterBlocks(blocks?.main) : undefined,
            body: blocks?.body ? blocks.body.map(filterBlocks) : undefined
        }
    }
};

const WithScript = (props: { src: string; children: ReactNode }): ReactElement =>
    <>
        {props.children}
        <script src={props.src}></script>
    </>;

function ArticleBody({ capi, imageSalt, getAssetLocation }: BodyProps): ElementWithResources {

    const insertAdPlaceholders = getAdPlaceholderInserter(capi.fields?.shouldHideAdverts ?? false);

    const item = fromCapi({
        docParser: JSDOM.fragment.bind(null),
        salt: imageSalt,
    })(capi);
    const format = getFormat(item);

    const articleScript = getAssetLocation('article.js');
    const liveblogScript = getAssetLocation('liveblog.js');
    const mediaScript = getAssetLocation('media.js');

    if (item.design === Design.Interactive && item.display === Display.Immersive) {
        const interactiveBody = partition(item.body).oks;
        const interactiveContent = renderAllWithoutStyles(format, interactiveBody);

        return { element: (
            <Interactive>
                {interactiveContent}
            </Interactive>
        ), resources: [], hydrationProps: {} };
    }

    if (item.design === Design.Comment) {
        const commentBody = partition(item.body).oks;
        const commentContent =
            insertAdPlaceholders(renderAll(format, commentBody));

        return { element: (
            <WithScript src={articleScript}>
                <Opinion item={item}>
                    {commentContent}
                </Opinion>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (item.design === Design.Live) {
        return { element: (
            <WithScript src={liveblogScript}>
                <LiveblogArticle item={item} />
            </WithScript>
        ), resources: [liveblogScript], hydrationProps: { ...liveblogProps(capi) } };
    }

    if (item.design === Design.Media) {
        const body = partition(item.body).oks.filter(elem => elem.kind === ElementKind.Image);
        const mediaContent =
            insertAdPlaceholders(renderAll(format, body));
        return { element: (
                <WithScript src={mediaScript}>
                    <Media item={item}>
                        {mediaContent}
                    </Media>
                </WithScript>
            ), resources: [mediaScript], hydrationProps: {} };
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article ||
        item.design === Design.Interactive
    ) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(format, body));

        return { element: (
            <WithScript src={articleScript}>
                <Standard item={item}>
                    {content}
                </Standard>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (item.design === Design.AdvertisementFeature) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(format, body));

        return { element: (
            <AdvertisementFeature item={item}>
                {content}
            </AdvertisementFeature>
        ), resources: [], hydrationProps: {} };
    }

    const element = <p>Content format not implemented yet</p>;
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
        : null;

    const {
        element,
        resources,
        hydrationProps
    } = ArticleBody({ imageSalt, capi: content, getAssetLocation });

    return { element: (
        <html lang="en" css={PageStyles}>
            <head>
                <title>{content.id}</title>
                <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=5" />
                <link rel="stylesheet" href="native://fontSize.css" />
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
