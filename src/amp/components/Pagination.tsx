import React from 'react';
import { css } from '@emotion/react';

import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import ChevronRightSingle from '@frontend/static/icons/chevron-right-single.svg';
import ChevronRightDouble from '@frontend/static/icons/chevron-right-double.svg';
import ChevronLeftSingle from '@frontend/static/icons/chevron-left-single.svg';
import ChevronLeftDouble from '@frontend/static/icons/chevron-left-double.svg';

const paginationStyle = css`
	${textSans.xxsmall()};
	font-weight: bold;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const paginationLinkStyle = (isActive: boolean) => css`
	width: 36px;
	border-radius: 100%;

	position: relative;
	color: ${palette.neutral[7]};
	border: 1px solid ${palette.neutral[86]};
	height: 36px;
	display: inline-block;

	margin-right: 0px;

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

const marginRightStyle = css`
	margin-right: 5px;
`;

export const Pagination: React.FunctionComponent<{
	pagination?: Pagination;
	guardianURL: string;
}> = ({ pagination, guardianURL }) => {
	if (!pagination) {
		return null;
	}

	return (
		<div css={paginationStyle}>
			<p>
				<a
					css={[
						paginationLinkStyle(pagination.newest !== undefined),
						marginRightStyle,
					]}
					href={
						pagination.newest
							? `${guardianURL}${pagination.newest}`
							: ''
					}
				>
					<span>
						<ChevronLeftDouble />
					</span>
				</a>

				<a
					css={paginationLinkStyle(pagination.newest !== undefined)}
					href={
						pagination.newest
							? `${guardianURL}${pagination.newest}`
							: ''
					}
				>
					<span>
						<ChevronLeftSingle />
					</span>
				</a>
			</p>

			<p>
				{pagination.currentPage} of {pagination.totalPages}
			</p>

			<p>
				<a
					css={[
						paginationLinkStyle(pagination.older !== undefined),
						marginRightStyle,
					]}
					href={
						pagination.older
							? `${guardianURL}${pagination.older}`
							: ''
					}
				>
					<span>
						<ChevronRightSingle />
					</span>
				</a>

				<a
					css={paginationLinkStyle(pagination.older !== undefined)}
					href={
						pagination.older
							? `${guardianURL}${pagination.older}`
							: ''
					}
				>
					<span>
						<ChevronRightDouble />
					</span>
				</a>
			</p>
		</div>
	);
};
