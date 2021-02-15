import React from 'react';
import { css } from '@emotion/react';

const container = css`
	margin: auto;
	max-width: 600px;
`;

export const Container: React.FC<{
	className?: string;
	children: React.ReactNode;
}> = ({ className, children, ...props }) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<div css={[container, className]} {...props}>
		{children}
	</div>
);
