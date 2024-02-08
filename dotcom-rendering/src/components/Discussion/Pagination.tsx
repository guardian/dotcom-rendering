import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import type { FilterOptions } from '../../lib/discussion';
import { palette as schemedPalette } from '../../palette';

type Props = {
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
	topLevelCommentCount: number;
	filters: FilterOptions;
};

const pageButtonStyles = (isSelected: boolean) => css`
	cursor: pointer;
	${textSans.small({ fontWeight: 'bold' })}

	text-decoration: none;
	border-radius: 62.5rem;
	box-sizing: border-box;

	color: ${isSelected
		? schemedPalette('--discussion-pagination-background')
		: schemedPalette('--discussion-pagination-text')};
	background-color: ${isSelected
		? schemedPalette('--discussion-pagination-text')
		: 'transparent'};
	border: none;
	:hover {
		border-width: 0.0625rem;
		border-style: solid;
		border-color: ${schemedPalette('--discussion-pagination-text')};
	}

	margin-right: 5px;
	padding: 0 0.125rem;
	min-width: 1.5rem;
	text-align: center;

	height: 1.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const chevronButtonStyles = ({ isSelected }: { isSelected: boolean }) => css`
	margin-right: ${space[1]}px;

	border-radius: 62.5rem;
	border-width: 1px;
	border-style: solid;
	border-color: ${sourcePalette.neutral[86]};
	background-color: ${isSelected
		? schemedPalette('--discussion-pagination-text')
		: schemedPalette('--discussion-pagination-background')};
	height: 22px;
	min-height: 22px;
	width: 22px;

	/* Override some of src's properties */
	> button {
		height: 22px;
		min-height: 22px;
		width: 22px;
		color: ${schemedPalette('--discussion-pagination-text')};
	}

	:hover {
		border-color: ${sourcePalette.neutral[60]};
	}

	& svg {
		/* Make the chevrons grey */
		fill: currentColor;
		/* Set the dimensions */
		width: 22px;
		height: 22px;
	}
`;

const shiftRight = css`
	/* The right chevron svg positions it's path in such a way that makes the alignment look
    off. So here we shift it slightly to the right to fix that     */
	& svg {
		margin-left: 2px;
	}
`;

const elipsisStyles = css`
	line-height: 26px;
	margin-right: 5px;
`;

const wrapperStyles = css`
	${textSans.small()};
	color: ${schemedPalette('--discussion-pagination-text')};

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	border-top: 1px solid ${schemedPalette('--discussion-pagination-border')};
	${until.mobileLandscape} {
		flex-direction: column;
	}
`;

const paginationButtons = css`
	display: flex;
	flex-direction: row;
	height: 25px;
`;

const paginationText = css`
	${textSans.small()};
	margin-left: 5px;
	${until.mobileLandscape} {
		padding-top: 10px;
	}
