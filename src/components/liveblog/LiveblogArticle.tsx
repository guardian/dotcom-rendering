import React from 'react';

import LiveblogSeries from './LiveblogSeries';
import LiveblogHeadline from './LiveblogHeadline';
import LiveblogStandfirst from './LiveblogStandfirst';
import LiveblogByline from './LiveblogByline';
import LiveblogKeyEvents from './LiveblogKeyEvents';
import LiveblogBody from './LiveblogBody';
import HeaderImage from '../shared/HeaderImage';
import Tags from '../shared/Tags';
import { PillarStyles, wideColumnWidth, baseMultiply, pillarStylesFromString, pillarIdFromString } from 'styles';
import { Content } from 'types/capi-thrift-models';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { articleMainImage, articleSeries, articleContributors } from 'types/Capi';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

const BorderStyles = css`
    ${from.wide} {
        width: 1200px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${from.wide} {
        padding-bottom: 12px;
    }

    figure {
        margin: 0;

        ${from.wide} {
            margin-left: ${wideColumnWidth + baseMultiply(1)}px;
        }
    }
`;

interface LiveblogArticleProps {
    capi: Content;
    imageSalt: string;
}

const LiveblogArticle = ({ capi, imageSalt }: LiveblogArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate, pillarId: pillarIdStr, blocks } = capi;
    const series = articleSeries(capi);
    const pillarStyles = pillarStylesFromString(pillarIdStr);
    const pillarId = pillarIdFromString(pillarIdStr);
    const contributors = articleContributors(capi);
    const bodyElements = blocks.body;
    const image = articleMainImage(capi);

    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={series} pillarStyles={pillarStyles} />
                <LiveblogHeadline headline={fields.headline} pillarStyles={pillarStyles} />
                <LiveblogStandfirst standfirst={fields.standfirst} pillarStyles={pillarStyles} />
                <LiveblogByline
                    byline={fields.bylineHtml}
                    pillarStyles={pillarStyles}
                    pillarId={pillarId}
                    publicationDate={webPublicationDate}
                    contributors={contributors}
                    imageSalt={imageSalt}
                />
                <HeaderImage
                    image={image}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles(pillarStyles)}
                />
                <LiveblogKeyEvents bodyElements={bodyElements} pillarStyles={pillarStyles} />
                <LiveblogBody
                    bodyElements={bodyElements}
                    pillarStyles={pillarStyles}
                    imageSalt={imageSalt}
                />
                <Tags tags={tags} background={palette.neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
