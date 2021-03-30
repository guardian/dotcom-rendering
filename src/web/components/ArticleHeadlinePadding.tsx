import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types';
import { from } from '@guardian/src-foundations/mq';

const determinePadding = ({
	design,
	starRating,
}: {
	design: Design;
	starRating?: boolean;
}) => {
	switch (design) {
		case Design.Interview:
			return css`
				padding-top: 3px;
			`;
		case Design.Review:
			if (starRating) {
				return '';
			}
			return css`
				padding-bottom: 24px;
				${from.tablet} {
					padding-bottom: 36px;
				}
			`;
		case Design.LiveBlog:
		case Design.DeadBlog:
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
	starRating?: boolean;
}> = ({ children, design, starRating }) => (
	<div className={determinePadding({ design, starRating })}>{children}</div>
);
