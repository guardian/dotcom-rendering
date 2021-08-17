import { css } from '@emotion/react';

type Props = {
	children: React.ReactNode;
	palette: Palette;
	isFullCardImage?: boolean;
};

export const TopBar = ({ children, palette, isFullCardImage }: Props) => (
	<div
		css={css`
			display: flex;
			width: 100%;
			/* We absolutely position the 1 pixel top bar below
               so this is required here */
			position: relative;

			/* Styling for top bar */
			:before {
				background-color: ${palette.topBar.card};
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
