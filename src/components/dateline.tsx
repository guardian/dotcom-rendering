// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { Theme } from '@guardian/types/Format';
import { Pillar } from '@guardian/types/Format';
import type { Option } from '@guardian/types/option';
import { map, withDefault } from '@guardian/types/option';
import { formatDate } from 'date';
import { pipe2 } from 'lib';
import React from 'react';
import type { FC, ReactElement } from 'react';
import { darkModeCss as darkMode } from 'styles';

// ----- Component ----- //

interface Props {
	date: Option<Date>;
	theme: Theme;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const styles = css`
	${textSans.xsmall()}
	color: ${text.supporting};

	${darkStyles}
`;

const commentDatelineStyles = css`
	${textSans.xsmall()}
	color: ${neutral[20]};

	${darkStyles}
`;

const getDatelineStyles = (theme: Theme): SerializedStyles => {
	switch (theme) {
		case Pillar.Opinion:
			return commentDatelineStyles;
		default:
			return styles;
	}
};

const Dateline: FC<Props> = ({ date, theme }) =>
	pipe2(
		date,
		map((d) => (
			<time
				css={getDatelineStyles(theme)}
				data-date={d}
				className="date js-date"
			>
				{formatDate(d)}
			</time>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Dateline;
