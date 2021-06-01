import { css } from '@emotion/react';

import { Design } from '@guardian/types';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const determinePadding = ({
	design,
	starRating,
}: {
	design: Design;
	starRating?: boolean;
}) => {
	switch (design) {
		case Design.Review:
			if (starRating) {
				return '';
			}
			return css`
				padding-bottom: ${space[6]}px;
				${from.tablet} {
					padding-bottom: ${space[9]}px;
				}
			`;
		case Design.Interview:
		case Design.LiveBlog:
		case Design.DeadBlog:
			// Don't add extra padding
			return css``;
		default:
			return css`
				padding-bottom: ${space[6]}px;
				${from.tablet} {
					padding-bottom: ${space[9]}px;
				}
			`;
	}
};

export const ArticleHeadlinePadding: React.FC<{
	children: React.ReactNode;
	design: Design;
	starRating?: boolean;
}> = ({ children, design, starRating }) => (
	<div css={determinePadding({ design, starRating })}>{children}</div>
);
