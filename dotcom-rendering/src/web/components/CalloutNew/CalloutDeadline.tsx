import { css } from '@emotion/react';
import {
	from,
	palette,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import ClockIcon from '../../../static/icons/clock.svg';

type Props = {
	isScreenReader?: boolean;
	until?: number | undefined;
};

const deadlineStyles = css`
	${textSans.xxsmall()};
	color: ${palette.brand};
	background-color: ${palette.brandAlt[400]};
	display: inline-block;

	> strong {
		font-weight: bold;
	}

	padding: ${'3px 5px'};

	${from.mobileLandscape} {
		padding-left: ${'6px'};
	}

	${from.leftCol} {
		padding-left: ${'5px'};
	}
`;

const deadlineScreenReader = css`
	${visuallyHidden};
`;

function getDaysBetween(first: Date, second: Date): number {
	const ONE_DAY = 1000 * 3600 * 24;
	return (second.getTime() - first.getTime()) / ONE_DAY;
}

export const getDeadlineText = (
	date1: Date,
	date2: Date,
): string | undefined => {
	const maxDays = 7; // TODO: Check this
	const daysBetween = getDaysBetween(date1, date2);
	if (daysBetween <= 0 || daysBetween > maxDays) return;
	if (daysBetween <= 1) return ' Closing today';
	if (Math.round(daysBetween) === 1) return ' Open for 1 more day';
	return ` Open for ${Math.round(daysBetween)} more days`;
};

function formatOptionalDate(date: number | undefined): Date | undefined {
	if (date === undefined) return undefined;
	const d = new Date(date * 1000);
	return d;
}

export const Deadline = ({ isScreenReader, until }: Props) => {
	const untilDate = formatOptionalDate(until);
	if (!untilDate) return null;
	const now = new Date();
	const deadlineText = getDeadlineText(now, untilDate);
	if (!deadlineText) return null;

	// TODO: Fix this
	if (isScreenReader) {
		return (
			<div css={deadlineScreenReader}>
				<span css={deadlineStyles}>
					<ClockIcon />
					{deadlineText}
				</span>
			</div>
		);
	}

	return (
		<span css={deadlineStyles}>
			<ClockIcon />
			{deadlineText}
		</span>
	);
};
