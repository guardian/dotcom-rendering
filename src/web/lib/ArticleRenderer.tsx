import React from 'react';
import { css } from 'emotion';

import { BlockquoteBlockComponent } from '@root/src/web/components/elements/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '@root/src/web/components/elements/CalloutBlockComponent';
import { CaptionBlockComponent } from '@root/src/web/components/elements/CaptionBlockComponent';
import { CommentBlockComponent } from '@root/src/web/components/elements/CommentBlockComponent';
import { DocumentBlockComponent } from '@root/src/web/components/elements/DocumentBlockComponent';
import { DisclaimerBlockComponent } from '@root/src/web/components/elements/DisclaimerBlockComponent';
import { DividerBlockComponent } from '@root/src/web/components/elements/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/elements/UnsafeEmbedBlockComponent';
import { HighlightBlockComponent } from '@root/src/web/components/elements/HighlightBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/elements/InstagramBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/web/components/elements/MapEmbedBlockComponent';
import { MultiImageBlockComponent } from '@root/src/web/components/elements/MultiImageBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/web/components/elements/PullQuoteBlockComponent';
import { SoundcloudBlockComponent } from '@root/src/web/components/elements/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '@root/src/web/components/elements/SpotifyBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/elements/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/web/components/elements/TableBlockComponent';
import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/elements/TweetBlockComponent';
import { VideoFacebookBlockComponent } from '@root/src/web/components/elements/VideoFacebookBlockComponent';
import { VimeoBlockComponent } from '@root/src/web/components/elements/VimeoBlockComponent';
import { YoutubeEmbedBlockComponent } from '@root/src/web/components/elements/YoutubeEmbedBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';

