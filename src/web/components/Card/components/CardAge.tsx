import { css } from '@emotion/react';

import { Design, Display } from '@guardian/types';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { timeAgo } from '@guardian/libs';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

type Props = {
	format: Format;
	palette: Palette;
	webPublicationDate: string;
	showClock?: boolean;
};

const ageStyles = (format: Format, palette: Palette) => {
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
				fontWeight: format.design === Design.Media ? `bold` : `regular`,
			})};
		}
	`;
};

const fullCardImageTextStyles = css`
	color: ${neutral[100]};
	background-color: rgba(0, 0, 0, 0.75);
	box-shadow: -${space[1]}px 0 0 rgba(0, 0, 0, 0.75);
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
	line-height: 1;
	white-space: pre-wrap;
	padding-left: ${space[1]}px;
	padding-right: ${space[1]}px;
`;

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
			<span
				css={
					format.display === Display.Immersive &&
					fullCardImageTextStyles
				}
			>
				{showClock && <ClockIcon />}
				<time dateTime={webPublicationDate}>{displayString}</time>
			</span>
		</span>
	);
};
