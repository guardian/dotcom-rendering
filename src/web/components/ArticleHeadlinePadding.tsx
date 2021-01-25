import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { from } from '@guardian/src-foundations/mq';

const paddingTop = css`
	padding-top: 3px;
`;

const standardPadding = css`
	padding-bottom: 24px;
	${from.tablet} {
		padding-bottom: 36px;
	}
`;

const determinePadding = (design: Design) => {
	switch (design) {
		case Design.Review:
		case Design.Interview:
			return null;
		default:
			return standardPadding;
	}
};

export const ArticleHeadlinePadding: React.FC<{
	children: React.ReactNode;
	design: Design;
}> = ({ children, design }) => {
	const paddingClassName = determinePadding(design);
	return (
		<div className={cx(paddingTop, paddingClassName || '')}>{children}</div>
	);
};
