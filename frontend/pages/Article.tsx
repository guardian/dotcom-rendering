import React from 'react';
import { Container } from '@guardian/guui';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { desktop, mobileLandscape } from '@guardian/pasteup/breakpoints';

import { MostViewed } from '../components/MostViewed';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleBody from '../components/ArticleBody';
import BackToTop from '../components/BackToTop';
import SubNav from '../components/Header/Nav/SubNav';

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    config: ConfigType;
}

// TODO: find a better of setting opacity
const articleWrapper = css`
    background-color: rgba(18, 18, 18, 0.05);

    :before {
        background-image: repeating-linear-gradient(
            to bottom,
            ${palette.neutral[86]},
            ${palette.neutral[86]} 1px,
            transparent 1px,
            transparent 4px
        );
        background-repeat: repeat-x;
        background-position: bottom;
        background-size: 1px 13px;
        background-color: ${palette.neutral[100]};
        content: '';
        display: block;
        height: 13px;
    }
`;

const secondaryColumn = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    width: 300px;
    margin-left: 20px;
    margin-top: 6px;

    background-color: ${palette.neutral[93]};
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

const Article: React.SFC<{
    data: Props;
}> = ({ data }) => (
    <div>
        <Header nav={data.NAV} />
        <main className={articleWrapper}>
            <Container className={articleContainer}>
                <article>
                    <ArticleBody CAPI={data.CAPI} config={data.config} />
                    <div className={secondaryColumn} />
                </article>
                <MostViewed />
            </Container>
        </main>

        <SubNav subnav={data.NAV.subNavSections} />
        <BackToTop />

        <Footer />
    </div>
);

export default Article;
