import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBody from './LiveblogBody';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';

import { PillarStyles, PillarId } from '../../styles';
import { Series, Contributor } from '../../types/Capi';
import { Tag, Asset } from 'types/v1_types';
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
    bodyElements: any;
    isLive: boolean;
    imageSalt: string;
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
    bodyElements,
    imageSalt
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
        <LiveblogKeyEvents bodyElements={bodyElements} pillarStyles={pillarStyles}/>
        <LiveblogBody
            bodyElements={bodyElements}
            pillarStyles={pillarStyles}
            imageSalt={imageSalt}
        />
        <Tags tags={tags} background={palette.neutral[93]}/>
    </main>

export default LiveblogArticle;
