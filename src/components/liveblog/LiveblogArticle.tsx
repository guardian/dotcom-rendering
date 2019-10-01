import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBlock from './LiveblogBlock';
import LiveblogLoadMore from './LiveblogLoadMore';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';

import { PillarStyles, PillarId } from '../../styles';
import { Series, Tag, Contributor } from '../../types/Capi';
import { Asset } from 'utils/Asset';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

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

const LiveblogArticle = ({
    headline,
    standfirst,
    bylineHtml,
    webPublicationDate,
    pillarId,
    tags,
    mainAssets,
    pillarStyles,
    contributors,
    series,
}: LiveblogArticleProps): JSX.Element =>
    <main css={LiveblogArticleStyles}>
        <LiveblogSeries series={series} pillarStyles={pillarStyles}/>
        <LiveblogHeadline headline={headline} pillarStyles={pillarStyles}/>
        <LiveblogStandfirst standfirst={standfirst} pillarStyles={pillarStyles}/>
        <LiveblogByline
            byline={bylineHtml}
            pillarStyles={pillarStyles}
            pillarId={pillarId}
            publicationDate={webPublicationDate}
            contributors={contributors}
        />
        <HeaderImage assets={mainAssets}/>
        <LiveblogKeyEvents pillarStyles={pillarStyles}/>
        <LiveblogBlock pillarStyles={pillarStyles} highlighted={true}/>
        <LiveblogBlock pillarStyles={pillarStyles} highlighted={false}/>
        <LiveblogBlock pillarStyles={pillarStyles} highlighted={false}/>
        <LiveblogLoadMore pillarStyles={pillarStyles}/>
        <Tags tags={tags} background={palette.neutral[93]}/>
    </main>

export default LiveblogArticle;
