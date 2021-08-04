import React from 'react';
import { css } from '@emotion/react';

import ArrowRight from '@frontend/static/icons/arrow-right.svg';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

const supportStyles = css`
	align-self: flex-start;
	background-color: ${palette.brandAlt[400]};
	border-radius: 20px;
	display: flex;
	align-items: center;
	padding: 0 15px;
	min-height: 30px;
	${until.mobileMedium} {
		padding: 0 10px;
		min-height: 24px;
	}
`;

const supportHeaderStyles = css`
	${supportStyles}
	justify-content: center;
	margin-top: 10px;
	margin-left: 10px;
	${until.mobileMedium} {
		margin-top: 28px;
	}
`;

const supportFooterStyles = css`
	${supportStyles}
	margin-bottom: 6px;
`;

const supportLinkStyles = css`
	position: relative;
	color: ${palette.neutral[7]};
	${textSans.medium()};
	font-weight: 700;
	display: block;
	text-decoration: none;
	width: 100%;

	padding-right: 20px;
	${until.mobileMedium} {
		${textSans.small()};
		padding-right: 18px;
	}

	svg {
		position: absolute;
		top: -3px;

		${until.mobileMedium} {
			width: 26px;
			height: 26px;
		}
	}
`;

const rightAlignedIcon = css`
	position: absolute;
	height: 20px;
	width: 20px;
	right: 0;
	top: 0;
`;

export const ReaderRevenueButton: React.FunctionComponent<{
	nav: NavType;
	linkLabel: string;
	rrLink: ReaderRevenuePosition;
	rrCategory: ReaderRevenueCategory;
	rightAlignIcon?: boolean;
}> = ({ nav, linkLabel, rrLink, rrCategory, rightAlignIcon }) => {
	const url = nav.readerRevenueLinks[rrLink][rrCategory];

	if (url === '') {
		return null;
	}

	const isAmpHeader = rrLink === 'ampHeader';

	return (
		<div css={isAmpHeader ? supportHeaderStyles : supportFooterStyles}>
			<a css={supportLinkStyles} href={url}>
				{linkLabel}
				<span css={!!rightAlignIcon && rightAlignedIcon}>
					<ArrowRight />
				</span>
			</a>
		</div>
	);
};
