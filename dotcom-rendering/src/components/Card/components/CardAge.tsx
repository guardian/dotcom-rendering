import { css } from '@emotion/react';
import { timeAgo } from '@guardian/libs';
import { from, textSans12, textSansBold12 } from '@guardian/source/foundations';
import { cardHasDarkBackground } from '../../../lib/cardHelpers';
import { palette } from '../../../palette';
import ClockIcon from '../../../static/icons/clock.svg';
import { DateTime } from '../../DateTime';

type Props = {
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	webPublication: {
		date: string;
		isWithinTwelveHours: boolean;
	};
	showClock?: boolean;
	isOnwardContent?: boolean;
	isTagPage: boolean;
};

const ageStyles = (format: ArticleFormat, isOnwardsContent?: boolean) => {
	return css`
		${textSans12};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		 */
		line-height: 1.25;
		${from.tablet} {
			line-height: 1.15;
		}

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

		> time {
			${cardHasDarkBackground(format) ? textSansBold12 : textSans12};
		}
	`;
};

export const CardAge = ({
	format,
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
		<span css={ageStyles(format, isOnwardContent)}>
			{showClock && <ClockIcon />}
			{isTagPage ? (
				<DateTime
					date={new Date(webPublication.date)}
					display={'absolute'}
					editionId={'UK'}
					showWeekday={false}
					showDate={!webPublication.isWithinTwelveHours}
					showTime={true}
				/>
			) : (
				<DateTime
					date={new Date(webPublication.date)}
					display={'relative'}
					absoluteServerTimes={absoluteServerTimes}
					editionId={'UK'}
					showWeekday={false}
					showDate={true}
					showTime={false}
				/>
			)}
		</span>
	);
};
