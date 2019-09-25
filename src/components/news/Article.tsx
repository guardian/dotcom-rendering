import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { Series, Tag, Asset, Contributor } from '../../types/Capi';
import { PillarId, PillarStyles, darkModeCss } from '../../styles';
import { palette } from '@guardian/src-foundations';

interface ArticleProps {
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
}

const MainStyles = darkModeCss`
    background: ${palette.neutral[10]};
`;

const Article = ({ headline, standfirst, bylineHtml, webPublicationDate, body, pillarId, tags, feature, mainAssets, starRating, pillarStyles, contributors, series }: ArticleProps): JSX.Element => {
    return (
        <main css={MainStyles}>
            <HeaderImage assets={mainAssets}/>
            <ArticleSeries series={series} pillarStyles={pillarStyles}/>
            <ArticleHeadline headline={headline} feature={feature} rating={starRating} pillarStyles={pillarStyles}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleByline byline={bylineHtml} pillarStyles={pillarStyles} pillarId={pillarId} publicationDate={webPublicationDate} contributors={contributors}/>
            <ArticleBody body={body} pillarStyles={pillarStyles}/>
            <Tags tags={tags}/>
        </main>
    )
}

export default Article;
