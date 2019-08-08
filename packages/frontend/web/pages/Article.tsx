import React from 'react';
import { Container } from '@guardian/guui';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { desktop, mobileLandscape } from '@guardian/pasteup/breakpoints';
import { MostViewed } from '@frontend/web/components/MostViewed';
import { Header } from '@frontend/web/components/Header/Header';
import { Footer } from '@frontend/web/components/Footer';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { BackToTop } from '@frontend/web/components/BackToTop';
import { SubNav } from '@frontend/web/components/Header/Nav/SubNav/SubNav';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { AdSlot } from '@frontend//web/components/AdSlot';

// TODO: find a better of setting opacity
const secondaryColumn = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    width: 300px;
    margin-left: 20px;
    margin-top: 6px;

    min-height: 300px;
    display: none;

    ${desktop} {
        display: block;
    }
`;

const articleContainer = css`
    position: relative;
    background-color: ${palette.neutral[100]};
    padding: 0 10px;

    ${mobileLandscape} {
        padding: 0 20px;
    }
`;

const overflowHidden = css`
    overflow: hidden;
`;

interface AdSlotParameters {
    name: string;
    adTypes: string[];
    sizeMapping: {
        [key: string]: string[];
    };
    showLabel?: boolean;
    refresh?: boolean;
    outOfPage?: boolean;
    optId?: string;
    optClassNames?: string[];
}

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => {
    // The current parameters have been taken from looking at an example of right MPU on an article.
    // regular article: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad js-sticky-mpu ad-slot--rendered
    // dotcom rendering: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu
    const adSlotParameters: AdSlotParameters = {
        name: 'right',
        adTypes: ['mpu-banner-ad', 'rendered'],
        sizeMapping: {
            mobile: ['1,1|2,2|300,250|300,274|300,600|fluid|300,1050'],
        },
        showLabel: true,
        refresh: false,
        outOfPage: false,
        optId: undefined,
        optClassNames: ['js-sticky-mpu'],
    };

    return (
        <div>
            <div className={overflowHidden} />
            <Header
                nav={data.NAV}
                pillar={data.CAPI.pillar}
                edition={data.CAPI.editionId}
            />
            <main>
                <Container borders={true} className={articleContainer}>
                    <article>
                        <ArticleBody CAPI={data.CAPI} config={data.config} />
                        <div className={secondaryColumn}>
                            <AdSlot
                                name={adSlotParameters.name}
                                adTypes={adSlotParameters.adTypes}
                                sizeMapping={adSlotParameters.sizeMapping}
                                showLabel={adSlotParameters.showLabel}
                                refresh={adSlotParameters.refresh}
                                outOfPage={adSlotParameters.outOfPage}
                                optId={adSlotParameters.optId}
                                optClassNames={adSlotParameters.optClassNames}
                            />
                        </div>
                    </article>
                </Container>
                <OutbrainContainer config={data.config} />
                <Container
                    borders={true}
                    className={cx(
                        articleContainer,
                        css`
                            border-top: 1px solid ${palette.neutral[86]};
                        `,
                    )}
                >
                    <MostViewed sectionName={data.CAPI.sectionName} />
                </Container>
            </main>
            <SubNav
                subnav={data.NAV.subNavSections}
                pillar={data.CAPI.pillar}
                currentNavLink={data.NAV.currentNavLink}
            />
            <BackToTop />
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
};
