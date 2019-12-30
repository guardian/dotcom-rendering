import React from 'react';

import { palette } from '@guardian/src-foundations';

import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleBodyContainer } from '@root/src/web/components/ArticleBodyContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer } from '@root/src/web/components/AdSlot';

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
}

export const ShowcaseLayout = ({ CAPI, NAV }: Props) => {
    const { isPaidContent } = CAPI.config;
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

            <Section showTopBorder={false} padded={false}>
                <ArticleContainer>
                    <ArticleTitle CAPI={CAPI} />
                    <ArticleHeadline
                        headlineString={CAPI.headline}
                        designType={CAPI.designType}
                        pillar={CAPI.pillar}
                        webPublicationDate={CAPI.webPublicationDate}
                        tags={CAPI.tags}
                        layoutType="Showcase"
                    />
                    <ArticleMeta CAPI={CAPI} layoutType="Showcase" />
                    <ArticleStandfirst
                        designType={CAPI.designType}
                        pillar={CAPI.pillar}
                        standfirst={CAPI.standfirst}
                        layoutType="Showcase"
                    />
                    <MainMedia
                        elements={CAPI.mainMediaElements}
                        pillar={CAPI.pillar}
                        layoutType="Showcase"
                    />
                    <ArticleBodyContainer>
                        <ArticleBody CAPI={CAPI} isShowcase={true} />
                        <GuardianLines pillar={CAPI.pillar} />
                        <SubMeta
                            pillar={CAPI.pillar}
                            subMetaKeywordLinks={CAPI.subMetaKeywordLinks}
                            subMetaSectionLinks={CAPI.subMetaSectionLinks}
                            pageId={CAPI.pageId}
                            webUrl={CAPI.webURL}
                            webTitle={CAPI.webTitle}
                            showBottomSocialButtons={
                                CAPI.showBottomSocialButtons
                            }
                        />
                    </ArticleBodyContainer>
                    <RightColumn layoutType="Showcase">
                        <StickyAd />
                        {!isPaidContent ? <MostViewedRightIsland /> : <></>}
                    </RightColumn>
                </ArticleContainer>
            </Section>

            <Section islandId="story-package" />

            <Section showTopBorder={false}>
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
