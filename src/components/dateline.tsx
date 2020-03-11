// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { text, neutral } from '@guardian/src-foundations/palette';

import { Option } from 'types/option';
import { darkModeCss as darkMode } from 'styles';
import { formatDate } from 'date';


// ----- Component ----- //

interface Props {
    date: Option<Date>;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const styles = css`
    ${textSans.xsmall()}
    color: ${text.supporting};

    ${darkStyles}
`;

const Dateline: FC<Props> = ({ date }) =>
    date.fmap<ReactElement | null>(d =>
        <time css={styles} data-date={d} className="date">{ formatDate(d) }</time>
    ).withDefault(null);


// ----- Exports ----- //

export default Dateline;
