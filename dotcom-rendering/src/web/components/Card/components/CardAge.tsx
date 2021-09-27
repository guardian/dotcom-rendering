import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';
import { ArticleDesign, timeAgo } from '@guardian/libs';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { until } from '@guardian/src-foundations/mq';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	webPublicationDate: string;
	showClock?: boolean;
};

const ageStyles = (format: ArticleFormat, palette: Palette) => {
	return css`
		${textSans.xxsmall()};
		color: ${palette.text.cardFooter};

		/* Provide side padding for positioning and also to keep spacing
    between any sibings (like Lines) */
		padding-left: 5px;
		padding-right: 5px;
		${until.tablet} {
			line-height: 1.25;
		}

		svg {
			fill: ${palette.fill.cardIcon};
			margin-bottom: -1px;
			height: 11px;
			width: 11px;
			margin-right: 2px;
		}

		> time {
			${textSans.xxsmall({
				fontWeight:
					format.design === ArticleDesign.Media ? `bold` : `regular`,
			})};
		}
	`;
};

export const CardAge = ({
	format,
	palette,
	webPublicationDate,
	showClock,
}: Props) => {
	const displayString = timeAgo(new Date(webPublicationDate).getTime());

	if (!displayString) {
		return null;
	}

	return (
		<span css={ageStyles(format, palette)}>
			<span>
				{showClock && <ClockIcon />}
				<time dateTime={webPublicationDate}>{displayString}</time>
			</span>
		</span>
	);
};
