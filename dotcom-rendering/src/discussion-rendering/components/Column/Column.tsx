import { css } from '@emotion/react';

type Props = { children: JSX.Element | JSX.Element[] };

export const Column = ({ children }: Props) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
		`}
	>
		{children}
	</div>
);
