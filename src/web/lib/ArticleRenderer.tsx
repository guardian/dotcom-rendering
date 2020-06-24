import React from 'react';
import { css } from 'emotion';

import { BlockquoteBlockComponent } from '@root/src/web/components/elements/BlockquoteBlockComponent';
import { DividerBlockComponent } from '@root/src/web/components/elements/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/elements/ImageBlockComponent';
import { MultiImageBlockComponent } from '@root/src/web/components/elements/MultiImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/elements/InstagramBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/web/components/elements/PullQuoteBlockComponent';
import { SoundcloudBlockComponent } from '@root/src/web/components/elements/SoundcloudBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/elements/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/web/components/elements/TableBlockComponent';
import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/elements/TweetBlockComponent';
import { VimeoBlockComponent } from '@root/src/web/components/elements/VimeoBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';

import { ExplainerAtom } from '@guardian/atoms-rendering';

// This is required for spacefinder to work!
const commercialPosition = css`
    position: relative;
`;

export const ArticleRenderer: React.FC<{
    display: Display;
    elements: CAPIElement[];
    pillar: Pillar;
    designType: DesignType;
    adTargeting?: AdTargeting;
}> = ({ display, elements, pillar, designType, adTargeting }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
                    return (
                        <BlockquoteBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.DividerBlockElement':
                    return <DividerBlockComponent />;
                case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
                    return null; // will be filled shortly with the ChartAtom from atoms-rendering
                case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                    return (
                        <EmbedBlockComponent
                            key={i}
                            html={element.html}
                            alt={element.alt}
                        />
                    );
                case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
                    return (
                        <ExplainerAtom
                            key={i}
                            id={element.id}
                            title={element.title}
                            html={element.body}
                        />
                    );
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return (
                        <ImageBlockComponent
                            display={display}
                            designType={designType}
                            key={i}
                            element={element}
                            pillar={pillar}
                            title={element.title}
                        />
                    );
                case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                    return (
                        <InstagramBlockComponent key={i} element={element} />
                    );
                case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
                    return (
                        <MultiImageBlockComponent
                            designType={designType}
                            key={i}
                            images={element.images}
                            caption={element.caption}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                    return (
                        <PullQuoteBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            attribution={element.attribution}
                            role={element.role}
                        />
                    );
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return <div key={i} id={`rich-link-${i}`} />;
                case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                    return (
                        <SoundcloudBlockComponent key={i} element={element} />
                    );
                case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                    return (
                        <SubheadingBlockComponent key={i} html={element.html} />
                    );
                case 'model.dotcomrendering.pageElements.TableBlockElement':
                    return <TableBlockComponent element={element} />;
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return (
                        <TextBlockComponent
                            key={i}
                            isFirstParagraph={i === 0}
                            html={element.html}
                            pillar={pillar}
                            display={display}
                            designType={designType}
                            forceDropCap={element.dropCap}
                        />
                    );
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return <TweetBlockComponent key={i} element={element} />;
                case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                    return (
                        <VimeoBlockComponent
                            pillar={pillar}
                            url={element.url}
                            height={element.height}
                            width={element.width}
                            caption={element.caption}
                            credit={element.credit}
                            title={element.title}
                            display={display}
                            designType={designType}
                        />
                    );
                case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                    return (
                        <YoutubeBlockComponent
                            display={display}
                            designType={designType}
                            key={i}
                            element={element}
                            pillar={pillar}
                            hideCaption={false}
                            // eslint-disable-next-line jsx-a11y/aria-role
                            role="inline"
                            adTargeting={adTargeting}
                            isMainMedia={false}
                        />
                    );
                case 'model.dotcomrendering.pageElements.AtomEmbedMarkupBlockElement':
                case 'model.dotcomrendering.pageElements.AtomEmbedUrlBlockElement':
                case 'model.dotcomrendering.pageElements.AudioBlockElement':
                case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
                case 'model.dotcomrendering.pageElements.CodeBlockElement':
                case 'model.dotcomrendering.pageElements.CommentBlockElement':
                case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
                case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                case 'model.dotcomrendering.pageElements.DocumentBlockElement':
                case 'model.dotcomrendering.pageElements.MapBlockElement':
                case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
                case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
                case 'model.dotcomrendering.pageElements.QABlockElement':
                case 'model.dotcomrendering.pageElements.TimelineBlockElement':
                case 'model.dotcomrendering.pageElements.VideoBlockElement':
                case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
                    return null;
            }
        })
        .filter(_ => _ != null);

    return (
        <div
            className={`article-body-commercial-selector ${commercialPosition}`}
        >
            {output}
        </div>
    ); // classname that space finder is going to target for in-body ads in DCR
};
