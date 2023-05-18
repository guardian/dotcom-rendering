import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { Fragment } from 'react';

type Props = {
	sectionName: string;
	totalContent: number;
	currentPage: number;
	lastPage: number;
};

const paginationWrapperCss = css`
	margin-top: ${space[6]}px;

	padding-top: ${space[6]}px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	border-top: 1.5px solid ${palette.neutral[86]};
`;

const paginationLegendCss = css`
	${textSans.xsmall()}
`;

const paginationItemContainerCss = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const paginationItemCss = css`
	display: flex;
	flex-direction: row;
	justify-content: center;

	min-width: 25px;
	padding: 3px ${space[1]}px;
	margin: ${space[1]}px;

	${textSans.xxsmall({ fontWeight: 'bold' })}
	text-decoration: none;

	color: ${palette.neutral[46]};
	border-radius: 12px;

	border: 1px solid transparent;

	&:hover {
		border: 1px solid ${palette.neutral[86]};
	}
`;

const activePaginationItemCss = css`
	color: #ffffff;
	background-color: ${palette.neutral[46]};

	&:hover {
		border: 1px solid transparent;
	}
`;

const paginationDotsCss = css`
	${textSans.xxsmall({ fontWeight: 'bold' })}
	color: ${palette.neutral[46]};
	padding: ${space[1]}px;
`;

const paginationArrowsCss = css`
	width: 25px;
	height: 25px;
	border: 1px solid ${palette.neutral[86]};

	border-radius: 20px;

	padding: 2px;

	svg {
		color: ${palette.neutral[86]};
	}
`;

const formatNumber = (number: number): string =>
	number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const getPageRange = (currentPage: number, lastPage: number) => {
	const pageRange: number[] = [];

	// Safety function to check we're within bounds
	const pushIfValid = (...items: number[]) => {
		items.forEach((item) => {
			if (item > 0 && item <= lastPage) pageRange.push(item);
		});
	};

	if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
		pushIfValid(1, 2, 3, 4);
	} else if (currentPage + 2 >= lastPage) {
		pushIfValid(1, lastPage - 2, lastPage - 1, lastPage);
	} else {
		pushIfValid(1, currentPage - 1, currentPage, currentPage + 1);
	}

	return pageRange;
};

export const FrontPagination = ({
	totalContent,
	sectionName,
	currentPage,
	lastPage,
}: Props) => {
	const pageRange = getPageRange(currentPage, lastPage);

	return (
		<div css={paginationWrapperCss}>
			<span css={paginationLegendCss}>
				About {formatNumber(totalContent)} results for {sectionName}
			</span>
			<div css={paginationItemContainerCss}>
				{currentPage > 1 && (
					<a
						href={`?page=${currentPage - 1}`}
						css={paginationArrowsCss}
					>
						<SvgChevronLeftSingle />
					</a>
				)}
				{pageRange.map((page, index) => {
					// If there is a gap of more than 1 number between this entry and the last one
					const shouldPrefixDots =
						page > 1 && pageRange[index - 1] !== page - 1;

					// If this is the last item and we're not at the last page yet
					const shouldSuffixDots =
						/* pageRange[index + 1] !== page + 1 || */
						index === pageRange.length - 1 && page !== lastPage;

					return (
						<Fragment key={page}>
							{shouldPrefixDots && (
								<span css={paginationDotsCss}>...</span>
							)}
							{page === currentPage ? (
								<span
									css={[
										paginationItemCss,

										activePaginationItemCss,
									]}
								>
									{page}
								</span>
							) : (
								<a
									css={[paginationItemCss]}
									href={
										page !== currentPage
											? `?page=${page}`
											: undefined
									}
								>
									{page}
								</a>
							)}
							{shouldSuffixDots && (
								<span css={paginationDotsCss}>...</span>
							)}
						</Fragment>
					);
				})}
				{currentPage < lastPage && (
					<a
						href={`?page=${currentPage + 1}`}
						css={paginationArrowsCss}
					>
						<SvgChevronRightSingle />
					</a>
				)}
			</div>
		</div>
	);
};
