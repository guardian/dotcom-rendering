import React from 'react';

import { TextBlockComponent } from '@frontend/amp/components/elements/TextBlockComponent';
import { ImageBlockComponent } from '@frontend/amp/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@frontend/amp/components/elements/InstagramBlockComponent';
import { TweetBlockComponent } from '@frontend/amp/components/elements/TweetBlockComponent';
import { CommentBlockComponent } from '@frontend/amp/components/elements/CommentBlockComponent';
import { RichLinkBlockComponent } from '@frontend/amp/components/elements/RichLinkBlockComponent';
import { SoundcloudBlockComponent } from '@frontend/amp/components/elements/SoundcloudBlockComponent';
import { findAdSlots } from '@frontend/amp/lib/find-adslots';
import { EmbedBlockComponent } from '@frontend/amp/components/elements/EmbedBlockComponent';

export const Elements: React.SFC<{
    elements: CAPIElement[];
    pillar: Pillar;
}> = ({ elements, pillar }) => {
    const output = elements.map((element, i) => {
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
                return <InstagramBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.TweetBlockElement':
                return <TweetBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                return (
                    <RichLinkBlockComponent
                        key={i}
                        element={element}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.CommentBlockElement':
                return <CommentBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                return <SoundcloudBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                return <EmbedBlockComponent key={i} element={element} />;
            default:
                // tslint:disable-next-line:no-console
                console.log('Unsupported Element', JSON.stringify(element));
                if ((element as { isMandatory?: boolean }).isMandatory) {
                    throw new Error(
                        'This page cannot be rendered due to incompatible content that is marked as mandatory.',
                    );
                }
                return null;
        }
    });

    // insert advert placeholder text
    const slotIndexes = findAdSlots(elements);
    const elementsWithAdverts = output.map((e, i) => (
        <>
            {e}
            {slotIndexes.includes(i) ? 'ADVERT' : null}
        </>
    ));
    return <>{elementsWithAdverts}</>;
};
