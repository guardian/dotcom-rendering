import React from 'react';
import { css } from 'emotion';
import { Flex } from '@root/src/web/components/Flex';
import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { ArticleLeft } from '@root/src/web/components/ArticleLeft';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { Hide } from '@root/src/web/components/Hide';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';

import { palette } from '@guardian/src-foundations';
import { Header } from '@root/src/web/components/Header/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';

import { ShowcaseHeader } from './ShowcaseHeader';

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
}

export const ShowcaseLayout = ({ CAPI, NAV }: Props) => (
    <>
        <Section showTopBorder={false} showSideBorders={false} padded={false}>
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
            <Header nav={NAV} pillar={CAPI.pillar} edition={CAPI.editionId} />
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

        <Section backgroundColour={palette.neutral[100]} padded={false}>
            <SubNav
                subnav={NAV.subNavSections}
                currentNavLink={NAV.currentNavLink}
                pillar={CAPI.pillar}
            />
        </Section>

        <Hide when="above" breakpoint="tablet">
            {/* When below tablet, show the main article image in a full width container */}
            <Section showTopBorder={false} padded={false}>
                <MainMedia
                    elements={CAPI.mainMediaElements}
                    pillar={CAPI.pillar}
                />
            </Section>
        </Hide>

        <Section showTopBorder={false}>
            <Flex>
                <ArticleLeft>
                    <ArticleTitle CAPI={CAPI} inLeftCol={true} />
                    <ArticleMeta CAPI={CAPI} />
                </ArticleLeft>
                <ArticleContainer>
                    {/* When BELOW leftCol we display the header in this position, at the top of the page */}
                    <Hide when="below" breakpoint="leftCol">
                        <ShowcaseHeader CAPI={CAPI} />
                    </Hide>
                    <Flex>
                        <div>
                            {/* When ABOVE leftCol we display the header in this position, above the article body, underneath the full width image */}
                            <Hide when="above" breakpoint="leftCol">
                                <ShowcaseHeader CAPI={CAPI} />
                                <ArticleMeta CAPI={CAPI} />
                            </Hide>

                            <main
                                className={css`
                                    max-width: 630px;
                                `}
                            >
                                <ArticleBody CAPI={CAPI} isShowcase={true} />
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
                            <StickyAd />
                            <MostViewedRightIsland />
                        </RightColumn>
                    </Flex>
                </ArticleContainer>
            </Flex>
        </Section>

        <Section showTopBorder={false}>
            <OutbrainContainer />
        </Section>

        <Section islandId="most-viewed-footer" />

        <Section padded={false}>
            <SubNav
                subnav={NAV.subNavSections}
                pillar={CAPI.pillar}
                currentNavLink={NAV.currentNavLink}
            />
        </Section>

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
    </>
);
