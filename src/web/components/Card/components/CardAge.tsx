import React from 'react';
import { css, cx } from 'emotion';

import { Design, Display } from '@guardian/types';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@root/src/web/lib/dateTime';
import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

type Props = {
	format: Format;
	webPublicationDate: string;
	showClock?: boolean;
};

const ageStyles = (format: Format) => {
	// This is annoying but can't apply SVG color otherwise
	const smallImageSvgColor =
		format.design === Design.Live
			? decidePillarLight(format.theme)
			: neutral[46];

	const svgColor =
		format.display === Display.Immersive
			? neutral[100]
			: smallImageSvgColor;

	const smallImageTextColor =
		format.design === Design.Live
			? decidePillarLight(format.theme)
			: neutral[60];

	return css`
		${textSans.xsmall()};
		color: ${smallImageTextColor};

		/* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
		padding-left: 5px;
		padding-right: 5px;
		${until.tablet} {
			line-height: 1.25;
		}

		svg {
			fill: ${svgColor};
			margin-bottom: -1px;
			height: 11px;
			width: 11px;
			margin-right: 2px;
		}

		> time {
			${textSans.xsmall({
				fontWeight: format.design === Design.Media ? `bold` : `regular`,
			})};
		}
	`;
};

const colourStyles = (format: Format) => {
	switch (format.design) {
		case Design.Live:
			return css`
				/* stylelint-disable-next-line color-no-hex */
				color: ${decidePillarLight(format.theme)};
			`;
		default:
			return css`
				color: ${neutral[60]};
			`;
	}
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

export const CardAge = ({ format, webPublicationDate, showClock }: Props) => {
	const displayString = makeRelativeDate(
		new Date(webPublicationDate).getTime(),
		{
			format: 'med',
		},
	);

	if (!displayString) {
		return null;
	}

	return (
		<span className={cx(ageStyles(format), colourStyles(format))}>
			<span
				className={cx(
					format.display === Display.Immersive &&
						fullCardImageTextStyles,
				)}
			>
				{showClock && <ClockIcon />}
				<time dateTime={webPublicationDate}>{displayString}</time>
			</span>
		</span>
	);
};
