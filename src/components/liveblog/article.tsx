import React from 'react';

import LiveblogSeries from 'components/liveblog/series';
import LiveblogHeadline from 'components/liveblog/headline';
import LiveblogStandfirst from 'components/liveblog/standfirst';
import LiveblogByline from 'components/liveblog/byline';
import LiveblogKeyEvents from 'components/liveblog/keyEvents';
import LiveblogBody from 'components/liveblog/body';
import HeaderImage from 'components/shared/headerImage';
import Tags from 'components/shared/tags';
import { wideColumnWidth, baseMultiply, darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, getPillarStyles } from 'pillar';
import { Liveblog } from 'item';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${neutral[97]};
`;

const BorderStyles = css`
    ${darkModeCss`background: ${background.inverse};`}

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
    item: Liveblog;
    imageSalt: string;
}

const LiveblogArticle = ({ item, imageSalt }: LiveblogArticleProps): JSX.Element => {

    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={item.series} pillar={item.pillar} />
                <LiveblogHeadline headline={item.headline} pillar={item.pillar} />
                <LiveblogStandfirst standfirst={item.standfirst} pillar={item.pillar} />
                <LiveblogByline item={item} imageSalt={imageSalt} />
                <HeaderImage
                    image={item.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles(getPillarStyles(item.pillar))}
                    pillar={item.pillar}
                />
                <LiveblogKeyEvents blocks={item.blocks} pillar={item.pillar} />
                <LiveblogBody
                    blocks={item.blocks}
                    pillar={item.pillar}
                    imageSalt={imageSalt}
                />
                <Tags tags={item.tags} background={neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
