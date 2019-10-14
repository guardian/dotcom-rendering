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
import { Tag, Asset, Block } from 'types/capi-thrift-models';
import { css, SerializedStyles } from '@emotion/core'
import { palette, until } from '@guardian/src-foundations'

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

const BorderStyles = css`
    width: 1200px;
    margin: 0 auto;

    ${until.wide} {
        width: unset;
        margin: unset;
    }
`;

const HeaderImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};
    padding-bottom: 12px;

    ${until.wide} {
        padding-left: unset;
        padding-bottom: unset;
    }

    figure {
        margin: 0 0 0 228px;

        ${until.wide} {
            margin-left: unset;
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
