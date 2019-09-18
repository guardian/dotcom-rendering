import React from 'react';
import moment from 'moment';
import { sidePadding, textSans, PillarStyles, darkModeCss } from '../../styles';
import { css } from '@emotion/core';
import { palette } from '@guardian/src-foundations';


const ArticleBylineStyles = ({ inverted, kicker }: PillarStyles) => css`
    .keyline {
        height: 12px;
        width: 100%;
        background-image: repeating-linear-gradient(${palette.neutral[86]}, ${palette.neutral[86]} 1px, transparent 1px, transparent 3px);
        margin-bottom: 4px;
    }

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
        .byline {
            line-height: 2.2rem;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        .byline, .follow, a {
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

const ArticleBylineDarkStyles = ({ inverted }: PillarStyles) => darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    .keyline {
        background-image: repeating-linear-gradient(${palette.neutral[20]}, ${palette.neutral[20]} 1px, transparent 1px, transparent 3px);
    }

    .author {
        .byline, .follow, a {
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
    contributors: Contributor[]
}

interface Contributor {
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    bylineLargeImageUrl?: string;
}

const ArticleBylineAvatar = (img: string) => (
    <div className="avatar"><img src={img} /></div>
)

const ArticleByline = ({ byline, pillarStyles, publicationDate, contributors }: ArticleBylineProps) => {
    const [contributor] = contributors;
    const singleContributor = contributors.length === 1;
    const avatar = (singleContributor && contributor.bylineLargeImageUrl) ? ArticleBylineAvatar(contributor.bylineLargeImageUrl) : null;
    return (
        <div css={[ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}>
            <div className="keyline"></div>
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

export default ArticleByline;
