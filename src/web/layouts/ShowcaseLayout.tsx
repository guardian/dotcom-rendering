import React from 'react';
import { css } from 'emotion';

import {
    neutral,
    border,
    background,
    brandBackground,
    brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';

import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { Flex } from '@root/src/web/components/Flex';

import { getZIndex } from '@frontend/web/lib/getZIndex';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';

import {
    decideLineCount,
    decideLineEffect,
    getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';

const ShowcaseGrid = ({
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

                grid-column-gap: 10px;

                ${from.wide} {
                    grid-template-columns:
                        219px /* Left Column (220 - 1px border) */
                        1px /* Vertical grey border */
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title  border  headline    headline'
                        'lines  border  media       media'
                        'meta   border  media       media'
                        'meta   border  standfirst  right-column'
                        '.      border  body        right-column'
                        '.      border  .           right-column';
                }

                ${until.wide} {
                    grid-template-columns:
                        140px /* Left Column (220 - 1px border) */
                        1px /* Vertical grey border */
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title  border  headline    headline'
                        'lines  border  media       media'
                        'meta   border  media       media'
                        'meta   border  standfirst  right-column'
                        '.      border  body        right-column'
                        '.      border  .           right-column';
                }

                ${until.leftCol} {
                    grid-template-columns:
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title      right-column'
                        'headline   right-column'
                        'standfirst right-column'
                        'media      right-column'
                        'lines      right-column'
                        'meta       right-column'
                        'body       right-column'
                        '.          right-column';
                }

                ${until.desktop} {
                    grid-column-gap: 0px;
                    grid-template-columns: 1fr; /* Main content */
                    grid-template-areas:
                        'title'
                        'headline'
                        'standfirst'
                        'media'
                        'lines'
                        'meta'
                        'body';
                }

                ${until.tablet} {
                    grid-column-gap: 0px;
                    grid-template-columns: 1fr; /* Main content */
                    grid-template-areas:
                        'media'
                        'title'
                        'headline'
                        'standfirst'
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
`;

const mainMediaWrapper = css`
    position: relative;
`;

const PositionHeadline = ({
    designType,
    children,
}: {
    designType: DesignType;
    children: JSX.Element | JSX.Element[];
}) => {
    switch (designType) {
        case 'Interview':
            return (
                <div
                    className={css`
                        ${from.leftCol} {
                            margin-bottom: -100px;
                        }
                    `}
                >
                    <div className={maxWidth}>{children}</div>
                </div>
            );
        case 'Immersive':
            return (
                <div
                    className={css`
                        ${from.leftCol} {
                            margin-top: -100px;
                        }
                    `}
                >
                    {children}
                </div>
            );
        case 'Article':
        case 'Media':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Feature':
        case 'Comment':
        case 'Analysis':
        default:
            return <div className={maxWidth}>{children}</div>;
    }
};

// The advert is stuck to the top of the container as we scroll
// until we hit the bottom of the wrapper that contains
// the top banner and the header/navigation
// We apply sticky positioning and z-indexes, the stickAdWrapper and headerWrapper
// classes are tightly coupled.

const stickyAdWrapper = css`
    background-color: white;
    border-bottom: 0.0625rem solid ${border.secondary};
    position: sticky;
    top: 0;
    ${getZIndex('stickyAdWrapper')}
`;

const headerWrapper = css`
    position: relative;
    ${getZIndex('headerWrapper')}
`;

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
}

export const ShowcaseLayout = ({ CAPI, NAV }: Props) => {
    const {
        config: { isPaidContent },
        pageType: { isSensitive },
    } = CAPI;

    const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

    // Render the slot if one is true:
    // 1) The flag for this slot exists in the URL (i.e. ?slot-machine-flags=showBodyEnd)
    // 2) The global switch for the Frontend/DCR Epic test is true
    const showBodyEndSlot =
        parse(CAPI.slotMachineFlags || '').showBodyEnd ||
        CAPI.config.switches.abFrontendDotcomRenderingEpic;

    // TODO:
    // 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
    // 2) Otherwise, ensure slot only renders if `CAPI.config.shouldHideReaderRevenue` equals false.

    const seriesTag = CAPI.tags.find(
        tag => tag.type === 'Series' || tag.type === 'Blog',
    );
    const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

    const showComments = CAPI.isCommentable;

    return (
        <>
            <div>
                <div className={stickyAdWrapper}>
                    <Section
                        showTopBorder={false}
                        showSideBorders={false}
                        padded={false}
                    >
                        <HeaderAdSlot
                            isAdFreeUser={CAPI.isAdFreeUser}
                            shouldHideAds={CAPI.shouldHideAds}
                        />
                    </Section>
                </div>
                <div className={headerWrapper}>
                    <Section
                        showTopBorder={false}
                        showSideBorders={false}
                        padded={false}
                        backgroundColour={brandBackground.primary}
                    >
                        <Header edition={CAPI.editionId} />
                    </Section>

                    <Section
                        sectionId="nav-root"
                        showSideBorders={true}
                        borderColour={brandBorder.primary}
                        showTopBorder={false}
                        padded={false}
                        backgroundColour={brandBackground.primary}
                    >
                        <Nav pillar={getCurrentPillar(CAPI)} nav={NAV} />
                    </Section>

                    {NAV.subNavSections && (
                        <Section
                            backgroundColour={background.primary}
                            padded={false}
                            sectionId="sub-nav-root"
                        >
                            <SubNav
                                subNavSections={NAV.subNavSections}
                                currentNavLink={NAV.currentNavLink}
                                pillar={CAPI.pillar}
                            />
                        </Section>
                    )}

                    <Section
                        backgroundColour={background.primary}
                        padded={false}
                        showTopBorder={false}
                    >
                        <GuardianLines pillar={CAPI.pillar} />
                    </Section>
                </div>
            </div>

            <Section showTopBorder={false}>
                <ShowcaseGrid>
                    <GridItem area="title">
                        <ArticleTitle
                            tags={CAPI.tags}
                            sectionLabel={CAPI.sectionLabel}
                            sectionUrl={CAPI.sectionUrl}
                            guardianBaseURL={CAPI.guardianBaseURL}
                            pillar={CAPI.pillar}
                            badge={CAPI.badge}
                            inLeftCol={true}
                        />
                    </GridItem>
                    <GridItem area="border">
                        <Border />
                    </GridItem>
                    <GridItem area="headline">
                        <PositionHeadline designType={CAPI.designType}>
                            <div
                                className={css`
                                    padding-bottom: 24px;
                                `}
                            >
                                <ArticleHeadline
                                    headlineString={CAPI.headline}
                                    designType={CAPI.designType}
                                    pillar={CAPI.pillar}
                                    webPublicationDate={CAPI.webPublicationDate}
                                    tags={CAPI.tags}
                                    byline={CAPI.author.byline}
                                />
                            </div>
                        </PositionHeadline>
                    </GridItem>
                    <GridItem area="media">
                        <div className={mainMediaWrapper}>
                            <MainMedia
                                elements={CAPI.mainMediaElements}
                                pillar={CAPI.pillar}
                                adTargeting={adTargeting}
                                starRating={
                                    CAPI.designType === 'Review' &&
                                    CAPI.starRating
                                        ? CAPI.starRating
                                        : undefined
                                }
                            />
                        </div>
                    </GridItem>
                    <GridItem area="standfirst">
                        <ArticleStandfirst
                            designType={CAPI.designType}
                            pillar={CAPI.pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </GridItem>
                    <GridItem area="lines">
                        <div className={maxWidth}>
                            <div className={stretchLines}>
                                <GuardianLines
                                    pillar={CAPI.pillar}
                                    effect={decideLineEffect(
                                        CAPI.designType,
                                        CAPI.pillar,
                                    )}
                                    count={decideLineCount(CAPI.designType)}
                                />
                            </div>
                        </div>
                    </GridItem>
                    <GridItem area="meta">
                        <div className={maxWidth}>
                            <ArticleMeta
                                designType={CAPI.designType}
                                pillar={CAPI.pillar}
                                pageId={CAPI.pageId}
                                webTitle={CAPI.webTitle}
                                author={CAPI.author}
                                tags={CAPI.tags}
                                webPublicationDateDisplay={
                                    CAPI.webPublicationDateDisplay
                                }
                            />
                        </div>
                    </GridItem>
                    <GridItem area="body">
                        <ArticleContainer>
                            <main className={maxWidth}>
                                <ArticleBody CAPI={CAPI} />
                                {showBodyEndSlot && <div id="slot-body-end" />}
                                <GuardianLines pillar={CAPI.pillar} />
                                <SubMeta
                                    pillar={CAPI.pillar}
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
                            <AdSlot asps={namedAdSlotParameters('right')} />
                            {!isPaidContent ? <MostViewedRightIsland /> : <></>}
                        </RightColumn>
                    </GridItem>
                </ShowcaseGrid>
            </Section>

            <Section
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot asps={namedAdSlotParameters('merchandising-high')} />
            </Section>

            <Section sectionId="onwards-upper" />

            {!isPaidContent && (
                <>
                    {!isSensitive && (
                        <Section
                            showTopBorder={false}
                            backgroundColour={neutral[97]}
                        >
                            <OutbrainContainer />
                        </Section>
                    )}

                    {showOnwardsLower && <Section sectionId="onwards-lower" />}

                    {showComments && (
                        <Section sectionId="comments">
                            <Flex>
                                <div id="comments-root" />
                                <RightColumn>
                                    <AdSlot
                                        asps={namedAdSlotParameters('comments')}
                                    />
                                </RightColumn>
                            </Flex>
                        </Section>
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
                        pillar={CAPI.pillar}
                    />
                    <GuardianLines pillar={CAPI.pillar} />
                </Section>
            )}

            <Section
                padded={false}
                backgroundColour={brandBackground.primary}
                borderColour={brandBorder.primary}
            >
                <Footer
                    pageFooter={CAPI.pageFooter}
                    pillar={CAPI.pillar}
                    pillars={NAV.pillars}
                />
            </Section>

            <div id="cmp" />
            <MobileStickyContainer />
        </>
    );
};
