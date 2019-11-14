import React from 'react';
import { css } from 'emotion';

import { Flex } from '@root/src/web/components/Flex';
import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { ArticleLeft } from '@root/src/web/components/ArticleLeft';
import { ArticleRight } from '@root/src/web/components/ArticleRight';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { Hide } from '@root/src/web/components/Hide';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { SubMeta } from '@root/src/web/components/SubMeta';

import { palette } from '@guardian/src-foundations';

import { Header } from '@root/src/web/components/Header/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { CookieBanner } from '@root/src/web/components/CookieBanner';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';

import GE2019 from '@frontend/static/badges/general-election-2019.svg';

import { StandardHeader } from './StandardHeader';

function checkForGE2019Badge(tags: TagType[]) {
    if (tags.find(tag => tag.id === 'politics/general-election-2019')) {
        return {
            linkTo: '/politics/general-election-2019',
            svgSrc: GE2019,
        };
    }
    return;
}

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
}

export const StandardLayout = ({ CAPI, config, NAV }: Props) => {
    const GE2019Badge = checkForGE2019Badge(CAPI.tags);
    return (
        <>
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
            >
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
                        <ArticleTitle
                            CAPI={CAPI}
                            badge={GE2019Badge}
                            inLeftCol={true}
                        />
                        <ArticleMeta CAPI={CAPI} config={config} />
                    </ArticleLeft>
                    <ArticleContainer>
                        <StandardHeader CAPI={CAPI} badge={GE2019Badge} />
                        <Hide when="above" breakpoint="leftCol">
                            <ArticleMeta CAPI={CAPI} config={config} />
                        </Hide>
                        <main
                            className={css`
                                max-width: 630px;
                            `}
                        >
                            <ArticleBody CAPI={CAPI} config={config} />
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
                                badge={GE2019Badge}
                            />
                        </main>
                    </ArticleContainer>
                    <ArticleRight>
                        <StickyAd config={config} />
                        <Section
                            showSideBorders={false}
                            showTopBorder={false}
                            padded={false}
                            islandId="most-viewed-list"
                        />
                    </ArticleRight>
                </Flex>
            </Section>

            <Section showTopBorder={false}>
                <OutbrainContainer config={config} />
            </Section>

            <Section islandId="most-viewed-grid" />

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
};
