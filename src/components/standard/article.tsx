// ----- Imports ----- //

import React, { ReactNode } from 'react';

import HeaderImage from 'components/shared/headerImage';
import ArticleSeries from 'components/shared/articleSeries';
import ArticleHeadline from 'components/standard/headline';
import ArticleStandfirst from 'components/standard/standfirst';
import ArticleByline from 'components/standard/byline';
import { CommentCount } from 'components/shared/commentCount'
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles } from 'pillar';
import { Article } from 'article';


// ----- Component ----- //

export interface ArticleProps {
    imageSalt: string;
    article: Article;
    children: ReactNode[];
}

const MainStyles = css`
    background: ${palette.neutral[97]};
`;

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const BorderStyles = css`
    background: ${palette.neutral[100]};
    ${darkModeCss`background: ${palette.neutral.darkMode};`}

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${from.wide} {
            margin: 0 auto;
        }
    }
`;

const Article = ({ imageSalt, article, children }: ArticleProps): JSX.Element =>
    <main css={[MainStyles, MainDarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={article.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles}
                />
                <div css={articleWidthStyles}>
                    <ArticleSeries series={article.series} pillar={article.pillar} />
                    <ArticleHeadline
                        headline={article.headline}
                        article={article}
                        rating={String(article.starRating)}
                    />
                    <ArticleStandfirst article={article} className={articleWidthStyles} />
                </div>
                <Keyline article={article}/>
                <section css={articleWidthStyles}>
                    <ArticleByline article={article} imageSalt={imageSalt} />
                    {article.commentable
                            ? <CommentCount count={0} colour={getPillarStyles(article.pillar).kicker}/>
                            : null}
                </section>
            </header>
            <ArticleBody pillar={article.pillar} className={[articleWidthStyles]}>
                {children}
            </ArticleBody>
            <footer css={articleWidthStyles}>
                <Tags tags={article.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Article;
