import React from 'react';
import { sideMargins } from '../../styles';
import { css } from '@emotion/core'

const articleStandfirst = css`
    margin-bottom: 6px;

    p {
        margin: 0;
    }
`;

interface ArticleStandfirstProps {
    standfirst: string;
    feature: boolean;
}

const ArticleStandfirst = ({ standfirst, feature }: ArticleStandfirstProps) => (
    <div css={[sideMargins, articleStandfirst]} dangerouslySetInnerHTML={{__html: standfirst}}></div>
)

export default ArticleStandfirst;