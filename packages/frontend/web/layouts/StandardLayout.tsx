import React from 'react';
import { Flex } from '@frontend/web/components/Flex';
import { StickyAd } from '@frontend/web/components/StickyAd';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';
import { ArticleRight } from '@frontend/web/components/ArticleRight';
import { ArticleTitle } from '@frontend/web/components/ArticleTitle';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { ArticleMeta } from '@frontend/web/components/ArticleMeta';
import { Hide } from '@frontend/web/components/Hide';

import { palette } from '@guardian/src-foundations';
import { MostViewed } from '@frontend/web/components/MostViewed/MostViewed';
import { Header } from '@root/packages/frontend/web/components/Header/Header';
import { Footer } from '@frontend/web/components/Footer';
import { SubNav } from '@root/packages/frontend/web/components/SubNav/SubNav';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { Section } from '@frontend/web/components/Section';
import { Nav } from '@frontend/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/packages/frontend/web/components/HeaderAdSlot';

import { StandardHeader } from './StandardHeader';

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
}

export const StandardLayout = ({ CAPI, config, NAV }: Props) => (
    <>
        <Section showTopBorder={false} showSideBorders={false} padded={false}>
            <HeaderAdSlot
                config={config}
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

        <Section showTopBorder={false}>
            <Flex>
                <ArticleLeft>
                    <ArticleTitle CAPI={CAPI} />
                    <ArticleMeta CAPI={CAPI} config={config} />
                </ArticleLeft>
                <ArticleContainer>
                    <StandardHeader CAPI={CAPI} />
                    <Hide when="above" breakpoint="leftCol">
                        <ArticleMeta CAPI={CAPI} config={config} />
                    </Hide>
                    <ArticleBody CAPI={CAPI} config={config} />
                </ArticleContainer>
                <ArticleRight>
                    <StickyAd config={config} />
                </ArticleRight>
            </Flex>
        </Section>

        <Section showTopBorder={false}>
            <OutbrainContainer config={config} />
        </Section>

        <Section islandId="most-viewed">
            <MostViewed
                sectionName={CAPI.sectionName}
                config={config}
                pillar={CAPI.pillar}
            />
        </Section>

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

        <CookieBanner />
    </>
);
