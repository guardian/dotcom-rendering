import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import PlusIcon from '../static/icons/plus.svg';

const showMore = css`
	color: ${palette.neutral[7]};
	padding: 0 10px;
	${textSans.small()};
	/* Design System: Ideally we want a centring primitive that we can use in these situations */
	line-height: 34px;
	height: 36px;
	font-weight: bold;

	svg {
		width: 18px;
		height: 18px;
		vertical-align: middle;
		margin-top: -2px;
		margin-right: 4px;
		margin-left: 5px;
		fill: ${palette.neutral[46]};
		padding-right: 4px;
	}

	:after {
		content: '';
		background-color: ${palette.neutral[86]};
		border-radius: 18px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 130px;
		z-index: -1;
		color: ${palette.neutral[100]};
	}
`;

export const ShowMoreButton = () => (
	<div css={showMore} aria-label="Show more">
		<PlusIcon />
		Show more
	</div>
);
