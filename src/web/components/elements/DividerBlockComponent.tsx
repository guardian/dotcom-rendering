import React from 'react';
import { css, cx } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

type Props = {
	size?: 'full' | 'partial';
	spaceAbove?: 'tight' | 'loose';
};

const baseStyles = css`
	height: 1px;
	border: 0;
	margin-left: -10px;
	margin-bottom: 3px;
	background-color: ${border.secondary};
`;
const sizeFullStyle = css`
	width: 100%;
`;
const sizePartialStyle = css`
	width: 150px;
`;

const tightSpaceAboveStyle = css`
	margin-top: 20px;
`;
const looseSpaceAboveStyle = css`
	margin-top: 48px;
`;

export const DividerBlockComponent = ({
	size = 'partial',
	spaceAbove = 'loose',
}: Props) => (
	<hr
		className={cx(
			baseStyles,
			size === 'partial' ? sizePartialStyle : sizeFullStyle,
			spaceAbove === 'loose'
				? looseSpaceAboveStyle
				: tightSpaceAboveStyle,
		)}
	/>
);
