import React from 'react';
import { css } from 'emotion';
import { clean } from '@frontend/model/clean';

import { findAdSlots } from '@frontend/amp/lib/find-adslots';
import { Ad } from '@frontend/amp/components/Ad';
import { Expandable } from '@frontend/amp/components/Expandable';

import { Disclaimer } from '@root/packages/frontend/amp/components/elements/Disclaimer';
import { Text } from '@root/packages/frontend/amp/components/elements/Text';
import { Subheading } from '@root/packages/frontend/amp/components/elements/Subheading';
import { Image } from '@root/packages/frontend/amp/components/elements/Image';
import { VideoYoutube } from '@frontend/amp/components/elements/VideoYoutube';
import { VideoVimeo } from '@frontend/amp/components/elements/VideoVimeo';
import { VideoFacebook } from '@frontend/amp/components/elements/VideoFacebook';
import { VideoGuardian } from '@frontend/amp/components/elements/VideoGuardian';
import { InstagramEmbed } from '@root/packages/frontend/amp/components/elements/InstagramEmbed';
import { TwitterEmbed } from '@root/packages/frontend/amp/components/elements/TwitterEmbed';
import { Comment } from '@root/packages/frontend/amp/components/elements/Comment';
import { RichLink } from '@root/packages/frontend/amp/components/elements/RichLink';
import { SoundcloudEmbed } from '@root/packages/frontend/amp/components/elements/SoundcloudEmbed';
import { Embed } from '@root/packages/frontend/amp/components/elements/Embed';
import { PullQuote } from '@root/packages/frontend/amp/components/elements/PullQuote';
import { Timeline } from '@frontend/amp/components/elements/Timeline';
import { YoutubeVideo } from '@frontend/amp/components/elements/YoutubeVideo';
import { InteractiveUrl } from '@frontend/amp/components/elements/InteractiveUrl';
import { InteractiveMarkup } from '@frontend/amp/components/elements/InteractiveMarkup';
import { MapEmbed } from '@frontend/amp/components/elements/MapEmbed';

const clear = css`
    clear: both;
`;

export const Elements: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    edition: Edition;
    section?: string;
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
            case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
                return (
                    <VideoYoutube key={i} element={element} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                return (
                    <VideoGuardian key={i} element={element} pillar={pillar} />
                );

            case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                return <VideoVimeo key={i} element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                return (
                    <VideoFacebook key={i} element={element} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                return <InstagramEmbed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.TweetBlockElement':
                return <TwitterEmbed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                return <RichLink key={i} element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.CommentBlockElement':
                return <Comment key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                return <SoundcloudEmbed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                return <Embed key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.MapBlockElement':
                return <MapEmbed key={i} element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                return (
                    <Disclaimer key={i} html={element.html} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                return (
                    <PullQuote key={i} html={element.html} pillar={pillar} />
                );
            case 'model.dotcomrendering.pageElements.QABlockElement':
                return (
                    <Expandable
                        id={element.id}
                        type="Q&A"
                        title={element.title}
                        html={element.html}
                        img={element.img}
                        credit={element.credit}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.GuideBlockElement':
                return (
                    <Expandable
                        id={element.id}
                        type="Quick Guide"
                        title={element.title}
                        html={element.html}
                        img={element.img}
                        credit={element.credit}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.ProfileBlockElement':
                return (
                    <Expandable
                        id={element.id}
                        type="Profile"
                        title={element.title}
                        html={element.html}
                        img={element.img}
                        credit={element.credit}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.TimelineBlockElement':
                return (
                    <Timeline
                        id={element.id}
                        title={element.title}
                        description={element.description}
                        events={element.events}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                return <YoutubeVideo element={element} pillar={pillar} />;
            case 'model.dotcomrendering.pageElements.InteractiveMarkupBlockElement':
                return (
                    <InteractiveMarkup
                        html={element.html}
                        styles={element.css}
                        js={element.js}
                    />
                );
            case 'model.dotcomrendering.pageElements.InteractiveUrlBlockElement':
                return <InteractiveUrl url={element.url} />;
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
