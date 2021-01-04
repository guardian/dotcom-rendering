import React from 'react';
import { css } from 'emotion';

type Props = {
	children: JSXElements;
	topBarColour: string;
};

export const TopBar = ({ children, topBarColour }: Props) => (
	<div
		className={css`
			display: flex;
			width: 100%;

			/* We absolutely position the 1 pixel top bar below
               so this is required here */
			position: relative;

			/* Styling for top bar */
			:before {
				background-color: ${topBarColour};
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 1px;
				z-index: 2;
			}
		`}
	>
		{children}
	</div>
);
