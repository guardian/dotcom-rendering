import React from 'react';
import { css } from 'emotion';

type Props = {
	children: JSXElements;
};

export const HeadlineWrapper = ({ children }: Props) => (
	<div
		className={css`
			padding-bottom: 8px;
			padding-left: 5px;
			padding-right: 5px;
		`}
	>
		{children}
	</div>
);
