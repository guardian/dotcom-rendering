// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { text, neutral } from '@guardian/src-foundations/palette';
import { Option, withDefault, map } from '@guardian/types/option';
import { darkModeCss as darkMode } from 'styles';
import { formatDate } from 'date';
import { pipe2 } from 'lib';
import { Pillar } from '@guardian/types/Format';


// ----- Component ----- //

interface Props {
    date: Option<Date>;
    pillar: Pillar;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const styles = css`
    ${textSans.xsmall()}
    color: ${text.supporting};

    ${darkStyles}
`;

const commentDatelinStyles = css`
    ${textSans.xsmall()}
    color: ${neutral[20]};

    ${darkStyles}
`;

const getDatelineStyles = (pillar: Pillar): SerializedStyles => {
    switch(pillar){
        case Pillar.Opinion:
            return commentDatelinStyles;
        default:
            return styles;
    }
}

const Dateline: FC<Props> = ({ date, pillar }) =>
    pipe2(
        date,
        map(d => <time css={getDatelineStyles(pillar)} data-date={d} className="date">{ formatDate(d) }</time>),
        withDefault<ReactElement | null>(null),
    )


// ----- Exports ----- //

export default Dateline;
