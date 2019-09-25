import React from 'react';
import moment from 'moment';
import { sidePadding, textSans, PillarStyles, PillarId } from '../../styles';

import { Keyline } from '../shared/Keyline';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../types/Capi';


const LiveblogBylineStyles = ({ inverted, liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    .avatar {
        width: 68px;
        height: 68px;
        background-color: ${inverted};
        border-radius: 100%;
        float: left;
        margin: 0 12px 12px 0;
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
        .byline {
            line-height: 2.2rem;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        .byline, .follow, a {
            color: ${palette.neutral[93]};
        }

        .date, .follow {
            ${textSans}
        }

        .date {
            font-size: 1.4rem;
            color: ${palette.neutral[93]};
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

const LiveblogBylineAvatar = (img: string): JSX.Element => (
    <div className="avatar"><img src={img} /></div>
)

const LiveblogByline = ({ byline, pillarStyles, publicationDate, contributors, pillarId }: LiveblogBylineProps): JSX.Element => {
    const [contributor] = contributors;
    const singleContributor = contributors.length === 1;
    const avatar = (singleContributor && contributor.bylineLargeImageUrl) ? LiveblogBylineAvatar(contributor.bylineLargeImageUrl) : null;
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline type={pillarId} />
            <div css={sidePadding}>
                { avatar }
                <div className="author">
                    <div className="byline" dangerouslySetInnerHTML={{__html: byline}}></div>
                    <div className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</div>
                    {singleContributor && contributor.apiUrl ? <div className="follow">Follow { contributor.webTitle }</div> : null}
                </div>
            </div>
        </div>
    )
}

export default LiveblogByline;