`;

const Forward = ({
	currentPage,
	setCurrentPage,
}: {
	currentPage: number;
	setCurrentPage: Props['setCurrentPage'];
}) => (
	<div css={[chevronButtonStyles({ isSelected: false }), shiftRight]}>
		<Button
			onClick={() => setCurrentPage(currentPage + 1)}
			aria-label="Previous discussion page"
			data-link-name={`Pagination view page ${currentPage + 1}`}
			size="xsmall"
			priority="subdued"
		>
			<SvgChevronRightSingle />
		</Button>
	</div>
);

const Back = ({
	currentPage,
	setCurrentPage,
}: {
	currentPage: number;
	setCurrentPage: Props['setCurrentPage'];
}) => {
	const newPage = Math.max(0, currentPage - 1);

	return (
		<div css={chevronButtonStyles({ isSelected: false })}>
			<Button
				onClick={() => setCurrentPage(newPage)}
				aria-label="Previous discussion page"
				data-link-name={`Pagination view page ${newPage}`}
				size="xsmall"
				priority="subdued"
			>
				<SvgChevronLeftSingle />
			</Button>
		</div>
	);
};

const PageButton = ({
	currentPage,
	setCurrentPage,
	isSelected,
}: {
	currentPage: number;
	setCurrentPage: Props['setCurrentPage'];
	isSelected: boolean;
}) => (
	<button
		key={currentPage}
		css={pageButtonStyles(isSelected)}
		onClick={() => setCurrentPage(currentPage)}
		data-link-name={`Pagination view page ${currentPage}`}
		type="button"
	>
		{currentPage}
	</button>
);

const decideSecondPage = ({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) => {
	if (currentPage < 4) return 2;
	if (currentPage > totalPages - 2) return totalPages - 2;
	return currentPage - 1;
};

const decideThirdPage = ({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) => {
	if (currentPage < 4) return 3;
	if (currentPage > totalPages - 2) return totalPages - 1;
	return currentPage;
};

const decideForthPage = ({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) => {
	if (currentPage < 4) return 4;
	if (currentPage > totalPages - 2) return totalPages;
	return currentPage + 1;
};

export const Pagination = ({
	currentPage,
	setCurrentPage,
	topLevelCommentCount,
	filters,
}: Props) => {
	const totalPages = Math.ceil(topLevelCommentCount / filters.pageSize);
	// Make decisions aobut which pagination elements to show
	const showBackButton = totalPages > 4 && currentPage > 1;
	const showFirstElipsis = totalPages > 4 && currentPage > 3;
	const secondPage = decideSecondPage({ currentPage, totalPages });
	const thirdPage = decideThirdPage({ currentPage, totalPages });
	const forthPage = decideForthPage({ currentPage, totalPages });
	const showThirdPage = totalPages > 2;
	const showForthPage = totalPages > 3;
	const showLastPage = totalPages > 4 && currentPage < totalPages - 1;
	const lastPage = totalPages;
	const showSecondElipsis = totalPages > 4 && currentPage < totalPages - 2;
	const showForwardButton = totalPages > 4 && currentPage !== totalPages;

	// Pagination Text
	const { pageSize } = filters;
	/**
	 * Starting index of **1**
	 *
	 * For example, with a page size of 25, and 63 comments total:
	 * 1. from 1
	 * 2. from 26
	 * 3. from 51
	 */
	const startIndex = 1 + pageSize * (currentPage - 1);
	/**
	 * Starting index of **1**
	 *
	 * For example, with a page size of 25, and 63 comments total:
	 * 1. until 25
	 * 2. until 50
	 * 3. until 63
	 */
	const endIndex = Math.min(pageSize * currentPage, topLevelCommentCount);

	return (
		<div css={wrapperStyles}>
			<div css={paginationButtons}>
				{showBackButton && (
					<Back
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				)}
				<PageButton
					currentPage={1}
					setCurrentPage={setCurrentPage}
					isSelected={currentPage === 1}
				/>
				{showFirstElipsis && <div css={elipsisStyles}>&hellip;</div>}
				<PageButton
					currentPage={secondPage}
					setCurrentPage={setCurrentPage}
					isSelected={currentPage === secondPage}
				/>
				{showThirdPage && (
					<PageButton
						currentPage={thirdPage}
						setCurrentPage={setCurrentPage}
						isSelected={currentPage === thirdPage}
					/>
				)}
				{showForthPage && (
					<PageButton
						currentPage={forthPage}
						setCurrentPage={setCurrentPage}
						isSelected={currentPage === forthPage}
					/>
				)}
				{showSecondElipsis && <div css={elipsisStyles}>&hellip;</div>}
				{showLastPage && (
					<PageButton
						currentPage={lastPage}
						setCurrentPage={setCurrentPage}
						isSelected={currentPage === lastPage}
					/>
				)}
				{showForwardButton && (
					<Forward
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
			<div css={paginationText}>
				{`Displaying ${
					filters.threads === 'unthreaded' ? 'comments' : 'threads'
				} ${startIndex} to ${endIndex} of ${topLevelCommentCount}`}
			</div>
		</div>
	);
};
