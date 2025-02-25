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
	isTagPage: boolean;
	colour?: string;
};

const ageStyles = (colour: string) => {
	return css`
		${textSansBold12};
		color: ${colour};
		margin-top: -4px;

		svg {
			fill: ${colour};
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
	absoluteServerTimes,
	isTagPage,
	colour = palette('--card-footer-text'),
}: Props) => {
	if (timeAgo(new Date(webPublication.date).getTime()) === false) {
		return null;
	}

	return (
		<span css={ageStyles(colour)}>
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
