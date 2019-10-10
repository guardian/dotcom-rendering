import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { Series, Contributor } from '../../types/Capi';
import { Tag, Asset, Block } from 'types/capi-thrift-models';
import { PillarId, PillarStyles, darkModeCss, articleWidthStyles } from '../../styles';
import { palette, until } from '@guardian/src-foundations';
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
    mainAssets: Asset[] | null;
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
    width: 1300px;
    margin: 0 auto;
    background: ${palette.neutral[100]};

    ${until.wide} {
        width: 100%;
        margin: 0;
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0 auto;

        ${until.wide} {
            margin: unset;
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
    mainAssets,
    starRating,
    bodyElements,
    pillarStyles,
    contributors,
    series,
    imageSalt,
}: ArticleProps): JSX.Element =>
    <main css={[MainStyles, MainDarkStyles]}>
        <div css={BorderStyles}>
            <HeaderImage assets={mainAssets} imageSalt={imageSalt} className={HeaderImageStyles}/>
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
