import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgClock } from '@guardian/source-react-components';

type Props = {
	until?: number;
};

const deadlineStyles = css`
	${textSans.xxsmall()};
	background-color: ${sourcePalette.brandAlt[400]};
	right: 0;
	display: flex;
	align-items: center;
	padding-right: ${space[1]}px;
`;

function getDaysBetween(first: Date, second: Date): number {
	const ONE_DAY = 1000 * 3600 * 24;
	return (second.getTime() - first.getTime()) / ONE_DAY;
}

const getDeadlineText = (date1: Date, date2: Date): string | undefined => {
	const maxDays = 7;
	const daysBetween = getDaysBetween(date1, date2);
	if (daysBetween <= 0 || daysBetween > maxDays) return;
	if (daysBetween <= 1) return 'Closing today';
	if (Math.round(daysBetween) === 1) return 'Open for 1 more day';
	return `Open for ${Math.round(daysBetween)} more days`;
};

function formatOptionalDate(date: number | undefined): Date | undefined {
	if (date === undefined) return undefined;
	return new Date(date * 1000);
}

export const Deadline = ({ until }: Props) => {
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
