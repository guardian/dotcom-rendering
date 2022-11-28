import { SvgClock } from '@guardian/source-react-components';
import { isValidDate } from 'date';
import type Int64 from 'node-int64';
import type { FC } from 'react';
import { highlightStyles } from './styles';

const Highlight: FC = ({ children }) => {
	return <span css={highlightStyles}>{children}</span>;
};

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

function formatOptionalDate(date: Int64 | undefined): Date | undefined {
	if (date === undefined) return undefined;
	const d = new Date(date.toNumber());
	if (!isValidDate(d)) return undefined;
	return d;
}

function isCalloutActive(until?: Int64): boolean {
	const untilDate = formatOptionalDate(until);
	const now = new Date();

	return untilDate === undefined || untilDate > now;
}

const DeadlineDate: FC<{ until?: Int64 }> = ({ until }) => {
	const untilDate = formatOptionalDate(until);
	if (!untilDate) return null;
	const now = new Date();
	const deadlineText = getDeadlineText(now, untilDate);
	if (!deadlineText) return null;
	return (
		<Highlight>
			<SvgClock size="xsmall" />
			{deadlineText}
		</Highlight>
	);
};

export { Highlight, DeadlineDate, isCalloutActive };
