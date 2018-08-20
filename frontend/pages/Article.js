// @flow

/* eslint-disable react/no-danger */

import { Container } from '@guardian/guui';
import { css } from 'react-emotion';
import palette from '@guardian/pasteup/palette';

import MostViewed from '../components/MostViewed';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleBody from '../components/ArticleBody';

const articleWrapper = css`
    background-color: rgba(18, 18, 18, 0.05);

    :before {
        background-image: repeating-linear-gradient(
            to bottom,
            ${palette.neutral[5]},
            ${palette.neutral[5]} 1px,
            transparent 1px,
            transparent 4px
        );
        background-repeat: repeat-x;
        background-position: bottom;
        background-size: 1px 13px;
        background-color: ${palette.neutral[8]};
        content: '';
        display: block;
        height: 13px;
    }
`;

const articleContainer = css`
    position: relative;
    background-color: ${palette.neutral[8]};
    padding: 0 20px;
`;

// TODO: TYPE THIS
type Props = {
    data: {
        CAPI: CAPIType,
        NAV: NavType,
    },
};

const Article = ({ data }: Props) => (
    <div>
        <Header nav={data.NAV} />
        <main className={articleWrapper}>
            <Container className={articleContainer}>
                <article>
                    <ArticleBody CAPI={data.CAPI} />
                    <MostViewed />
                </article>
            </Container>
        </main>
        <Footer />
    </div>
);

export default Article;
