import React from 'react';
import { sidePadding, textSans, PillarStyles, PillarId } from '../../styles';

import { Keyline } from '../shared/Keyline';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../types/Capi';
import { formatDate } from 'utils/date';
import Avatar from 'components/shared/Avatar';

const LiveblogBylineStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: 8px;

    .author {
        padding-bottom: 4px;
        line-height: 2.2rem;

        address {
            font-style: inherit;
            a {
                text-decoration: none;
                font-weight: 500;
                padding-top: 4px;
                display: block;
            }
        }

        address, .follow, a {
            color: ${palette.neutral[100]};
        }

        .date, .follow {
            ${textSans}
        }

        .date {
            font-size: 1.4rem;
            color: ${palette.neutral[93]};
            opacity: .8;
        }
    }
`;

interface LiveblogBylineProps {
    byline: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    pillarId: PillarId;
    imageSalt: string;
}

const LiveblogByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    pillarId,
    imageSalt
}: LiveblogBylineProps): JSX.Element => {
    
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline pillar={pillarId} type={'liveblog'}/>
            <div css={sidePadding}>
                <Avatar
                    contributors={contributors}
                    bgColour={pillarStyles.featureHeadline}
                    imageSalt={imageSalt}
                />
                <div className="author">
                    <address dangerouslySetInnerHTML={{__html: byline}}></address>
                    <time className="date">{ formatDate(new Date(publicationDate)) }</time>
                    <div className="follow">Get alerts on this story</div>
                </div>
            </div>
        </div>
    )
}

export default LiveblogByline;
