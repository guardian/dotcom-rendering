import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { palette } from '../palette';

const pillStyles = css`
	display: inline-flex;
	align-items: center;
	padding: 0 10px;
	border-radius: ${space[3]}px;
	${textSansBold12};
	color: ${palette('--pill-text')};
	background-color: ${palette('--pill-background')};
`;

const pillSegmentStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	min-height: 24px;
	& + & {
		margin-left: 6px;
		padding-left: 6px;
		border-left: 1px solid ${palette('--pill-divider')};
	}
	svg {
		flex: none;
		fill: currentColor;
		width: auto;
		height: 20px;
		margin: 0 -3px; /* Compensate for whitespace around icon */
	}
`;

export const Pill = ({ children }: { children: ReactNode }) => (
	<div css={pillStyles}>{children}</div>
);

Pill.Segment = ({ children }: { children: ReactNode }) => (
	<span css={pillSegmentStyles}>{children}</span>
);
