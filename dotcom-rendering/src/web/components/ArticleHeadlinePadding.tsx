import { css } from '@emotion/react';

import { ArticleDesign } from '@guardian/libs';
import { from , space } from '@guardian/source-foundations';

const determinePadding = ({
	design,
	starRating,
}: {
	design: ArticleDesign;
	starRating?: boolean;
}) => {
	switch (design) {
		case ArticleDesign.Review:
			if (starRating) {
				return '';
			}
			return css`
				padding-bottom: ${space[6]}px;
				${from.tablet} {
					padding-bottom: ${space[9]}px;
				}
			`;
		case ArticleDesign.Interview:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
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
	design: ArticleDesign;
	starRating?: boolean;
}> = ({ children, design, starRating }) => (
	<div css={determinePadding({ design, starRating })}>{children}</div>
);
