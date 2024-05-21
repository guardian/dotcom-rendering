import { css } from '@emotion/react';
import { ArticleDesign, timeAgo } from '@guardian/libs';
import {
	textSans12,
	textSansBold12,
	until,
} from '@guardian/source-foundations';
import { palette } from '../../../palette';
import ClockIcon from '../../../static/icons/clock.svg';
import type { DCRContainerPalette } from '../../../types/front';
import { DateTime } from '../../DateTime';

type Props = {
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	containerPalette?: DCRContainerPalette;
	webPublicationDate: string;
	showClock?: boolean;
	isDynamo?: true;
	isOnwardContent?: boolean;
};

const ageStyles = (
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
	isDynamo?: true,
	isOnwardsContent?: boolean,
) => {
	return css`
		${textSans12};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		 */
		line-height: 1.15;
		margin-top: -4px;
		color: ${isOnwardsContent
			? palette('--card-footer-onwards-content')
			: palette('--card-footer-text')};

		/* Provide side padding for positioning and also to keep spacing
		between any sibings (like Lines) */
		padding-left: 5px;
		padding-right: 5px;
		${until.tablet} {
			line-height: 1.25;
		}

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
			${format.design === ArticleDesign.Gallery ||
			format.design === ArticleDesign.Audio ||
			format.design === ArticleDesign.Video
				? textSansBold12
				: textSans12};
		}
	`;
};

export const CardAge = ({
	format,
	containerPalette,
	webPublicationDate,
	showClock,
	isDynamo,
	isOnwardContent,
	absoluteServerTimes,
}: Props) => {
	if (timeAgo(new Date(webPublicationDate).getTime()) === false) {
		return null;
	}

	return (
		<span
			css={ageStyles(format, containerPalette, isDynamo, isOnwardContent)}
		>
			{showClock && <ClockIcon />}
			<DateTime
				date={new Date(webPublicationDate)}
				display="relative"
				absoluteServerTimes={absoluteServerTimes}
				editionId={'UK'}
				showWeekday={false}
				showDate={true}
				showTime={false}
			/>
		</span>
	);
};
