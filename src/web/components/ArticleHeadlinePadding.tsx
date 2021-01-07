import React from 'react';
import { css, cx } from 'emotion';

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

const determinPadding = (design: Design) => {
	switch (design) {
		case 'Article':
		case 'Media':
		case 'PhotoEssay':
		case 'Live':
		case 'Recipe':
		case 'MatchReport':
		case 'GuardianView':
		case 'Quiz':
		case 'AdvertisementFeature':
		case 'Feature':
		case 'Comment':
		case 'Analysis':
			return standardPadding;

		case 'Review':
		case 'Interview':
			return null;
	}
};

export const ArticleHeadlinePadding: React.FC<{
	children: React.ReactNode;
	design: Design;
}> = ({ children, design }) => {
	const paddingClassName = determinPadding(design);
	return (
		<div className={cx(paddingTop, paddingClassName || '')}>{children}</div>
	);
};
