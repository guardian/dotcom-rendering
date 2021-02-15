import React from 'react';
import { css } from '@emotion/react';

const style = css`
	padding-left: 10px;
	padding-right: 10px;
`;

export const InnerContainer: React.FC<{
	className?: string;
	children: React.ReactNode;
}> = ({ className, children, ...props }) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<div css={[style, className]} {...props}>
		{children}
	</div>
);
