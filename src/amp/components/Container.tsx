import React from 'react';
import { css, cx } from 'emotion';

const container = css`
	margin: auto;
	max-width: 600px;
`;

export const Container: React.FC<{
	className?: string;
	children: React.ReactNode;
}> = ({ className, children, ...props }) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<div className={cx(container, className)} {...props}>
		{children}
	</div>
);
