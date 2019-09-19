import React from 'react';
import { Container } from '@guardian/guui';
import { css, cx } from 'emotion';
import {
    palette,
    until,
    desktop,
    mobileLandscape,
    wide,
} from '@guardian/src-foundations';
import { MostViewed } from '@frontend/web/components/MostViewed';
import { Header } from '@frontend/web/components/Header/Header';
import { Footer } from '@frontend/web/components/Footer';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { SubNav } from '@frontend/web/components/Header/Nav/SubNav/SubNav';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';

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

const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const headerWrapper = css`
    position: static;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

const headerAdWrapper = css`
    ${until.tablet} {
        display: none;
    }

    margin: 0 auto;
    height: 151px;
    padding-bottom: 18px;
    padding-top: 18px;
    text-align: left;
    display: table;

    z-index: 1080;

    background-color: white;
    width: 100%;
    border-bottom: 0.0625rem solid ${palette.neutral[86]};

    ${stickyAdSlot};
`;

const headerAd = css`
    margin: 0 auto;
    width: 728px;
`;

// These are by selector as for dynamically-created ads
const bodyAdStyles = css`
    .ad-slot {
        background-color: ${palette.neutral[97]};
        width: 320px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
    }

    .ad-slot--inline {
        ${desktop} {
            margin: 0;
            width: auto;
            float: right;
        }
    }

    .ad-slot--offset-right {
        ${desktop} {
            float: right;
            width: auto;
            margin-right: -328px;
        }

        ${wide} {
            margin-right: -408px;
        }
    }

    ${labelStyles};
`;

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => (
    <div>
        <div className={headerWrapper}>
            <div className={headerAdWrapper}>
                <AdSlot
                    asps={namedAdSlotParameters('top-above-nav')}
                    config={data.config}
                    className={headerAd}
                />
            </div>

            <Header
                nav={data.NAV}
                pillar={data.CAPI.pillar}
                edition={data.CAPI.editionId}
            />
        </div>

        <main>
            <Container borders={true} className={articleContainer}>
                <article className={bodyAdStyles}>
                    <ArticleBody CAPI={data.CAPI} config={data.config} />
                    <div className={secondaryColumn}>
                        <div className={adSlotWrapper}>
                            <AdSlot
                                asps={namedAdSlotParameters('right')}
                                config={data.config}
                                className={stickyAdSlot}
                            />
                        </div>
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
                <MostViewed
                    sectionName={data.CAPI.sectionName}
                    config={data.config}
                />
            </Container>
        </main>
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
