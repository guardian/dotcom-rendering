import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';

type Props = {
	palette: Palette;
	short: string;
	long: string;
};

const containerStyles = (palette: Palette) => css`
	display: flex;
	flex-direction: row;
	${textSans.xxsmall()};
	padding-left: 5px;
	padding-right: 5px;
	color: ${palette.text.cardFooter};
`;

const svgStyles = (palette: Palette) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${palette.fill.cardIcon};
	}
`;

const longStyles = css`
	display: block;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

export const CardCommentCount = ({ palette, short, long }: Props) => {
	return (
		<div css={containerStyles(palette)} aria-label={`${short} Comments`}>
			<div css={svgStyles(palette)}>
				<CommentIcon />
			</div>
			<div css={longStyles} aria-hidden="true">
				{long}
			</div>
			<div css={shortStyles} aria-hidden="true">
				{short}
			</div>
		</div>
	);
};
