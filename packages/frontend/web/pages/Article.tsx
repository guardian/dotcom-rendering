import React from 'react';
import { MostViewed } from '@frontend/web/components/MostViewed/MostViewed';
import { Header } from '@frontend/web/components/Header/Header';
import { Footer } from '@frontend/web/components/Footer';
import { Content } from '@frontend/web/components/Content';
import { SubNav } from '@frontend/web/components/Header/Nav/SubNav/SubNav';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
// import { MobileStickyContainer } from '@frontend/web/components/AdSlot';

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => (
    <div>
        <Header
            nav={data.NAV}
            pillar={data.CAPI.pillar}
            edition={data.CAPI.editionId}
            config={data.config}
            isAdFreeUser={data.CAPI.isAdFreeUser}
            shouldHideAds={data.CAPI.shouldHideAds}
        />
        <Content CAPI={data.CAPI} config={data.config} />
        <MostViewed sectionName={data.CAPI.sectionName} config={data.config} />
        <SubNav
            subnav={data.NAV.subNavSections}
            pillar={data.CAPI.pillar}
            currentNavLink={data.NAV.currentNavLink}
        />
        <Footer
            nav={data.NAV}
            edition={data.CAPI.editionId}
            pageFooter={data.CAPI.pageFooter}
            pillar={data.CAPI.pillar}
            pillars={data.NAV.pillars}
        />
        <CookieBanner />
    </div>
);
