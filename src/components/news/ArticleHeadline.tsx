import React from 'react';
import { basePx, sideMargins, headlineFont } from '../../styles';
import styled from '@emotion/styled';
import { palette } from '@guardian/src-foundations'

const Headline = styled.h1`
    padding: ${basePx(1, 0, 4, 0)};
    color: ${palette.neutral[7]};
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 3.2rem;
    margin: 0;
    font-weight: 500;
    ${headlineFont}
    ${sideMargins}
`;

interface ArticleHeadlineProps {
    headline: string;
    feature: boolean;
}

const ArticleHeadline = ({ headline, feature }: ArticleHeadlineProps) => (
    <Headline>{headline}</Headline>
)

export default ArticleHeadline;
