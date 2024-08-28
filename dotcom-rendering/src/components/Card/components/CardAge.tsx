import { css } from '@emotion/react';
import { timeAgo } from '@guardian/libs';
import { textSansBold12 } from '@guardian/source/foundations';
import { palette } from '../../../palette';
import ClockIcon from '../../../static/icons/clock.svg';
import { DateTime } from '../../DateTime';

type Props = {
	absoluteServerTimes: boolean;
	webPublication: {
		date: string;
		isWithinTwelveHours: boolean;
	};
	showClock?: boolean;
	isOnwardContent?: boolean;
	isTagPage: boolean;
};

const ageStyles = (isOnwardsContent?: boolean) => {
	return css`
		${textSansBold12};

		color: ${isOnwardsContent
			? palette('--card-footer-onwards-content')
			: palette('--card-footer-text')};

		margin-top: -4px;

		svg {
			fill: ${isOnwardsContent
				? palette('--card-footer-onwards-content')
				: palette('--card-footer-text')};
			margin-bottom: -1px;
			height: 11px;
			width: 11px;
			margin-right: 2px;
		}
	`;
};

export const CardAge = ({
	webPublication,
	showClock,
	isOnwardContent,
	absoluteServerTimes,
	isTagPage,
}: Props) => {
	if (timeAgo(new Date(webPublication.date).getTime()) === false) {
		return null;
	}

	return (
		<span css={ageStyles(isOnwardContent)}>
			{showClock && <ClockIcon />}
			{isTagPage ? (
				<DateTime
					date={new Date(webPublication.date)}
					display={'absolute'}
					showWeekday={false}
					showDate={!webPublication.isWithinTwelveHours}
					showTime={true}
				/>
			) : (
				<DateTime
					date={new Date(webPublication.date)}
					display={'relative'}
					absoluteServerTimes={absoluteServerTimes}
					showWeekday={false}
					showDate={true}
					showTime={false}
				/>
			)}
		</span>
	);
};
