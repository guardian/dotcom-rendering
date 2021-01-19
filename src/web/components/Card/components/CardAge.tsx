import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@root/src/web/lib/dateTime';
import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';

const ageStyles = (design: Design, pillar: CAPIPillar) => css`
	${textSans.xsmall()};
	color: ${design === Design.Live ? decidePillarLight(pillar) : neutral[60]};

	/* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
	padding-left: 5px;
	padding-right: 5px;

	svg {
		fill: ${design === Design.Live
			? decidePillarLight(pillar)
			: neutral[46]};
		margin-bottom: -1px;
		height: 11px;
		width: 11px;
		margin-right: 2px;
	}

	> time {
		${textSans.xsmall({
			fontWeight: design === Design.Media ? `bold` : `regular`,
		})};
	}
`;

const colourStyles = (design: Design, pillar: CAPIPillar) => {
	switch (design) {
		case Design.Live:
			return css`
				/* stylelint-disable-next-line color-no-hex */
				color: ${decidePillarLight(pillar)};
			`;
		case Design.Feature:
		case Design.Interview:
		case Design.Media:
		case Design.PhotoEssay:
		case Design.Analysis:
		case Design.Article:
		case Design.Review:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.GuardianView:
		case Design.Quiz:
		case Design.Comment:
		default:
			return css`
				color: ${neutral[60]};
			`;
	}
};

type Props = {
	design: Design;
	pillar: CAPIPillar;
	webPublicationDate: string;
	showClock?: boolean;
};

export const CardAge = ({
	design,
	pillar,
	webPublicationDate,
	showClock,
}: Props) => {
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
		<span
			className={cx(
				ageStyles(design, pillar),
				colourStyles(design, pillar),
			)}
		>
			{showClock && <ClockIcon />}
			<time dateTime={webPublicationDate}>{displayString}</time>
		</span>
	);
};
