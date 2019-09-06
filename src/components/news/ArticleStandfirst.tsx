import React from 'react';
import { sideMargins, PillarStyles, bulletStyles } from '../../styles';
import { transform } from '../../utils/contentTransformations';
import { css } from '@emotion/core'

const StandfirstCss = ({ kicker }: PillarStyles) => css`
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;

    a {
        color: ${kicker};
    }

    p, ul {
        margin: 0;
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
    <div css={StandfirstCss(pillarStyles)} dangerouslySetInnerHTML={{__html: transform(standfirst)}}></div>
)

export default ArticleStandfirst;
