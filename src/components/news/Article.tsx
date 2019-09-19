import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleSeries from './ArticleSeries';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { getPillarStyles, PillarId, darkModeCss } from '../../styles';
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
    mainAssets: Asset[];
    starRating: string;
}

interface Asset {
    file: string;
    typeData: AssetTypeData;
}

interface AssetTypeData {
    altText: string;
    caption: string;
    credit: string;
    width: number;
    height: number;
}

interface Tag {
    webUrl: string;
    webTitle: string;
    type: string;
}

const MainStyles = darkModeCss`
    background: ${palette.neutral[10]};
`;

const Article = ({ headline, standfirst, bylineHtml, webPublicationDate, body, pillarId, tags, feature, mainAssets, starRating }: ArticleProps) => {
    const pillarStyles = getPillarStyles(pillarId);
    const contributors = tags.filter(tag => tag.type === 'contributor');
    const [series] = tags.filter(tag => tag.type === 'series');
    // TODO: use context api to pass pillarStyles down to all components
    return (
        <main css={MainStyles}>
            <HeaderImage assets={mainAssets}/>
            <ArticleSeries series={series} pillarStyles={pillarStyles}/>
            <ArticleHeadline headline={headline} feature={feature} rating={starRating} pillarStyles={pillarStyles}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleByline byline={bylineHtml} pillarStyles={pillarStyles} publicationDate={webPublicationDate} contributors={contributors}/>
            <ArticleBody body={body} pillarStyles={pillarStyles}/>
            <Tags tags={tags}/>
        </main>
    )
}

export default Article;
