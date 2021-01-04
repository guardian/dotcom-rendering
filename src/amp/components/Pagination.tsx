import React from 'react';
import { css } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import ChevronRightSingle from '@frontend/static/icons/chevron-right-single.svg';
import ChevronRightDouble from '@frontend/static/icons/chevron-right-double.svg';
import ChevronLeftSingle from '@frontend/static/icons/chevron-left-single.svg';
import ChevronLeftDouble from '@frontend/static/icons/chevron-left-double.svg';

const paginationStyle = css`
	${textSans.xsmall()};
	font-weight: bold;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const paginationLinkStyle = (isActive: boolean, isMarginRight: boolean) => css`
	width: 36px;
	border-radius: 100%;

	position: relative;
	color: ${palette.neutral[7]};
	border: 1px solid ${palette.neutral[86]};
	height: 36px;
	display: inline-block;

	margin-right: ${isMarginRight ? '5px' : '0px'};

	span {
		fill: ${palette.neutral[100]};

		svg {
			position: absolute;
			top: 10px;
			left: 9px;
			width: 16px;
			height: 16px;
			fill: ${isActive ? neutral[46] : palette.neutral[86]};
		}
	}
`;

export const Pagination: React.SFC<{
	pagination?: Pagination;
	guardianURL: string;
}> = ({ pagination, guardianURL }) => {
	const link = (
		url: string,
		icon: JSX.Element,
		suffix?: string,
		hasRightMargin: boolean = false,
	): JSX.Element => {
		const styles = paginationLinkStyle(
			suffix !== undefined,
			hasRightMargin,
		);

		const attrs = {
			className: styles,
			href: suffix ? url + suffix : undefined,
		};

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<a {...attrs}>
				<span>{icon}</span>
			</a>
		);
	};

	if (!pagination) {
		return null;
	}

	return (
		<div className={paginationStyle}>
			<p>
				{link(
					guardianURL,
					<ChevronLeftDouble />,
					pagination.newest,
					true,
				)}
				{link(guardianURL, <ChevronLeftSingle />, pagination.newer)}
			</p>

			<p>
				{pagination.currentPage} of {pagination.totalPages}
			</p>

			<p>
				{link(
					guardianURL,
					<ChevronRightSingle />,
					pagination.older,
					true,
				)}
				{link(guardianURL, <ChevronRightDouble />, pagination.oldest)}
			</p>
		</div>
	);
};
