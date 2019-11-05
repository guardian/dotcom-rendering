import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from 'components/shared/Tags';
import { Content } from 'types/capi-thrift-models';
import { darkModeCss, articleWidthStyles, pillarStylesFromString } from 'styles';
import { palette, wide } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/Keyline';
import { isFeature, articleSeries, articleContributors, articleMainImage } from 'types/Capi';

export interface ArticleProps {
    capi: Content;
    imageSalt: string;
}

const MainStyles = css`
    background: ${palette.neutral[97]};
`;

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral[10]};
`;

const BorderStyles = css`
    background: ${palette.neutral[100]};

    ${wide} {
        width: 1300px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${wide} {
            margin: 0 auto;
        }
    }
`;

const Article = ({ capi, imageSalt }: ArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const series = articleSeries(capi);
    const feature = isFeature(capi) || 'starRating' in fields;
    const pillarStyles = pillarStylesFromString(pillarId);
    const contributors = articleContributors(capi);
    const bodyElements = blocks.body[0].elements;
    const mainImage = articleMainImage(capi);

    return (
        <main css={[MainStyles, MainDarkStyles]}>
            <div css={BorderStyles}>
                <HeaderImage image={mainImage} imageSalt={imageSalt} className={HeaderImageStyles}/>
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
                <Keyline pillar={pillarId} type={'article'}/>
                <div css={articleWidthStyles}>
                    <ArticleByline
                        byline={fields.bylineHtml}
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        imageSalt={imageSalt}
                    />
                    <ArticleBody
                        pillarStyles={pillarStyles}
                        bodyElements={bodyElements}
                        imageSalt={imageSalt}
                    />
                    <Tags tags={tags}/>
                </div>
            </div>
        </main>
    );
}

export default Article;
