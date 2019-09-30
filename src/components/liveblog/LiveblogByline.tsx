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
}

const Avatar = (props: { contributors: Contributor[] }): JSX.Element | null => {

    const [contributor] = props.contributors;
    const singleContributor = props.contributors.length === 1;

    if (singleContributor && contributor.bylineLargeImageUrl) {
        return (
            <div className="avatar">
                <img src={contributor.bylineLargeImageUrl} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}

const LiveblogByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    pillarId,
}: LiveblogBylineProps): JSX.Element => {
    
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline pillar={pillarId} type={'liveblog'}/>
            <div css={sidePadding}>
                <Avatar contributors={contributors} />
                <div className="author">
                    <address dangerouslySetInnerHTML={{__html: byline}}></address>
                    <time className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</time>
                    <div className="follow">Get alerts on this story</div>
                </div>
            </div>
        </div>
    )
}

export default LiveblogByline;
