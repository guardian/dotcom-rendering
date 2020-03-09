import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';

import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { StickyAd } from '@root/src/web/components/StickyAd';
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
import { ContributorAvatar } from '@root/src/web/components/ContributorAvatar';
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

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';

import { getCurrentPillar } from '@root/src/web/lib/layoutHelpers';

const StandardGrid = ({
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
                        'title      border  headline    right-column'
                        'lines      border  headline    right-column'
                        'meta       border  standfirst  right-column'
                        'meta       border  media       right-column'
                        '.          border  body        right-column'
                        '.          border  .           right-column';
                }

                ${until.wide} {
                    grid-template-columns:
                        140px /* Left Column (220 - 1px border) */
                        1px /* Vertical grey border */
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title      border  headline    right-column'
                        'lines      border  headline    right-column'
                        'meta       border  standfirst  right-column'
                        'meta       border  media       right-column'
                        '.          border  body        right-column'
                        '.          border  .           right-column';
                }

                ${until.leftCol} {
                    grid-template-columns:
                        1fr /* Main content */
                        300px; /* Right Column */
                    grid-template-areas:
                        'title      right-column'
                        'headline   right-column'
                        'standfirst right-column'
                        'meta       right-column'
                        'media      right-column'
                        'body       right-column'
                        '.          right-column';
                }

                ${until.desktop} {
                    grid-template-columns: 1fr; /* Main content */
                    grid-template-areas:
                        'title'
                        'headline'
                        'standfirst'
                        'meta'
                        'media'
                        'body';
                }

                ${until.tablet} {
                    grid-column-gap: 0px;

                    grid-template-columns: 1fr; /* Main content */
                    grid-template-areas:
                        'title'
                        'headline'
                        'standfirst'
                        'meta'
                        'media'
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

const avatarHeadlineWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const minHeightWithAvatar = css`
    min-height: 259px;
`;

const avatarPositionStyles = css`
    display: flex;
    justify-content: flex-end;
    margin-right: -1.25rem;
    margin-top: -36px;
    margin-bottom: -29px;
`;

const pushToBottom = css`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
`;

const headlinePadding = css`
    padding-bottom: 43px;
`;

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    dcr: dcrType;
}

export const CommentLayout = ({ CAPI, NAV, dcr }: Props) => {
    const {
        pageType: { isSensitive },
    } = CAPI;

    const adTargeting: AdTargeting = buildAdTargeting(dcr.config);

    // Render the slot if one is true:
    // 1) The flag for this slot exists in the URL (i.e. ?slot-machine-flags=showBodyEnd)
    // 2) The global switch for this slot is set to true;
    const showBodyEndSlot =
        parse(CAPI.slotMachineFlags || '').showBodyEnd ||
        dcr.config.slotBodyEnd;

    // TODO:
    // 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
    // 2) Otherwise, ensure slot only renders if `dcr.config.shouldHideReaderRevenue` equals false.

    const seriesTag = CAPI.tags.find(
        tag => tag.type === 'Series' || tag.type === 'Blog',
    );
    const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

    const showComments = false; // CAPI.isCommentable;

    const contributorTag = CAPI.tags.find(tag => tag.type === 'Contributor');
    const avatarUrl = contributorTag && contributorTag.bylineImageUrl;

    return (
        <>
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
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Header edition={CAPI.editionId} />
            </Section>

            <Section
                islandId="nav-root"
                showSideBorders={true}
                borderColour={palette.brand.pastel}
                showTopBorder={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Nav pillar={getCurrentPillar(CAPI)} nav={NAV} />
            </Section>

            {NAV.subNavSections && (
                <Section
                    backgroundColour={palette.opinion.faded}
                    padded={false}
                    islandId="sub-nav-root"
                >
                    <SubNav
                        subnav={NAV.subNavSections}
                        currentNavLink={NAV.currentNavLink}
                        pillar={CAPI.pillar}
                    />
                </Section>
            )}

            <Section
                showTopBorder={false}
                backgroundColour={palette.opinion.faded}
            >
                <StandardGrid>
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
                        <div className={maxWidth}>
                            <div
                                className={cx(
                                    avatarHeadlineWrapper,
                                    avatarUrl && minHeightWithAvatar,
                                )}
                            >
                                {/* TOP - we use divs here to position content in groups using flex */}
                                <div
                                    className={cx(
                                        !avatarUrl && headlinePadding,
                                    )}
                                >
                                    <ArticleHeadline
                                        headlineString={CAPI.headline}
                                        designType={CAPI.designType}
                                        pillar={CAPI.pillar}
                                        webPublicationDate={
                                            CAPI.webPublicationDate
                                        }
                                        tags={CAPI.tags}
                                        byline={CAPI.author.byline}
                                    />
                                </div>
                                {/* BOTTOM */}
                                <div>
                                    {avatarUrl && (
                                        <div className={avatarPositionStyles}>
                                            <ContributorAvatar
                                                imageSrc={avatarUrl}
                                                imageAlt={
                                                    CAPI.author.byline || ''
                                                }
                                            />
                                        </div>
                                    )}
                                    <GuardianLines
                                        count={8}
                                        pillar={CAPI.pillar}
                                    />
                                </div>
                            </div>
                        </div>
                    </GridItem>
                    <GridItem area="lines">
                        <div className={pushToBottom}>
                            <GuardianLines count={8} pillar={CAPI.pillar} />
                        </div>
                    </GridItem>
                    <GridItem area="standfirst">
                        <ArticleStandfirst
                            designType={CAPI.designType}
                            pillar={CAPI.pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </GridItem>
                    <GridItem area="media">
                        <div className={maxWidth}>
                            <MainMedia
                                elements={CAPI.mainMediaElements}
                                pillar={CAPI.pillar}
                                adTargeting={adTargeting}
                            />
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
                            <StickyAd />
                            {!dcr.config.isPaidContent ? (
                                <MostViewedRightIsland />
                            ) : (
                                <></>
                            )}
                        </RightColumn>
                    </GridItem>
                </StandardGrid>
            </Section>

            <Section
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            >
                <AdSlot asps={namedAdSlotParameters('merchandising-high')} />
            </Section>

            <Section islandId="onwards-upper" />

            {!dcr.config.isPaidContent && (
                <>
                    {!isSensitive && (
                        <Section
                            showTopBorder={false}
                            backgroundColour={neutral[97]}
                        >
                            <OutbrainContainer />
                        </Section>
                    )}

                    {showOnwardsLower && <Section islandId="onwards-lower" />}

                    {showComments && (
                        <Section>
                            <Flex>
                                <div id="comments-root" />
                                <RightColumn>
                                    {/* TODO: Comments ad slot goes here */}
                                </RightColumn>
                            </Flex>
                        </Section>
                    )}

                    <Section islandId="most-viewed-footer" />
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
                <Section padded={false} islandId="sub-nav-root">
                    <SubNav
                        subnav={NAV.subNavSections}
                        pillar={CAPI.pillar}
                        currentNavLink={NAV.currentNavLink}
                    />
                </Section>
            )}

            <Section
                padded={false}
                backgroundColour={palette.brand.main}
                borderColour={palette.brand.pastel}
            >
                <Footer
                    nav={NAV}
                    edition={CAPI.editionId}
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
