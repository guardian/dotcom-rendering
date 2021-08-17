import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';

type Props = {
	children: React.ReactNode;
};
const containerStyles = css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	.meta-number:not(:empty) + .meta-number:not(:empty) {
		/* This css to show a vertical divider  will only be applied to the second
           non empty meta-number element. (We only want the border to show when both share
           and comment counts are displayed) */
		border-left: 1px solid ${border.secondary};
		margin-left: 4px;
		padding-left: 4px;
		height: 40px;
	}
`;

export const Counts = ({ children }: Props) => (
	<div css={containerStyles}>
		{/* The containerStyles css is expecting children to be two divs with the
            'meta-number' class */}
		{children}
	</div>
);
