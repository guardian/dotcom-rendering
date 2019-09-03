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
    byline: string;
    body: string;
    tags: Tag[];
    feature: boolean;
    pillarId: PillarId;
    displayImages: DisplayImage[];
};

interface Tag {
    webUrl: string;
    webTitle: string;
}

interface DisplayImage {
    urlTemplate: string;
    cleanCaption: string;
    cleanCredit: string;
};

const Article = ({ headline, standfirst, byline, body, pillarId, displayImages, tags, feature }: ArticleProps) => {
    const pillarStyles = getPillarStyles(pillarId);
    const { urlTemplate, cleanCaption, cleanCredit } = displayImages[0];
    // TODO: use context api to beam pillarStyles down to all components
    return (
        <React.Fragment>
            <HeaderImage image={urlTemplate} caption={cleanCaption} credit={cleanCredit}/>
            <ArticleHeadline headline={headline} feature={feature}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature}/>
            <ArticleByline byline={byline} pillarStyles={pillarStyles} feature={feature}/>
            <ArticleBody body={body} pillarStyles={pillarStyles} feature={feature}/>
            <Tags tags={tags}/>
        </React.Fragment>
    )
}

export default Article;