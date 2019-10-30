import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { SubheadingBlockComponent } from '@frontend/web/components/elements/SubheadingBlockComponent';
import { ImageBlockComponent } from '@frontend/web/components/elements/ImageBlockComponent';
import { TweetBlockComponent } from '@frontend/web/components/elements/TweetBlockComponent';
import { PullQuoteComponent } from '@frontend/web/components/elements/PullQuoteComponent';
import React from 'react';
import { css } from 'emotion';

// This is required for spacefinder to work!
const commercialPosition = css`
    position: relative;
`;

export const ArticleRenderer: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    config: ConfigType;
}> = ({ elements, pillar, config }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return <TextBlockComponent key={i} html={element.html} />;
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
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return <div id={`rich-link-${i}`} />;
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
