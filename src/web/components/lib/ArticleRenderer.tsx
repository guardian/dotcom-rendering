import React from 'react';
import { css } from 'emotion';

import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/elements/SubheadingBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/elements/ImageBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/elements/TweetBlockComponent';
import { PullQuoteComponent } from '@root/src/web/components/elements/PullQuoteComponent';
import { YouTubeComponent } from '@root/src/web/components/elements/YouTubeComponent';

// This is required for spacefinder to work!
const commercialPosition = css`
    position: relative;
`;

export const ArticleRenderer: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    designType: DesignType;
    adTargeting?: AdTargeting;
}> = ({ elements, pillar, designType, adTargeting }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return (
                        <TextBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            dropCap={false} // TODO: Plug in the api response here when we have it
                        />
                    );
                case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                    return (
                        <SubheadingBlockComponent key={i} html={element.html} />
                    );
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return (
                        <ImageBlockComponent
                            key={i}
                            element={element}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return <TweetBlockComponent key={i} element={element} />;
                case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                    return (
                        <PullQuoteComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                            attribution={element.attribution}
                            role={element.role}
                        />
                    );
                case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
                    return (
                        <TextBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            dropCap={false} // TODO: Plug in the api response here when we have it
                        />
                    );
                case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                    return (
                        <YouTubeComponent
                            key={i}
                            element={element}
                            pillar={pillar}
                            hideCaption={false}
                            // tslint:disable-next-line react-a11y-role
                            role="inline"
                            adTargeting={adTargeting}
                        />
                    );
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return <div key={i} data-island={`rich-link-${i}`} />;
                default:
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
