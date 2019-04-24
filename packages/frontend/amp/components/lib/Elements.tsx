import React from 'react';

<<<<<<< HEAD
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
=======
import { TextBlockComponent } from '@frontend/amp/components/elements/TextBlockComponent';
import { SubheadingBlockComponent } from '@frontend/amp/components/elements/SubheadingBlockElement';
import { ImageBlockComponent } from '@frontend/amp/components/elements/ImageBlockComponent';
import { VideoYoutubeBlockComponent } from '@frontend/amp/components/elements/VideoYoutubeBlockComponent';
import { VideoVimeoBlockComponent } from '@frontend/amp/components/elements/VideoVimeoBlockComponent';
import { VideoFacebookBlockComponent } from '@frontend/amp/components/elements/VideoFacebookBlockComponent';
import { InstagramBlockComponent } from '@frontend/amp/components/elements/InstagramBlockComponent';
import { TweetBlockComponent } from '@frontend/amp/components/elements/TweetBlockComponent';
import { CommentBlockComponent } from '@frontend/amp/components/elements/CommentBlockComponent';
import { RichLinkBlockComponent } from '@frontend/amp/components/elements/RichLinkBlockComponent';
import { SoundcloudBlockComponent } from '@frontend/amp/components/elements/SoundcloudBlockComponent';
import { EmbedBlockComponent } from '@frontend/amp/components/elements/EmbedBlockComponent';
>>>>>>> Update paths
import { findAdSlots } from '@frontend/amp/lib/find-adslots';
import { Ad } from '@frontend/amp/components/Ad';
import { css } from 'emotion';
import { Disclaimer } from '@root/packages/frontend/amp/components/elements/Disclaimer';
import { clean } from '@frontend/model/clean';
<<<<<<< HEAD
import { Expandable } from '@frontend/amp/components/Expandable';
import { Timeline } from '@frontend/amp/components/elements/Timeline';
import { YoutubeVideo } from '@frontend/amp/components/elements/YoutubeVideo';
=======
>>>>>>> Update paths

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
            case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
<<<<<<< HEAD
                return <VideoYoutube key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                return <VideoVimeo key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                return <VideoFacebook key={i} element={element} />;
            case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                return <VideoGuardian key={i} element={element} />;
=======
                return (
                    <VideoYoutubeBlockComponent
                        key={i}
                        element={element}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                return (
                    <VideoVimeoBlockComponent
                        key={i}
                        element={element}
                        pillar={pillar}
                    />
                );
            case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                return (
                    <VideoFacebookBlockComponent
                        key={i}
                        element={element}
                        pillar={pillar}
                    />
                );
>>>>>>> Add Caption from GUUI to all videos
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
