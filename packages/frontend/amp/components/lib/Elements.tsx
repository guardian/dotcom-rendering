import React from 'react';

import { Text } from '@root/packages/frontend/amp/components/elements/Text';
import { Subheading } from '@root/packages/frontend/amp/components/elements/Subheading';
import { Image } from '@root/packages/frontend/amp/components/elements/Image';
import { InstagramEmbed } from '@root/packages/frontend/amp/components/elements/InstagramEmbed';
import { TweetBlockComponent } from '@frontend/amp/components/elements/TweetBlockComponent';
import { Comment } from '@root/packages/frontend/amp/components/elements/Comment';
import { RichLink } from '@root/packages/frontend/amp/components/elements/RichLink';
import { SoundcloudEmbed } from '@root/packages/frontend/amp/components/elements/SoundcloudEmbed';
import { Embed } from '@root/packages/frontend/amp/components/elements/Embed';
import { PullQuote } from '@root/packages/frontend/amp/components/elements/PullQuote';
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
                return <Text key={i} html={element.html} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                return (
                    <Subheading
                        key={i}
                        html={element.html}
                        pillar={pillar}
                        isImmersive={isImmersive}
                    />
                );
            case 'model.dotcomrendering.pageElements.ImageBlockElement':
                return <Image key={i} element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                return <InstagramEmbed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.TweetBlockElement':
                return <TweetBlockComponent key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                return <RichLink key={i} element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.CommentBlockElement':
                return <Comment key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                return <SoundcloudEmbed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                return <Embed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                return (
                    <Disclaimer key={i} html={element.html} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                return (
                    <PullQuote key={i} html={element.html} pillar={pillar} />
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
