import { css } from '@emotion/react';

// default base styling for all buttons
export const buttonBaseCss = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: none;
	border: 0;
	margin: 0;
	padding: 0;

	:focus {
		outline: none;
	}

	:not(:disabled):hover {
		opacity: 0.8;
		cursor: pointer;
	}
`;
