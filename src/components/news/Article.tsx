import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { getPillarStyles, PillarId } from '../../styles';

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
};

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

const Article = ({ headline, standfirst, bylineHtml, webPublicationDate, body, pillarId, tags, feature, mainAssets }: ArticleProps) => {
    const pillarStyles = getPillarStyles(pillarId);
    const contributor = tags.filter(tag => tag.type === 'contributor').pop() || null;
    // TODO: use context api to beam pillarStyles down to all components

    return (
        <React.Fragment>
            <HeaderImage assets={mainAssets}/>
            <ArticleHeadline headline={headline} feature={feature}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleByline byline={bylineHtml} pillarStyles={pillarStyles} publicationDate={webPublicationDate} contributor={contributor}/>
            <ArticleBody body={body} pillarStyles={pillarStyles} feature={feature}/>
            <Tags tags={tags}/>
        </React.Fragment>
    )
}

export default Article;