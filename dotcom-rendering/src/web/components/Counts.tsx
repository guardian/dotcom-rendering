import { css } from '@emotion/react';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { until } from '@guardian/src-foundations/mq';

import { border } from '@guardian/src-foundations/palette';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
};
const containerStyles = css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	.meta-number:not(:empty) + .meta-number:not(:empty) {
		/* This css to show a vertical divider  will only be applied to the second
           non empty meta-number element. (We only want the border to show when both share
           and comment counts are displayed) */
		border-left: 1px solid ${border.secondary};
		margin-left: 4px;
		padding-left: 4px;
		height: 40px;
	}
`;

const standfirstColouring = css`
	${until.desktop} {
		.meta-number:not(:empty) + .meta-number:not(:empty) {
			border-left: 1px solid rgba(255, 255, 255, 0.4);
		}
	}
`;

export const Counts = ({ children, format }: Props) => (
	<div
		css={[
			containerStyles,
			format.design === ArticleDesign.LiveBlog && standfirstColouring,
		]}
	>
		{/* The containerStyles css is expecting children to be two divs with the
            'meta-number' class */}
		{children}
	</div>
);
