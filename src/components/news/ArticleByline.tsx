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

    .authour {
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
    background: #1a1a1a;
    color: ${palette.neutral[86]};

    .keyline {
        background-image: repeating-linear-gradient(${palette.neutral[20]}, ${palette.neutral[20]} 1px, transparent 1px, transparent 3px);
    }

    .authour {
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
    contributor: Contributor | null;
}

interface Contributor {
    webTitle?: string;
    webUrl?: string;
    bylineImageUrl?: string;
}

const ArticleByline = ({ byline, pillarStyles, publicationDate, contributor }: ArticleBylineProps) => (
    <div css={[ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}>
        <div className="keyline"></div>
        <div css={sidePadding}>
            <div className="avatar">
                <img src="https://i.guim.co.uk/img/uploads/2017/10/09/Tom-Phillips,-L.png?w=300&amp;h=180&amp;q=65&amp;fit=bounds&amp;sig-ignores-params=true&amp;s=dcac8b92181c23b7bc21197bcddb99fd" />
            </div>
            <div className="authour">
                <div className="byline" dangerouslySetInnerHTML={{__html: byline}}></div>
                <div className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</div>
                {contributor ? <div className="follow">Follow { contributor.webTitle }</div> : null}
            </div>
        </div>
    </div>
)

export default ArticleByline;
