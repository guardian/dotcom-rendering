import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

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
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer } from '@root/src/web/components/AdSlot';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';

import GE2019 from '@frontend/static/badges/general-election-2019.svg';

import { Border } from './Border';
import { GridItem } from './GridItem';

function checkForGE2019Badge(tags: TagType[]) {
    if (tags.find(tag => tag.id === 'politics/general-election-2019')) {
        return {
            linkTo: '/politics/general-election-2019',
            svgSrc: GE2019,
        };
    }
}

const StandardGrid = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            display: grid;
            width: 100%;

            grid-column-gap: 10px;

            ${from.wide} {
                grid-template-columns:
                    219px /* Left Column (220 - 1px border) */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */
                grid-template-areas:
                    'title  border  headline    right-column'
                    '.      border  standfirst  right-column'
                    'meta   border  media       right-column'
                    '.      border  body        right-column';
            }

            ${until.wide} {
                grid-template-columns:
                    150px /* Left Column (220 - 1px border) */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */
                grid-template-areas:
                    'title  border  headline    right-column'
                    '.      border  standfirst  right-column'
                    'meta   border  media       right-column'
                    '.      border  body        right-column';
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
                    'meta       right-column'
                    'body       right-column';
            }

            ${until.desktop} {
                grid-template-columns: 1fr; /* Main content */
                grid-template-areas:
                    'title'
                    'headline'
                    'standfirst'
                    'media'
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
                    'meta'
                    'body';
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

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
}

export const StandardLayout = ({ CAPI, NAV }: Props) => {
    const GE2019Badge = checkForGE2019Badge(CAPI.tags);
    const { isPaidContent } = CAPI.config;

    const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

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
                <Header
                    nav={NAV}
                    pillar={CAPI.pillar}
                    edition={CAPI.editionId}
                />
            </Section>

            <Section
                islandId="nav-root"
                showSideBorders={true}
                borderColour={palette.brand.pastel}
                showTopBorder={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Section>

            {NAV.subNavSections && (
                <Section backgroundColour={palette.neutral[100]} padded={false}>
                    <SubNav
                        subnav={NAV.subNavSections}
                        currentNavLink={NAV.currentNavLink}
                        pillar={CAPI.pillar}
                    />
                </Section>
            )}

            <Section showTopBorder={false}>
                <StandardGrid>
                    <GridItem area="title">
                        <ArticleTitle
                            CAPI={CAPI}
                            badge={GE2019Badge}
                            inLeftCol={true}
                        />
                    </GridItem>
                    <GridItem area="border">
                        <Border />
                    </GridItem>
                    <GridItem area="headline">
                        <div className={maxWidth}>
                            <ArticleHeadline
                                headlineString={CAPI.headline}
                                designType={CAPI.designType}
                                pillar={CAPI.pillar}
                                webPublicationDate={CAPI.webPublicationDate}
                                tags={CAPI.tags}
                                byline={CAPI.author.byline}
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
                    <GridItem area="media">
                        <MainMedia
                            elements={CAPI.mainMediaElements}
                            pillar={CAPI.pillar}
                            adTargeting={adTargeting}
                        />
                    </GridItem>
                    <GridItem area="meta">
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
                    </GridItem>
                    <GridItem area="body">
                        <ArticleContainer>
                            <main
                                className={css`
                                    max-width: 620px;
                                `}
                            >
                                <ArticleBody CAPI={CAPI} />
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
                                    badge={GE2019Badge}
                                />
                            </main>
                        </ArticleContainer>
                    </GridItem>
                    <GridItem area="right-column">
                        <RightColumn>
                            <StickyAd />
                            {!isPaidContent ? <MostViewedRightIsland /> : <></>}
                        </RightColumn>
                    </GridItem>
                </StandardGrid>
            </Section>

            <Section islandId="story-package" />

            {!isPaidContent && (
                <>
                    <Section
                        showTopBorder={false}
                        backgroundColour={palette.neutral[97]}
                    >
                        <OutbrainContainer />
                    </Section>

                    <Section islandId="most-viewed-footer" />
                </>
            )}

            {NAV.subNavSections && (
                <Section padded={false}>
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

            <div data-island="cookie-banner" />
            <MobileStickyContainer />
        </>
    );
};
