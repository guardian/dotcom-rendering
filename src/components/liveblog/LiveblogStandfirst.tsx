import React from 'react';
import { basePx, sidePadding, PillarStyles, bulletStyles } from '../../styles';
import { transform } from '../../utils/contentTransformations';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

const StandfirstStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    padding-bottom: 6px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;
    background: ${liveblogBackground};
    color: ${palette.neutral[93]};
    padding: ${basePx(1, 0, 4, 0)};

    p, ul {
        margin: 0;
    }

    a {
        color: ${palette.neutral[93]};
    }

    ${bulletStyles(liveblogBackground)}
    ${sidePadding}
`;

interface LiveblogStandfirstProps {
    standfirst: string;
    pillarStyles: PillarStyles;
}

const LiveblogStandfirst = ({ standfirst, pillarStyles }: LiveblogStandfirstProps): JSX.Element => {
    return <div css={StandfirstStyles(pillarStyles)} dangerouslySetInnerHTML={{__html: transform(standfirst)}}></div>
}

export default LiveblogStandfirst;
