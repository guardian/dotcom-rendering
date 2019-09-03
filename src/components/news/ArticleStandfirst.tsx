import React from 'react';
import { sideMargins } from '../../styles';
import styled from '@emotion/styled';

const Standfirst = styled.div`
    margin-bottom: 6px;

    p {
        margin: 0;
    }

    ${sideMargins}
`;

interface ArticleStandfirstProps {
    standfirst: string;
    feature: boolean;
}

const ArticleStandfirst = ({ standfirst, feature }: ArticleStandfirstProps) => (
    <Standfirst dangerouslySetInnerHTML={{__html: standfirst}}></Standfirst>
)

export default ArticleStandfirst;