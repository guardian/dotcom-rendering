import React from 'react';
import { sideMargins, textSans } from '../../styles';
import { css } from '@emotion/core'

const ArticleBylineCss = css`
    height: 12px;
    width: 100%;
    background-image: repeating-linear-gradient(#dcdcdc, #dcdcdc 1px, transparent 1px, transparent 3px);
    margin-bottom: 4px;
`;

const avatarCss = ({ inverted }) => css`
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

const ArticleBylineAuthorCss = ({ kicker }) => css`
    .byline, .follow {
        color: ${kicker};
    }

    .date, .follow {
        ${textSans}
    }

    .follow {
        text-decoration: underline;
    }
`;

const ArticleByline = ({ byline, pillarStyles }) => (
    <React.Fragment>
        <div css={ArticleBylineCss}></div>
        <div css={sideMargins}>
            <div css={avatarCss(pillarStyles)}>
                <img src="https://i.guim.co.uk/img/uploads/2017/10/09/Tom-Phillips,-L.png?w=300&amp;h=180&amp;q=65&amp;fit=bounds&amp;sig-ignores-params=true&amp;s=dcac8b92181c23b7bc21197bcddb99fd" />
            </div>
            <div css={ArticleBylineAuthorCss(pillarStyles)}>
                <div className="byline">{ byline }</div>
                <div className="date">01:45 Wednesday, 21 August 2019</div>
                <div className="follow">Follow Tom Phillips</div>
            </div>
        </div>
    </React.Fragment>
)

export default ArticleByline;