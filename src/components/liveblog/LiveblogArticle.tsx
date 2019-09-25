import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBlock from './LiveblogBlock';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';

import { PillarStyles, PillarId } from '../../styles';
import { Series, Tag, Asset, Contributor } from '../../types/Capi';

interface LiveblogArticleProps {
    headline: string;
    standfirst: string;
    bylineHtml: string;
    webPublicationDate: string;
    body: string;
    tags: Tag[];
    pillarId: PillarId;
    mainAssets: Asset[] | null;
    pillarStyles: PillarStyles;
    contributors: Contributor[];
    series: Series;
}

const LiveblogArticle = ({ headline, standfirst, bylineHtml, webPublicationDate, pillarId, tags, mainAssets, pillarStyles, contributors, series }: LiveblogArticleProps): JSX.Element => {
    return (
        <main>
            <LiveblogSeries series={series} pillarStyles={pillarStyles}/>
            <LiveblogHeadline headline={headline} pillarStyles={pillarStyles}/>
            <LiveblogStandfirst standfirst={standfirst} pillarStyles={pillarStyles}/>
            <LiveblogByline byline={bylineHtml} pillarStyles={pillarStyles} pillarId={pillarId} publicationDate={webPublicationDate} contributors={contributors}/>
            <HeaderImage assets={mainAssets}/>
            <LiveblogKeyEvents />
            <LiveblogBlock />
            <Tags tags={tags}/>
        </main>
    )    
}

export default LiveblogArticle;
