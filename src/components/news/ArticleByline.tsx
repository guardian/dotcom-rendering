import React from 'react';
import moment from 'moment';
import { sideMargins, textSans, PillarStyles } from '../../styles';
import { css } from '@emotion/core'
import { palette } from '@guardian/src-foundations';

const ArticleBylineCss = css`
    height: 12px;
    width: 100%;
    background-image: repeating-linear-gradient(${palette.neutral[86]}, ${palette.neutral[86]} 1px, transparent 1px, transparent 3px);
    margin-bottom: 4px;
`;

const avatarCss = ({ inverted }: PillarStyles) => css`
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
`;

const ArticleBylineAuthorCss = ({ kicker }: PillarStyles) => css`
    .byline, .follow, a {
        color: ${kicker};
    }

    .date, .follow {
        ${textSans}
    }

    .follow {
        text-decoration: underline;
    }
`;

interface ArticleBylineProps {
    byline: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributor?: Contributor;
}

interface Contributor {
    webTitle: string;
    webUrl: string;
    bylineImageUrl: string;
}

const ArticleByline = ({ byline, pillarStyles, publicationDate, contributor }: ArticleBylineProps) => (
    <React.Fragment>
        <div css={ArticleBylineCss}></div>
        <div css={sideMargins}>
            <div css={avatarCss(pillarStyles)}>
                <img src="https://i.guim.co.uk/img/uploads/2017/10/09/Tom-Phillips,-L.png?w=300&amp;h=180&amp;q=65&amp;fit=bounds&amp;sig-ignores-params=true&amp;s=dcac8b92181c23b7bc21197bcddb99fd" />
            </div>
            <div css={ArticleBylineAuthorCss(pillarStyles)}>
                <div className="byline" dangerouslySetInnerHTML={{__html: byline}}></div>
                <div className="date">{moment(publicationDate).format('HH:mm dddd, D MMMM YYYY')}</div>
                {contributor ? <div className="follow">Follow { contributor.webTitle }</div> : null}
            </div>
        </div>
    </React.Fragment>
)

export default ArticleByline;
