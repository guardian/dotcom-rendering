import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { renderText } from 'renderer';
import { Option } from 'types/option';

const StandfirstStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    color: ${neutral[97]};

    a {
        color: ${neutral[93]};
    }

    li {
        ::before {
            opacity: .4;
        }
    }
`;

interface LiveblogStandfirstProps {
    standfirst: Option<DocumentFragment>;
    pillar: Pillar;
}

const LiveblogStandfirst = ({ standfirst, pillar }: LiveblogStandfirstProps): JSX.Element | null =>
    standfirst.fmap<JSX.Element | null>(doc =>
        <LeftColumn className={StandfirstStyles(getPillarStyles(pillar))}>
            <div>{ renderText(doc, pillar) }</div>
        </LeftColumn>
    ).withDefault(null)

export default LiveblogStandfirst;
