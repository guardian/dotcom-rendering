import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from 'components/shared/Tags';
import { Content } from 'types/capi-thrift-models';
import { darkModeCss, articleWidthStyles } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/Keyline';
import { isFeature, articleSeries, articleContributors, articleMainImage } from 'types/Capi';
import { getPillarStyles, pillarFromString } from 'types/Pillar';

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
                        />
                        <ArticleStandfirst
                            standfirst={fields.standfirst}
                            feature={feature}
                            pillarStyles={pillarStyles}
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
                    className={articleWidthStyles}
                />
                <footer css={articleWidthStyles}>
                    <Tags tags={tags}/>
                </footer>
            </article>
        </main>
    );
}

export default Article;
