import React from 'react';

import LiveblogSeries from './liveblogSeries';
import LiveblogHeadline from './liveblogHeadline';
import LiveblogStandfirst from './liveblogStandfirst';
import LiveblogByline from './liveblogByline';
import LiveblogKeyEvents from './liveblogKeyEvents';
import LiveblogBody from './liveblogBody';
import HeaderImage from '../shared/headerImage';
import Tags from '../shared/tags';
import { wideColumnWidth, baseMultiply, darkModeCss } from 'styles';
import { Content } from 'capiThriftModels';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { articleMainImage, articleSeries, articleContributors } from 'capi';
import { PillarStyles, pillarFromString, getPillarStyles } from 'pillar';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${palette.neutral[97]};
`;

const BorderStyles = css`
    ${darkModeCss`background: ${palette.neutral.darkMode};`}

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

    const { fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const series = articleSeries(capi);
    const pillar = pillarFromString(pillarId);
    const pillarStyles = getPillarStyles(pillar);
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
                    pillar={pillar}
                    publicationDate={webPublicationDate}
                    contributors={contributors}
                    imageSalt={imageSalt}
                    commentable={fields.commentable}
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
