import { css } from '@emotion/react';

type Props = {
	children: React.ReactNode;
};

export const HeadlineWrapper = ({ children }: Props) => (
	<div
		css={css`
			padding-bottom: 8px;
		`}
	>
		{children}
	</div>
);
