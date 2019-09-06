import React from 'react';
import { sideMargins, PillarStyles, bulletStyles } from '../../styles';
import { css } from '@emotion/core'

const StandfirstCss = ({ kicker }: PillarStyles) => css`
    margin-bottom: 6px;

    a {
        color: ${kicker};
    }

    p, ul {
        margin: 0;
    }

    ul {
        list-style: none;
        padding-left: 0;

        > li {
            padding-left: 1.25rem;

            &::before {
                display: inline-block;
                content: '';
                border-radius: 0.375rem;
                height: 0.75rem;
                width: 0.75rem;
                margin-right: 0.5rem;
                background-color: #dcdcdc;
                margin-left: -1.25rem;
            }
        }
    }

    ${bulletStyles(kicker)}

    ${sideMargins}
`;

interface ArticleStandfirstProps {
    standfirst: string;
    feature: boolean;
    pillarStyles: PillarStyles;
}

const ArticleStandfirst = ({ standfirst, pillarStyles, feature }: ArticleStandfirstProps) => (
    <div css={StandfirstCss(pillarStyles)} dangerouslySetInnerHTML={{__html: standfirst.replace(/•/g, '<span class="bullet">•</span>')}}></div>
)

export default ArticleStandfirst;