import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { Flex } from '@root/src/web/components/Flex';
import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { Hide } from '@root/src/web/components/Hide';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';

import { ShowcaseHeader } from './ShowcaseHeader';

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
}

export const ShowcaseLayout = ({ CAPI, NAV }: Props) => {
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

            <Hide when="above" breakpoint="tablet">
                {/* When below tablet, show the main article image in a full width container */}
                <Section showTopBorder={false} padded={false}>
                    <MainMedia
                        elements={CAPI.mainMediaElements}
                        pillar={CAPI.pillar}
                        adTargeting={adTargeting}
                    />
                </Section>
            </Hide>

            <Section showTopBorder={false}>
                <Flex>
                    <LeftColumn>
                        <ArticleTitle CAPI={CAPI} inLeftCol={true} />
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
                    </LeftColumn>
                    <ArticleContainer>
                        {/* When BELOW leftCol we display the header in this position, at the top of the page */}
                        <Hide when="below" breakpoint="leftCol">
                            <ShowcaseHeader
                                CAPI={CAPI}
                                adTargeting={adTargeting}
                            />
                        </Hide>
                        <Flex>
                            <div>
                                {/* When ABOVE leftCol we display the header in this position, above the article body, underneath the full width image */}
                                <Hide when="above" breakpoint="leftCol">
                                    <ShowcaseHeader CAPI={CAPI} />
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
                                </Hide>

                                <main
                                    className={css`
                                        max-width: 620px;
                                    `}
                                >
                                    <ArticleBody
                                        CAPI={CAPI}
                                        isShowcase={true}
                                    />
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
                                    />
                                </main>
                            </div>
                            <RightColumn>
                                <AdSlot
                                    asps={namedAdSlotParameters('right')}
                                    className=""
                                />
                                {!isPaidContent ? (
                                    <MostViewedRightIsland />
                                ) : (
                                    <></>
                                )}
                            </RightColumn>
                        </Flex>
                    </ArticleContainer>
                </Flex>
            </Section>

            <Section islandId="onwards-content" />

            <Section
                showTopBorder={false}
                backgroundColour={palette.neutral[97]}
            >
                <OutbrainContainer />
            </Section>
            {!isPaidContent && (
                <>
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
