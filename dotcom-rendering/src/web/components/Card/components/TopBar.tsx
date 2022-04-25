import { css } from '@emotion/react';

type Props = {
	children: React.ReactNode;
	palette: Palette;
};

export const TopBar = ({ children, palette }: Props) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			justify-content: space-between;
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
				height: 1px;
				z-index: 2;
			}
		`}
	>
		{children}
	</div>
);
