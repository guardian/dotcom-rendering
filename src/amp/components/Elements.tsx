import React from 'react';

import { Expandable } from '@root/src/amp/components/Expandable';
import { Disclaimer } from '@root/src/amp/components/elements/Disclaimer';
import { Text } from '@root/src/amp/components/elements/Text';
import { Subheading } from '@root/src/amp/components/elements/Subheading';
import { Image } from '@root/src/amp/components/elements/Image';
import { VideoYoutube } from '@root/src/amp/components/elements/VideoYoutube';
import { VideoVimeo } from '@root/src/amp/components/elements/VideoVimeo';
import { VideoFacebook } from '@root/src/amp/components/elements/VideoFacebook';
import { VideoGuardian } from '@root/src/amp/components/elements/VideoGuardian';
import { InstagramEmbed } from '@root/src/amp/components/elements/InstagramEmbed';
import { TwitterEmbed } from '@root/src/amp/components/elements/TwitterEmbed';
import { Comment } from '@root/src/amp/components/elements/Comment';
import { RichLink } from '@root/src/amp/components/elements/RichLink';
import { SoundcloudEmbed } from '@root/src/amp/components/elements/SoundcloudEmbed';
import { Embed } from '@root/src/amp/components/elements/Embed';
import { PullQuote } from '@root/src/amp/components/elements/PullQuote';
import { clean } from '@root/src/model/clean';
import { Timeline } from '@root/src/amp/components/elements/Timeline';
import { YoutubeVideo } from '@root/src/amp/components/elements/YoutubeVideo';
import { InteractiveUrl } from '@root/src/amp/components/elements/InteractiveUrl';
import { InteractiveMarkup } from '@root/src/amp/components/elements/InteractiveMarkup';
import { MapEmbed } from '@root/src/amp/components/elements/MapEmbed';
import { AudioAtom } from '@root/src/amp/components/elements/AudioAtom';

export const Elements = (
    elements: CAPIElement[],
    pillar: Pillar,
    isImmersive: boolean,
    adTargeting?: AdTargeting,
): JSX.Element[] => {
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
                return (
                    <TwitterEmbed key={i} element={element} pillar={pillar} />
                );
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
                        type={element.label}
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
                        type={element.label}
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
                return (
                    <YoutubeVideo
                        element={element}
                        pillar={pillar}
                        adTargeting={adTargeting}
                    />
                );
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
            case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
                return <AudioAtom element={element} />;
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

    return output.filter(el => el !== null) as JSX.Element[];
};
