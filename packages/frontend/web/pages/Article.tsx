import React from 'react';
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

import { DecideContent } from './DecideContent';
import { CAPI } from '@root/fixtures/CAPI';

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => (
    <div>
        <Section showTopBorder={false} showSideBorders={false} padded={false}>
            <HeaderAdSlot
                config={data.config}
                isAdFreeUser={data.CAPI.isAdFreeUser}
                shouldHideAds={data.CAPI.shouldHideAds}
            />
        </Section>
        <Section
            showTopBorder={false}
            showSideBorders={false}
            padded={false}
            backgroundColour={palette.brand.main}
        >
            <Header
                nav={data.NAV}
                pillar={data.CAPI.pillar}
                edition={data.CAPI.editionId}
            />
        </Section>

        <Section
            showSideBorders={true}
            borderColour={palette.brand.pastel}
            showTopBorder={false}
            padded={false}
            backgroundColour={palette.brand.main}
        >
            <Nav pillar={data.CAPI.pillar} nav={data.NAV} />
        </Section>

        <Section backgroundColour={palette.neutral[100]} padded={false}>
            <SubNav
                subnav={data.NAV.subNavSections}
                currentNavLink={data.NAV.currentNavLink}
                pillar={data.CAPI.pillar}
            />
        </Section>

        <Section showTopBorder={false}>
            <DecideContent
                designType={CAPI.designType}
                CAPI={data.CAPI}
                config={data.config}
            />
        </Section>

        <Section showTopBorder={false}>
            <OutbrainContainer config={data.config} />
        </Section>

        <Section>
            <MostViewed
                sectionName={data.CAPI.sectionName}
                config={data.config}
                pillar={data.CAPI.pillar}
            />
        </Section>

        <Section padded={false}>
            <SubNav
                subnav={data.NAV.subNavSections}
                pillar={data.CAPI.pillar}
                currentNavLink={data.NAV.currentNavLink}
            />
        </Section>

        <Section
            padded={false}
            backgroundColour={palette.brand.main}
            borderColour={palette.brand.pastel}
        >
            <Footer
                nav={data.NAV}
                edition={data.CAPI.editionId}
                pageFooter={data.CAPI.pageFooter}
                pillar={data.CAPI.pillar}
                pillars={data.NAV.pillars}
            />
        </Section>

        <CookieBanner />
    </div>
);
