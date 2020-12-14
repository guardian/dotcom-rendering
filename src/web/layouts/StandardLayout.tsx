import React from 'react';
import { css } from 'emotion';

import {
    neutral,
    background,
    brandAltBackground,
    brandBackground,
    brandLine,
    brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { GuardianLines } from '@root/src/web/components/GuardianLines';

import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';
import { Placeholder } from '@frontend/web/components/Placeholder';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';
import { getAgeWarning } from '@root/src/lib/age-warning';
import {
    decideLineCount,
    decideLineEffect,
    getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import {
    Stuck,
    SendToBack,
    BannerWrapper,
} from '@root/src/web/layouts/lib/stickiness';
import { Display } from '@root/src/lib/display';

const MOSTVIEWED_STICKY_HEIGHT = 1059;

const gridTemplateWide = css`
    grid-template-areas:
        'title  border  headline     right-column'
        '.      border  standfirst   right-column'
        'lines  border  media        right-column'
        'meta   border  media        right-column'
        'meta   border  body         right-column'
        '.      border  .            right-column';
`;

const gridTemplateWidePreFurnished = css`
    grid-template-areas:
        'title  border  preFurniture right-column'
        '.      border  headline     right-column'
        '.      border  standfirst   right-column'
        'lines  border  media        right-column'
        'meta   border  media        right-column'
        'meta   border  body         right-column'
        '.      border  .            right-column';
`;

const gridTemplateLeftCol = css`
    grid-template-areas:
        'preFurniture  right-column'
        'title         right-column'
        'headline      right-column'
        'standfirst    right-column'
        'media         right-column'
        'lines         right-column'
        'meta          right-column'
        'body          right-column'
        '.             right-column';
`;

const gridTemplateLeftColPreFurnished = css`
    grid-template-areas:
        'title         right-column'
        'headline      right-column'
        'standfirst    right-column'
        'media         right-column'
        'lines         right-column'
        'meta          right-column'
        'body          right-column'
        '.             right-column';
`;

const gridTemplateDesktop = css`
    grid-template-areas:
        'title'
        'headline'
        'standfirst'
        'media'
        'lines'
        'meta'
        'body';
`;
const gridTemplateDesktopPreFurnished = css`
    grid-template-areas:
        'preFurniture'
        'title'
        'headline'
        'standfirst'
        'media'
        'lines'
        'meta'
        'body';
`;

const gridTemplateTablet = css`
    grid-template-areas:
        'media'
        'title'
        'headline'
        'standfirst'
        'lines'
        'meta'
        'body';
`;
const gridTemplateTabletPreFurnished = css`
    grid-template-areas:
        'preFurniture'
        'media'
        'title'
        'headline'
        'standfirst'
        'lines'
        'meta'
        'body';
`;

const layoutGrid = (hasPreFurniture?: boolean) =>
    css`
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

            grid-column-gap: 10px;

            ${from.wide} {
                grid-template-columns:
                    219px /* Left Column (220 - 1px border) */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */

                ${hasPreFurniture
                    ? gridTemplateWidePreFurnished
                    : gridTemplateWide}
            }

            ${until.wide} {
                grid-template-columns:
                    140px /* Left Column */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */

                ${hasPreFurniture
                    ? gridTemplateWidePreFurnished
                    : gridTemplateWide}
            }

            ${until.leftCol} {
                grid-template-columns:
                    1fr /* Main content */
                    300px; /* Right Column */
                ${hasPreFurniture
                    ? gridTemplateLeftColPreFurnished
                    : gridTemplateLeftCol}
            }

            ${until.desktop} {
                grid-template-columns: 1fr; /* Main content */
                ${hasPreFurniture
                    ? gridTemplateDesktopPreFurnished
                    : gridTemplateDesktop}
            }

            ${until.tablet} {
                grid-column-gap: 0px;

                grid-template-columns: 1fr; /* Main content */
                ${hasPreFurniture
                    ? gridTemplateTabletPreFurnished
                    : gridTemplateTablet}
            }
        }
    `;

const StandardGrid = ({
    children,
    designType,
    CAPI,
}: {
    children: JSX.Element | JSX.Element[];
    designType: DesignType;
    CAPI: CAPIType;
}) => (
    <div
        className={layoutGrid(designType === 'MatchReport' && !!CAPI.matchUrl)}
    >
        {children}
    </div>
);

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

const articleWidth = css`
    ${from.desktop} {
        width: 620px;
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

const starWrapper = css`
    margin-bottom: 18px;
    margin-top: 6px;
    background-color: ${brandAltBackground.primary};
    display: inline-block;

    ${until.phablet} {
        padding-left: 20px;
        margin-left: -20px;
    }
    ${until.leftCol} {
        padding-left: 0px;
        margin-left: -0px;
    }

    padding-left: 10px;
    margin-left: -10px;
`;

const ageWarningMargins = css`
    margin-top: 12px;
    margin-left: -10px;
    margin-bottom: 6px;

    ${from.tablet} {
        margin-left: -20px;
    }

    ${from.leftCol} {
        margin-left: -10px;
        margin-top: 0;
    }
`;

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    display: Display;
    designType: DesignType;
    pillar: Pillar;
}

export const StandardLayout = ({
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

    const showMatchStats = designType === 'MatchReport' && CAPI.matchUrl;

    const showComments = CAPI.isCommentable;

    const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

    const { branding } = CAPI.commercialProperties[CAPI.editionId];
    return (
        <>
            <div data-print-layout='hide'>

                <Stuck>
                    <Section
                        data-print-layout='hide'
                        showTopBorder={false}
                        showSideBorders={false}
                        padded={false}
                        shouldCenter={false}
                    >
                        <HeaderAdSlot
                            data-print-layout='hide'
                            isAdFreeUser={CAPI.isAdFreeUser}
                            shouldHideAds={CAPI.shouldHideAds}
                        />
                    </Section>
                </Stuck>
                <SendToBack>
                    <Section
                        data-print-layout='hide'
                        showTopBorder={false}
                        showSideBorders={false}
                        padded={false}
                        backgroundColour={brandBackground.primary}
                    >
                        <Header edition={CAPI.editionId} />
                    </Section>

                    <Section
                        data-print-layout='hide'
                        showSideBorders={true}
                        borderColour={brandLine.primary}
                        showTopBorder={false}
                        padded={false}
                        backgroundColour={brandBackground.primary}
                    >
                        <Nav
                            data-print-layout='hide'
                            pillar={getCurrentPillar(CAPI)}
                            nav={NAV}
                            display={display}
                            subscribeUrl={
                                CAPI.nav.readerRevenueLinks.header.subscribe
                            }
                            edition={CAPI.editionId}
                        />
                    </Section>

                    {NAV.subNavSections && (
                        <Section
                            data-print-layout='hide'
                            backgroundColour={background.primary}
                            padded={false}
                            sectionId="sub-nav-root"
                        >
                            <SubNav
                                data-print-layout='hide'
                                subNavSections={NAV.subNavSections}
                                currentNavLink={NAV.currentNavLink}
                                pillar={pillar}
                            />
                        </Section>
                    )}

                    <Section
                        data-print-layout='hide'
                        backgroundColour={background.primary}
                        padded={false}
                        showTopBorder={false}
                    >
                        <GuardianLines data-print-layout='hide' count={4} pillar={pillar} />
                    </Section>
                </SendToBack>
            </div>

            <Section data-print-layout='hide' showTopBorder={false}>
                <StandardGrid designType={designType} CAPI={CAPI}>
                    <GridItem area="title">
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
                    </GridItem>
                    <GridItem area="border">
                        <Border />
                    </GridItem>
                    <GridItem area="preFurniture">
                        <div className={maxWidth}>
                            {designType === 'MatchReport' && CAPI.matchUrl && (
                                <Placeholder rootId="match-nav" height={230} />
                            )}
                        </div>
                    </GridItem>
                    <GridItem area="headline">
                        <div className={maxWidth}>
                            <ArticleHeadlinePadding designType={designType}>
                                {age && (
                                    <div className={ageWarningMargins}>
                                        <AgeWarning age={age} />
                                    </div>
                                )}
                                <ArticleHeadline
                                    display={display}
                                    headlineString={CAPI.headline}
                                    designType={designType}
                                    pillar={pillar}
                                    tags={CAPI.tags}
                                    byline={CAPI.author.byline}
                                />
                                {age && (
                                    <AgeWarning
                                        age={age}
                                        isScreenReader={true}
                                    />
                                )}
                            </ArticleHeadlinePadding>
                        </div>
                        {CAPI.starRating || CAPI.starRating === 0 ? (
                            <div className={starWrapper}>
                                <StarRating
                                    rating={CAPI.starRating}
                                    size="large"
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </GridItem>
                    <GridItem area="standfirst">
                        <ArticleStandfirst
                            display={display}
                            designType={designType}
                            pillar={pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </GridItem>
                    <GridItem area="media">
                        <div className={maxWidth}>
                            <MainMedia
                                display={display}
                                designType={designType}
                                elements={CAPI.mainMediaElements}
                                pillar={pillar}
                                adTargeting={adTargeting}
                            />
                        </div>
                    </GridItem>
                    <GridItem data-print-layout='hide' area="lines">
                        <div className={maxWidth}>
                            <div className={stretchLines}>
                                <GuardianLines
                                    count={decideLineCount(designType)}
                                    pillar={pillar}
                                    effect={decideLineEffect(
                                        designType,
                                        pillar,
                                    )}
                                />
                            </div>
                        </div>
                    </GridItem>
                    <GridItem data-print-layout='hide' area="meta">
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
                                primaryDateline={CAPI.blocks[0].primaryDateLine}
                                secondaryDateline={
                                    CAPI.blocks[0].secondaryDateLine
                                }
                            />
                        </div>
                    </GridItem>
                    <GridItem area="body">
                        <ArticleContainer>
                            <main className={articleWidth}>
                                <ArticleBody
                                    pillar={pillar}
                                    blocks={CAPI.blocks}
                                    display={display}
                                    designType={designType}
                                    adTargeting={adTargeting}
                                    host={host}
                                />
                                {showMatchStats && <div id="match-stats" />}

                                {showBodyEndSlot && <div id="slot-body-end" />}
                                <GuardianLines data-print-layout='hide' count={4} pillar={pillar} />
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
                            <StickyAd
                                name="right"
                                height={MOSTVIEWED_STICKY_HEIGHT}
                            />
                            {!isPaidContent ? <MostViewedRightIsland /> : <></>}
                        </RightColumn>
                    </GridItem>
                </StandardGrid>
            </Section>

            <Section
                data-print-layout='hide'
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot data-print-layout='hide' asps={namedAdSlotParameters('merchandising-high')} />
            </Section>

            {!isPaidContent && (
                <>
                    {/* Onwards (when signed OUT) */}
                    <div data-print-layout='hide' id="onwards-upper-whensignedout" />
                    {showOnwardsLower && (
                        <Section data-print-layout='hide' sectionId="onwards-lower-whensignedout" />
                    )}

                    {showComments && (
                        <Section data-print-layout='hide' sectionId="comments">
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
                    <div data-print-layout='hide' id="onwards-upper-whensignedin" />
                    {showOnwardsLower && (
                        <Section data-print-layout='hide' sectionId="onwards-lower-whensignedin" />
                    )}

                    <Section data-print-layout='hide' sectionId="most-viewed-footer" />
                </>
            )}

            <Section
                data-print-layout='hide'
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot data-print-layout='hide' asps={namedAdSlotParameters('merchandising')} />
            </Section>

            {NAV.subNavSections && (
                <Section data-print-layout='hide' padded={false} sectionId="sub-nav-root">
                    <SubNav
                        subNavSections={NAV.subNavSections}
                        currentNavLink={NAV.currentNavLink}
                        pillar={pillar}
                    />
                    <GuardianLines count={4} pillar={pillar} />
                </Section>
            )}

            <Section
                data-print-layout='hide'
                padded={false}
                backgroundColour={brandBackground.primary}
                borderColour={brandBorder.primary}
                showSideBorders={false}
            >
                <Footer
                    pageFooter={CAPI.pageFooter}
                    pillar={pillar}
                    pillars={NAV.pillars}
                />
            </Section>

            <BannerWrapper data-print-layout='hide' />
            <MobileStickyContainer data-print-layout='hide' />
        </>
    );
};
