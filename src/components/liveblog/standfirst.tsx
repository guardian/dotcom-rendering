import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { renderText } from 'renderer';
import { Option } from 'types/option';

const StandfirstStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    color: ${neutral[97]};

    p, ul {
        margin-left: 0;
        padding-left: 0;
    }

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
