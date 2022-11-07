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

function getDaysBetween(date1: Date, date2: Date): number {
	const ONE_DAY = 1000 * 3600 * 24;
	return Math.abs(Math.round((date1.getTime() - date2.getTime()) / ONE_DAY));
}

function formatOptionalDate(date: Int64 | undefined): Date | undefined {
	if (date === undefined) return undefined;
	const d = new Date(date.toNumber());
	if (!isValidDate(d)) return undefined;
	return d;
}

const DeadlineComponent: FC<{ until?: Int64 }> = ({ until }) => {
	const untilDate = formatOptionalDate(until);
	if (untilDate) {
		const daysBetween = getDaysBetween(untilDate, new Date());
		return (
			<span css={deadlineStyles}>
				<SvgClock size="xsmall" />
				Open for {daysBetween} more day{daysBetween > 1 && 's'}
			</span>
		);
	}
	return null;
};

export default DeadlineComponent;
