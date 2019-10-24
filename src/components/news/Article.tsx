import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';
import { Option } from 'types/Option';
import { Series, Contributor } from '../../types/Capi';
import { Tag, Block, BlockElement } from 'types/capi-thrift-models';
import { PillarId, PillarStyles, darkModeCss, articleWidthStyles } from '../../styles';
import { palette, wide } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/Keyline';

export interface ArticleProps {
    headline: string;
    standfirst: string;
    bylineHtml: string;
    webPublicationDate: string;
    body: string;
    tags: Tag[];
    feature: boolean;
    pillarId: PillarId;
    mainImage: Option<BlockElement>;
    starRating?: string;
    pillarStyles: PillarStyles;
    contributors: Contributor[];
    series: Series;
    bodyElements: Block[];
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

const Article = ({
    headline,
    standfirst,
    bylineHtml,
    webPublicationDate,
    pillarId,
    tags,
    feature,
    mainImage,
    starRating,
    bodyElements,
    pillarStyles,
    contributors,
    series,
    imageSalt,
}: ArticleProps): JSX.Element =>
    <main css={[MainStyles, MainDarkStyles]}>
        <div css={BorderStyles}>
            <HeaderImage image={mainImage} imageSalt={imageSalt} className={HeaderImageStyles}/>
            <div css={articleWidthStyles}>
                <ArticleSeries series={series} pillarStyles={pillarStyles}/>
                <ArticleHeadline
                    headline={headline}
                    feature={feature}
                    rating={starRating}
                    pillarStyles={pillarStyles}
                />
                <ArticleStandfirst
                    standfirst={standfirst}
                    feature={feature}
                    pillarStyles={pillarStyles}
                />
            </div>
            <Keyline pillar={pillarId} type={'article'}/>
            <div css={articleWidthStyles}>
                <ArticleByline
                    byline={bylineHtml}
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

export default Article;
