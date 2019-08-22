import React from 'react';

import HeaderImage from './HeaderImage';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';

const Article = ({ headline, standfirst, byline, body, tags, pillarId }) => {
    return (
        <div>
            <HeaderImage />
            <ArticleHeadline headline={headline}/>
            <ArticleStandfirst standfirst={standfirst}/>
            <ArticleByline byline={byline}/>
            <ArticleBody body={body}/>
        </div>
    )
}

export default Article;