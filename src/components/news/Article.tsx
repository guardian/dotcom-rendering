import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { Series, Tag, Contributor, Block } from '../../types/Capi';
import { Asset } from 'utils/Asset';
import { PillarId, PillarStyles, darkModeCss } from '../../styles';
import { palette } from '@guardian/src-foundations';

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

const MainStyles = darkModeCss`
    background: ${palette.neutral[10]};
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
    <main css={MainStyles}>
        <HeaderImage assets={mainAssets} imageSalt={imageSalt}/>
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
        <ArticleByline
            byline={bylineHtml}
            pillarStyles={pillarStyles}
            pillarId={pillarId}
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
    </main>

export default Article;
