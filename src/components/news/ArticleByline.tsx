import React from 'react';
import moment from 'moment';
import { sidePadding, textSans, PillarStyles, PillarId, darkModeCss } from '../../styles';

import { Keyline } from '../shared/Keyline';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../types/Capi';


const ArticleBylineStyles = ({ inverted, kicker }: PillarStyles): SerializedStyles => css`
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
        address {
            line-height: 2.2rem;
            font-style: inherit;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        .date, .follow {
            ${textSans}
        }

        .date {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const ArticleBylineDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        .date {
            color: ${palette.neutral[60]};
        }
    }
`;

interface ArticleBylineProps {
    byline: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    pillarId: PillarId;
}

const isSingleContributor = (contributors: Contributor[]): boolean => contributors.length === 1;

const Avatar = (props: { contributors: Contributor[] }): JSX.Element | null => {

    const [contributor] = props.contributors;

    if (isSingleContributor(props.contributors) && contributor.bylineLargeImageUrl) {
        return (
            <div className="avatar">
                <img src={contributor.bylineLargeImageUrl} alt={contributor.webTitle}/>
            </div>
        );
    }

    return null;
    
}

const Follow = (props: { contributors: Contributor[] }): JSX.Element | null => {

    const [contributor] = props.contributors;

    if (isSingleContributor(props.contributors) && contributor.apiUrl) {
        return <div className="follow">Follow { contributor.webTitle }</div>;
    }

    return null;

}

const ArticleByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    pillarId,
}: ArticleBylineProps): JSX.Element =>
    <div css={[ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}>
        <Keyline pillar={pillarId} type={'article'}/>
        <div css={sidePadding}>
            <Avatar contributors={contributors} />
            <div className="author">
                <address dangerouslySetInnerHTML={{__html: byline}}></address>
                <time className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</time>
                <Follow contributors={contributors} />
            </div>
        </div>
    </div>

export default ArticleByline;
