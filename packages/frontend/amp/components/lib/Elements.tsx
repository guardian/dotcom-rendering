import React from 'react';

import { TextBlockComponent } from '@frontend/amp/components/elements/TextBlockComponent';
import { SubheadingBlockComponent } from '@frontend/amp/components/elements/SubheadingBlockElement';
import { Image } from '@root/packages/frontend/amp/components/elements/Image';
import { InstagramBlockComponent } from '@frontend/amp/components/elements/InstagramBlockComponent';
import { TweetBlockComponent } from '@frontend/amp/components/elements/TweetBlockComponent';
import { Comment } from '@root/packages/frontend/amp/components/elements/Comment';
import { RichLinkBlockComponent } from '@frontend/amp/components/elements/RichLinkBlockComponent';
import { SoundcloudBlockComponent } from '@frontend/amp/components/elements/SoundcloudBlockComponent';
import { Embed } from '@root/packages/frontend/amp/components/elements/Embed';
import { PullquoteBlockComponent } from '@frontend/amp/components/elements/PullquoteBlockComponent';
import { findAdSlots } from '@frontend/amp/lib/find-adslots';
import { Ad } from '@frontend/amp/components/elements/Ad';
import { css } from 'emotion';
import { Disclaimer } from '@root/packages/frontend/amp/components/elements/Disclaimer';
import { clean } from '@frontend/model/clean';

const clear = css`
    clear: both;
`;

export const Elements: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    edition: Edition;
    section: string;
    contentType: string;
    switches: Switches;
    commercialProperties: CommercialProperties;
    isImmersive: boolean;
}> = ({
    elements,
    pillar,
    edition,
    section,
    contentType,
    switches,
    commercialProperties,
    isImmersive,
}) => {
    const cleanedElements = elements.map(element =>
        'html' in element ? { ...element, html: clean(element.html) } : element,
    );
    const output = cleanedElements.map((element, i) => {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.TextBlockElement':
                return (
                    <TextBlockComponent
                        key={i}
                        html={element.html}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                return (
                    <SubheadingBlockComponent
                        key={i}
                        html={element.html}
                        pillar={pillar}
                        isImmersive={isImmersive}
                    />
                );
            case 'model.dotcomrendering.pageElements.ImageBlockElement':
                return <Image key={i} element={element} pillar={pillar} />;
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
                return <Comment key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                return <SoundcloudBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                return <Embed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                return (
                    <Disclaimer key={i} html={element.html} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                return (
                    <PullquoteBlockComponent
                        key={i}
                        html={element.html}
                        pillar={pillar}
                    />
                );
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

    const slotIndexes = findAdSlots(elements);
    const commercialConfig = {
        useKrux: switches.krux,
        usePrebid: switches.ampPrebid,
    };

    const elementsWithAdverts = output.map((element, i) => (
        <>
            {element}
            {slotIndexes.includes(i) ? (
                <Ad
                    edition={edition}
                    section={section}
                    contentType={contentType}
                    config={commercialConfig}
                    commercialProperties={commercialProperties}
                />
            ) : null}
        </>
    ));

    return (
        <>
            {elementsWithAdverts}
            <div className={clear} />
        </>
    );
};
