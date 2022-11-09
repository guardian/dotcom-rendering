import { css } from '@emotion/react';
import {
	from,
	palette,
	textSans,
	visuallyHidden,
	space,
	remSpace,
} from '@guardian/source-foundations';
import ClockIcon from '../../../static/icons/clock.svg';
import { SvgClock } from '@guardian/source-react-components';

type Props = {
	isScreenReader?: boolean;
	until?: number | undefined;
};

const deadlineStyles = css`
	${textSans.xxsmall()};
	color: ${palette.brand};
	background-color: ${palette.brandAlt[400]};
	position: absolute;
	right: 0;
	display: flex;
	align-items: center;
	margin-top: -${remSpace[6]};
	padding: 0 ${remSpace[1]};

	${from.leftCol} {
		padding-left: ${'5px'};
	}
`;

function getDaysBetween(first: Date, second: Date): number {
	const ONE_DAY = 1000 * 3600 * 24;
	return (second.getTime() - first.getTime()) / ONE_DAY;
}

export const getDeadlineText = (
	date1: Date,
	date2: Date,
): string | undefined => {
	const maxDays = 7;
	const daysBetween = getDaysBetween(date1, date2);
	if (daysBetween <= 0 || daysBetween > maxDays) return;
	if (daysBetween <= 1) return 'Closing today';
	if (Math.round(daysBetween) === 1) return 'Open for 1 more day';
	return `Open for ${Math.round(daysBetween)} more days`;
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

	return (
		<span css={deadlineStyles}>
			<SvgClock size="xsmall" />
			{deadlineText}
		</span>
	);
};
