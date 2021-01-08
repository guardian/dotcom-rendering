import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types/Format';
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
		case Design.Article:
		case Design.Media:
		case Design.PhotoEssay:
		case Design.Live:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.GuardianView:
		case Design.Quiz:
		case Design.AdvertisementFeature:
		case Design.Feature:
		case Design.Comment:
		case Design.Analysis:
			return standardPadding;

		case Design.Review:
		case Design.Interview:
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
