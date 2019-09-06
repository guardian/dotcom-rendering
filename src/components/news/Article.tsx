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
    displayImages: DisplayImage[];
};

interface Tag {
    webUrl: string;
    webTitle: string;
    type: string;
}

interface DisplayImage {
    urlTemplate: string;
    cleanCaption: string;
    cleanCredit: string;
};

const Article = ({ headline, standfirst, bylineHtml, webPublicationDate, body, pillarId, displayImages, tags, feature }: ArticleProps) => {
    const pillarStyles = getPillarStyles(pillarId);
    const { urlTemplate, cleanCaption, cleanCredit } = displayImages[0];
    const contributor = tags.filter(tag => tag.type === 'contributor').pop();
    // TODO: use context api to beam pillarStyles down to all components

    return (
        <React.Fragment>
            <HeaderImage image={urlTemplate} caption={cleanCaption} credit={cleanCredit}/>
            <ArticleHeadline headline={headline} feature={feature}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleByline byline={bylineHtml} pillarStyles={pillarStyles} publicationDate={webPublicationDate} contributor={contributor}/>
            <ArticleBody body={body} pillarStyles={pillarStyles} feature={feature}/>
            <Tags tags={tags}/>
        </React.Fragment>
    )
}

export default Article;