import React from 'react';

import HeaderImage from './HeaderImage';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from './Tags';

import { getPillarStyles } from './styles';

const Article = ({ headline, standfirst, byline, body, tags, pillarId, displayImages }) => {
    const pillarStyles = getPillarStyles(pillarId);
    const {urlTemplate, cleanCaption, cleanCredit } = displayImages[0];
    // TODO: use context api to beam pillarStyles down to all components
    return (
        <React.Fragment>
            <HeaderImage image={urlTemplate} caption={cleanCaption} credit={cleanCredit}/>
            <ArticleHeadline headline={headline}/>
            <ArticleStandfirst standfirst={standfirst}/>
            <ArticleByline byline={byline} pillarStyles={pillarStyles}/>
            <ArticleBody body={body} pillarStyles={pillarStyles}/>
            <Tags tags={tags}/>
        </React.Fragment>
    )
}

export default Article;