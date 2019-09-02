import React from 'react';
import { basePx, sideMargins } from '../../styles';
import styled from '@emotion/styled';

const Headline = styled.h1`
    padding: ${basePx(1, 0, 4, 0)};
    color: #121212;
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 3.2rem;
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
