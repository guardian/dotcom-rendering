import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBody from './LiveblogBody';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';

import { PillarStyles, PillarId, wideColumnWidth, baseMultiply } from 'styles';
import { Series, Contributor } from '../../types/Capi';
import { Tag, Asset, Block } from 'types/capi-thrift-models';
import { css, SerializedStyles } from '@emotion/core'
import { palette, wide } from '@guardian/src-foundations'

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

const BorderStyles = css`
    ${wide} {
        width: 1200px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${wide} {
        padding-bottom: 12px;
    }

    figure {
        margin: 0;

        ${wide} {
            margin-left: ${wideColumnWidth + baseMultiply(1)}px;
        }
    }
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
    bodyElements: Block[];
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
        <div css={BorderStyles}>
            <LiveblogSeries series={series} pillarStyles={pillarStyles}/>
            <LiveblogHeadline headline={headline} pillarStyles={pillarStyles}/>
            <LiveblogStandfirst standfirst={standfirst} pillarStyles={pillarStyles}/>
            <LiveblogByline
                byline={bylineHtml}
                pillarStyles={pillarStyles}
                pillarId={pillarId}
                publicationDate={webPublicationDate}
                contributors={contributors}
                imageSalt={imageSalt}
            />
            <HeaderImage
                assets={mainAssets}
                imageSalt={imageSalt}
                className={HeaderImageStyles(pillarStyles)}
            />
            <LiveblogKeyEvents bodyElements={bodyElements} pillarStyles={pillarStyles}/>
            <LiveblogBody
                bodyElements={bodyElements}
                pillarStyles={pillarStyles}
                imageSalt={imageSalt}
            />
            <Tags tags={tags} background={palette.neutral[93]}/>
        </div>
    </main>

export default LiveblogArticle;
