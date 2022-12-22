import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
} from '@guardian/source-foundations';

export const tabList = css`
	display: flex;
	align-items: flex-end;
	justify-content: flex-start;
`;

export const tabButton = css`
	background-color: ${neutral[100]};
	${headline.xxxsmall({
		fontWeight: 'bold',
	})}
	position: relative;
	display: block;
	text-decoration: none;
	appearance: none;
	width: 100%;
	height: ${space[12]}px;
	text-align: left;
	color: ${neutral[7]};
	padding: ${space[2]}px ${space[3]}px;
	border: 1px solid ${neutral[86]};
	border-bottom: none;
	cursor: pointer;

	:first-of-type {
		margin-left: ${space[2]}px;
		border-radius: ${space[2]}px 0 0 0;
	}
	:last-of-type {
		border-radius: 0 ${space[2]}px 0 0;
	}

	${from.phablet} {
		${headline.xxsmall({
			fontWeight: 'bold',
		})}
		width: 210px;
	}


	&[aria-selected='false'] {
		background-color: ${neutral[97]};
	}

	/* Pseudo-element that covers the tab panel bottom border for the active tab */
	&[aria-selected='true']::after {
		position: absolute;
		z-index: 1;
		bottom: -1px;
		right: 0;
		left: 0;
		height: 1px;
		background: inherit;
		content: '';
	}
`;
export const tabPanel = css`
	position: relative;
	padding: ${space[2]}px;
	border: 1px solid  ${neutral[86]};
`;
