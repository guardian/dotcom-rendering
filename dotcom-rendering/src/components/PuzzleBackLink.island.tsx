import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';

type Props = {
	archiveMonth?: string;
	puzzleSlug?: string;
};

type BackLink = {
	href: string;
	label: string;
};

const backLinkStyles = css`
	display: inline-block;
	margin-bottom: ${space[4]}px;
	color: ${palette.brand[500]};
	text-decoration: none;
	${textSans17};
`;

const getArchiveMonthFromDate = (date: string | null): string | undefined => {
	const dateMatch = date?.match(
		/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
	);

	return dateMatch !== undefined && dateMatch !== null
		? `${dateMatch[1]}-${dateMatch[2]}`
		: undefined;
};

export const getPuzzleBackLink = (
	puzzleSlug: string | undefined,
	archiveMonth: string | undefined,
): BackLink => {
	const monthMatch = archiveMonth?.match(/^(\d{4})-(0[1-9]|1[0-2])$/);

	return puzzleSlug !== undefined &&
		monthMatch !== undefined &&
		monthMatch !== null
		? {
				href: `/puzzles/${puzzleSlug}/archive/${monthMatch[1]}/${monthMatch[2]}`,
				label: 'Back to archive',
			}
		: {
				href: '/puzzles',
				label: 'Back to puzzles',
			};
};

export const PuzzleBackLink = ({ archiveMonth, puzzleSlug }: Props) => {
	const [backLink, setBackLink] = useState(() =>
		getPuzzleBackLink(puzzleSlug, archiveMonth),
	);

	useEffect(() => {
		const date = new URLSearchParams(window.location.search).get('date');
		const monthFromDate = getArchiveMonthFromDate(date);

		setBackLink(
			getPuzzleBackLink(puzzleSlug, archiveMonth ?? monthFromDate),
		);
	}, [archiveMonth, puzzleSlug]);

	return (
		<a css={backLinkStyles} href={backLink.href}>
			{backLink.label}
		</a>
	);
};
