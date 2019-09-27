import React from 'react';
import moment from 'moment';
import { sidePadding, textSans, PillarStyles, PillarId } from '../../styles';

import { Keyline } from '../shared/Keyline';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../types/Capi';


const LiveblogBylineStyles = ({ featureHeadline, liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: 8px;

    .avatar {
        width: 68px;
        height: 68px;
        background-color: ${featureHeadline};
        border-radius: 100%;
        float: left;
        margin: 0 8px 0 0;
        overflow: hidden;

        img {
            width: 100%;
            height: auto;
            transform-origin: top center;
            transform: scale(1.6) translate(-1px, -1px);
        }
    }

    .author {
        padding-bottom: 4px;
        line-height: 2.2rem;

        .byline {
            a {
                text-decoration: none;
                font-weight: 500;
                padding-top: 4px;
                display: block;
            }
        }

        .byline, .follow, a {
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
}

const LiveblogBylineAvatar = ({ bylineLargeImageUrl, webTitle }: Contributor): JSX.Element => (
    <div className="avatar"><img src={bylineLargeImageUrl} alt={webTitle}/></div>
)

const LiveblogByline = ({ byline, pillarStyles, publicationDate, contributors, pillarId }: LiveblogBylineProps): JSX.Element => {
    const [contributor] = contributors;
    const singleContributor = contributors.length === 1;
    const avatar = (singleContributor && contributor.bylineLargeImageUrl) ? LiveblogBylineAvatar(contributor) : null;
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline pillar={pillarId} type={'liveblog'}/>
            <div css={sidePadding}>
                { avatar }
                <div className="author">
                    <div className="byline" dangerouslySetInnerHTML={{__html: byline}}></div>
                    <time className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</time>
                    <div className="follow">Get alerts on this story</div>
                </div>
            </div>
        </div>
    )
}

export default LiveblogByline;
