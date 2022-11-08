import { css } from '@emotion/react';
import { brandAlt, neutral, remSpace } from '@guardian/source-foundations';
import { SvgClock } from '@guardian/source-react-components';
import { isValidDate } from 'date';
import type Int64 from 'node-int64';
import type { FC } from 'react';

const deadlineStyles = css`
	color: ${neutral[7]};
	background: ${brandAlt[400]};
	display: flex;
	align-items: center;
	padding: 0 ${remSpace[1]};
	position: absolute;
	right: 0;
	margin-top: -${remSpace[6]};
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
	if (daysBetween <= 1) return 'Closing today';
	if (Math.round(daysBetween) === 1) return 'Open for 1 more day';
	return `Open for ${Math.round(daysBetween)} more days`;
};

function formatOptionalDate(date: Int64 | undefined): Date | undefined {
	if (date === undefined) return undefined;
	const d = new Date(date.toNumber());
	if (!isValidDate(d)) return undefined;
	return d;
}

const DeadlineDate: FC<{ until?: Int64 }> = ({ until }) => {
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

export default DeadlineDate;
