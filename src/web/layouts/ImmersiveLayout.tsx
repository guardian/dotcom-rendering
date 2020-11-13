import React from 'react';
import { css } from 'emotion';

import {
    neutral,
    brandBackground,
    brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { Caption } from '@root/src/web/components/Caption';
import { HeadlineByline } from '@root/src/web/components/HeadlineByline';
import { ImmersiveHeadline } from '@root/src/web/components/ImmersiveHeadline';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';

import {
    decideLineCount,
    decideLineEffect,
    getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import { Display } from '@root/src/lib/display';
import { BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { Hide } from '../components/Hide';

const ImmersiveGrid = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            /* IE Fallback */
            display: flex;
            flex-direction: column;
            ${until.leftCol} {
                margin-left: 0px;
            }
            ${from.leftCol} {
                margin-left: 151px;
            }
            ${from.wide} {
                margin-left: 230px;
            }

            @supports (display: grid) {
                display: grid;
                width: 100%;
                margin-left: 0;

                ${from.wide} {
                    grid-column-gap: 10px;
                    grid-template-columns:
                        219px /* Left Column (220 - 1px border) */
                        1px /* Vertical grey border */
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'caption    border      title       right-column'
                        '.          border      headline    right-column'
                        '.          border      standfirst  right-column'
                        '.          border      byline      right-column'
                        'lines      border      body        right-column'
                        'meta       border      body        right-column'
                        'meta       border      body        right-column'
                        '.          border      body        right-column'
                        '.          border      .           right-column';
                }

                ${until.wide} {
                    grid-column-gap: 10px;
                    grid-template-columns:
                        140px /* Left Column (220 - 1px border) */
                        1px /* Vertical grey border */
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        '.          border      title       right-column'
                        '.          border      headline    right-column'
                        '.          border      standfirst  right-column'
                        '.          border      byline      right-column'
                        'lines      border      body        right-column'
                        'meta       border      body        right-column'
                        'meta       border      body        right-column'
                        '.          border      body        right-column'
                        '.          border      .           right-column';
                }

                ${until.leftCol} {
                    grid-column-gap: 20px;
                    grid-template-columns:
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title       right-column'
                        'headline    right-column'
                        'standfirst  right-column'
                        'byline      right-column'
                        'caption     right-column'
                        'lines       right-column'
                        'meta        right-column'
                        'body        right-column';
                }

                ${until.desktop} {
                    grid-column-gap: 0px;
                    grid-template-columns: 1fr; /* Main content */
                    grid-template-areas:
                        'title'
                        'headline'
                        'standfirst'
                        'byline'
                        'caption'
                        'lines'
                        'meta'
                        'body';
                }
            }
        `}
    >
        {children}
    </div>
);

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

const stretchLines = css`
    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
    }
    ${until.mobileLandscape} {
        margin-left: -10px;
        margin-right: -10px;
    }
`;

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    display: Display;
    designType: DesignType;
    pillar: Pillar;
}

const decideCaption = (mainMedia: ImageBlockElement): string => {
    const caption = [];
    if (mainMedia && mainMedia.data && mainMedia.data.caption)
        caption.push(mainMedia.data.caption);
    if (
        mainMedia &&
        mainMedia.displayCredit &&
        mainMedia.data &&
        mainMedia.data.credit
    )
        caption.push(mainMedia.data.credit);
    return caption.join(' ');
};

export const ImmersiveLayout = ({
    CAPI,
    NAV,
    display,
    designType,
    pillar,
}: Props) => {
    const {
        config: { isPaidContent, host },
    } = CAPI;

    const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

    const showBodyEndSlot =
        parse(CAPI.slotMachineFlags || '').showBodyEnd ||
        CAPI.config.switches.slotBodyEnd;

    // TODO:
    // 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
    // 2) Otherwise, ensure slot only renders if `CAPI.config.shouldHideReaderRevenue` equals false.

    const seriesTag = CAPI.tags.find(
        (tag) => tag.type === 'Series' || tag.type === 'Blog',
    );
    const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

    const showComments = CAPI.isCommentable;

    const mainMedia = CAPI.mainMediaElements[0] as ImageBlockElement;
    const captionText = decideCaption(mainMedia);
    const { branding } = CAPI.commercialProperties[CAPI.editionId];
    return (
        <>
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    min-height: ${mainMedia && '100vh'};
                `}
            >
                <Section
                    showSideBorders={false}
                    showTopBorder={false}
                    padded={false}
                    backgroundColour={brandBackground.primary}
                >
                    <Nav
                        pillar={getCurrentPillar(CAPI)}
                        nav={NAV}
                        display={display}
                        subscribeUrl={
                            CAPI.nav.readerRevenueLinks.header.subscribe
                        }
                        edition={CAPI.editionId}
                    />
                </Section>
                {mainMedia && (
                    <div
                        className={css`
                            flex: 1;
                            min-height: 31.25rem;
                            position: relative;
                        `}
                    >
                        <MainMedia
                            display={display}
                            designType={designType}
                            elements={CAPI.mainMediaElements}
                            pillar={pillar}
                            adTargeting={adTargeting}
                            starRating={
                                CAPI.designType === 'Review' && CAPI.starRating
                                    ? CAPI.starRating
                                    : undefined
                            }
                            hideCaption={true}
                        />
                    </div>
                )}
            </div>

            {mainMedia && (
                <ImmersiveHeadline
                    display={display}
                    designType={designType}
                    tags={CAPI.tags}
                    author={CAPI.author}
                    headline={CAPI.headline}
                    sectionLabel={CAPI.sectionLabel}
                    sectionUrl={CAPI.sectionUrl}
                    guardianBaseURL={CAPI.guardianBaseURL}
                    pillar={CAPI.pillar}
                    captionText={captionText}
                    badge={CAPI.badge}
                />
            )}

            <Section showTopBorder={false} showSideBorders={false}>
                <ImmersiveGrid>
                    {/* Above leftCol, the Caption is controled by ImmersiveHeadline because the
                    headline stretches all the way right it can't be inside a Section so that
                    top area of the page is rendered outside the grid */}
                    <GridItem area="caption">
                        <Hide when="above" breakpoint="leftCol">
                            <Caption
                                display={display}
                                designType={designType}
                                captionText={captionText}
                                pillar={pillar}
                                shouldLimitWidth={false}
                            />
                        </Hide>
                    </GridItem>
                    <GridItem area="border">
                        {designType === 'PhotoEssay' ? <></> : <Border />}
                    </GridItem>
                    <GridItem area="title">
                        <>
                            {!mainMedia && (
                                <div
                                    className={css`
                                        margin-top: -3px;
                                        margin-left: -10px;

                                        ${until.tablet} {
                                            margin-left: -20px;
                                        }
                                    `}
                                >
                                    <ArticleTitle
                                        display={display}
                                        designType={designType}
                                        tags={CAPI.tags}
                                        sectionLabel={CAPI.sectionLabel}
                                        sectionUrl={CAPI.sectionUrl}
                                        guardianBaseURL={CAPI.guardianBaseURL}
                                        pillar={pillar}
                                        badge={CAPI.badge}
                                    />
                                </div>
                            )}
                        </>
                    </GridItem>
                    <GridItem area="headline">
                        <>
                            {!mainMedia && (
                                <div className={maxWidth}>
                                    <ArticleHeadlinePadding
                                        designType={designType}
                                    >
                                        <ArticleHeadline
                                            display={display}
                                            headlineString={CAPI.headline}
                                            designType={designType}
                                            pillar={pillar}
                                            tags={CAPI.tags}
                                            byline={CAPI.author.byline}
                                            noMainMedia={true}
                                        />
                                    </ArticleHeadlinePadding>
                                </div>
                            )}
                        </>
                    </GridItem>
                    <GridItem area="standfirst">
                        <ArticleStandfirst
                            display={display}
                            designType={designType}
                            pillar={pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </GridItem>
                    <GridItem area="byline">
                        <HeadlineByline
                            display={display}
                            designType={designType}
                            pillar={pillar}
                            tags={CAPI.tags}
                            byline={
                                CAPI.author.byline ? CAPI.author.byline : ''
                            }
                        />
                    </GridItem>
                    <GridItem area="lines">
                        {designType === 'PhotoEssay' ? (
                            <></>
                        ) : (
                            <div className={maxWidth}>
                                <div className={stretchLines}>
                                    <GuardianLines
                                        pillar={pillar}
                                        effect={decideLineEffect(
                                            'Immersive',
                                            pillar,
                                        )}
                                        count={decideLineCount('Immersive')}
                                    />
                                </div>
                            </div>
                        )}
                    </GridItem>
                    <GridItem area="meta">
                        <div className={maxWidth}>
                            <ArticleMeta
                                branding={branding}
                                display={display}
                                designType={designType}
                                pillar={pillar}
                                pageId={CAPI.pageId}
                                webTitle={CAPI.webTitle}
                                author={CAPI.author}
                                tags={CAPI.tags}
                                primaryDateline={CAPI.webPublicationDateDisplay}
                                secondaryDateline={
                                    CAPI.blocks[0].secondaryDateLine
                                }
                            />
                        </div>
                    </GridItem>
                    <GridItem area="body">
                        <ArticleContainer>
                            <main className={maxWidth}>
                                <ArticleBody
                                    display={display}
                                    pillar={pillar}
                                    blocks={CAPI.blocks}
                                    designType={designType}
                                    adTargeting={adTargeting}
                                    host={host}
                                />
                                {showBodyEndSlot && <div id="slot-body-end" />}
                                <GuardianLines count={4} pillar={pillar} />
                                <SubMeta
                                    pillar={pillar}
                                    subMetaKeywordLinks={
                                        CAPI.subMetaKeywordLinks
                                    }
                                    subMetaSectionLinks={
                                        CAPI.subMetaSectionLinks
                                    }
                                    pageId={CAPI.pageId}
                                    webUrl={CAPI.webURL}
                                    webTitle={CAPI.webTitle}
                                    showBottomSocialButtons={
                                        CAPI.showBottomSocialButtons
                                    }
                                    badge={CAPI.badge}
                                />
                            </main>
                        </ArticleContainer>
                    </GridItem>
                    <GridItem area="right-column">
                        <RightColumn>
                            <>
                                {mainMedia && (
                                    <div
                                        className={css`
                                            margin-top: ${space[4]}px;
                                        `}
                                    >
                                        <AdSlot
                                            asps={namedAdSlotParameters(
                                                'right',
                                            )}
                                        />
                                    </div>
                                )}
                            </>
                        </RightColumn>
                    </GridItem>
                </ImmersiveGrid>
            </Section>

            <Section
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot asps={namedAdSlotParameters('merchandising-high')} />
            </Section>

            {!isPaidContent && (
                <>
                    {/* Onwards (when signed OUT) */}
                    <div id="onwards-upper-whensignedout" />
                    {showOnwardsLower && (
                        <Section sectionId="onwards-lower-whensignedout" />
                    )}

                    {showComments && (
                        <Section sectionId="comments">
                            <CommentsLayout
                                pillar={pillar}
                                baseUrl={CAPI.config.discussionApiUrl}
                                shortUrl={CAPI.config.shortUrlId}
                                commentCount={0}
                                isClosedForComments={true}
                                discussionD2Uid={CAPI.config.discussionD2Uid}
                                discussionApiClientHeader={
                                    CAPI.config.discussionApiClientHeader
                                }
                                enableDiscussionSwitch={false}
                                expanded={false}
                                onPermalinkClick={() => {}}
                            />
                        </Section>
                    )}

                    {/* Onwards (when signed IN) */}
                    <div id="onwards-upper-whensignedin" />
                    {showOnwardsLower && (
                        <Section sectionId="onwards-lower-whensignedin" />
                    )}

                    <Section sectionId="most-viewed-footer" />
                </>
            )}

            <Section
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot asps={namedAdSlotParameters('merchandising')} />
            </Section>

            {NAV.subNavSections && (
                <Section padded={false} sectionId="sub-nav-root">
                    <SubNav
                        subNavSections={NAV.subNavSections}
                        currentNavLink={NAV.currentNavLink}
                        pillar={pillar}
                    />
                    <GuardianLines count={4} pillar={pillar} />
                </Section>
            )}

            <Section
                padded={false}
                backgroundColour={brandBackground.primary}
                borderColour={brandBorder.primary}
            >
                <Footer
                    pageFooter={CAPI.pageFooter}
                    pillar={pillar}
                    pillars={NAV.pillars}
                />
            </Section>

            <BannerWrapper />
            <MobileStickyContainer />
        </>
    );
};
