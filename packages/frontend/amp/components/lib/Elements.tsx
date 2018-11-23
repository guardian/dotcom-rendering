import { TextBlockComponent } from '@frontend/amp/components/elements/TextBlockComponent';

import React from 'react';
import { ImageBlockComponent } from '@frontend/amp/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@frontend/amp/components/elements/InstagramBlockComponent';
import { TweetBlockComponent } from '@frontend/amp/components/elements/TweetBlockComponent';
import { RichLinkBlockComponent } from '../elements/RichLinkBlockComponent';

export const Elements: React.SFC<{
    elements: CAPIElement[];
    pillar: Pillar;
}> = ({ elements, pillar }) => {
    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return (
                        <TextBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return (
                        <ImageBlockComponent
                            key={i}
                            element={element}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                    return <InstagramBlockComponent element={element} />;
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return <TweetBlockComponent element={element} />;
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return (
                        <RichLinkBlockComponent
                            element={element}
                            pillar={pillar}
                        />
                    );
                default:
                    // tslint:disable-next-line:no-console
                    console.log('Unsupported Element', JSON.stringify(element));
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
