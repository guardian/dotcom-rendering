import React, { ReactNode } from 'react';

import HeaderImage from 'components/shared/headerImage';
import ArticleSeries from 'components/shared/articleSeries';
import OpinionHeadline from 'components/opinion/opinionHeadline';
import ArticleStandfirst from 'components/news/articleStandfirst';
import OpinionByline from 'components/opinion/opinionByline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import OpinionCutout from 'components/opinion/opinionCutout';
import { Content } from 'capiThriftModels';
import { darkModeCss, articleWidthStyles } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { articleSeries, articleContributors, articleMainImage } from 'capi';
import { getPillarStyles } from 'pillar';
import { Article } from 'article';

export interface OpinionArticleProps {
    capi: Content;
    imageSalt: string;
    article: Article;
    children: ReactNode[];
}

const MainStyles = css`
    background: ${palette.opinion.faded};
`;

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const BorderStyles = css`
    background: ${palette.opinion.faded};
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

const OpinionArticle = ({ capi, imageSalt, article, children }: OpinionArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate } = capi;
    const series = articleSeries(capi);
    const pillarStyles = getPillarStyles(article.pillar);
    const contributors = articleContributors(capi);
    const mainImage = articleMainImage(capi);

    return (
        <main css={[MainStyles, MainDarkStyles]}>
            <article css={BorderStyles}>
                <header>
                    <div css={articleWidthStyles}>
                        <ArticleSeries series={series} pillarStyles={pillarStyles}/>
                        <OpinionHeadline
                            byline={fields.bylineHtml}
                            headline={fields.headline}
                            pillarStyles={pillarStyles}
                        />
                    </div>
                    <OpinionCutout 
                        contributors={contributors}
                        imageSalt={imageSalt}
                        className={articleWidthStyles}
                    />
                    <Keyline article={article}/>
                    <ArticleStandfirst
                            standfirst={fields.standfirst}
                            feature={true}
                            pillarStyles={pillarStyles}
                            className={articleWidthStyles}
                    />
                    <OpinionByline
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        className={articleWidthStyles}
                    />
                    <HeaderImage
                        image={mainImage}
                        imageSalt={imageSalt}
                        className={HeaderImageStyles}
                    />
                </header>
                <ArticleBody pillarStyles={pillarStyles} className={[articleWidthStyles]}>
                    {children}
                </ArticleBody>
                <footer css={articleWidthStyles}>
                    <Tags tags={tags}/>
                </footer>
            </article>
        </main>
    );
}

export default OpinionArticle;
