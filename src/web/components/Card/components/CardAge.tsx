import React from 'react';
import { css } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@root/src/web/lib/dateTime';

const ageStyles = (designType: DesignType) => css`
	${textSans.xsmall()};
	color: ${neutral[100]};

	/* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
	padding-left: 5px;
	padding-right: 5px;

	svg {
		fill: ${neutral[100]};
		margin-bottom: -1px;
		height: 11px;
		width: 11px;
		margin-right: 2px;
	}

	> time {
		${textSans.xsmall({
			fontWeight: designType === `Media` ? `bold` : `regular`,
		})};
	}
`;

type Props = {
	designType: DesignType;
	pillar: CAPIPillar;
	webPublicationDate: string;
	showClock?: boolean;
};

export const CardAge = ({
	designType,
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
		<span className={ageStyles(designType)}>
			{showClock && <ClockIcon />}
			<time dateTime={webPublicationDate}>{displayString}</time>
		</span>
	);
};
