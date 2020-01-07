import React from 'react';
import { sans, basePx } from 'styles';

import { Keyline } from '../shared/keyline';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../capi';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';
import { Article } from 'article';

const LiveblogBylineStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: ${basePx(1)};

    .author {
        padding-bottom: 4px;
        line-height: 2.2rem;

        address {
            font-style: italic;
            a {
                text-decoration: none;
                font-style: normal;
                font-weight: 500;
                padding-top: 4px;
                display: block;
            }
        }

        address, .follow, a {
            color: ${palette.neutral[100]};
        }

        time, .follow {
            ${sans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[93]};
            opacity: .8;
        }
    }
`;

interface LiveblogBylineProps {
    byline?: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    article: Article;
    imageSalt: string;
}

const LiveblogByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    article,
    imageSalt
}: LiveblogBylineProps): JSX.Element => {
    
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline article={article}/>
            <LeftColumn>
                <Avatar
                    contributors={contributors}
                    bgColour={pillarStyles.featureHeadline}
                    imageSalt={imageSalt}
                />
                <div className="author">
                    { byline ? <address>{componentFromHtml(byline)}</address> : null }
                    <time>{ formatDate(new Date(publicationDate)) }</time>
                    <div className="follow">Get alerts on this story</div>
                </div>
            </LeftColumn>
        </div>
    )
}

export default LiveblogByline;
