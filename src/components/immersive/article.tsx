// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/immersive/headerImage';
import Series from 'components/immersive/series';
import Headline from 'components/immersive/headline';
import Standfirst from 'components/immersive/standfirst';
import Byline from 'components/immersive/byline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { articleWidthStyles, basePx, darkModeCss } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles, Pillar } from 'pillar';
import { Article } from 'article';


// ----- Styles ----- //

const DarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const HeaderStyles = css`
    h2 {
        margin-top: 3.2rem;
        font-size: 2.6rem;
        line-height: 3.2rem;
        font-weight: 200;
        margin-bottom: 8px;

        &+p {
            margin-top: 0;
        }
    }
`;

const BorderStyles = css`
    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const DropCapStyles = (pillar: Pillar): SerializedStyles => {
    const { kicker } = getPillarStyles(pillar);

    return css`
        p:first-child::first-letter,
        .section-rule + p::first-letter {
            color: ${kicker};
            font-weight: 100;
            font-style: normal;
            font-size: 7em;
            line-height: 1;
            padding-right: ${basePx(1)};
            float: left;
        }
    `;
}

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${from.wide} {
            margin: 0 auto;
        }
    }
`;


// ----- Component ----- //

interface Props {
    imageSalt: string;
    article: Article;
    children: ReactNode[];
}

const Immersive = ({ imageSalt, article, children }: Props): JSX.Element =>
    <main css={DarkStyles}>
        <article css={BorderStyles}>
            <header>
                <div css={articleWidthStyles}>
                    <HeaderImage
                        image={article.mainImage}
                        imageSalt={imageSalt}
                        className={HeaderImageStyles}
                    />
                    <Series series={article.series} pillar={article.pillar}/>
                    <Headline headline={article.headline}/>
                    <Standfirst
                        standfirst={article.standfirst}
                        pillar={article.pillar}
                        className={articleWidthStyles}
                        bylineHtml={article.bylineHtml}
                        byline={article.byline}
                    />
                </div>
                <Keyline {...article} />
                <Byline
                    pillar={article.pillar}
                    publicationDate={article.publishDate}
                    contributors={article.contributors}
                    className={articleWidthStyles}
                />
            </header>
            <ArticleBody
                pillar={article.pillar}
                className={[articleWidthStyles, DropCapStyles(article.pillar), HeaderStyles]}
            >
                {children}
            </ArticleBody>
            <footer css={articleWidthStyles}>
                <Tags tags={article.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Immersive;
