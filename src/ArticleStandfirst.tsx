import React from 'react';
import { sideMargins } from './styles';

const articleStandfirst = {
    marginBottom: '6px'
}

const ArticleStandfirst = () => (
    <div css={[sideMargins, articleStandfirst]} >'Various contacts' made, says embattled president, amid reports he is negotiating a way to stand down</div>
)

export default ArticleStandfirst;