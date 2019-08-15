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

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => (
    <div>
        <Header
            nav={data.NAV}
            pillar={data.CAPI.pillar}
            edition={data.CAPI.editionId}
        />
        <main>
            <Container borders={true} className={articleContainer}>
                <article>
                    <ArticleBody CAPI={data.CAPI} config={data.config} />
                    <div className={secondaryColumn} />
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
