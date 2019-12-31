import React from 'react';

import HeaderImage from '../shared/headerImage';
import ArticleSeries from 'components/shared/articleSeries';
import ArticleHeadline from './articleHeadline';
import ArticleStandfirst from './articleStandfirst';
import ArticleByline from './articleByline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { Content } from 'capiThriftModels';
import { darkModeCss, articleWidthStyles } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { isFeature, isAnalysis, articleSeries, articleContributors, articleMainImage } from 'capi';
import { getPillarStyles, pillarFromString } from 'pillar';

export interface ArticleProps {
    capi: Content;
    imageSalt: string;
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

const Article = ({ capi, imageSalt }: ArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const series = articleSeries(capi);
    const feature = isFeature(capi) || 'starRating' in fields;
    const pillar = pillarFromString(pillarId);
    const pillarStyles = getPillarStyles(pillar);
    const contributors = articleContributors(capi);
    const bodyElements = blocks.body[0].elements;
    const mainImage = articleMainImage(capi);

    return (
        <main css={[MainStyles, MainDarkStyles]}>
            <article css={BorderStyles}>
                <header>
                    <HeaderImage
                        image={mainImage}
                        imageSalt={imageSalt}
                        className={HeaderImageStyles}
                    />
                    <div css={articleWidthStyles}>
                        <ArticleSeries series={series} pillarStyles={pillarStyles}/>
                        <ArticleHeadline
                            headline={fields.headline}
                            feature={feature}
                            rating={String(fields.starRating)}
                            pillarStyles={pillarStyles}
                            analysis={isAnalysis(capi)}
                        />
                        <ArticleStandfirst
                            standfirst={fields.standfirst}
                            feature={feature}
                            pillarStyles={pillarStyles}
                            className={articleWidthStyles}
                        />
                    </div>
                    <Keyline pillar={pillar} type={'article'}/>
                    <ArticleByline
                        byline={fields.bylineHtml}
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        imageSalt={imageSalt}
                        className={articleWidthStyles}
                    />
                </header>
                <ArticleBody
                    pillarStyles={pillarStyles}
                    bodyElements={bodyElements}
                    imageSalt={imageSalt}
                    className={[articleWidthStyles]}
                />
                <footer css={articleWidthStyles}>
                    <Tags tags={tags}/>
                </footer>
            </article>
        </main>
    );
}

export default Article;
