import React from 'react';
import { css } from 'emotion';

type Props = {
	children: React.ReactNode;
	topBarColour: string;
	isFullCardImage?: boolean;
};

export const TopBar = ({ children, topBarColour, isFullCardImage }: Props) => (
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
				height: ${isFullCardImage ? 4 : 1}px;
				z-index: 2;
			}
		`}
	>
		{children}
	</div>
);