import {
    AudioAtom,
    ChartAtom,
    ExplainerAtom,
    InteractiveAtom,
    QandaAtom,
    GuideAtom,
    ProfileAtom,
    TimelineAtom,
} from '@guardian/atoms-rendering';
import { Display } from '@root/src/lib/display';
import { withSignInGateSlot } from '@root/src/web/lib/withSignInGateSlot';
import { GuVideoBlockComponent } from '@root/src/web/components/elements/GuVideoBlockComponent';
import { toTypesPillar } from '@root/src/lib/format';
import { DefaultRichLink } from '../components/RichLink';

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
    host?: string;
}> = ({ display, elements, pillar, designType, adTargeting, host }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
                    return (
                        <div id={`audio-atom-${i}`}>
                            <AudioAtom
                                id={element.id}
                                trackUrl={element.trackUrl}
                                kicker={element.kicker}
                                title={element.title}
                                pillar={toTypesPillar(pillar)}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
                    return (
                        <BlockquoteBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.CaptionBlockElement':
                    return (
                        <CaptionBlockComponent
                            key={i}
                            display={display}
                            designType={designType}
                            pillar={pillar}
                            captionText={element.captionText}
                            padCaption={element.padCaption}
                            credit={element.credit}
                            displayCredit={element.displayCredit}
                            shouldLimitWidth={element.shouldLimitWidth}
                            isOverlayed={element.isOverlayed}
                        />
                    );
                case 'model.dotcomrendering.pageElements.CommentBlockElement':
                    return (
                        <CommentBlockComponent
                            body={element.body}
                            avatarURL={element.avatarURL}
                            profileURL={element.profileURL}
                            profileName={element.profileName}
                            dateTime={element.dateTime}
                            permalink={element.permalink}
                        />
                    );
                case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                    return (
                        <DisclaimerBlockComponent
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.DividerBlockElement':
                    return <DividerBlockComponent />;
                case 'model.dotcomrendering.pageElements.CalloutBlockElement':
                    return (
                        <div id={`callout-${i}`}>
                            <CalloutBlockComponent
                                callout={element}
                                pillar={pillar}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
                    return <ChartAtom id={element.id} html={element.html} />;
                case 'model.dotcomrendering.pageElements.DocumentBlockElement':
                    return (
                        <DocumentBlockComponent
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            title={element.title}
                        />
                    );
                case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                    if (!element.safe) {
                        return (
                            <UnsafeEmbedBlockComponent
                                key={i}
                                html={element.html}
                                alt={element.alt || ''}
                                index={i}
                            />
                        );
                    }
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
                case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
                    return (
                        <div id={`guide-atom-${i}`}>
                            <GuideAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                    return (
                        <GuVideoBlockComponent
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            display={display}
                            credit={element.source}
                            caption={element.caption}
                        />
                    );
                case 'model.dotcomrendering.pageElements.HighlightBlockElement':
                    return (
                        <HighlightBlockComponent key={i} html={element.html} />
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
                case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
                    return (
                        <InteractiveAtom
                            id={element.id}
                            html={element.html}
                            js={element.js}
                            css={element.css}
                        />
                    );
                case 'model.dotcomrendering.pageElements.MapBlockElement':
                    return (
                        <MapEmbedBlockComponent
                            pillar={pillar}
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            caption={element.caption}
                            credit={element.source}
                            title={element.title}
                            display={display}
                            designType={designType}
                        />
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
                case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
                    return (
                        <div id={`profile-atom-${i}`}>
                            <ProfileAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
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
                case 'model.dotcomrendering.pageElements.QABlockElement':
                    return (
                        <div id={`qanda-atom-${i}`}>
                            <QandaAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return (
                        <div key={i} id={`rich-link-${i}`}>
                            <DefaultRichLink
                                index={i}
                                headlineText={element.text}
                                url={element.url}
                                isPlaceholder={true}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                    return (
                        <SoundcloudBlockComponent key={i} element={element} />
                    );
                case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
                    return (
                        <SpotifyBlockComponent
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            title={element.title}
                            pillar={pillar}
                            caption={element.caption}
                            designType={designType}
                            display={display}
                            credit="Spotify"
                        />
                    );
                case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                    return (
                        <SubheadingBlockComponent key={i} html={element.html} />
                    );
                case 'model.dotcomrendering.pageElements.TableBlockElement':
                    return <TableBlockComponent element={element} />;
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return (
                        <>
                            <TextBlockComponent
                                key={i}
                                isFirstParagraph={i === 0}
                                html={element.html}
                                pillar={pillar}
                                display={display}
                                designType={designType}
                                forceDropCap={element.dropCap}
                            />
                        </>
                    );
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return <TweetBlockComponent key={i} element={element} />;
                case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                    return (
                        <VideoFacebookBlockComponent
                            pillar={pillar}
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            caption={element.caption}
                            display={display}
                            designType={designType}
                            credit={element.caption}
                            title={element.caption}
                        />
                    );
                case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                    return (
                        <VimeoBlockComponent
                            pillar={pillar}
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            caption={element.caption}
                            credit={element.credit}
                            title={element.title}
                            display={display}
                            designType={designType}
                        />
                    );
                case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
                    return (
                        <YoutubeEmbedBlockComponent
                            pillar={pillar}
                            embedUrl={element.embedUrl}
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
                        <div key={i} id={`youtube-block-${i}`}>
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
                                overlayImage={element.overrideImage}
                                duration={element.duration}
                                origin={host}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.TimelineBlockElement':
                    return (
                        <div id={`timeline-atom-${i}`}>
                            <TimelineAtom
                                id={element.id}
                                title={element.title}
                                pillar={pillar}
                                events={element.events}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.AudioBlockElement':
                case 'model.dotcomrendering.pageElements.CodeBlockElement':
                case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
                case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
                case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
                case 'model.dotcomrendering.pageElements.VideoBlockElement':
                    return null;
            }
        })
        .filter((_) => _ != null);

    return (
        <div
            className={`article-body-commercial-selector ${commercialPosition}`}
        >
            {/* Insert the placeholder for the sign in gate on the 2nd article element */}
            {withSignInGateSlot(output)}
        </div>
    ); // classname that space finder is going to target for in-body ads in DCR
};
