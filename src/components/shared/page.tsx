// ----- Imports ----- //

import React, { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/core';
import Standard from 'components/standard/article';
import AdvertisementFeature from 'components/advertisementFeature/article';
import LiveblogArticle from 'components/liveblog/article';
import Opinion from 'components/opinion/article';
import Immersive from 'components/immersive/article';
import Media from 'components/media/article';
import { IContent as Content } from 'mapiThriftModels/Content';
import { includesTweets } from 'capi';
import { fontFace } from 'styles';
import { None, Some } from 'types/option';
import { renderAll } from 'renderer';
import { JSDOM } from 'jsdom';
import { partition } from 'types/result';
import { getAdPlaceholderInserter } from 'ads';
import { fromCapi, getFormat } from 'item';
import { ElementKind } from 'bodyElement';
import { sign } from 'image';
import {
    ElementType,
    TagType,
    ITag as Tag,
    IBlock as Block,
    IBlockElement as BlockElement
} from 'mapiThriftModels';
import { Design, Display } from 'format';


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

const mappingsWithUrl = (mappings: ImageMappings, url: string, salt: string): ImageMappings => {
    const { pathname } = new URL(url);
    return { ...mappings, [pathname]: sign(salt, pathname) }
};

const getContributorMappings = (tags: Tag[], salt: string): ImageMappings => tags
    .filter(tag => tag.type === TagType.CONTRIBUTOR)
    .reduce((mappings, { bylineLargeImageUrl }) =>
        bylineLargeImageUrl
            ? mappingsWithUrl(mappings, bylineLargeImageUrl, salt)
            : mappings
    , {});

const bodyBlocks = (capi: Content): Block[] =>
    capi.blocks?.body ?? [];

const mainBlocks = (capi: Content): Block[] =>
    capi.blocks?.main !== undefined ? [capi.blocks.main] : [];

const getImageMappings = (imageSalt: string, capi: Content): ImageMappings => {
    const blocks = [...bodyBlocks(capi), ...mainBlocks(capi)];

    const blockMappings = blocks.flatMap(block => block.elements)
        .filter((element: BlockElement) => element.type === ElementType.IMAGE)
        .reduce((mappings, elem) => {
            const asset = elem.assets.find(asset => asset.typeData?.isMaster);

            if (asset !== undefined && asset.file !== undefined) {
                return mappingsWithUrl(mappings, asset.file, imageSalt);
            }

            return mappings;
        }, {});

        return { ...blockMappings, ...getContributorMappings(capi.tags, imageSalt) }
};

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

    const item = fromCapi(JSDOM.fragment.bind(null))(capi);
    const format = getFormat(item);
    const imageMappings = getImageMappings(imageSalt, capi);

    const articleScript = getAssetLocation('article.js');
    const liveblogScript = getAssetLocation('liveblog.js');
    const mediaScript = getAssetLocation('media.js');

    if (item.design === Design.Comment) {
        const commentBody = partition(item.body).oks;
        const commentContent =
            insertAdPlaceholders(renderAll(imageMappings)(format, commentBody));

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
        ), resources: [liveblogScript], hydrationProps: { ...liveblogProps(capi), imageMappings } };
    }

    if (item.display === Display.Immersive) {
        const immersiveBody = partition(item.body).oks;
        const immersiveContent =
            insertAdPlaceholders(renderAll(imageMappings)(format, immersiveBody));

        return { element: (
            <WithScript src={articleScript}>
                <Immersive imageMappings={imageMappings} item={item}>
                    {immersiveContent}
                </Immersive>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (item.design === Design.Media) {
        const body = partition(item.body).oks.filter(elem => elem.kind === ElementKind.Image);
        const mediaContent =
            insertAdPlaceholders(renderAll(imageMappings)(format, body));
        return { element: (
                <WithScript src={mediaScript}>
                    <Media imageMappings={imageMappings} item={item}>
                        {mediaContent}
                    </Media>
                </WithScript>
            ), resources: [mediaScript], hydrationProps: {} };
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article
    ) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(imageMappings)(format, body));

        return { element: (
            <WithScript src={articleScript}>
                <Standard imageMappings={imageMappings} item={item}>
                    {content}
                </Standard>
            </WithScript>
        ), resources: [articleScript], hydrationProps: {} };
    }

    if (item.design === Design.AdvertisementFeature) {
        const body = partition(item.body).oks;
        const content = insertAdPlaceholders(renderAll(imageMappings)(format, body));

        return { element: (
            <AdvertisementFeature imageMappings={imageMappings} item={item}>
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
