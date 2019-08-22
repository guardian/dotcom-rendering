import React from 'react';

import HeaderImage from './HeaderImage';
import ArticleTitle from './ArticleTitle';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';

const Article = () => (
    <div>
        <HeaderImage />
        <ArticleTitle />
        <ArticleStandfirst />
        <ArticleByline />
        <ArticleBody />
    </div>
)

export default Article;