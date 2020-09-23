import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Format } from '@guardian/types/Format';
import { renderText } from 'renderer';
import { Option, map, withDefault } from '@guardian/types/option';
import { headline } from '@guardian/src-foundations/typography';
import { pipe2 } from 'lib';

const StandfirstStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    color: ${neutral[97]};

    p, li {
        ${headline.xxxsmall({ fontWeight: 'bold' })}
    }

    a {
        color: ${neutral[93]};
        border-bottom: 0.0625rem solid rgb(220, 220, 220, .4);
    }

    li {
        ::before {
            opacity: .4;
        }
    }
`;

interface LiveblogStandfirstProps {
    standfirst: Option<DocumentFragment>;
    format: Format;
}

const LiveblogStandfirst: FC<LiveblogStandfirstProps> = ({ standfirst, format }) =>
    pipe2(
        standfirst,
        map(doc =>
            <LeftColumn className={StandfirstStyles(getPillarStyles(format.pillar))}>
                <div>{ renderText(doc, format) }</div>
            </LeftColumn>
        ),
        withDefault<JSX.Element | null>(null),
    );

export default LiveblogStandfirst;
