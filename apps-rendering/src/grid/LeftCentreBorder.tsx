// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import type { FC } from 'react';
import { grid } from './grid';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (rows: [number, number]): SerializedStyles => css`
	${from.leftCol} {
		${grid.column.centre}
		grid-row: ${rows[0]} / ${rows[1]};
		transform: translateX(-10px);
		outline: 0.5px solid ${neutral[86]};
		width: 0;
	}

	${darkModeCss`
		outline-color: ${neutral[20]};
	`}
`;

interface Props {
	/** The grid rows between which to render the border */
	rows: [start: number, end: number];
}

/**
 * Renders a border between the left column and the centre column when using
 * the common Guardian layout columns. Appears from the leftCol breakpoint.
 */
const LeftCentreBorder: FC<Props> = ({ rows }) => (
	<div css={styles(rows)}></div>
);

// ----- Exports ----- //

export default LeftCentreBorder;
