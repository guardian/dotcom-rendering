import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold15,
	until,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
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
	${textSansBold15}

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

	margin-right: 2px;
	padding: 0 0.125rem;
	min-width: 1.5rem;
	text-align: center;

	height: 1.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const theme = {
	borderTertiary: schemedPalette('--discussion-pagination-border'),
	backgroundTertiaryHover: schemedPalette(
		'--discussion-pagination-background',
	),
	textTertiary: schemedPalette('--discussion-pagination-text'),
} satisfies Partial<ThemeButton>;

const ellipsisStyles = css`
	line-height: 26px;
	margin-right: 2px;
`;

const wrapperStyles = css`
	${textSans15};
	color: ${schemedPalette('--discussion-pagination-text')};

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: ${space[2]}px 0;
	border-top: 1px solid ${schemedPalette('--discussion-pagination-border')};
	${until.mobileLandscape} {
		flex-direction: column;
	}
`;

const paginationButtons = css`
	display: flex;
	flex-direction: row;
	height: 25px;

	button:hover {
		border-color: ${schemedPalette('--discussion-pagination-border-hover')};
	}
`;

const paginationText = css`
	${textSans15};
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
	<Button
		onClick={() => setCurrentPage(currentPage + 1)}
		data-link-name={`Pagination view page ${currentPage + 1}`}
		size="xsmall"
		priority="tertiary"
		theme={theme}
		// @TODO: These overrides should be removed once fixed upstream
		cssOverrides={css`
			/* theme does not support Tertiary background */
			background-color: ${schemedPalette(
				'--discussion-pagination-background',
			)};
			/* the icon is not perfectly centred */
			svg {
				transform: translateX(1px);
			}
		`}
		icon={
			<SvgChevronRightSingle
				theme={{ fill: schemedPalette('--discussion-pagination-text') }}
			/>
		}
		hideLabel={true}
	>
		Previous discussion page
	</Button>
);

const Back = ({
	currentPage,
	setCurrentPage,
}: {
	currentPage: number;
	setCurrentPage: Props['setCurrentPage'];
}) => (
	<Button
		onClick={() => setCurrentPage(currentPage - 1)}
		data-link-name={`Pagination view page ${currentPage - 1}`}
		size="xsmall"
		priority="tertiary"
		theme={theme}
		// @TODO: These overrides should be removed once fixed upstream
		cssOverrides={css`
			/* theme does not support Tertiary background */
			background-color: ${schemedPalette(
				'--discussion-pagination-background',
			)};
			/* the icon is not perfectly centred */
			svg {
				transform: translateX(-1px);
			}
		`}
		icon={
			<SvgChevronLeftSingle
				theme={{ fill: schemedPalette('--discussion-pagination-text') }}
			/>
		}
		hideLabel={true}
	>
		Previous discussion page
	</Button>
);

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

export const getPages = (
	currentPage: number,
	totalPages: number,
): (number | '…')[] => {
	if (totalPages <= 6) {
		return [1, 2, 3, 4, 5, 6].filter((page) => page <= totalPages);
	} else if (currentPage <= 3) {
		return [1, 2, 3, 4, '…', totalPages];
	} else if (currentPage <= totalPages - 3) {
		return [
			1,
			'…',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'…',
			totalPages,
		];
	} else {
		return [
			1,
			'…',
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			totalPages,
		];
	}
};

export const Pagination = ({
	currentPage,
	setCurrentPage,
	topLevelCommentCount,
	filters,
}: Props) => {
	const totalPages = Math.ceil(topLevelCommentCount / filters.pageSize);
	// Make decisions about which pagination elements to show
	const showBackButton = totalPages > 4 && currentPage > 1;
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
				{getPages(currentPage, totalPages).map((page, index) =>
					page === '…' ? (
						<div
							key={
								index === 1 ? 'first-ellipsis' : 'last-ellipsis'
							}
							css={ellipsisStyles}
						>
							&hellip;
						</div>
					) : (
						<PageButton
							key={`page-${page}`}
							currentPage={page}
							setCurrentPage={setCurrentPage}
							isSelected={page === currentPage}
						/>
					),
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
