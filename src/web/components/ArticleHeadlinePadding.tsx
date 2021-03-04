import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types';
import { from } from '@guardian/src-foundations/mq';

const determinePadding = (design: Design) => {
	switch (design) {
		case Design.Review:
		case Design.Interview:
			return css`
				padding-top: 3px;
			`;
		default:
			return css`
				padding-top: 3px;
				padding-bottom: 24px;
				${from.tablet} {
					padding-bottom: 36px;
				}
			`;
	}
};

export const ArticleHeadlinePadding: React.FC<{
	children: React.ReactNode;
	design: Design;
}> = ({ children, design }) => (
	<div className={determinePadding(design)}>{children}</div>
);
